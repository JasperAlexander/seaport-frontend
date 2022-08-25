import { style } from '@vanilla-extract/css'
import { sprinkles } from '../../styles/sprinkles.css'

export const dropdownContentItem = style([sprinkles({
    borderBottomWidth: {
        base: '1',
        lastchild: '0'
    },
    borderStyle: 'solid',
    borderColor: 'box',
    borderBottomLeftRadius: {
        lastchild: '10'
    },
    borderBottomRightRadius: {
        lastchild: '10'
    },
    width: 'full',
    boxShadow: {
        hover: 'header'
    },
    overflow: 'hidden',
    transition: 'hover'
})])

export const dropdownContentItemLink = style([sprinkles({
    display: 'flex',
    alignItems: 'center',
    padding: '16',
    gap: '16',
    width: 'full',
    background: {
        hover: 'accordionBackground'
    }
})])