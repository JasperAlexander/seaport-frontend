import { FC } from 'react'
import { Box } from '../Box/Box'
import * as styles from './FormSectionItem.css'
import { AddIcon } from '../Icons/AddIcon'
import { BarChartIcon } from '../Icons/BarChartIcon'
import { Text } from '../Text/Text'

interface Props {
    bottomBorder?: boolean
}

export const StatsFormSectionItem: FC<Props> = ({
    bottomBorder = true
}) => {
    return (
        <Box 
            className={styles.formSectionItem}
            borderBottomWidth={bottomBorder ? '1' : '0'}
        >
            <Box
                display='flex'
                justifyContent='space-between'
            >
                <Box 
                    display='flex'
                >
                    <BarChartIcon />
                    <Box 
                        marginLeft='16'
                    >
                        <Text 
                            as='span' 
                            fontWeight='600' 
                            display='block'
                        >
                            Stats
                        </Text>
                        <Text 
                            as='span' 
                            fontSize='15'
                        >
                            Numerical traits that just show as numbers
                        </Text>
                    </Box>
                </Box>
                <Box>
                    <Box
                        as='button'
                        type='button'
                        className={styles.formSectionItemButton}
                    >
                        <AddIcon 
                            fill='orderAction' 
                        />
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}