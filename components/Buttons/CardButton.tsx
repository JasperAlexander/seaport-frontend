import { FC, ReactNode } from 'react'
import { Box } from '../Box/Box'

interface Props {
    children: ReactNode
    onClick: () => void
    href?: string
    disabled?: boolean
}

export const CardButton: FC<Props> = ({ 
    children,
    onClick,
    href,
    disabled = false
}) => {
    return (
        <Box
            id='assetCardButton'
            // Added hover effect here for readability, effect is also defined in globals.css
            bottom={{
                base: '-40',
                hover: '0'
            }}
            transition='bottom'
            width='full'
            position='absolute'
            left='0'
            display='flex'
            justifyContent='space-between'
            flexDirection='column'
            marginRight='8'
            zIndex='100'
        >
            <Box
                fontWeight='500'
                fontSize='15'
            >
                <Box
                    as='button'
                    onClick={onClick}
                    disabled={disabled}

                    display='inline-flex'
                    gap='8'
                    alignItems='center'
                    justifyContent='center'

                    width='full'
                    height='36'

                    background='accentColor'
                    opacity={{ disabled: 'disabled' }}
                    cursor={{ disabled: 'default' }}
                    boxShadow={{
                        hover: 'subHeader'
                    }}

                    borderBottomLeftRadius='10'
                    borderBottomRightRadius='10'
                    borderStyle='solid'
                    borderWidth='2'
                    borderColor='accentColor'

                    fontSize='14'
                    fontWeight='500'
                    color='accentColorText'

                    paddingX='24'
                    paddingY='16'
                >
                    {children}
                </Box>
            </Box>
        </Box>
    )
}