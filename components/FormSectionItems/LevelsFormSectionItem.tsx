import { FC } from 'react'
import { Box } from '../Box/Box'
import * as styles from './FormSectionItem.css'
import { AddIcon } from '../Icons/AddIcon'
import { StarIcon } from '../Icons/StarIcon'

interface Props {
    
}

export const LevelsFormSectionItem: FC<Props> = ({
    
}) => {
    return (
        <Box className={styles.formItemSectionItem}>
            <Box
                display='flex'
                justifyContent='space-between'
            >
                <Box display='flex'>
                    <StarIcon />
                    <Box marginLeft='16'>
                        <Box 
                            as='span' 
                            fontWeight='600' 
                            fontSize='16'
                            display='block'
                        >
                            Levels
                        </Box>
                        <Box as='span' fontSize='15'>
                            Numerical traits that show as a progress bar
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