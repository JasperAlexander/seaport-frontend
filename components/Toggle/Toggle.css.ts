import { style } from '@vanilla-extract/css'
import { sprinkles } from '../../styles/sprinkles.css'

export const toggleContainer = style([sprinkles({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
})])

export const toggleCheckbox = style([sprinkles({
    display: 'flex',
    alignItems: 'center',
    paddingX: '6',
    height: {
        base: '24',
        after: '14'
    },
    width: {
        base: '48',
        after: '14'
    },
    cursor: 'pointer',
    outline: 'none',
    borderRadius: {
        base: '100',
        after: '50p'
    },
    transition: {
        base: 'toggle',
        after: 'toggle'
    },
    content: {
        after: 'empty'
    }
})])
