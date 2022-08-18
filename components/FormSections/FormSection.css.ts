import { style } from '@vanilla-extract/css'
import { sprinkles } from '../../styles/sprinkles.css'

export const formItem = style([sprinkles({
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '24'
})])

export const formItemTop = style([sprinkles({
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '8'
})])

export const dropZone = style([sprinkles({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    cursor:'pointer',
    borderWidth:'3',
    borderStyle:'dashed',
    borderColor: 'buttonBorderHover',
    borderRadius:'10',
    padding:'4'
})])

export const formItemInput = style([sprinkles({
    outline: 'none',
    minWidth: '0',
    height: '48',
    paddingRight: '12',
    borderWidth: '0',
    background: 'transparent',
    flexGrow: '1',
    flexShrink: '0',
    flexBasis: '0',
    fontSize: '15'
})])
