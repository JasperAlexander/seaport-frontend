import { style } from '@vanilla-extract/css'
import { sprinkles } from '../../styles/sprinkles.css'

export const profileTabsList = style([sprinkles({
    display: 'flex',
    alignItems: 'center',
    gap: '48',
    width: 'full',
    marginTop: '32',
    marginBottom: '24',
    borderBottomWidth: '2',
    borderTopWidth: '0',
    borderLeftWidth: '0',
    borderRightWidth: '0',
    borderColor: 'box',
    borderStyle: 'solid',
})])

export const profileTabsTrigger = style([sprinkles({
    display: 'flex',
    alignItems: 'center',
    gap: '8',
    background: 'transparent',
    padding: '0',
    borderWidth: '0'
})])

export const profileTabsTriggerContent = style([sprinkles({
    fontWeight: '600',
    color: {
        base: 'boxText',
        activeState: 'defaultText'
    },
    paddingBottom: '10',
    borderBottomWidth: '2',
    borderStyle: 'solid',
    borderColor: {
        base: 'transparent',
        activeState: 'defaultText'
    }
})])