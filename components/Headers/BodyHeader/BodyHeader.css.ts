import { style } from '@vanilla-extract/css'
import { sprinkles } from '../../../styles/sprinkles.css'
import { isMobile } from '../../../utils/isMobile'

export const bodyHeader = style([sprinkles({
    background: 'white',
    color: 'defaultText',
    boxShadow: 'header',
    position: 'sticky',
    height: '72',
    maxWidth: 'fullvw',
    top: '-1',
    zIndex: '400',
    display: 'flex',
    justifyContent: 'space-between' ,
    alignItems: 'center',
    gap: '18',
    fontWeight: '700'
})])

export const bodyHeaderLeftSection = style([sprinkles({
    display: 'flex',
    textAlign: 'center',
    paddingX: '24',
    flexGrow: isMobile() ? '1' : '0',
    height: 'full',
    alignItems: 'center'
})])