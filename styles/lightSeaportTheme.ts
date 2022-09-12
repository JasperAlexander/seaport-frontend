import {
  AccentColor,
  AccentColorPreset,
  baseSeaportTheme,
  SeaportThemeOptions,
} from './baseSeaportTheme'

const ACCENT_COLOR = process.env.NEXT_PUBLIC_ACCENT_COLOR

const accentColors: Record<AccentColorPreset, AccentColor> = {
  blue: { 
    accentColor: '#0FAEFA', 
    accentColorText: '#FFF', 
    accentColorHover: '#3FBEFB',
    accentColorHoverHover: '#FC8C57'
  },
  green: { 
    accentColor: '#38FA0F', 
    accentColorText: '#FFF', 
    accentColorHover: '#60FB3F',
    accentColorHoverHover: '#FC8C57'
  },
  orange: { 
    accentColor: '#FA5B0F', 
    accentColorText: '#FFF', 
    accentColorHover: '#FB7C3F',
    accentColorHoverHover: '#FC8C57'
  },
  pink: { 
    accentColor: '#D10FFA', 
    accentColorText: '#FFF', 
    accentColorHover: '#DA3FFB',
    accentColorHoverHover: '#FC8C57'
  }
}

const defaultAccentColor = accentColors.orange

export const lightSeaportTheme = ({
  accentColor = defaultAccentColor.accentColor,
  accentColorText = defaultAccentColor.accentColorText,
  accentColorHover = defaultAccentColor.accentColorHover,
  accentColorHoverHover = defaultAccentColor.accentColorHoverHover,
  ...baseSeaportThemeOptions
}: SeaportThemeOptions = {}) => ({
  ...baseSeaportTheme(baseSeaportThemeOptions),
  colors: {
    accentColor,
    accentColorText,
    accentColorHover,
    accentColorHoverHover,

    actionButtonBorder: 'rgba(0, 0, 0, 0.04)',
    actionButtonBorderMobile: 'rgba(0, 0, 0, 0.06)',
    actionButtonSecondaryBackground: 'rgba(0, 0, 0, 0.06)',

    box: 'rgb(229, 232, 235)',
    boxText: 'rgb(112, 122, 131)',

    accordionBackground: 'rgb(255, 253, 251)', // Based on orange accentColor
    tabBackground: 'rgb(254, 248, 243)', // Based on orange accentColor

    black: '#000000',
    white: '#ffffff',
    transparent: 'transparent',

    buttonBackgroundHover: '#eeeeee',
    buttonBackgroundActive: 'rgba(229, 232, 235, 0.4)',
    buttonBorderHover: '#a7a7a7',
    closeButton: 'rgba(60, 66, 66, 0.8)',
    closeButtonBackground: 'rgba(0, 0, 0, 0.06)',

    defaultBackground: '#FFFFFF',
    defaultBackgroundShadow: 'rgba(0, 0, 0, 0.15)',
    defaultBackgroundBorder: '#D6D6D6',
    defaultText: 'rgb(53, 56, 64)',
    defaultTextHover: 'rgb(0, 0, 0)',
    defaultTextPlaceholder: 'rgb(138, 147, 155)',
    defaultTextPlaceholderHover: 'rgb(76, 80, 92)',

    error: '#FF494A',
    
    filterHover: 'rgba(229, 232, 235, 0.2) none repeat scroll 0% 0%',

    modalBackdrop: 'rgba(0, 0, 0, 0.3)',
    modalBackground: '#FFF',
    modalBorder: 'transparent',

    orderAction: '#FA5B0F',
    orderBackground: '#FFFFFF',

    profileTop: '#d6d6d6',
    profileTopHover: 'rgba(0, 0, 0, 0.2)',

    twitter: '#1DA1F2'
  },
  shadows: {
    default: '10px 10px 20px #cacaca, -10px -10px 20px #ffffff',
    none: 'none !important',

    box: 'rgba(0, 0, 0, 0.08) 0px 4px 15px',
    boxHover: 'rgba(0, 0, 0, 0.15) 0px 6px 25px',

    inputHover: 'rgba(0, 0, 0, 0.05) 0px 2px 10px',

    dialog: '0px 8px 32px rgba(0, 0, 0, 0.32)',
    dropdown: 'rgba(0, 0, 0, 0.16) 0px 4px 16px',

    header: 'rgba(4, 17, 29, 0.25) 0px 0px 8px 0px',
    subHeader: 'rgba(0, 0, 0, 0.1) 0px 2px 10px',

    featuredCard: 'rgba(4, 17, 29, 0.25) 0px 0px 10px 0px',
    featuredCardHover: 'rgba(4, 17, 29, 0.25) 0px 0px 50px 0px'
  }
})

lightSeaportTheme.accentColors = accentColors