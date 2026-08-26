import { App, FuzzySuggestModal, Modal, Notice, Setting, TFolder } from "obsidian";

export interface NewArticleInput {
	title: string;
	directory?: string;
	author?: string;
	cover?: string;
	tags?: string[];
	description?: string;
}

export class NewArticleModal extends Modal {
	private title = "";
	private directory = "";
	private author = "";
	private cover = "";
	private tagsText = "";
	private description = "";
	private isSubmitting = false;

	constructor(
		app: App,
		private readonly onSubmit: (input: NewArticleInput) => Promise<void>,
	) {
		super(app);
	}

	onOpen(): void {
		this.title = "";
		this.directory = "";
		this.author = "";
		this.cover = "";
		this.tagsText = "";
		this.description = "";
		this.isSubmitting = false;

		const { contentEl } = this;
		contentEl.empty();
		contentEl.createEl("h2", { text: "新建文章" });

		const formEl = contentEl.createEl("form");
		formEl.addEventListener("submit", (event) => {
			event.preventDefault();
			void this.submit();
		});

		let titleInput: HTMLInputElement | undefined;
		new Setting(formEl)
			.setName("标题")
			.setDesc("文章文件名将由标题生成。")
			.addText((text) => {
				text.setPlaceholder("输入文章标题");
				text.onChange((value) => {
					this.title = value;
				});
				titleInput = text.inputEl;
			});

		new Setting(formEl)
			.setName("目录")
			.setDesc("选择文章所在文件夹；留空为 Vault 根目录。")
			.addDropdown((dropdown) => {
				dropdown.addOption("", "Vault 根目录");
				for (const folder of listContentFolders(this.app)) {
					dropdown.addOption(folder, folder);
				}
				dropdown.onChange((value) => {
					this.directory = value;
				});
			});

		const advanced = formEl.createEl("details", { cls: "vpb-advanced" });
		advanced.createEl("summary", { text: "高级设置（可选）" });
		const box = advanced.createDiv({ cls: "vpb-advanced-body" });

		new Setting(box)
			.setName("作者")
			.setDesc("留空则使用站点默认作者。")
			.addText((text) => {
				text.onChange((value) => {
					this.author = value;
				});
			});

		const coverSetting = new Setting(box)
			.setName("封面")
			.setDesc("可选择 public/ 中的图片，或填写外链地址。")
			.addText((text) => {
				text.setPlaceholder("/image/cover.webp 或 https://...");
				text.onChange((value) => {
					this.cover = value;
				});
			})
			.addExtraButton((button) => {
				button.setIcon("image");
				button.setTooltip("从 public/ 选择图片");
				button.onClick(() => {
					void this.choosePublicImage((asset) => {
						this.cover = asset;
						const input = coverSetting.controlEl.querySelector<HTMLInputElement>("input");
						if (input) input.value = asset;
					});
				});
			});

		new Setting(box)
			.setName("标签")
			.setDesc("多个标签用逗号分隔，例如：日记, 生活。")
			.addText((text) => {
				text.setPlaceholder("标签1, 标签2");
				text.onChange((value) => {
					this.tagsText = value;
				});
			});

		new Setting(box)
			.setName("描述")
			.setDesc("用于 SEO 摘要；留空则从正文自动截取。")
			.addTextArea((text) => {
				text.inputEl.rows = 3;
				text.onChange((value) => {
					this.description = value;
				});
			});

		const actionsEl = formEl.createDiv({ cls: "modal-button-container" });
		const cancelButton = actionsEl.createEl("button", { text: "取消", type: "button" });
		cancelButton.addEventListener("click", () => this.close());

		actionsEl.createEl("button", {
			text: "创建文章",
			cls: "mod-cta",
			type: "submit",
		});

		window.setTimeout(() => titleInput?.focus(), 0);
	}

	onClose(): void {
		this.contentEl.empty();
	}

	private async choosePublicImage(onChoose: (path: string) => void): Promise<void> {
		const images = this.app.vault.getFiles()
			.filter((file) => file.path.startsWith("public/") && /\.(avif|gif|jpe?g|png|svg|webp)$/i.test(file.path))
			.map((file) => `/${file.path.slice("public/".length)}`)
			.sort((left, right) => left.localeCompare(right));
		if (images.length === 0) {
			new Notice("public/ 目录中没有可选图片。", 5_000);
			return;
		}
		new PublicImageSuggestModal(this.app, images, onChoose).open();
	}

	private async submit(): Promise<void> {
		if (this.isSubmitting) {
			return;
		}

		const title = this.title.trim();
		if (!title) {
			new Notice("请输入文章标题");
			return;
		}

		this.isSubmitting = true;
		try {
			const input: NewArticleInput = { title };
			const directory = this.directory.trim();
			if (directory) input.directory = directory;
			const author = this.author.trim();
			if (author) input.author = author;
			const cover = this.cover.trim();
			if (cover) input.cover = cover;
			const tags = this.tagsText.split(/[,，\s]+/).filter(Boolean);
			if (tags.length) input.tags = tags;
			const description = this.description.trim();
			if (description) input.description = description;

			await this.onSubmit(input);
			this.close();
		} catch (error) {
			new Notice(error instanceof Error && error.message ? error.message : "创建文章失败");
		} finally {
			this.isSubmitting = false;
		}
	}
}

/** Existing user-content folders, excluding hidden and system directories. */
function listContentFolders(app: App): string[] {
	return app.vault
		.getAllLoadedFiles()
		.filter((file): file is TFolder => file instanceof TFolder)
		.map((folder) => folder.path)
		.filter((path) => !path.split("/").some((segment) => segment.startsWith(".") || segment === "node_modules"))
		.sort((left, right) => left.localeCompare(right));
}

class PublicImageSuggestModal extends FuzzySuggestModal<string> {
	constructor(
		app: App,
		private readonly images: string[],
		private readonly onChoose: (path: string) => void,
	) {
		super(app);
		this.setPlaceholder("搜索 public/ 中的图片");
	}

	getItems(): string[] {
		return this.images;
	}

	getItemText(item: string): string {
		return item;
	}

	onChooseItem(item: string): void {
		this.onChoose(item);
	}
}
