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

export const profileDropdownContainer = style([sprinkles({
    minWidth: '220',
    background: 'white',
    maxWidth: '350',
    maxHeight: '350',
    position: 'relative',
    borderRadius: '10',
    boxShadow: 'dropdown'
})])

export const profileDropdownItem = style([sprinkles({
    width: 'full',
    display: 'inline-flex',
    alignItems: 'center',
    padding: '16',
    gap: '16',
    borderTopWidth: {
        notfirstchild: '1'
    },
    borderStyle: 'solid',
    borderColor: 'box',
    boxShadow: {
        hover: 'header'
    },
    borderTopLeftRadius: {
        firstchild: '10'
    },
    borderTopRightRadius: {
        firstchild: '10'
    },
    borderBottomLeftRadius: {
        lastchild: '10'
    },
    borderBottomRightRadius: {
        lastchild: '10'
    }
})])