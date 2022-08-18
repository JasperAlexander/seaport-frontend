import { FC } from 'react'
import { Box } from '../Box/Box'
import * as styles from './FormSectionItem.css'
import { ListIcon } from '../Icons/ListIcon'
import { AddIcon } from '../Icons/AddIcon'

interface Props {
    
}

export const PropertiesFormSectionItem: FC<Props> = ({
    
}) => {
    return (
        <Box className={styles.formItemSectionItem}>
            <Box
                display='flex'
                justifyContent='space-between'
            >
                <Box display='flex'>
                    <ListIcon />
                    <Box marginLeft='16'>
                        <Box 
                            as='span' 
                            fontWeight='600' 
                            fontSize='16'
                            display='block'
                        >
                            Properties
                        </Box>
                        <Box as='span' fontSize='15'>
                            Textual traits that show up as rectangles
                        </Box>
                    </Box>
                </Box>
                <Box>
                    <Box
                        as='button'
                        type='button'
                        display='flex'
                        alignItems='center'
                        justifyContent='center'
                        borderWidth='2'
                        borderStyle='solid'
                        borderColor='box'
                        borderRadius='10'
                        padding='16'
                        boxShadow={{hover: 'subHeader'}}
                        background={{active: 'buttonBackgroundActive'}}
                    >
                        <AddIcon fill='orderAction' />
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}