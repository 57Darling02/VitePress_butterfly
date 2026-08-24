import type { Plugin } from 'vite'
import type ThemeConfig from '../types/ThemeConfig'
import { isFontAwesomeIcon } from './fontAwesome'

const VIRTUAL_MODULE_ID = 'virtual:theme-icons'
const RESOLVED_VIRTUAL_MODULE_ID = `\0${VIRTUAL_MODULE_ID}`

const builtInIconNames = [
  'activity',
  'arrow-right',
  'book',
  'book-open',
  'calendar-clock',
  'chevron-down',
  'chevron-right',
  'chevron-up',
  'circle-alert',
  'circle-check',
  'circle-help',
  'crosshair',
  'disc-3',
  'eye',
  'file-text',
  'folder',
  'folder-open',
  'folder-tree',
  'hash',
  'house',
  'link',
  'map-pin',
  'moon',
  'panel-left-close',
  'panel-left-open',
  'pen-line',
  'search',
  'share-2',
  'sun',
  'sun-moon',
  'tags',
  'upload',
  'user',
]

type IconCarrier = {
  children?: unknown
  icon?: unknown
  iconUrl?: unknown
}

export function createThemeIconPlugin(config: ThemeConfig): Plugin {
  let source: Promise<string> | undefined

  return {
    name: 'theme-icons',
    resolveId(id) {
      return id === VIRTUAL_MODULE_ID ? RESOLVED_VIRTUAL_MODULE_ID : null
    },
    load(id) {
      if (id !== RESOLVED_VIRTUAL_MODULE_ID) return null
      source ??= createVirtualModuleSource(config)
      return source
    },
  }
}

async function createVirtualModuleSource(config: ThemeConfig) {
  const names = new Set(builtInIconNames)
  collectConfiguredIcons(config.socialLinks, names)
  collectConfiguredIcons(config.menuItems, names, true)

  const lucide = await import('@lucide/vue') as Record<string, unknown>
  const sortedNames = [...names].sort()
  const imports = sortedNames.map((name, index) => {
    const exportName = toPascalCase(name)
    if (!(exportName in lucide)) {
      throw new Error(`[Theme Icons] "${name}" is not a valid Lucide icon name. Use a kebab-case name from https://lucide.nodejs.cn/icons/.`)
    }
    return { exportName, localName: `Icon${index}`, name }
  })

  return [
    `import { ${imports.map(({ exportName, localName }) => `${exportName} as ${localName}`).join(', ')} } from '@lucide/vue'`,
    `export const iconRegistry = { ${imports.map(({ localName, name }) => `'${name}': ${localName}`).join(', ')} }`,
  ].join('\n')
}

function collectConfiguredIcons(value: unknown, names: Set<string>, includeChildren = false) {
  if (!Array.isArray(value)) return

  value.forEach((item) => {
    if (!isIconCarrier(item)) return
    if (typeof item.icon === 'string' && !item.iconUrl && !isFontAwesomeIcon(item.icon)) {
      names.add(item.icon)
    }
    if (includeChildren) collectConfiguredIcons(item.children, names)
  })
}

function isIconCarrier(value: unknown): value is IconCarrier {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value)
}

function toPascalCase(name: string) {
  return name.split('-').map((part) => part ? `${part[0].toUpperCase()}${part.slice(1)}` : '').join('')
}
