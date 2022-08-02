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
    black: '',
    box: '',
    boxText: '',
    buttonBackgroundHover: '',
    buttonBorderHover: '',
    closeButton: '',
    closeButtonBackground: '',
    defaultBackground: '',
    defaultBackgroundBorder: '',
    defaultText: '',
    defaultTextHover: '',
    defaultTextPlaceholder: '',
    error: '',
    filterHover: '',
    modalBackdrop: '',
    modalBackground: '',
    modalBorder: '',
    orderAction: '',
    orderBackground: '',
    profileTop: '',
    profileTopHover: '',
    transparent: '',
    white: ''
  },
  fonts: {
    body: '',
  },
  shadows: {
    box: '',
    boxHover: '',
    default: '',
    dialog: '',
    header: '',
    none: '',
    subHeader: ''
  },
}

export type ThemeVars = typeof themeContractValues

export const themeVars = createGlobalThemeContract(
  themeContractValues,
  (_, path) => `si-${path.join('-')}`
)

const dimensions = {
  '-120': '-120px',
  '-100': '-100px',
  '-80': '-80px',
  '-60': '-60px',
  '-40': '-40px',
  '-20': '-20px',
  '-12': '-12px',
  '-10': '-10px',
  '-6': '-6px',
  '-1': '-1px',
  '0': '0px',
  '1': '1px',
  '2': '2px',
  '3': '3px',
  '4': '4px',
  '5': '5px',
  '6': '6px',
  '8': '8px',
  '10': '10px',
  '12': '12px',
  '15': '15px',
  '16': '16px',
  '18': '18px',
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
  '44': '44px',
  '48': '48px',
  '54': '54px',
  '60': '60px',
  '66': '66px',
  '70': '70px',
  '71': '71px',
  '72': '72px',
  '73': '73px',
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

const overflowOptions = ['hidden', 'visible', 'scroll'] as const

const staticProperties = defineProperties({
  properties: {
    alignSelf: flexAlignment,
    aspectRatio: { '1': '1 / 1' },
    backgroundSize: ['cover'] as const,

    borderBottomLeftRadius: dimensions,
    borderBottomRightRadius: dimensions,
    borderTopLeftRadius: dimensions,
    borderTopRightRadius: dimensions,

    borderStyle: ['solid', 'dashed'] as const,

    borderBottomWidth: dimensions,
    borderLeftWidth: dimensions,
    borderRightWidth: dimensions,
    borderTopWidth: dimensions,

    bottom: dimensions,
    left: dimensions,
    top: dimensions,
    right: dimensions,

    cursor: ['pointer'],
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
      '28': { fontSize: '28px', lineHeight: '29px' },
      '30': { fontSize: '30px', lineHeight: '29px' },
      '32': { fontSize: '32px', lineHeight: '29px' },
      '40': { fontSize: '40px', lineHeight: '29px' },
    },
    fontWeight: {
      'regular': '400',
      'medium': '500',
      'semibold': '600',
      'bold': '700',
      'heavy': '800',
    },

    gap: dimensions,
    height: dimensions,
    justifyContent: [...flexAlignment, 'space-between', 'space-around'],
    justifySelf: [...flexAlignment],
    lineHeight: ['normal'],
    textAlign: textAlignments,
    textOverflow: ['ellipsis'],

    maxHeight: dimensions,
    maxWidth: dimensions,
    minHeight: dimensions,
    minWidth: dimensions,

    objectFit: ['cover', 'contain'] as const,

    overflow: overflowOptions,
    overflowX: overflowOptions,
    overflowY: overflowOptions,

    paddingBottom: dimensions,
    paddingLeft: dimensions,
    paddingRight: dimensions,
    paddingTop: dimensions,

    position: ['absolute', 'fixed', 'relative', 'sticky'] as const,
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
    borderRadius: ['borderBottomLeftRadius', 'borderBottomRightRadius', 'borderTopLeftRadius', 'borderTopRightRadius'],
    borderWidth: ['borderTopWidth', 'borderRightWidth', 'borderBottomWidth', 'borderLeftWidth']
  },
})

export const largeScreenMinWidth = 1024

const dynamicProperties = defineProperties({
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
    marginBottom: dimensions,
    marginLeft: dimensions,
    marginRight: dimensions,
    marginTop: dimensions,
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
  RequiredConditionalValue<typeof dynamicProperties, Value>

export const mapResponsiveValue = createMapValueFn(dynamicProperties)
export const normalizeResponsiveValue =
  createNormalizeValueFn(dynamicProperties)

export const sprinkles = createSprinkles(
  dynamicProperties,
  staticProperties
)
export type Sprinkles = Parameters<typeof sprinkles>[0]