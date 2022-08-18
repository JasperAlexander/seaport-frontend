import { style } from '@vanilla-extract/css'
import { sprinkles } from '../../../styles/sprinkles.css'

export const trigger = style([sprinkles({
    background: 'defaultBackground',
    cursor: 'pointer',
    display: 'flex',
    gap: '8',
    flexDirection: 'column',
    width: 'full',
    padding: '20',
    borderWidth: '1',
    borderColor: 'box',
    borderStyle: 'solid',
    borderTopLeftRadius: '10',
    borderTopRightRadius: '10',
    transition: 'borderRadius',
    transitionDelay: {
        closed: 'borderRadius'
    },
    borderBottomLeftRadius: {
        open: '0',
        closed: '10'
    },
    borderBottomRightRadius: {
        open: '0',
        closed: '10'
    }
})])

export const content = style([sprinkles({
    overflow: 'hidden',
    animation: {
        open: 'openAccordion',
        closed: 'closeAccordion'
    },
    borderLeftWidth: '1',
    borderRightWidth: '1',
    borderBottomWidth: '1',
    borderTopWidth: '0',
    borderColor: 'box',
    borderStyle: 'solid',
    borderBottomLeftRadius: '10',
    borderBottomRightRadius: '10',
})])

export const contentitem = style([sprinkles({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '48',
    paddingX: '10',
    borderRadius: '10'
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