import { forwardRef, ReactNode } from 'react'
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
    
    overflow?: BoxProps['overflow']
    textOverflow?: BoxProps['textOverflow']
    whiteSpace?: BoxProps['whiteSpace']
}

/**
 * Text component
 * @param as HTML element, defaults to div
 * @param textAlign defaults to inherit
 * @param fontFamily defaults to body
 * @param fontSize defaults to 16
 * @param fontWeight defaults to 400
 * @param color defaults to defaultText
 * @param overflow defaults to hidden
 * @param textOverflow defaults to ellipsis
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

            overflow = 'hidden',
            textOverflow = 'ellipsis',
            whiteSpace
        }: Props,
        ref: React.Ref<HTMLElement>
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
                color={color}

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