/* eslint-disable sort-keys-fix/sort-keys-fix */
import { createGlobalThemeContract } from '@vanilla-extract/css'
import {
  createMapValueFn,
  createNormalizeValueFn,
  createSprinkles,
  defineProperties,
  RequiredConditionalValue,
} from '@vanilla-extract/sprinkles'

import './reset.css'

const themeContractValues = {
  colors: {
    accentColor: '',
    accentColorForeground: '',
    actionButtonBorder: '',
    actionButtonBorderMobile: '',
    actionButtonSecondaryBackground: '',
    closeButton: '',
    closeButtonBackground: '',
    defaultBackground: '',
    defaultBackgroundBorder: '',
    error: '',
    generalBorder: '',
    generalBorderDim: '',
    menuItemBackground: '',
    modalBackdrop: '',
    modalBackground: '',
    modalBorder: '',
    modalText: '',
    modalTextDim: '',
    modalTextSecondary: '',
    orderAction: '',
    orderBackground: '',
    profileForeground: '',
    selectedOptionBorder: '',
    standby: '',
    transparent: '',

    alpha100: '',
    alpha200: '',
    alpha300: '',
    alpha400: '',
    alpha500: '',
    alpha600: '',
    alpha700: '',
    alpha800: '',
    alpha900: '',

    black: '',

    lightgray100: '',
    lightgray200: '',
    lightgray300: '',
    lightgray400: '',
    lightgray500: '',
    lightgray600: '',
    lightgray700: '',
    lightgray800: '',
    lightgray900: '',

    white: '',

    orange100: '',
    orange200: '',
    orange300: '',
    orange400: '',
    orange500: '',
    orange600: '',
    orange700: '',
    orange800: '',
    orange900: '',
  },
  fonts: {
    body: '',
  },
  radii: {
    actionButton: '',
    connectButton: '',
    menuButton: '',
    modal: '',
    modalMobile: '',
  },
  shadows: {
    default: '',
    defaultSmall: '',
    dialog: '',
  },
  blurs: {
    modalOverlay: '',
  },
}

export type ThemeVars = typeof themeContractValues

export const themeVars = createGlobalThemeContract(
  themeContractValues,
  (_, path) => `si-${path.join('-')}`
)

const spacing = {
  '-120': '-120px',
  '-100': '-100px',
  '-80': '-80px',
  '-60': '-60px',
  '-40': '-40px',
  '-20': '-20px',
  '-10': '-10px',
  '0': '0',
  '1': '1px',
  '2': '2px',
  '3': '3px',
  '4': '4px',
  '5': '5px',
  '6': '6px',
  '8': '8px',
  '10': '10px',
  '12': '12px',
  '14': '14px',
  '16': '16px',
  '18': '18px',
  '20': '20px',
  '24': '24px',
  '28': '28px',
  '32': '32px',
  '36': '36px',
  '40': '40px',
  '44': '44px',
  '64': '64px',
}

const dimensions = {
  '-120': '-120px',
  '-100': '-100px',
  '-80': '-80px',
  '-60': '-60px',
  '-40': '-40px',
  '-20': '-20px',
  '-10': '-10px',
  '1': '1px',
  '2': '2px',
  '4': '4px',
  '8': '8px',
  '12': '12px',
  '20': '20px',
  '24': '24px',
  '28': '28px',
  '30': '30px',
  '32': '32px',
  '34': '34px',
  '36': '36px',
  '40': '40px',
  '48': '48px',
  '54': '54px',
  '60': '60px',
  '100': '100px',
  '180': '180px',
  '240': '240px',
  'full': '100%',
  'max': 'max-content',
  'auto': 'auto',
}

const flexAlignment = ['flex-start', 'flex-end', 'center'] as const

const textAlignments = ['left', 'center', 'inherit'] as const

export const largeScreenMinWidth = 768

const responsiveProperties = defineProperties({
  conditions: {
    smallScreen: {},
    largeScreen: {
      '@media': `screen and (min-width: ${largeScreenMinWidth}px)`,
    },
  },
  defaultCondition: 'smallScreen',
  properties: {
    alignItems: flexAlignment,
  },
})

export type ResponsiveValue<Value extends string | number | boolean> =
  RequiredConditionalValue<typeof responsiveProperties, Value>

export const mapResponsiveValue = createMapValueFn(responsiveProperties)
export const normalizeResponsiveValue =
  createNormalizeValueFn(responsiveProperties)

const unresponsiveProperties = defineProperties({
  properties: {
    alignSelf: flexAlignment,
    backgroundSize: ['cover'] as const,
    borderRadius: {
      ...themeVars.radii,
      '0': '0px',
      '1': '1px',
      '6': '6px',
      '10': '10px',
      '13': '13px',
      '25%': '25%',
      'full': '9999px',
    },
    borderStyle: {
      solid: 'solid',
    },
    borderWidth: {
      '0': '0px',
      '1': '1px',
      '2': '2px',
      '4': '4px',
    },
    cursor: ['pointer'],
    display: ['none', 'block', 'flex', 'inline', 'grid'],
    gridTemplateColumns: ['repeat(1, 1fr)', 'repeat(2, 1fr)', 'repeat(3, 1fr)', 'repeat(4, 1fr)'],
    flexDirection: ['row', 'column'],
    flexGrow: ['0', '1'],
    flexWrap: ['wrap'],
    fontFamily: themeVars.fonts,
    fontSize: {
      '12': { fontSize: '12px', lineHeight: '18px' },
      '13': { fontSize: '13px', lineHeight: '18px' },
      '14': { fontSize: '14px', lineHeight: '18px' },
      '16': { fontSize: '16px', lineHeight: '20px' },
      '18': { fontSize: '18px', lineHeight: '24px' },
      '20': { fontSize: '20px', lineHeight: '24px' },
      '24': { fontSize: '24px', lineHeight: '29px' },
      '32': { fontSize: '32px', lineHeight: '29px' },
    },
    fontWeight: {
      regular: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      heavy: '800',
    },
    gap: spacing,
    height: dimensions,
    justifyContent: [...flexAlignment, 'space-between', 'space-around'],
    textAlign: textAlignments,
    marginBottom: spacing,
    marginLeft: spacing,
    marginRight: spacing,
    marginTop: spacing,
    maxWidth: dimensions,
    minWidth: dimensions,
    overflow: ['hidden', 'visible'] as const,
    paddingBottom: spacing,
    paddingLeft: spacing,
    paddingRight: spacing,
    paddingTop: spacing,
    position: ['absolute', 'fixed', 'relative'],
    right: {
      '0': '0',
    },
    transition: {
      default: '0.125s ease',
    },
    userSelect: ['none'] as const,
    width: dimensions,
    backdropFilter: {
      ...themeVars.blurs,
    },
  } as const,
  shorthands: {
    margin: ['marginTop', 'marginBottom', 'marginLeft', 'marginRight'],
    marginX: ['marginLeft', 'marginRight'],
    marginY: ['marginTop', 'marginBottom'],
    padding: ['paddingTop', 'paddingBottom', 'paddingLeft', 'paddingRight'],
    paddingX: ['paddingLeft', 'paddingRight'],
    paddingY: ['paddingTop', 'paddingBottom'],
  },
})

const colorProperties = defineProperties({
  conditions: {
    base: {},
    hover: { selector: '&:hover' },
    active: { selector: '&:active' },
  },
  defaultCondition: 'base',
  properties: {
    background: themeVars.colors,
    borderColor: themeVars.colors,
    boxShadow: themeVars.shadows,
    color: themeVars.colors,
  },
})

export const sprinkles = createSprinkles(
  colorProperties,
  responsiveProperties,
  unresponsiveProperties
)
export type Sprinkles = Parameters<typeof sprinkles>[0]