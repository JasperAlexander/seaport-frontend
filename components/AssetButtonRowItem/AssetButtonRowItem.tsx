import { forwardRef, ReactNode, Ref } from 'react'
import { Box } from '../Box/Box'

interface Props {
    children: ReactNode
    onClick?: () => void
}

export const AssetButtonRowItem = forwardRef (
    (
        { 
            children,
            onClick,
            ...props
        }: Props,
        ref: Ref<HTMLElement>
    ) => {
        return (
            <Box
                as='button' 
                type='button'
                ref={ref}
                onClick={onClick}
                {...props}
                background={{
                    base: 'accordionBackground',
                    hover: 'white',
                    active: 'buttonBackgroundActive'
                }}
                boxShadow={{
                    hover: 'subHeader'
                }}
                display='inline-flex'
                alignItems='center'
                justifyContent='center'
                padding='12'
                borderTopWidth='2'
                borderRightWidth='2'
                borderBottomWidth='2'
                borderLeftWidth={{
                    firstchild: '2'
                }}
                borderColor='box'
                borderStyle='solid'
                borderTopLeftRadius={{
                    firstchild: '10'
                }}
                borderBottomLeftRadius={{
                    firstchild: '10'
                }}
                borderBottomRightRadius={{
                    lastbutton: '10'
                }}
                borderTopRightRadius={{
                    lastbutton: '10'
                }}
            >
                {children}
            </Box>
        )
    }
)