import { ThemeVars } from './sprinkles.css'

// Source: https://css-tricks.com/snippets/css/system-font-stack
// Note that quotes have been removed to avoid escaping and server/client mismatch issues
const systemFontStack =
  '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"'
const fontStacks = {
  rounded: `SFRounded, ui-rounded, "SF Pro Rounded", ${systemFontStack}`,
  system: systemFontStack
} as const
type FontStack = keyof typeof fontStacks

interface BaseSeaportThemeOptions {
  fontStack?: FontStack
}

export const baseSeaportTheme = ({
  fontStack = 'rounded'
}: BaseSeaportThemeOptions): Pick<ThemeVars, 'fonts'> => ({
  fonts: {
    body: fontStacks[fontStack]
  }
})

export interface AccentColor {
  accentColor: string
  accentColorText: string
  accentColorHover: string
  accentColorHoverHover: string
}

export type AccentColorPreset =
  | 'blue'
  | 'green'
  | 'pink'
  | 'orange'

export interface SeaportThemeOptions extends BaseSeaportThemeOptions {
  accentColor?: string
  accentColorText?: string
  accentColorHover?: string
  accentColorHoverHover?: string
}