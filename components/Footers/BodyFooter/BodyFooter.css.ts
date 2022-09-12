import { style } from '@vanilla-extract/css'
import { sprinkles } from '../../../styles/sprinkles.css'

export const footerSocialButton = style([sprinkles({
    marginRight: '12',
    marginTop: '8',
    display: 'inline-flex',
    alignItems: 'center',
    borderRadius: '12',
    justifyContent: 'center',
    background: {
        base: 'accentColorHover',
        hover: 'accentColorHoverHover',
        active: 'accentColorHoverHover'
    },
    borderColor: {
        base: 'accentColorHover',
        hover: 'accentColorHoverHover',
        active: 'accentColorHoverHover'
    },
    borderWidth: '2',
    borderStyle: 'solid',
    paddingX: '24',
    paddingY: '16'
})])