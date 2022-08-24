import { forwardRef, ReactNode, Ref } from 'react'
import { Box, BoxProps } from '../Box/Box'

interface Props {
    as?:
      | 'code'
      | 'div'
      | 'h1'
      | 'h2'
      | 'h3'
      | 'h4'
      | 'h5'
      | 'h6'
      | 'label'
      | 'p'
      | 'span'
    id?: string
    children?: ReactNode
    className?: string

    display?: BoxProps['display']
    tabIndex?: number
    textAlign?: BoxProps['textAlign']

    fontFamily?: BoxProps['fontFamily']
    fontSize?: BoxProps['fontSize']
    fontWeight?: BoxProps['fontWeight']
    color?: BoxProps['color']
    hoverColor?: BoxProps['color']
    
    overflow?: BoxProps['overflow']
    textOverflow?: BoxProps['textOverflow']
    whiteSpace?: BoxProps['whiteSpace']
}

/**
 * Component that wraps text inside Box component
 * with text props
 * @param as HTML element, defaults to div
 * @param id no default value
 * @param children will be wrapped inside Box component
 * @param className no default value
 * @param display no default value
 * @param tabIndex no default value
 * @param textAlign defaults to inherit
 * @param fontFamily defaults to body
 * @param fontSize defaults to 16
 * @param fontWeight defaults to 400
 * @param color defaults to defaultText
 * @param hoverColor defaults to color param
 * @param overflow defaults to hidden
 * @param textOverflow defaults to ellipsis
 * @param whiteSpace no default value
 * @param ref will be forwarded to Box component
 */
export const Text = forwardRef(
    (
        {
            as = 'div',
            id,
            children,
            className,

            display,
            tabIndex,
            textAlign = 'inherit',

            fontFamily = 'body',
            fontSize = '16',
            fontWeight = '400',
            color = 'defaultText',
            hoverColor,

            overflow = 'hidden',
            textOverflow = 'ellipsis',
            whiteSpace
        }: Props,
        ref: Ref<HTMLElement>
    ) => {
        return (
            <Box
                as={as}
                id={id}
                ref={ref}
                className={className}

                display={display}
                tabIndex={tabIndex}
                textAlign={textAlign}

                fontFamily={fontFamily}
                fontSize={fontSize}
                fontWeight={fontWeight}
                color={{
                    // @ts-ignore
                    base: color,
                    // @ts-ignore
                    hover: hoverColor ? hoverColor : color
                }}

                overflow={overflow}
                textOverflow={textOverflow}
                whiteSpace={whiteSpace}
                lineHeight='normal'
            >
                {children}
            </Box>
        )
    }
)