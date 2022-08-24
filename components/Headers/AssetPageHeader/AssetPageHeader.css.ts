import { style } from '@vanilla-extract/css'
import { sprinkles } from '../../../styles/sprinkles.css'

export const assetPageHeader = style([sprinkles({
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    position: 'sticky',
    height: '80',
    width: 'full',
    background: 'accordionBackground',
    borderBottomWidth: '1',
    borderStyle: 'solid',
    borderColor: 'box'
})])

export const assetPageHeaderContent = style([sprinkles({
    display: 'flex',
    gap: '8',
    paddingX: '40',
    marginTop: '-8'
})])
