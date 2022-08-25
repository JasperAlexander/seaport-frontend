import { FC, Fragment } from 'react'
import { Box } from '../Box/Box'
import { NextLink } from '../NextLink/NextLink'
import { Text } from '../Text/Text'
import * as styles from './DropdownContent.css'

interface Props {
    
}

export const ExploreDropdownContent: FC<Props> = ({
    
}) => {
    return (
        <Fragment>
            <Box
                className={styles.dropdownContentItem}
            >
                <NextLink 
                    href='/assets'
                    className={styles.dropdownContentItemLink}
                >
                    <Text
                        fontWeight='600'
                    >
                        All assets
                    </Text>
                </NextLink>
            </Box>
            <Box
                className={styles.dropdownContentItem}
            >
                <NextLink 
                    href='/'
                    className={styles.dropdownContentItemLink}
                >
                    <Text
                        fontWeight='600'
                    >
                        All collections
                    </Text>
                </NextLink>
            </Box>
        </Fragment>
    )
}