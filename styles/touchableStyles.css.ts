/* eslint-disable sort-keys-fix/sort-keys-fix */
import { createVar, style, styleVariants } from '@vanilla-extract/css'
import { calc } from '@vanilla-extract/css-utils'
import { sprinkles } from './sprinkles.css'

const hoverScaleValues = {
  noGrow: 1,
  grow: 1.025,
  growLg: 1.1,
} as const

const activeScaleValues = {
  noShrink: 1,
  shrink: 0.95,
  shrinkSm: 0.9,
} as const

const hoverBackgroundValues = {
  orange: '#fb7c3f',
  white: '#FFFFFF',
  lightgray100: '#8f8f8f',
  lightgray200: '#a7a7a7',
  lightgray300: '#bebebe',
  lightgray400: '#d6d6d6',
  lightgray500: '#eeeeee',
  lightgray600: '#f0f0f0',
  lightgray700: '#f1f1f1',
  lightgray800: '#f3f3f3',
  lightgray900: '#f5f5f5',
  
  alpha100: 'rgba(0, 0, 0, 0.02)',
  alpha200: 'rgba(0, 0, 0, 0.04)',
  alpha300: 'rgba(0, 0, 0, 0.06)',
  alpha400: 'rgba(0, 0, 0, 0.08)',
  alpha500: 'rgba(0, 0, 0, 0.1)',
  alpha600: 'rgba(0, 0, 0, 0.2)',
  alpha700: 'rgba(0, 0, 0, 0.4)',
  alpha800: 'rgba(0, 0, 0, 0.6)',
  alpha900: 'rgba(0, 0, 0, 0.8)',
} as const

const hoverColorValues = {
  black: '#000000',
  white: '#FFFFFF',
} as const

const hoverShadowValues = {
  default: '10px 10px 20px #cacaca, -10px -10px 20px #ffffff',
  defaultSmall: 'rgba(4, 17, 29, 0.25) 0px 0px 8px 0px',
  button: 'rgba(0, 0, 0, 0.1) 0px 2px 10px',
} as const

const hoverBorderColorValues = {
  gray: '#a7a7a7',
  actionButtonBorderMobile: 'rgba(0, 0, 0, 0.06)',
  white: '#ffffff',
  black: '#000000',
} as const

const focusBorderColorValues = {
  gray: '#a7a7a7',
  actionButtonBorderMobile: 'rgba(0, 0, 0, 0.06)'
} as const

const hoverScaleVar = createVar()
const activeScaleVar = createVar()
const hoverBackgroundVar = createVar()
const hoverColorVar = createVar()
const hoverShadowVar = createVar()
const hoverBorderColorVar = createVar()
const focusBorderColorVar = createVar()

export const base = style([
  sprinkles({
    position: 'relative',
  }),
  {
    selectors: {
      // '&,&::after': {
      //   vars: {
      //     [hoverScaleVar]: '1',
      //     [activeScaleVar]: '1',
      //   },
      // },
      '&:hover': {
        transform: `scale(${hoverScaleVar})`,
        backgroundColor: `${hoverBackgroundVar} !important`,
        borderColor: `${hoverBorderColorVar}`,
        boxShadow: `${hoverShadowVar}`,
        color: `${hoverColorVar}`,
      },
      '&:active': {
        transform: `scale(${activeScaleVar})`,
      },
      '&:focus': {
        borderColor: `${focusBorderColorVar}`,
      },
      '&:active::after': {
        bottom: -1,
        content: '""',
        display: 'block',
        left: -1,
        position: 'absolute',
        right: -1,
        top: -1,
        transform: `scale(${calc(1)
          .divide(activeScaleVar)
          .multiply(hoverScaleVar)
          .toString()})`,
      },
    },
  },
])

export const hoverScale = styleVariants(hoverScaleValues, scale => ({
  selectors: {
    '&,&::after': {
      vars: { [hoverScaleVar]: String(scale) },
    },
  },
}))

export const activeScale = styleVariants(activeScaleValues, scale => ({
  selectors: {
    '&,&::after': {
      vars: { [activeScaleVar]: String(scale) },
    },
  },
}))

export const hoverBackground = styleVariants(hoverBackgroundValues, background => ({
  ':hover': {
    vars: { [hoverBackgroundVar]: String(background) },
  },
}))

export const hoverColor = styleVariants(hoverColorValues, color => ({
  ':hover': {
    vars: { [hoverColorVar]: String(color) },
  },
}))

export const hoverShadow = styleVariants(hoverShadowValues, shadow => ({
  ':hover': {
    vars: { [hoverShadowVar]: String(shadow) },
  },
}))

export const hoverBorderColor = styleVariants(hoverBorderColorValues, borderColor => ({
  ':hover': {
    vars: { [hoverBorderColorVar]: String(borderColor) },
  },
}))

export const focusBorderColor = styleVariants(focusBorderColorValues, borderColor => ({
  ':focus': {
    vars: { [focusBorderColorVar]: String(borderColor) },
  },
}))