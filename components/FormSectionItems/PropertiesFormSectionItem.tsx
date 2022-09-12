import { FC } from 'react'
import { Box } from '../Box/Box'
import * as styles from './FormSectionItem.css'
import { ListIcon } from '../Icons/ListIcon'
import { AddIcon } from '../Icons/AddIcon'
import { Text } from '../Text/Text'

interface Props {
    bottomBorder?: boolean
}

export const PropertiesFormSectionItem: FC<Props> = ({
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
                    <ListIcon />
                    <Box 
                        marginLeft='16'
                    >
                        <Text 
                            as='span' 
                            fontWeight='600' 
                            display='block'
                        >
                            Properties
                        </Text>
                        <Text 
                            as='span' 
                            fontSize='15'
                        >
                            Textual traits that show up as rectangles
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