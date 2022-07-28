import {
  AccentColor,
  AccentColorPreset,
  baseSeaportTheme,
  SeaportThemeOptions,
} from './baseSeaportTheme'

const accentColors: Record<AccentColorPreset, AccentColor> = {
  blue: { accentColor: '#0FAEFA', accentColorText: '#FFF', accentColorHover: '#3FBEFB' },
  green: { accentColor: '#38FA0F', accentColorText: '#FFF', accentColorHover: '#60FB3F' },
  orange: { accentColor: '#FA5B0F', accentColorText: '#FFF', accentColorHover: '#FB7C3F' },
  pink: { accentColor: '#D10FFA', accentColorText: '#FFF', accentColorHover: '#DA3FFB' }
}

const defaultAccentColor = accentColors.orange

export const lightSeaportTheme = ({
  accentColor = defaultAccentColor.accentColor,
  accentColorText = defaultAccentColor.accentColorText,
  accentColorHover = defaultAccentColor.accentColorHover,
  ...baseSeaportThemeOptions
}: SeaportThemeOptions = {}) => ({
  ...baseSeaportTheme(baseSeaportThemeOptions),
  colors: {
    accentColor,
    accentColorText,
    accentColorHover,
    actionButtonBorder: 'rgba(0, 0, 0, 0.04)',
    actionButtonBorderMobile: 'rgba(0, 0, 0, 0.06)',
    actionButtonSecondaryBackground: 'rgba(0, 0, 0, 0.06)',
    box: 'rgb(229, 232, 235)',
    boxText: 'rgb(112, 122, 131)',
    black: '#000000',
    buttonBackgroundHover: '#eeeeee',
    buttonBorderHover: '#a7a7a7',
    closeButton: 'rgba(60, 66, 66, 0.8)',
    closeButtonBackground: 'rgba(0, 0, 0, 0.06)',
    defaultBackground: '#FFFFFF',
    defaultBackgroundBorder: '#D6D6D6',
    defaultText: 'rgb(53, 56, 64)',
    defaultTextHover: 'rgb(0, 0, 0)',
    defaultTextPlaceholder: 'rgb(138, 147, 155)',
    error: '#FF494A',
    modalBackdrop: 'rgba(0, 0, 0, 0.3)',
    modalBackground: '#FFF',
    modalBorder: 'transparent',
    orderAction: '#FA5B0F',
    orderBackground: '#FFFFFF',
    profileForeground: 'rgba(60, 66, 66, 0.06)',
    profileTop: '#d6d6d6',
    profileTopHover: 'rgba(0, 0, 0, 0.2)',
    transparent: 'transparent',
    white: '#ffffff'
  },
  shadows: {
    box: 'rgba(0, 0, 0, 0.08) 0px 4px 15px',
    boxHover: 'rgba(0, 0, 0, 0.15) 0px 6px 25px',
    default: '10px 10px 20px #cacaca, -10px -10px 20px #ffffff',
    dialog: '0px 8px 32px rgba(0, 0, 0, 0.32)',
    header: 'rgba(4, 17, 29, 0.25) 0px 0px 8px 0px',
    none: 'none !important',
    subHeader: 'rgba(0, 0, 0, 0.1) 0px 2px 10px'
  },
})

lightSeaportTheme.accentColors = accentColors