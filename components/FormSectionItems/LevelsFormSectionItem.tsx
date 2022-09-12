import { FC } from 'react'
import { Box } from '../Box/Box'
import * as styles from './FormSectionItem.css'
import { AddIcon } from '../Icons/AddIcon'
import { StarIcon } from '../Icons/StarIcon'
import { Text } from '../Text/Text'

interface Props {
    bottomBorder?: boolean
}

export const LevelsFormSectionItem: FC<Props> = ({
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
                    <StarIcon />
                    <Box 
                        marginLeft='16'
                    >
                        <Text 
                            as='span' 
                            fontWeight='600' 
                            display='block'
                        >
                            Levels
                        </Text>
                        <Text 
                            as='span' 
                            fontSize='15'
                        >
                            Numerical traits that show as a progress bar
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