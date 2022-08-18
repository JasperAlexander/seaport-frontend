import { style } from '@vanilla-extract/css'
import { sprinkles } from '../../../styles/sprinkles.css'

export const item =  style([sprinkles({
    marginX: '20'
})])

export const trigger = style([sprinkles({
    background: 'defaultBackground',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 'full',
    padding: '20',
    borderBottomWidth: '0',
    borderTopWidth: '1',
    borderLeftWidth: '1',
    borderRightWidth: '1',
    borderColor: 'box',
    borderStyle: 'solid'
})])

export const firstTrigger = style([
    trigger,
    sprinkles({
        borderTopWidth: '1',
        borderTopLeftRadius: '10',
        borderTopRightRadius: '10'
    })
])

export const lastTrigger = style([
    trigger,
    sprinkles({
        borderBottomWidth: '1',
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
    })
])

export const content = style([sprinkles({
    overflow: 'hidden',
    animation: {
        open: 'openAccordion',
        closed: 'closeAccordion'
    },
    borderTopWidth: '1',
    borderLeftWidth: '1',
    borderRightWidth: '1',
    borderBottomWidth: '0',
    borderColor: 'box',
    borderStyle: 'solid',
    background: 'accordionBackground'
})])

export const lastContent = style([
    content,
    sprinkles({
        borderBottomWidth: '1',
        borderBottomLeftRadius: '10',
        borderBottomRightRadius: '10'
    })
])

export const contentitem = style([sprinkles({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '48',
    paddingX: '10',
    borderRadius: '10'
})])

export const description = style([sprinkles({
    display: 'flex',
    flexDirection: 'column',
    padding: '30',
    gap: '4'
})])

export const collection = style([sprinkles({
    display: 'flex',
    flexDirection: 'column',
    padding: '20',
    gap: '20'
})])

export const collectionDescription = style([sprinkles({
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    fontSize: '14'
})])

export const collectionImg = style([sprinkles({
    width: '80',
    borderRadius: '10',
    aspectRatio: '1',
    marginRight: '10'
})])

export const details = style([sprinkles({
    display: 'flex',
    flexDirection: 'column',
    padding: '20',
    gap: '8'
})])

export const detailsInfo = style([sprinkles({
    display: 'flex',
    justifyContent: 'space-between'
})])