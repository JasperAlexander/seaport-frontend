import { style } from '@vanilla-extract/css'
import { sprinkles } from '../../../styles/sprinkles.css'

export const trigger = style([sprinkles({
    background: {
        base: 'defaultBackground',
        hover: 'filterHover',
        active: 'buttonBackgroundActive'
    },
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 'full',
    height: '48',
    paddingX: '10',
    borderWidth: '0',
    borderRadius: '10'
})])

export const content = style([sprinkles({
    overflow: 'hidden',
    animation: {
        open: 'openAccordion',
        closed: 'closeAccordion'
    }
})])

export const item = style([sprinkles({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '48',
    cursor: 'pointer',
    paddingX: '10',
    borderRadius: '10',
    background: {
        hover: 'filterHover',
        active: 'buttonBackgroundActive'
    }
})])

export const checkbox = style([sprinkles({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '24',
    height: '24',
    borderColor: {
        base: 'box',
        focus: 'defaultTextPlaceholder'
    },
    borderRadius: '6',
    borderStyle: 'solid',
    borderWidth: '2',
    background: 'defaultBackground',
    transition: 'inputBorderColor'
})])