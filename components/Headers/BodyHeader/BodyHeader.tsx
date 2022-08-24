import { FC } from 'react'
import { Box } from '../../Box/Box'
import { Logo } from '../../Icons/Logo'
import { Text } from '../../Text/Text'
import { NextLink } from '../../NextLink/NextLink'
import * as styles from './BodyHeader.css'
import { BodyHeaderNavBar } from '../../NavBars/BodyHeaderNavBar'

export const BodyHeader: FC = () => {
  return (
    <Box 
      as='header' 
      id='stuckedHeader'
      className={styles.bodyHeader}
    >
      <Box 
        as='section'
        className={styles.bodyHeaderLeftSection}
      >
        <NextLink 
          href='/'
          display='flex'
          alignItems='center'
        >
          <Logo />
          <Text
            fontSize='20'
            fontWeight='600'
          >
            OpenFish
          </Text>
        </NextLink>
      </Box>
      <BodyHeaderNavBar />
    </Box>
  )
}
