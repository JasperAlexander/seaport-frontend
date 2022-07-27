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
    accentColorText: '',
    accentColorHover: '',
    actionButtonBorder: '',
    actionButtonBorderMobile: '',
    actionButtonSecondaryBackground: '',
    box: '',
    boxText: '',
    closeButton: '',
    closeButtonBackground: '',
    defaultBackground: '',
    defaultBackgroundBorder: '',
    defaultText: '',
    defaultTextHover: '',
    defaultTextPlaceholder: '',
    error: '',
    modalBackdrop: '',
    modalBackground: '',
    modalBorder: '',
    orderAction: '',
    orderBackground: '',
    profileForeground: '',
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
  shadows: {
    box: '',
    boxHover: '',
    default: '',
    header: '',
    subHeader: '',
    dialog: '',
    none: ''
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
  '-6': '-6px',
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
  '15': '15px',
  '16': '16px',
  '18': '18px',
  '20': '20px',
  '24': '24px',
  '28': '28px',
  '30': '30px',
  '32': '32px',
  '36': '36px',
  '40': '40px',
  '44': '44px',
  '48': '48px',
  '64': '64px',
  'auto': 'auto',
}

const dimensions = {
  '-120': '-120px',
  '-100': '-100px',
  '-80': '-80px',
  '-60': '-60px',
  '-40': '-40px',
  '-20': '-20px',
  '-10': '-10px',
  '0': '0px',
  '1': '1px',
  '2': '2px',
  '4': '4px',
  '8': '8px',
  '12': '12px',
  '15': '15px',
  '16': '16px',
  '20': '20px',
  '24': '24px',
  '28': '28px',
  '30': '30px',
  '30p': '30%',
  '32': '32px',
  '34': '34px',
  '36': '36px',
  '40': '40px',
  '42': '42px',
  '43p': '43%',
  '48': '48px',
  '54': '54px',
  '60': '60px',
  '66': '66px',
  '72': '72px',
  '100': '100px',
  '180': '180px',
  '200': '200px',
  '240': '240px',
  '330': '330px',
  '420': '420px',
  '588': '588px',
  '600': '600px',
  '710': '710px',
  '772': '772px',
  '1000': '1000px',
  '1280': '1280px',
  'full': '100%',
  'fullvw': '100vw',
  'max': 'max-content',
  'auto': 'auto',
  'fit': 'fitContent',
}

const flexAlignment = ['flex-start', 'flex-end', 'center'] as const
const displayOptions = ['none', 'block', 'flex', 'inline', 'inline-flex', 'grid', 'initial'] as const

const textAlignments = ['left', 'center', 'right', 'inherit'] as const

const unresponsiveProperties = defineProperties({
  properties: {
    alignSelf: flexAlignment,
    aspectRatio: { '1': '1 / 1' },
    backgroundSize: ['cover'] as const,
    borderRadius: {
      '0': '0px',
      '1': '1px',
      '6': '6px',
      '10': '10px',
      '13': '13px',
      '24': '24px',
      '28': '28px',
      '25%': '25%',
      'full': '9999px',
    },
    borderStyle: {
      solid: 'solid',
      dashed: 'dashed',
    },
    borderWidth: {
      '0': '0px',
      '1': '1px',
      '2': '2px',
      '3': '3px',
      '4': '4px',
    },
    bottom: dimensions,
    cursor: ['pointer'],
    // display: ['none', 'block', 'flex', 'inline', 'grid', 'initial'],
    gridTemplateColumns: ['repeat(1, 1fr)', 'repeat(2, 1fr)', 'repeat(3, 1fr)', 'repeat(4, 1fr)'],
    flexDirection: ['row', 'column'],
    flexBasis: {
      '0': '0%',
      'auto': 'auto'
    },
    flexGrow: ['0', '1', '2', '3', '4'],
    flexShrink: ['0', '1', '2', '3', '4'],
    flexWrap: ['wrap'],
    fontFamily: themeVars.fonts,
    fontSize: {
      '8': { fontSize: '8px', lineHeight: '18px' },
      '12': { fontSize: '12px', lineHeight: '18px' },
      '13': { fontSize: '13px', lineHeight: '18px' },
      '14': { fontSize: '14px', lineHeight: '18px' },
      '15': { fontSize: '15px', lineHeight: '20px' },
      '16': { fontSize: '16px', lineHeight: '20px' },
      '18': { fontSize: '18px', lineHeight: '24px' },
      '20': { fontSize: '20px', lineHeight: '24px' },
      '24': { fontSize: '24px', lineHeight: '29px' },
      '30': { fontSize: '30px', lineHeight: '29px' },
      '32': { fontSize: '32px', lineHeight: '29px' },
      '40': { fontSize: '40px', lineHeight: '29px' },
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
    justifySelf: [...flexAlignment],
    left: dimensions,
    lineHeight: ['normal'],
    textAlign: textAlignments,
    textOverflow: ['ellipsis'],
    maxHeight: dimensions,
    maxWidth: dimensions,
    minHeight: dimensions,
    minWidth: dimensions,
    objectFit: ['cover', 'contain'] as const,
    overflow: ['hidden', 'visible', 'scroll'] as const,
    overflowX: ['hidden', 'visible', 'scroll'] as const,
    overflowY: ['hidden', 'visible', 'scroll'] as const,
    paddingBottom: spacing,
    paddingLeft: spacing,
    paddingRight: spacing,
    paddingTop: spacing,
    position: ['absolute', 'fixed', 'relative', 'sticky'],
    right: dimensions,
    top: dimensions,
    transition: {
      default: '0.125s ease',
      inputBorderColor: 'border-color 0.25s ease-in-out 0s, background-color 0.25s ease-in-out 0s',
      assetCardImage: 'scale 0.4s ease 0s'
    },
    userSelect: ['none'] as const,
    whiteSpace: ['nowrap'],
    zIndex: {
      '0': '0',
      '1': '1',
      '2': '2',
      '3': '3',
      '4': '4',
    },
  } as const,
  shorthands: {
    padding: ['paddingTop', 'paddingBottom', 'paddingLeft', 'paddingRight'],
    paddingX: ['paddingLeft', 'paddingRight'],
    paddingY: ['paddingTop', 'paddingBottom'],
  },
})

export const largeScreenMinWidth = 1024

const responsiveProperties = defineProperties({
  conditions: {
    base: {},
    largeScreen: {
      '@media': `screen and (min-width: ${largeScreenMinWidth}px)`,
    },
    hover: { selector: '&:hover' },
    active: { selector: '&:active' },
    focus: { selector: '&:focus' },
    placeholder: { selector: '&::placeholder' },
  },
  defaultCondition: 'base',
  properties: {
    alignItems: flexAlignment,
    display: displayOptions,
    marginBottom: spacing,
    marginLeft: spacing,
    marginRight: spacing,
    marginTop: spacing,
    opacity: {
      '0': '0',
      '1': '1',
    },
    width: dimensions,
    scale: {
      'grow': '1.025',
      'growLg': '1.1',
      'shrink': '0.95',
      'shrinkSm': '0.9'
    },
    background: themeVars.colors,
    backdropFilter: {
      'modal': 'blur(0px)'
    },
    borderColor: themeVars.colors,
    boxShadow: themeVars.shadows,
    color: themeVars.colors,
    visibility: ['visible', 'hidden'] as const,
  },
  shorthands: {
    margin: ['marginTop', 'marginBottom', 'marginLeft', 'marginRight'],
    marginX: ['marginLeft', 'marginRight'],
    marginY: ['marginTop', 'marginBottom'],
  }
})

export type ResponsiveValue<Value extends string | number | boolean> =
  RequiredConditionalValue<typeof responsiveProperties, Value>

export const mapResponsiveValue = createMapValueFn(responsiveProperties)
export const normalizeResponsiveValue =
  createNormalizeValueFn(responsiveProperties)

// const dynamicProperties = defineProperties({
//   conditions: {
//     base: {},
//     hover: { selector: '&:hover' },
//     active: { selector: '&:active' },
//     focus: { selector: '&:focus' },
//     placeholder: { selector: '&::placeholder' },
//   },
//   defaultCondition: 'base',
//   properties: {
//     background: themeVars.colors,
//     borderColor: themeVars.colors,
//     boxShadow: themeVars.shadows,
//     color: themeVars.colors,
//   },
// })

export const sprinkles = createSprinkles(
  // dynamicProperties,
  responsiveProperties,
  unresponsiveProperties
)
export type Sprinkles = Parameters<typeof sprinkles>[0]