export const DEFAULT_POST_CATEGORY = '未分类'

export function getPostFolder(filePath?: string): string {
    if (!filePath) return ''

    const relativePath = filePath
        .replace(/\\/g, '/')
        .replace(/^\/+/, '')
        .replace(/^posts\//, '')

    const parts = relativePath.split('/').filter(Boolean)
    if (parts.length <= 1) return ''

    parts.pop()
    return parts.join('/')
}

export function getPostCategory(filePath?: string): string {
    return getPostFolder(filePath) || DEFAULT_POST_CATEGORY
}
