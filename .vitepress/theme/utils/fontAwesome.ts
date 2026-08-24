import type ThemeConfig from '../types/ThemeConfig'

export const fontAwesomeStylesheet = {
  href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.3.0/css/all.min.css',
  integrity: 'sha512-ApSLB1Pd3/bZN8fWB/RG9YhN/7bd9Hkf3AGaE2mPfebjrxagjuBtx2GcgdqIlJkUzwylBo61r9Xa9NmgBI0swA==',
}

export function isFontAwesomeIcon(value: unknown): value is string {
  return typeof value === 'string' && value.trim().startsWith('fa-')
}

export function hasFontAwesomeIcons(config: Pick<ThemeConfig, 'menuItems' | 'socialLinks'>): boolean {
  return config.socialLinks.some((link) => isFontAwesomeIcon(link.icon))
    || config.menuItems.some((item) => (
      isFontAwesomeIcon(item.icon)
      || item.children?.some((child) => isFontAwesomeIcon(child.icon))
    ))
}
