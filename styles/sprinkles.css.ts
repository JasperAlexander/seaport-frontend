/* eslint-disable sort-keys-fix/sort-keys-fix */
import { createGlobalThemeContract, keyframes } from '@vanilla-extract/css'
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
    accentColorHoverHover: '',

    actionButtonBorder: '',
    actionButtonBorderMobile: '',
    actionButtonSecondaryBackground: '',

    accordionBackground: '',
    tabBackground: '',

    black: '',
    white: '',
    transparent: '',

    box: '',
    boxText: '',

    buttonBackgroundHover: '',
    buttonBackgroundActive: '',
    buttonBorderHover: '',
    closeButton: '',
    closeButtonBackground: '',

    defaultBackground: '',
    defaultBackgroundShadow: '',
    defaultBackgroundBorder: '',
    defaultText: '',
    defaultTextHover: '',
    defaultTextPlaceholder: '',
    defaultTextPlaceholderHover: '',

    error: '',

    filterHover: '',

    modalBackdrop: '',
    modalBackground: '',
    modalBorder: '',

    orderAction: '',
    orderBackground: '',

    profileTop: '',
    profileTopHover: '',

    twitter: ''
  },
  fonts: {
    body: ''
  },
  shadows: {
    default: '',
    none: '',

    box: '',
    boxHover: '',

    inputHover: '',

    dialog: '',
    dropdown: '',

    header: '',
    subHeader: '',

    featuredCard: '',
    featuredCardHover: ''
  },
}

export type ThemeVars = typeof themeContractValues

export const themeVars = createGlobalThemeContract(
  themeContractValues,
  (_, path) => `si-${path.join('-')}`
)

const dimensions = {
  '-156': '-156px',
  '-120': '-120px',
  '-100': '-100px',
  '-86': '-86px',
  '-80': '-80px',
  '-60': '-60px',
  '-40': '-40px',
  '-36': '-36px',
  '-20': '-20px',
  '-12': '-12px',
  '-10': '-10px',
  '-8': '-8px',
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
  '14': '14px',
  '15': '15px',
  '16': '16px',
  '18': '18px',
  '20': '20px',
  '20p': '20%',
  '22': '22px',
  '24': '24px',
  '25p': '25%',
  '28': '28px',
  '30': '30px',
  '30p': '30%',
  '32': '32px',
  '34': '34px',
  '36': '36px',
  '38': '38px',
  '40': '40px',
  '42': '42px',
  '43p': '43%',
  '44': '44px',
  '45': '45px',
  '48': '48px',
  '50p': '50%',
  '64': '64px',
  '66': '66px',
  '70': '70px',
  '71': '71px', // Subheader top
  '72': '72px', // Header height
  '75p': '75%',
  '80': '80px',
  '90': '90px',
  '100': '100px',
  '120': '120px',
  '160': '160px',
  '180': '180px',
  '200': '200px',
  '220': '220px',
  '240': '240px',
  '330': '330px',
  '350': '350px',
  '420': '420px',
  '772': '772px',
  '1000': '1000px',
  '1280': '1280px',
  'full': '100%',
  'fullvw': '100vw',
  'max': 'max-content',
  'auto': 'auto',
  'fit': 'fitContent',
  'initial': 'initial',
  'fullmain': 'calc(100% - 72px)',
  'dialogHeightLarge': '450px',
  'dialogHeightSmall': '300px',
  'dialogWidthLarge': '700px',
  'dialogWidthSmall': '550px'
}

const weights = {
  '100': '100',
  '200': '200',
  '300': '300',
  '400': '400',
  '500': '500',
  '600': '600',
  '700': '700',
  '800': '800',
  '900': '900',
}

const flexAlignment = [
  'flex-start', 
  'flex-end', 
  'center', 
  'stretch'
] as const
const displayOptions = [
  'none', 
  'block', 
  'flex', 
  'inline', 
  'inline-flex', 
  'inline-block', 
  'grid', 
  'initial'
] as const

const textAlignments = [
  'left', 
  'center', 
  'right', 
  'inherit'
] as const

const overflowOptions = [
  'hidden', 
  'visible', 
  'scroll', 
  'auto'
] as const

const openAccordion = keyframes({
  from: { height: 0 },
  to: { height: 'var(--radix-accordion-content-height)' }
})

const closeAccordion = keyframes({
  from: { height: 'var(--radix-accordion-content-height)' },
  to: { height: 0 }
})

const openSideDialog = keyframes({
  '0%': { opacity: 0, transform: 'translate3d(100%, 0px, 0px)' },
  '100%': { opacity: 1, transform: 'translate3d(0%, 0px, 0px)' }
})

const closeSideDialog = keyframes({
  '0%': { opacity: 1, transform: 'translate3d(0%, 0px, 0px)' },
  '100%': { opacity: 0, transform: 'translate3d(100%, 0px, 0px)' }
})

const progress = keyframes({
  '0%': { rotate: '-90deg' },
  '25%': { rotate: '0deg' },
  '50%': { rotate: '90deg' },
  '75%': { rotate: '180deg' },
  '100%': { rotate: '270deg' }
})

const shimmer = keyframes({
  '0%': { backgroundPosition: '-1200px 0px' },
  '100%': { backgroundPosition: '1200px 0px' },
})

const staticProperties = defineProperties({
  properties: {
    alignSelf: flexAlignment,
    aspectRatio: { 
      'square': '1 / 1',
      '1.1': '1 / 1.1'
    },
    backgroundSize: ['cover'],

    borderStyle: [
      'solid', 
      'dashed'
    ],

    flexBasis: {
      '0': '0%',
      'auto': 'auto'
    },
    flexGrow: [
      '0', 
      '1', 
      '2', 
      '3', 
      '4'
    ],
    flexShrink: [
      '0', 
      '1', 
      '2', 
      '3', 
      '4'
    ],
    flexWrap: [
      'wrap', 
      'nowrap'
    ],

    fontFamily: themeVars.fonts,
    fontSize: dimensions,

    gap: dimensions,
    
    justifySelf: [...flexAlignment],
    lineHeight: ['normal'],
    textOverflow: ['ellipsis'],

    maxHeight: dimensions,
    maxWidth: dimensions,
    minHeight: dimensions,
    minWidth: dimensions,

    objectFit: [
      'cover', 
      'contain'
    ],

    overflow: overflowOptions,
    overflowX: overflowOptions,
    overflowY: overflowOptions,

    outline: ['none'],
    stroke: themeVars.colors,

    position: [
      'absolute', 
      'fixed', 
      'relative', 
      'sticky', 
      'initial'
    ],
    userSelect: ['none'],
    whiteSpace: ['nowrap'],

    zIndex: weights,
  } as const
})

export const wideScreenMinWidth = 1230
export const largeScreenMinWidth = 1024
export const mediumScreenMinWidth = 910
export const smallScreenMinWidth = 615

const dynamicProperties = defineProperties({
  conditions: {
    base: {},
    wideScreen: {
      '@media': `screen and (min-width: ${wideScreenMinWidth}px)`,
    },
    largeScreen: {
      '@media': `screen and (min-width: ${largeScreenMinWidth}px) and (max-width: ${wideScreenMinWidth}px)`,
    },
    mediumScreen: {
      '@media': `screen and (min-width: ${mediumScreenMinWidth}px) and (max-width: ${largeScreenMinWidth}px)`,
    },
    smallScreen: {
      '@media': `screen and (min-width: ${smallScreenMinWidth}px) and (max-width: ${mediumScreenMinWidth}px)`,
    },
    
    hover: { selector: '&:hover:not(:active):not(:disabled)' },
    active: { selector: '&:active' },
    focus: { selector: '&:focus' },
    disabled: { selector: '&:disabled' },

    placeholder: { selector: '&::placeholder' },
    after: { selector: '&::after' },

    firstchild: { selector: '&:first-child' },
    notfirstchild: { selector: '&:not(:first-child)' },
    lastchild: { selector: '&:last-child' },
    lastbutton: { selector: '&:last-of-type' },

    open: { selector: `&[data-state='open']` },
    closed: { selector: `&[data-state='closed']` },

    activeState: { selector: '[data-state=active] &' }
  },
  defaultCondition: 'base',
  properties: {
    animation: {
      openAccordion: `${openAccordion} 300ms ease-out`,
      closeAccordion: `${closeAccordion} 300ms ease-out`,
      openSideDialog: `${openSideDialog} 300ms ease 0s`,
      closeSideDialog: `${closeSideDialog} 300ms ease 0s`,
      progress: `0.75s linear 0s infinite normal none running ${progress}`,
      shimmer: `2.5s linear 0s infinite normal forwards running ${shimmer}`
    },
    transformOrigin: {
      progress: '19px 19px 0px'
    },
    alignItems: flexAlignment,

    backdropFilter: {
      'modal': 'blur(0px)'
    },
    background: themeVars.colors,
    borderColor: themeVars.colors,
    boxShadow: themeVars.shadows,
    color: themeVars.colors,
    fill: themeVars.colors,

    borderBottomLeftRadius: dimensions,
    borderBottomRightRadius: dimensions,
    borderTopLeftRadius: dimensions,
    borderTopRightRadius: dimensions,

    borderBottomWidth: dimensions,
    borderLeftWidth: dimensions,
    borderRightWidth: dimensions,
    borderTopWidth: dimensions,

    bottom: dimensions,
    left: dimensions,
    top: dimensions,
    right: dimensions,

    paddingBottom: dimensions,
    paddingLeft: dimensions,
    paddingRight: dimensions,
    paddingTop: dimensions,

    content: {
      'empty': `''`
    },

    cursor: [
      'pointer', 
      'default',
      'text'
    ],

    display: displayOptions,
    flexDirection: [
      'row', 
      'column'
    ],

    gridTemplateColumns: [
      'repeat(1, 1fr)', 
      'repeat(2, 1fr)', 
      'repeat(3, 1fr)', 
      'repeat(4, 1fr)'
    ],

    height: dimensions,
    width: dimensions,

    marginBottom: dimensions,
    marginLeft: dimensions,
    marginRight: dimensions,
    marginTop: dimensions,

    fontWeight: weights,

    textAlign: textAlignments,
    justifyContent: [
      ...flexAlignment, 
      'space-between', 
      'space-around'
    ],

    opacity: {
      '0': '0',
      'disabled': '0.4',
      '1': '1',
    },
    scale: {
      'grow': '1.025',
      'growLg': '1.1',
      'shrink': '0.95',
      'shrinkSm': '0.9'
    },
    transform: {
      'rotate(180deg)': 'rotate(180deg)',
      'translateX(22px)': 'translateX(22px)',
      'translateX(0px)': 'translateX(0px)',
      'center': 'translate(-50%, -50%)',
      'right': 'translate3d(100%, 0px, 0px)',
      'aside': 'translate3d(0%, 0px, 0px)'
    },
    transition: {
      default: '0.125s ease',
      inputBorderColor: 'border-color 0.25s ease-in-out 0s, background-color 0.25s ease-in-out 0s',
      assetCardImage: 'scale 0.4s ease 0s',
      transform: 'transform 300ms',
      borderRadius: 'border-radius 300ms ease-in-out',
      progress: 'fill 0.4s ease-in 0s',
      bottom: 'bottom 0.25s ease-in-out 0s, visibility 0s ease 0.25s',
      opacity: 'opacity 0.25s ease-in-out 0s',
      boxShadow: 'box-shadow 0.3s ease-in 0s',
      toggle: 'all 0.3s ease-out 0s',
      hover: 'all 0.2s ease 0s'
    },
    transitionDelay: {
      borderRadius: '100ms'
    },

    visibility: [
      'visible', 
      'hidden'
    ]
  },
  shorthands: {
    margin: [
      'marginTop', 
      'marginBottom', 
      'marginLeft', 
      'marginRight'
    ],
    marginX: [
      'marginLeft', 
      'marginRight'
    ],
    marginY: [
      'marginTop', 
      'marginBottom'
    ],
    inset: [
      'top', 
      'right', 
      'bottom', 
      'left'
    ],
    dimension: [
      'width', 
      'height'
    ],
    borderRadius: [
      'borderBottomLeftRadius', 
      'borderBottomRightRadius', 
      'borderTopLeftRadius', 
      'borderTopRightRadius'
    ],
    borderWidth: [
      'borderTopWidth', 
      'borderRightWidth', 
      'borderBottomWidth', 
      'borderLeftWidth'
    ],
    padding: [
      'paddingTop', 
      'paddingBottom', 
      'paddingLeft', 
      'paddingRight'
    ],
    paddingX: [
      'paddingLeft', 
      'paddingRight'
    ],
    paddingY: [
      'paddingTop', 
      'paddingBottom'
    ]
  }
})

export type DynamicValue<Value extends string | number | boolean> =
  RequiredConditionalValue<typeof dynamicProperties, Value>

export const mapDynamicValue = createMapValueFn(dynamicProperties)
export const normalizeDynamicValue =
  createNormalizeValueFn(dynamicProperties)

export const sprinkles = createSprinkles(
  dynamicProperties,
  staticProperties
)
export type Sprinkles = Parameters<typeof sprinkles>[0]