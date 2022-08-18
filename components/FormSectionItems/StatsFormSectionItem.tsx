import { FC } from 'react'
import { Box } from '../Box/Box'
import * as styles from './FormSectionItem.css'
import { AddIcon } from '../Icons/AddIcon'
import { BarChartIcon } from '../Icons/BarChartIcon'

interface Props {
    
}

export const StatsFormSectionItem: FC<Props> = ({
    
}) => {
    return (
        <Box className={styles.formItemSectionItem}>
            <Box
                display='flex'
                justifyContent='space-between'
            >
                <Box display='flex'>
                    <BarChartIcon />
                    <Box marginLeft='16'>
                        <Box 
                            as='span' 
                            fontWeight='600' 
                            fontSize='16'
                            display='block'
                        >
                            Stats
                        </Box>
                        <Box as='span' fontSize='15'>
                            Numerical traits that just show as numbers
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