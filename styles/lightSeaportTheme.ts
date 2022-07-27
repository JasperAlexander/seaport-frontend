import {
  AccentColor,
  AccentColorPreset,
  baseSeaportTheme,
  SeaportThemeOptions,
} from './baseSeaportTheme'

const accentColors: Record<AccentColorPreset, AccentColor> = {
  blue: { accentColor: '#0FAEFA', accentColorText: '#FFF', accentColorHover: '' },
  green: { accentColor: '#70FA02', accentColorText: '#FFF', accentColorHover: '' },
  orange: { accentColor: '#FA5B0F', accentColorText: '#FFF', accentColorHover: '#FB7C3F' },
  pink: { accentColor: '#EB28FA', accentColorText: '#FFF', accentColorHover: '' },
  red: { accentColor: '#FA541B', accentColorText: '#FFF', accentColorHover: '' },
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
    closeButton: 'rgba(60, 66, 66, 0.8)',
    closeButtonBackground: 'rgba(0, 0, 0, 0.06)',
    // defaultBackground: '#EEEEEE',
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
    transparent: 'transparent',

    alpha100: 'rgba(0, 0, 0, 0.02)',
    alpha200: 'rgba(0, 0, 0, 0.04)',
    alpha300: 'rgba(0, 0, 0, 0.06)',
    alpha400: 'rgba(0, 0, 0, 0.08)',
    alpha500: 'rgba(0, 0, 0, 0.1)',
    alpha600: 'rgba(0, 0, 0, 0.2)',
    alpha700: 'rgba(0, 0, 0, 0.4)',
    alpha800: 'rgba(0, 0, 0, 0.6)',
    alpha900: 'rgba(0, 0, 0, 0.8)',

    black: '#000000',

    lightgray100: '#8f8f8f',
    lightgray200: '#a7a7a7',
    lightgray300: '#bebebe',
    lightgray400: '#d6d6d6',
    lightgray500: '#eeeeee',
    lightgray600: '#f0f0f0',
    lightgray700: '#f1f1f1',
    lightgray800: '#f3f3f3',
    lightgray900: '#f5f5f5',
    
    white: '#ffffff',

    orange100: '#9c3503',
    orange200: '#b63d04',
    orange300: '#d04604',
    orange400: '#ea4f05',
    orange500: '#FA5B0F',
    orange600: '#fb6b27',
    orange700: '#fb7c3f',
    orange800: '#fc8c57',
    orange900: '#fc9d6f',

  },
  shadows: {
    box: 'rgba(0, 0, 0, 0.08) 0px 4px 15px',
    boxHover: 'rgba(0, 0, 0, 0.15) 0px 6px 25px',
    default: '10px 10px 20px #cacaca, -10px -10px 20px #ffffff',
    header: 'rgba(4, 17, 29, 0.25) 0px 0px 8px 0px',
    subHeader: 'rgba(0, 0, 0, 0.1) 0px 2px 10px',
    dialog: '0px 8px 32px rgba(0, 0, 0, 0.32)',
    none: 'none !important'
  },
})

lightSeaportTheme.accentColors = accentColors