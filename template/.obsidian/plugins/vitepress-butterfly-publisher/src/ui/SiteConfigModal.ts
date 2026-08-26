import {
	App,
	FuzzySuggestModal,
	Modal,
	Notice,
	Setting,
	setIcon,
} from "obsidian";

import {
	type CommentsConfig,
	type FriendLink,
	type MenuItem,
	type SiteConfig,
	SiteConfigService,
	type SocialLink,
} from "../services/site-config";

type ConfigTab = "general" | "home" | "profile" | "navigation" | "media" | "community";

interface ConfigTabDefinition {
	id: ConfigTab;
	label: string;
	icon: string;
}

const TABS: ConfigTabDefinition[] = [
	{ id: "general", label: "基础", icon: "settings-2" },
	{ id: "home", label: "首页", icon: "layout-template" },
	{ id: "profile", label: "资料", icon: "contact-round" },
	{ id: "navigation", label: "导航", icon: "menu" },
	{ id: "media", label: "媒体", icon: "music-2" },
	{ id: "community", label: "社区", icon: "messages-square" },
];

function errorText(error: unknown): string {
	return error instanceof Error && error.message ? error.message : String(error);
}

/**
 * Icon palette. Lucide names are verified against the theme's icon plugin
 * (any name here must exist in @lucide/vue); Font Awesome names need the
 * FA CSS bundle loaded by the theme.
 */
const LUCIDE_ICON_NAMES = [
	"activity", "arrow-right", "book", "book-open", "calendar-clock", "chevron-down", "chevron-right", "chevron-up",
	"circle-alert", "circle-check", "circle-help", "compass", "crosshair", "disc-3", "eye", "file-text", "folder",
	"folder-open", "folder-tree", "hash", "heart", "home", "house", "info", "link", "mail", "map-pin", "moon",
	"panel-left-close", "panel-left-open", "pen-line", "rss", "search", "settings", "share-2", "star", "sun",
	"sun-moon", "tags", "upload", "user", "users",
];
const FONT_AWESOME_ICON_NAMES = [
	"fa-brands fa-github", "fa-brands fa-bilibili", "fa-brands fa-weixin", "fa-brands fa-qq",
	"fa-brands fa-x-twitter", "fa-brands fa-youtube", "fa-brands fa-telegram", "fa-brands fa-discord",
	"fa-brands fa-linkedin", "fa-brands fa-instagram", "fa-brands fa-weibo",
	"fa-solid fa-envelope", "fa-solid fa-rss",
];

/**
 * Embedded Font Awesome brand paths so previews render inside Obsidian
 * without loading the FA CSS bundle (which is blocked by Obsidian's CSP).
 * The stored value stays a fa-* class; the theme renders it on the site.
 */
const FA_BRAND_ICONS: Record<string, { viewBox: string; path: string }> = {
	"fa-brands fa-github": {
		viewBox: "0 0 496 512",
		path: "M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z",
	},
	"fa-brands fa-bilibili": {
		viewBox: "0 0 512 512",
		path: "M488.6 104.1C505.3 122.2 513 143.8 511.9 169.8V372.2C511.5 398.6 502.7 420.3 485.4 437.3C468.2 454.3 446.3 463.2 419.9 464H92.02C65.57 463.2 43.81 454.2 26.74 436.8C9.682 419.4 .7667 396.5 0 368.2V169.8C.7667 143.8 9.682 122.2 26.74 104.1C43.81 87.75 65.57 78.77 92.02 78H121.4L96.05 52.19C90.3 46.46 87.42 39.19 87.42 30.4C87.42 21.6 90.3 14.34 96.05 8.603C101.8 2.868 109.1 0 117.9 0C126.7 0 134 2.868 139.8 8.603L213.1 78H301.1L375.6 8.603C381.7 2.868 389.2 0 398 0C406.8 0 414.1 2.868 419.9 8.603C425.6 14.34 428.5 21.6 428.5 30.4C428.5 39.19 425.6 46.46 419.9 52.19L394.6 78L423.9 78C450.3 78.77 471.9 87.75 488.6 104.1H488.6zM449.8 173.8C449.4 164.2 446.1 156.4 439.1 150.3C433.9 144.2 425.1 140.9 416.4 140.5H96.05C86.46 140.9 78.6 144.2 72.47 150.3C66.33 156.4 63.07 164.2 62.69 173.8V368.2C62.69 377.4 65.95 385.2 72.47 391.7C78.99 398.2 86.85 401.5 96.05 401.5H416.4C425.6 401.5 433.4 398.2 439.7 391.7C446 385.2 449.4 377.4 449.8 368.2L449.8 173.8zM185.5 216.5C191.8 222.8 195.2 230.6 195.6 239.7V273C195.2 282.2 191.9 289.9 185.8 296.2C179.6 302.5 171.8 305.7 162.2 305.7C152.6 305.7 144.7 302.5 138.6 296.2C132.5 289.9 129.2 282.2 128.8 273V239.7C129.2 230.6 132.6 222.8 138.9 216.5C145.2 210.2 152.1 206.9 162.2 206.5C171.4 206.9 179.2 210.2 185.5 216.5H185.5zM377 216.5C383.3 222.8 386.7 230.6 387.1 239.7V273C386.7 282.2 383.4 289.9 377.3 296.2C371.2 302.5 363.3 305.7 353.7 305.7C344.1 305.7 336.3 302.5 330.1 296.2C323.1 289.9 320.7 282.2 320.4 273V239.7C320.7 230.6 324.1 222.8 330.4 216.5C336.7 210.2 344.5 206.9 353.7 206.5C362.9 206.9 370.7 210.2 377 216.5H377z",
	},
	"fa-brands fa-weixin": {
		viewBox: "0 0 576 512",
		path: "M385.2 167.6c6.4 0 12.6.3 18.8 1.1C387.4 90.3 303.3 32 207.7 32 100.5 32 13 104.8 13 197.4c0 53.4 29.3 97.5 77.9 131.6l-19.3 58.6 68-34.1c24.4 4.8 43.8 9.7 68.2 9.7 6.2 0 12.1-.3 18.3-.8-4-12.9-6.2-26.6-6.2-40.8-.1-84.9 72.9-154 165.3-154zm-104.5-52.9c14.5 0 24.2 9.7 24.2 24.4 0 14.5-9.7 24.2-24.2 24.2-14.8 0-29.3-9.7-29.3-24.2.1-14.7 14.6-24.4 29.3-24.4zm-136.4 48.6c-14.5 0-29.3-9.7-29.3-24.2 0-14.8 14.8-24.4 29.3-24.4 14.8 0 24.4 9.7 24.4 24.4 0 14.6-9.6 24.2-24.4 24.2zM563 319.4c0-77.9-77.9-141.3-165.4-141.3-92.7 0-165.4 63.4-165.4 141.3S305 460.7 397.6 460.7c19.3 0 38.9-5.1 58.6-9.9l53.4 29.3-14.8-48.6C534 402.1 563 363.2 563 319.4zm-219.1-24.5c-9.7 0-19.3-9.7-19.3-19.6 0-9.7 9.7-19.3 19.3-19.3 14.8 0 24.4 9.7 24.4 19.3 0 10-9.7 19.6-24.4 19.6zm107.1 0c-9.7 0-19.3-9.7-19.3-19.6 0-9.7 9.7-19.3 19.3-19.3 14.5 0 24.4 9.7 24.4 19.3.1 10-9.9 19.6-24.4 19.6z",
	},
	"fa-brands fa-qq": {
		viewBox: "0 0 448 512",
		path: "M433.754 420.445c-11.526 1.393-44.86-52.741-44.86-52.741 0 31.345-16.136 72.247-51.051 101.786 16.842 5.192 54.843 19.167 45.803 34.421-7.316 12.343-125.51 7.881-159.632 4.037-34.122 3.844-152.316 8.306-159.632-4.037-9.045-15.25 28.918-29.214 45.783-34.415-34.92-29.539-51.059-70.445-51.059-101.792 0 0-33.334 54.134-44.859 52.741-5.37-.65-12.424-29.644 9.347-99.704 10.261-33.024 21.995-60.478 40.144-105.779C60.683 98.063 108.982.006 224 0c113.737.006 163.156 96.133 160.264 214.963 18.118 45.223 29.912 72.85 40.144 105.778 21.768 70.06 14.716 99.053 9.346 99.704z",
	},
	"fa-brands fa-x-twitter": {
		viewBox: "0 0 512 512",
		path: "M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z",
	},
	"fa-brands fa-youtube": {
		viewBox: "0 0 576 512",
		path: "M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z",
	},
	"fa-brands fa-telegram": {
		viewBox: "0 0 496 512",
		path: "M248,8C111.033,8,0,119.033,0,256S111.033,504,248,504,496,392.967,496,256,384.967,8,248,8ZM362.952,176.66c-3.732,39.215-19.881,134.378-28.1,178.3-3.476,18.584-10.322,24.816-16.948,25.425-14.4,1.326-25.338-9.517-39.287-18.661-21.827-14.308-34.158-23.215-55.346-37.177-24.485-16.135-8.612-25,5.342-39.5,3.652-3.793,67.107-61.51,68.335-66.746.153-.655.3-3.1-1.154-4.384s-3.59-.849-5.135-.5q-3.283.746-104.608,69.142-14.845,10.194-26.894,9.934c-8.855-.191-25.888-5.006-38.551-9.123-15.531-5.048-27.875-7.717-26.8-16.291q.84-6.7,18.45-13.7,108.446-47.248,144.628-62.3c68.872-28.647,83.183-33.623,92.511-33.789,2.052-.034,6.639.474,9.61,2.885a10.452,10.452,0,0,1,3.53,6.716A43.765,43.765,0,0,1,362.952,176.66Z",
	},
	"fa-brands fa-discord": {
		viewBox: "0 0 640 512",
		path: "M524.531,69.836a1.5,1.5,0,0,0-.764-.7A485.065,485.065,0,0,0,404.081,32.03a1.816,1.816,0,0,0-1.923.91,337.461,337.461,0,0,0-14.9,30.6,447.848,447.848,0,0,0-134.426,0,309.541,309.541,0,0,0-15.135-30.6,1.89,1.89,0,0,0-1.924-.91A483.689,483.689,0,0,0,116.085,69.137a1.712,1.712,0,0,0-.788.676C39.068,183.651,18.186,294.69,28.43,404.354a2.016,2.016,0,0,0,.765,1.375A487.666,487.666,0,0,0,176.02,479.918a1.9,1.9,0,0,0,2.063-.676A348.2,348.2,0,0,0,208.12,430.4a1.86,1.86,0,0,0-1.019-2.588,321.173,321.173,0,0,1-45.868-21.853,1.885,1.885,0,0,1-.185-3.126c3.082-2.309,6.166-4.711,9.109-7.137a1.819,1.819,0,0,1,1.9-.256c96.229,43.917,200.41,43.917,295.5,0a1.812,1.812,0,0,1,1.924.233c2.944,2.426,6.027,4.851,9.132,7.16a1.884,1.884,0,0,1-.162,3.126,301.407,301.407,0,0,1-45.89,21.83,1.875,1.875,0,0,0-1,2.611,391.055,391.055,0,0,0,30.014,48.815,1.864,1.864,0,0,0,2.063.7A486.048,486.048,0,0,0,610.7,405.729a1.882,1.882,0,0,0,.765-1.352C623.729,277.594,590.933,167.465,524.531,69.836ZM222.491,337.58c-28.972,0-52.844-26.587-52.844-59.239S193.056,219.1,222.491,219.1c29.665,0,53.306,26.82,52.843,59.239C275.334,310.993,251.924,337.58,222.491,337.58Zm195.38,0c-28.971,0-52.843-26.587-52.843-59.239S388.437,219.1,417.871,219.1c29.667,0,53.307,26.82,52.844,59.239C470.715,310.993,447.538,337.58,417.871,337.58Z",
	},
	"fa-brands fa-linkedin": {
		viewBox: "0 0 448 512",
		path: "M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z",
	},
	"fa-brands fa-instagram": {
		viewBox: "0 0 448 512",
		path: "M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 74.7 33.5 74.7 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z",
	},
	"fa-brands fa-weibo": {
		viewBox: "0 0 512 512",
		path: "M407 177.6c7.6-24-13.4-46.8-37.4-41.7-22 4.8-28.8-28.1-7.1-32.8 50.1-10.9 92.3 37.1 76.5 84.8-6.8 21.2-38.8 10.8-32-10.3zM214.8 446.7C108.5 446.7 0 395.3 0 310.4c0-44.3 28-95.4 76.3-143.7C176 67 279.5 65.8 249.9 161c-4 13.1 12.3 5.7 12.3 6 79.5-33.6 140.5-16.8 114 51.4-3.7 9.4 1.1 10.9 8.3 13.1 135.7 42.3 34.8 215.2-169.7 215.2zm143.7-146.3c-5.4-55.7-78.5-94-163.4-85.7-84.8 8.6-148.8 60.3-143.4 116s78.5 94 163.4 85.7c84.8-8.6 148.8-60.3 143.4-116zM347.9 35.1c-25.9 5.6-16.8 43.7 8.3 38.3 72.3-15.2 134.8 52.8 111.7 124-7.4 24.2 29.1 37 37.4 12 31.9-99.8-55.1-195.9-157.4-174.3zm-78.5 311c-17.1 38.8-66.8 60-109.1 46.3-40.8-13.1-58-53.4-40.3-89.7 17.7-35.4 63.1-55.4 103.4-45.1 42 10.8 63.1 50.2 46 88.5zm-86.3-30c-12.9-5.4-30 .3-38 12.9-8.3 12.9-4.3 28 8.6 34 13.1 6 30.8.3 39.1-12.9 8-13.1 3.7-28.3-9.7-34zm32.6-13.4c-5.1-1.7-11.4.6-14.3 5.4-2.9 5.1-1.4 10.6 3.7 12.9 5.1 2 11.7-.3 14.6-5.4 2.8-5.2 1.1-10.9-4-12.9z",
	},
	"fa-solid fa-rss": {
		viewBox: "0 0 448 512",
		path: "M0 64C0 46.3 14.3 32 32 32c229.8 0 416 186.2 416 416c0 17.7-14.3 32-32 32s-32-14.3-32-32C384 253.6 226.4 96 32 96C14.3 96 0 81.7 0 64zM0 416a64 64 0 1 1 128 0A64 64 0 1 1 0 416zM32 160c159.1 0 288 128.9 288 288c0 17.7-14.3 32-32 32s-32-14.3-32-32c0-123.7-100.3-224-224-224c-17.7 0-32-14.3-32-32s14.3-32 32-32z",
	},
	"fa-solid fa-envelope": {
		viewBox: "0 0 512 512",
		path: "M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48L48 64zM0 176L0 384c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-208L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z",
	},
};

function renderFaIcon(parent: HTMLElement, icon: string): void {
	const brand = FA_BRAND_ICONS[icon];
	if (!brand) return;
	// The dedicated class scopes width/fill to FA paths; it must never apply
	// to Lucide icons, which are stroke-based (fill="none").
	const svg = parent.createSvg("svg", { cls: "vpb-fa-icon", attr: { viewBox: brand.viewBox } });
	svg.createSvg("path", { attr: { d: brand.path, fill: "currentColor" } });
}

/**
 * A lightweight blog-admin form for site_config.yml. All edits stay local to
 * this modal until Save; SiteConfigService handles YAML parsing, validation,
 * unknown-key preservation and external-change conflict detection.
 */
export class SiteConfigModal extends Modal {
	private readonly service: SiteConfigService;
	private activeTab: ConfigTab = "general";
	private config?: SiteConfig;
	private source = "";
	private error: string | null = null;
	private loading = true;
	private saving = false;

	constructor(
		app: App,
		private readonly onSaved: () => void,
	) {
		super(app);
		this.service = new SiteConfigService(app);
	}

	onOpen(): void {
		this.modalEl.addClass("vpb-site-config-modal");
		this.render();
		void this.load();
	}

	onClose(): void {
		this.modalEl.removeClass("vpb-site-config-modal");
		this.contentEl.empty();
	}

	// ------------------------------------------------------------------
	// Lifecycle
	// ------------------------------------------------------------------

	private async load(): Promise<void> {
		try {
			const snapshot = await this.service.load();
			this.config = snapshot.config;
			this.source = snapshot.source;
			this.error = null;
		} catch (error) {
			this.error = errorText(error);
		} finally {
			this.loading = false;
			this.render();
		}
	}

	private render(): void {
		this.contentEl.empty();
		this.contentEl.addClass("vpb-site-config");

		if (this.loading) {
			const loading = this.contentEl.createDiv({ cls: "vpb-config-loading" });
			const icon = loading.createSpan();
			setIcon(icon, "loader-2");
			loading.createSpan({ text: "正在读取站点配置…" });
			return;
		}
		if (!this.config) {
			this.renderFatalError();
			return;
		}

		this.renderHeader();
		this.renderTabs();
		const content = this.contentEl.createDiv({ cls: "vpb-config-content" });
		switch (this.activeTab) {
			case "general":
				this.renderGeneral(content);
				break;
			case "home":
				this.renderHome(content);
				break;
			case "profile":
				this.renderProfile(content);
				break;
			case "navigation":
				this.renderNavigation(content);
				break;
			case "media":
				this.renderMedia(content);
				break;
			case "community":
				this.renderCommunity(content);
				break;
		}
		this.renderFooter();
	}

	private renderHeader(): void {
		const header = this.contentEl.createDiv({ cls: "vpb-config-header" });
		const copy = header.createDiv();
		copy.createEl("h3", { text: "配置站点" });
		copy.createEl("p", { text: "保存后会写入 site_config.yml，发布由 Git 同步完成。" });
		const raw = header.createEl("button", {
			cls: "vpb-icon-button",
			attr: { "aria-label": "打开原始 YAML" },
		});
		setIcon(raw, "file-code-2");
		raw.addEventListener("click", () => {
			void this.openRawConfig();
		});
	}

	private renderTabs(): void {
		const tabs = this.contentEl.createDiv({ cls: "vpb-config-tabs" });
		for (const tab of TABS) {
			const button = tabs.createEl("button", {
				cls: `vpb-config-tab${tab.id === this.activeTab ? " is-active" : ""}`,
				attr: { "aria-label": tab.label },
			});
			setIcon(button, tab.icon);
			button.createSpan({ text: tab.label });
			button.addEventListener("click", () => {
				if (this.activeTab === tab.id) return;
				this.activeTab = tab.id;
				this.error = null;
				this.render();
			});
		}
	}

	private renderFatalError(): void {
		this.contentEl.createEl("h3", { text: "无法读取站点配置" });
		this.contentEl.createEl("div", { text: this.error ?? "未知错误。", cls: "vpb-modal-error" });
		const footer = this.contentEl.createDiv({ cls: "modal-button-container" });
		footer.createEl("button", { text: "重试", cls: "mod-cta" })
			.addEventListener("click", () => {
				this.loading = true;
				this.render();
				void this.load();
			});
		footer.createEl("button", { text: "关闭" }).addEventListener("click", () => this.close());
	}

	private renderFooter(): void {
		if (this.error) {
			this.contentEl.createEl("div", { text: this.error, cls: "vpb-modal-error" });
		}
		const footer = this.contentEl.createDiv({ cls: "modal-button-container vpb-config-footer" });
		footer.createEl("button", { text: "取消", type: "button" })
			.addEventListener("click", () => this.close());
		const save = footer.createEl("button", { text: "保存设置", cls: "mod-cta" });
		save.addEventListener("click", () => {
			void this.save(save);
		});
	}

	private async save(button: HTMLButtonElement): Promise<void> {
		if (!this.config || this.saving) return;
		this.saving = true;
		button.disabled = true;
		button.classList.add("is-pending");
		const loader = button.createSpan({ cls: "vpb-btn-loader" });
		button.insertBefore(loader, button.firstChild);
		setIcon(loader, "loader-2");
		try {
			const snapshot = await this.service.save(this.config, this.source);
			this.source = snapshot.source;
			this.error = null;
			this.onSaved();
			new Notice("站点配置已保存。", 4_000);
			this.close();
		} catch (error) {
			this.error = errorText(error);
			this.saving = false;
			this.render();
			return;
		}
		this.saving = false;
	}

	private async openRawConfig(): Promise<void> {
		const file = this.app.vault.getFileByPath("site_config.yml");
		if (!file) {
			new Notice("请先保存一次站点配置以创建 site_config.yml。", 6_000);
			return;
		}
		await this.app.workspace.getLeaf(false).openFile(file);
	}

	// ------------------------------------------------------------------
	// General / home
	// ------------------------------------------------------------------

	private renderGeneral(container: HTMLElement): void {
		const config = this.requireConfig();
		this.heading(container, "站点信息");
		this.textSetting(container, "站点名称", "浏览器标题和站点主名称。", config.site_name, (value) => {
			config.site_name = value;
		});
		this.textAreaSetting(container, "站点描述", "用于 SEO 描述和分享摘要。", config.site_description, (value) => {
			config.site_description = value;
		});
		this.textSetting(container, "站点域名", "用于 canonical URL 和 sitemap，例如 https://example.com。", config.site_url, (value) => {
			config.site_url = value;
		}, "https://example.com");
		this.dropdownSetting(container, "语言", "页面语言和评论默认语言。", config.lang, {
			"zh-CN": "简体中文",
			"zh-TW": "繁體中文",
			en: "English",
		}, (value) => {
			config.lang = value;
		});
		this.textSetting(container, "作者", "文章与站点的默认作者名。", config.author, (value) => {
			config.author = value;
		});

		this.heading(container, "文章列表");
		this.numberSetting(container, "每页文章数", "首页文章流每页显示的文章数量。", config.pageSize, 1, 100, (value) => {
			config.pageSize = value;
		});
		this.segmentedSetting(container, "排序方式", "首页文章列表的默认排序。", config.sortMethod, [
			{ value: "date", label: "发布日期" },
			{ value: "lastUpdated", label: "最后更新" },
		], (value) => {
			config.sortMethod = value as SiteConfig["sortMethod"];
		});
		this.toggleSetting(container, "显示最后更新时间", "在文章页面显示更新时间。", config.lastUpdated.use, (value) => {
			config.lastUpdated.use = value;
		});

		this.heading(container, "页脚");
		this.textSetting(container, "页脚文案", "页脚第一行文本。", config.footer.message, (value) => {
			config.footer.message = value;
		});
		this.textSetting(container, "版权文案", "页脚第二行文本。", config.footer.copyright, (value) => {
			config.footer.copyright = value;
		});
		this.textSetting(container, "建站日期", "例如 2025-01-01。", config.footer.createdTime, (value) => {
			config.footer.createdTime = value;
		});
	}

	private renderHome(container: HTMLElement): void {
		const config = this.requireConfig();
		this.heading(container, "视觉体验");
		this.assetSetting(container, "背景", "留空使用主题自适应背景；也可填写 HEX 色值或 public/ 资源路径。", config.background, (value) => {
			config.background = value;
		}, true);
		this.toggleSetting(container, "雨滴效果", "在背景上显示轻量雨滴动画。", config.bg_rainfall, (value) => {
			config.bg_rainfall = value;
		});

		this.heading(container, "首页标题");
		this.textSetting(container, "主标题", "首页中央主标题。", config.home.mainTitle, (value) => {
			config.home.mainTitle = value;
		});
		this.stringListSetting(container, "副标题", "首页轮换显示的短句。", config.home.subTitles, (items) => {
			config.home.subTitles = items;
		}, "新增副标题");
	}

	// ------------------------------------------------------------------
	// Profile / navigation
	// ------------------------------------------------------------------

	private renderProfile(container: HTMLElement): void {
		const config = this.requireConfig();
		this.heading(container, "个人资料");
		this.assetSetting(container, "头像", "建议使用 public/ 中的图片，例如 /Avatar.png。", config.avatar, (value) => {
			config.avatar = value;
		});
		this.textSetting(container, "显示名称", "侧栏个人资料卡标题。", config.name, (value) => {
			config.name = value;
		});
		this.textSetting(container, "签名", "显示在个人名称下方。", config.signature, (value) => {
			config.signature = value;
		});
		this.textAreaSetting(container, "简介", "侧栏个人介绍。", config.introduction, (value) => {
			config.introduction = value;
		});

		this.heading(container, "社交链接");
		this.socialLinksSetting(container, config.socialLinks, (items) => {
			config.socialLinks = items;
		});
	}

	private renderNavigation(container: HTMLElement): void {
		const config = this.requireConfig();
		this.heading(container, "导航菜单");
		container.createEl("p", {
			cls: "vpb-config-hint",
			text: "导航栏显示一个顶层菜单入口（图标 + 文字），点击展开子菜单；子菜单项才是实际导航链接。",
		});
		this.menuItemsSetting(container, config.menuItems, (items) => {
			config.menuItems = items;
		});
	}

	// ------------------------------------------------------------------
	// Media / community
	// ------------------------------------------------------------------

	private renderMedia(container: HTMLElement): void {
		const config = this.requireConfig();
		this.heading(container, "导航音乐");
		this.toggleSetting(container, "启用音乐播放器", "在导航栏显示播放器。", config.musicPlayer.enabled, (value) => {
			config.musicPlayer.enabled = value;
		});
		this.assetSetting(container, "音频地址", "支持外链音频地址，或从 public/ 中选择音频。", config.musicPlayer.url, (value) => {
			config.musicPlayer.url = value;
		}, false, "audio");
		this.textSetting(container, "歌曲名称", "播放器显示名称。", config.musicPlayer.name, (value) => {
			config.musicPlayer.name = value;
		});
		this.textSetting(container, "艺术家", "播放器副标题。", config.musicPlayer.artist, (value) => {
			config.musicPlayer.artist = value;
		});
		this.assetSetting(container, "封面", "可选择 public/ 中图片或填写外链。", config.musicPlayer.cover, (value) => {
			config.musicPlayer.cover = value;
		});
		this.toggleSetting(container, "自动播放", "由浏览器策略决定是否实际自动播放。", config.musicPlayer.autoplay, (value) => {
			config.musicPlayer.autoplay = value;
		});
		this.sliderSetting(container, "音量", "默认播放音量。", config.musicPlayer.volume, (value) => {
			config.musicPlayer.volume = value;
		});
	}

	private renderCommunity(container: HTMLElement): void {
		const config = this.requireConfig();
		this.heading(container, "友链");
		this.friendLinksSetting(container, config.friendlink, (items) => {
			config.friendlink = items;
		});

		this.heading(container, "Giscus 评论");
		this.toggleSetting(container, "启用评论", "需要先在 giscus.app 获取仓库和分类标识。", config.comments.enabled, (value) => {
			config.comments.enabled = value;
		});
		this.textSetting(container, "服务地址", "通常保持 https://giscus.app。", config.comments.host, (value) => {
			config.comments.host = value;
		}, "https://giscus.app");
		this.textSetting(container, "仓库", "格式：owner/repository。", config.comments.repo, (value) => {
			config.comments.repo = value;
		});
		this.textSetting(container, "仓库 ID", "Giscus repo-id。", config.comments.repoId, (value) => {
			config.comments.repoId = value;
		});
		this.textSetting(container, "分类", "例如 Announcements。", config.comments.category, (value) => {
			config.comments.category = value;
		});
		this.textSetting(container, "分类 ID", "Giscus category-id。", config.comments.categoryId, (value) => {
			config.comments.categoryId = value;
		});
		this.dropdownSetting(container, "映射方式", "页面与讨论串的映射策略。", config.comments.mapping, {
			title: "标题",
			pathname: "路径",
			url: "完整 URL",
			ogTitle: "OG 标题",
		}, (value) => {
			config.comments.mapping = value;
		});
		this.toggleSetting(container, "严格映射", "只匹配完全一致的页面映射。", config.comments.strict === "1", (value) => {
			config.comments.strict = value ? "1" : "0";
		});
		this.toggleSetting(container, "显示反应", "在评论区显示 GitHub 反应。", config.comments.reactionsEnabled === "1", (value) => {
			config.comments.reactionsEnabled = value ? "1" : "0";
		});
		this.toggleSetting(container, "输出元数据", "让 Giscus 向页面发送 discussion metadata。", config.comments.emitMetadata === "1", (value) => {
			config.comments.emitMetadata = value ? "1" : "0";
		});
		this.dropdownSetting(container, "输入框位置", "新评论输入框显示的位置。", config.comments.inputPosition, {
			top: "顶部",
			bottom: "底部",
		}, (value) => {
			config.comments.inputPosition = value;
		});
		this.dropdownSetting(container, "评论主题", "跟随站点或固定评论区主题。", config.comments.theme, {
			preferred_color_scheme: "跟随系统",
			light: "浅色",
			dark: "深色",
		}, (value) => {
			config.comments.theme = value;
		});
		this.dropdownSetting(container, "评论语言", "Giscus 界面语言。", config.comments.lang, {
			"zh-CN": "简体中文",
			"zh-TW": "繁體中文",
			en: "English",
		}, (value) => {
			config.comments.lang = value;
		});
		this.dropdownSetting(container, "加载方式", "lazy 可延后加载评论区。", config.comments.loading, {
			lazy: "延后加载",
			eager: "立即加载",
		}, (value) => {
			config.comments.loading = value;
		});
	}

	// ------------------------------------------------------------------
	// Field helpers
	// ------------------------------------------------------------------

	private heading(container: HTMLElement, text: string): void {
		container.createEl("h4", { text, cls: "vpb-config-heading" });
	}

	private textSetting(
		container: HTMLElement,
		name: string,
		desc: string,
		value: string,
		onChange: (value: string) => void,
		placeholder = "",
	): void {
		new Setting(container)
			.setName(name)
			.setDesc(desc)
			.addText((text) => {
				text.setValue(value);
				if (placeholder) text.setPlaceholder(placeholder);
				text.onChange(onChange);
			});
	}

	private textAreaSetting(
		container: HTMLElement,
		name: string,
		desc: string,
		value: string,
		onChange: (value: string) => void,
	): void {
		new Setting(container)
			.setName(name)
			.setDesc(desc)
			.addTextArea((text) => {
				text.setValue(value);
				text.inputEl.rows = 3;
				text.onChange(onChange);
			});
	}

	private numberSetting(
		container: HTMLElement,
		name: string,
		desc: string,
		value: number,
		minimum: number,
		maximum: number,
		onChange: (value: number) => void,
	): void {
		new Setting(container)
			.setName(name)
			.setDesc(desc)
			.addText((text) => {
				text.inputEl.type = "number";
				text.inputEl.min = String(minimum);
				text.inputEl.max = String(maximum);
				text.setValue(String(value));
				text.onChange((next) => {
					const number = Number(next);
					if (Number.isInteger(number) && number >= minimum && number <= maximum) {
						onChange(number);
					}
				});
			});
	}

	private toggleSetting(
		container: HTMLElement,
		name: string,
		desc: string,
		value: boolean,
		onChange: (value: boolean) => void,
	): void {
		new Setting(container)
			.setName(name)
			.setDesc(desc)
			.addToggle((toggle) => {
				toggle.setValue(value);
				toggle.onChange(onChange);
			});
	}

	private dropdownSetting(
		container: HTMLElement,
		name: string,
		desc: string,
		value: string,
		options: Record<string, string>,
		onChange: (value: string) => void,
	): void {
		new Setting(container)
			.setName(name)
			.setDesc(desc)
			.addDropdown((dropdown) => {
				dropdown.addOptions(options);
				dropdown.setValue(value in options ? value : Object.keys(options)[0]);
				dropdown.onChange(onChange);
			});
	}

	private segmentedSetting(
		container: HTMLElement,
		name: string,
		desc: string,
		value: string,
		options: { value: string; label: string }[],
		onChange: (value: string) => void,
	): void {
		const setting = new Setting(container).setName(name).setDesc(desc);
		const segment = setting.controlEl.createDiv({ cls: "vpb-segmented" });
		for (const option of options) {
			const button = segment.createEl("button", {
				text: option.label,
				cls: option.value === value ? "is-active" : "",
			});
			button.addEventListener("click", () => {
				onChange(option.value);
				segment.querySelectorAll("button").forEach((item) => {
					item.classList.toggle("is-active", item === button);
				});
			});
		}
	}

	private sliderSetting(
		container: HTMLElement,
		name: string,
		desc: string,
		value: number,
		onChange: (value: number) => void,
	): void {
		new Setting(container)
			.setName(name)
			.setDesc(desc)
			.addSlider((slider) => {
				slider.setLimits(0, 1, 0.1);
				slider.setDisplayFormat((next) => `${Math.round(next * 100)}%`);
				slider.setValue(value);
				slider.onChange(onChange);
			});
	}

	private assetSetting(
		container: HTMLElement,
		name: string,
		desc: string,
		value: string,
		onChange: (value: string) => void,
		allowColor = false,
		kind: "image" | "audio" = "image",
	): void {
		const setting = new Setting(container)
			.setName(name)
			.setDesc(desc)
			.addText((text) => {
				text.setValue(value);
				text.setPlaceholder(kind === "image"
					? (allowColor ? "#1e293b 或 /image/background.webp" : "/image/avatar.png")
					: "/music/song.mp3");
				text.onChange(onChange);
			})
			.addExtraButton((button) => {
				button.setIcon(kind === "image" ? "image" : "music");
				button.setTooltip(kind === "image" ? "从 public/ 选择图片" : "从 public/ 选择音频");
				button.onClick(() => {
					void this.chooseAsset(kind, (asset) => {
						onChange(asset);
						const input = setting.controlEl.querySelector<HTMLInputElement>("input");
						if (input) input.value = asset;
					});
				});
			});
	}

	// ------------------------------------------------------------------
	// Editable lists
	// ------------------------------------------------------------------

	private stringListSetting(
		container: HTMLElement,
		name: string,
		desc: string,
		items: string[],
		onChange: (items: string[]) => void,
		addLabel: string,
	): void {
		const section = this.listSection(container, name, desc);
		const list = section.createDiv({ cls: "vpb-config-list" });
		const render = (): void => {
			list.empty();
			items.forEach((item, index) => {
				const row = list.createDiv({ cls: "vpb-list-row" });
				const input = row.createEl("input", { type: "text", value: item });
				input.addEventListener("input", () => {
					items[index] = input.value;
					onChange([...items]);
				});
				this.rowButtons(row, index, items.length, () => {
					items.splice(index, 1);
					onChange([...items]);
					render();
				}, () => {
					move(items, index, -1);
					onChange([...items]);
					render();
				}, () => {
					move(items, index, 1);
					onChange([...items]);
					render();
				});
			});
		};
		render();
		this.addListButton(section, addLabel, () => {
			items.push("");
			onChange([...items]);
			render();
		});
	}

	private socialLinksSetting(
		container: HTMLElement,
		items: SocialLink[],
		onChange: (items: SocialLink[]) => void,
	): void {
		const section = this.listSection(container, "社交链接", "显示在侧栏资料卡中的外部链接。");
		const list = section.createDiv({ cls: "vpb-config-list" });
		const render = (): void => {
			list.empty();
			items.forEach((item, index) => {
				const row = list.createDiv({ cls: "vpb-config-record" });
				this.recordText(row, "名称", item.name, (value) => { item.name = value; onChange([...items]); });
				this.recordIcon(row, "图标", item.icon, (value) => { item.icon = value || "link"; onChange([...items]); });
				this.recordText(row, "自定义图标", item.iconUrl ?? "", (value) => { item.iconUrl = value || undefined; onChange([...items]); }, "/image/github.svg");
				this.recordText(row, "链接", item.url, (value) => { item.url = value; onChange([...items]); }, "https://...");
				this.rowButtons(row, index, items.length, () => {
					items.splice(index, 1);
					onChange([...items]);
					render();
				}, () => { move(items, index, -1); onChange([...items]); render(); }, () => { move(items, index, 1); onChange([...items]); render(); });
			});
		};
		render();
		this.addListButton(section, "新增社交链接", () => {
			items.push({ name: "", icon: "link", url: "" });
			onChange([...items]);
			render();
		});
	}

	private friendLinksSetting(
		container: HTMLElement,
		items: FriendLink[],
		onChange: (items: FriendLink[]) => void,
	): void {
		const section = this.listSection(container, "友链列表", "友链页面读取这组数据。", "vpb-config-list-section");
		const list = section.createDiv({ cls: "vpb-config-list" });
		const render = (): void => {
			list.empty();
			items.forEach((item, index) => {
				const row = list.createDiv({ cls: "vpb-config-record" });
				this.recordText(row, "名称", item.Name, (value) => { item.Name = value; onChange([...items]); });
				this.recordText(row, "链接", item.Url, (value) => { item.Url = value; onChange([...items]); }, "https://...");
				this.recordText(row, "头像", item.Avatar, (value) => { item.Avatar = value; onChange([...items]); });
				this.recordText(row, "简介", item.Desc, (value) => { item.Desc = value; onChange([...items]); });
				this.rowButtons(row, index, items.length, () => {
					items.splice(index, 1);
					onChange([...items]);
					render();
				}, () => { move(items, index, -1); onChange([...items]); render(); }, () => { move(items, index, 1); onChange([...items]); render(); });
			});
		};
		render();
		this.addListButton(section, "新增友链", () => {
			items.push({ Name: "", Url: "", Avatar: "", Desc: "" });
			onChange([...items]);
			render();
		});
	}

	private menuItemsSetting(
		container: HTMLElement,
		items: MenuItem[],
		onChange: (items: MenuItem[]) => void,
	): void {
		const notify = (): void => onChange([...items]);
		const render = (): void => {
			container.empty();

			// Top level: exactly one menu container (icon + text, no link).
			const topSection = this.listSection(
				container,
				"顶层菜单",
				"最上层只能有一个菜单入口，不配置链接。",
			);
			if (items.length === 0) {
				this.addListButton(topSection, "新增导航菜单", () => {
					items.push(newMenuItem(items, true));
					notify();
					render();
				});
				return;
			}

			const item = items[0];
			const topRow = topSection.createDiv({ cls: "vpb-config-record" });
			this.recordText(topRow, "名称", item.label, (value) => { item.label = value; notify(); });
			this.recordIcon(topRow, "图标", item.icon ?? "", (value) => { item.icon = value || undefined; notify(); });
			const topActions = topRow.createDiv({ cls: "vpb-record-actions" });
			this.smallButton(topActions, "删除顶层菜单", "trash-2", () => {
				items.splice(0, 1);
				notify();
				render();
			}, false, true);

			// Second level: the actual navigation links.
			const children = (item.children ??= []);
			const listSection = this.listSection(
				container,
				"子菜单项",
				"点击顶层菜单后展开的导航链接，每项配置图标、文字和链接。",
			);
			const list = listSection.createDiv({ cls: "vpb-config-list" });
			const renderChildren = (): void => {
				list.empty();
				children.forEach((child, index) => {
					const row = list.createDiv({ cls: "vpb-config-record" });
					this.recordText(row, "名称", child.label, (value) => { child.label = value; notify(); });
					this.recordIcon(row, "图标", child.icon ?? "", (value) => { child.icon = value || undefined; notify(); });
					this.recordText(row, "链接", child.link ?? "", (value) => { child.link = value || undefined; notify(); }, "/FriendLink/ 或 https://...");
					this.rowButtons(row, index, children.length, () => {
						children.splice(index, 1);
						notify();
						renderChildren();
					}, () => { move(children, index, -1); notify(); renderChildren(); }, () => { move(children, index, 1); notify(); renderChildren(); });
				});
			};
			renderChildren();
			this.addListButton(listSection, "新增导航项", () => {
				// Pass the whole tree so generated keys stay unique across levels.
				children.push(newMenuItem(items));
				notify();
				renderChildren();
			});
		};
		render();
	}

	private listSection(container: HTMLElement, name: string, desc: string, cls = ""): HTMLElement {
		const section = container.createDiv({ cls: `vpb-list-section ${cls}`.trim() });
		section.createEl("h5", { text: name });
		section.createEl("p", { text: desc, cls: "vpb-config-hint" });
		return section;
	}

	private addListButton(container: HTMLElement, label: string, onClick: () => void): void {
		const button = container.createEl("button", { text: label, cls: "vpb-list-add" });
		button.addEventListener("click", onClick);
	}

	private rowButtons(
		container: HTMLElement,
		index: number,
		length: number,
		onRemove: () => void,
		onUp: () => void,
		onDown: () => void,
	): void {
		const actions = container.createDiv({ cls: "vpb-record-actions" });
		this.smallButton(actions, "上移", "arrow-up", onUp, index === 0);
		this.smallButton(actions, "下移", "arrow-down", onDown, index === length - 1);
		this.smallButton(actions, "删除", "trash-2", onRemove, false, true);
	}

	private smallButton(
		container: HTMLElement,
		label: string,
		icon: string,
		onClick: () => void,
		disabled = false,
		warning = false,
	): void {
		const button = container.createEl("button", {
			cls: `vpb-icon-button${warning ? " is-warning" : ""}`,
			attr: { "aria-label": label },
		});
		button.disabled = disabled;
		setIcon(button, icon);
		button.addEventListener("click", onClick);
	}

	private recordIcon(
		container: HTMLElement,
		label: string,
		value: string,
		onChange: (value: string) => void,
	): void {
		const field = container.createDiv({ cls: "vpb-record-field" });
		field.createEl("label", { text: label });
		const picker = field.createDiv({ cls: "vpb-icon-picker" });
		const preview = picker.createEl("button", {
			cls: "vpb-icon-preview",
			attr: { "aria-label": "选择图标" },
		});
		const render = (): void => {
			preview.empty();
			if (!value) {
				preview.setText("选择图标");
			} else if (value.startsWith("fa-")) {
				renderFaIcon(preview, value);
			} else {
				setIcon(preview, value);
			}
		};
		render();
		preview.addEventListener("click", () => {
			void this.chooseIcon((icon) => {
				value = icon;
				onChange(icon);
				render();
			});
		});
		const clear = picker.createEl("button", {
			cls: "vpb-icon-clear",
			attr: { "aria-label": "清除图标" },
		});
		setIcon(clear, "trash-2");
		clear.addEventListener("click", () => {
			value = "";
			onChange("");
			render();
		});
	}

	private chooseIcon(onChoose: (icon: string) => void): void {
		new IconSuggestModal(this.app, onChoose).open();
	}

	private recordText(
		container: HTMLElement,
		label: string,
		value: string,
		onChange: (value: string) => void,
		placeholder = "",
	): void {
		const field = container.createDiv({ cls: "vpb-record-field" });
		field.createEl("label", { text: label });
		const input = field.createEl("input", { type: "text", value });
		if (placeholder) input.placeholder = placeholder;
		input.addEventListener("input", () => onChange(input.value));
	}

	private async chooseAsset(kind: "image" | "audio", onChoose: (path: string) => void): Promise<void> {
		const assets = await this.service.listPublicAssets(kind);
		if (assets.length === 0) {
			new Notice(kind === "image" ? "public/ 目录中没有可选图片。" : "public/ 目录中没有可选音频。", 5_000);
			return;
		}
		new AssetSuggestModal(this.app, assets, onChoose).open();
	}

	private requireConfig(): SiteConfig {
		if (!this.config) throw new Error("站点配置尚未加载。");
		return this.config;
	}
}

class AssetSuggestModal extends FuzzySuggestModal<string> {
	constructor(
		app: App,
		private readonly assets: string[],
		private readonly onChoose: (path: string) => void,
	) {
		super(app);
		this.setPlaceholder("搜索 public/ 中的图片");
	}

	getItems(): string[] {
		return this.assets;
	}

	getItemText(item: string): string {
		return item;
	}

	onChooseItem(item: string): void {
		this.onChoose(item);
	}
}

/**
 * Visual icon picker: searchable Lucide grid with live previews plus a
 * Font Awesome brand section, and a custom-name fallback for power users.
 */
class IconSuggestModal extends Modal {
	private searchInput?: HTMLInputElement;

	constructor(
		app: App,
		private readonly onChoose: (icon: string) => void,
	) {
		super(app);
	}

	onOpen(): void {
		this.modalEl.addClass("vpb-icon-modal");
		this.contentEl.empty();
		this.contentEl.createEl("h3", { text: "选择图标" });

		const search = this.contentEl.createEl("input", {
			type: "text",
			attr: { placeholder: "搜索图标名称…" },
		});
		search.addEventListener("input", () => this.renderGrid());
		this.searchInput = search;

		const custom = this.contentEl.createDiv({ cls: "vpb-icon-custom" });
		const customInput = custom.createEl("input", {
			type: "text",
			attr: { placeholder: "或输入自定义图标名称" },
		});
		const ok = custom.createEl("button", { text: "确定", cls: "mod-cta" });
		ok.addEventListener("click", () => {
			const value = customInput.value.trim();
			if (value) {
				this.onChoose(value);
				this.close();
			}
		});

		this.renderGrid();
		window.setTimeout(() => search.focus(), 0);
	}

	onClose(): void {
		this.modalEl.removeClass("vpb-icon-modal");
		this.contentEl.empty();
	}

	private renderGrid(): void {
		const query = (this.searchInput?.value ?? "").trim().toLowerCase();
		this.contentEl.querySelector(".vpb-icon-grid")?.remove();
		const grid = this.contentEl.createDiv({ cls: "vpb-icon-grid" });

		const addSection = (title: string, icons: string[]): void => {
			const filtered = query
				? icons.filter((name) => name.toLowerCase().includes(query))
				: icons;
			if (filtered.length === 0) return;

			grid.createEl("h5", { text: title });
			const row = grid.createDiv({ cls: "vpb-icon-grid-row" });
			for (const icon of filtered) {
				const button = row.createEl("button", {
					cls: "vpb-icon-item",
					attr: { "aria-label": icon },
				});
				if (icon.startsWith("fa-")) {
					renderFaIcon(button, icon);
				} else {
					setIcon(button, icon);
				}
				button.addEventListener("click", () => {
					this.onChoose(icon);
					this.close();
				});
			}
		};

		addSection("Lucide", LUCIDE_ICON_NAMES);
		addSection("Font Awesome", FONT_AWESOME_ICON_NAMES);
	}
}

function move<T>(items: T[], from: number, direction: -1 | 1): void {
	const to = from + direction;
	if (to < 0 || to >= items.length) return;
	[items[from], items[to]] = [items[to], items[from]];
}

/**
 * Creates a menu item whose key is unique across the whole navigation tree
 * (top-level container and every child level), not just its siblings.
 */
function newMenuItem(tree: MenuItem[], isContainer = false): MenuItem {
	const keys = collectMenuKeys(tree);
	const base = "menu";
	let index = 1;
	let key = `${base}-${index}`;
	while (keys.has(key)) {
		index += 1;
		key = `${base}-${index}`;
	}
	return isContainer
		? { key, label: "新菜单", icon: "circle", children: [] }
		: { key, label: "新导航", icon: "link", link: "/" };
}

function collectMenuKeys(items: MenuItem[]): Set<string> {
	const keys = new Set<string>();
	const visit = (list: MenuItem[]): void => {
		for (const item of list) {
			keys.add(item.key);
			if (item.children?.length) {
				visit(item.children);
			}
		}
	};
	visit(items);
	return keys;
}
