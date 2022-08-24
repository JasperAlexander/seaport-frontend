import { FC, ReactNode } from 'react'
import { Box } from '../../Box/Box'
import * as styles from './AssetPageHeader.css'

interface Props {
  children: ReactNode
}

export const AssetPageHeader: FC<Props> = ({
  children
}) => {
  return (
    <Box 
      className={styles.assetPageHeader}
    >
      <Box 
        className={styles.assetPageHeaderContent}
      >
        {children}
      </Box>
  </Box>
  )
}