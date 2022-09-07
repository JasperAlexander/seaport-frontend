import { FC } from 'react'
import * as Tabs from '@radix-ui/react-tabs'
import * as styles from './ProfileTabs.css'
import { Text } from '../Text/Text'
import { Box } from '../Box/Box'
import useMounted from '../../hooks/useMounted'
import { AssetsStateType } from '../../types/assetTypes'
import { AssetGrid } from '../Grids/AssetGrid'

interface Props {
    assets: AssetsStateType
    isOwner: boolean
}

export const ProfileTabs: FC<Props> = ({ 
    assets,
    isOwner
}) => {
    const { mounted } = useMounted()

    return (
        <Tabs.Root
            defaultValue='collected'
        >
            <Tabs.List
                className={styles.profileTabsList}
            >
                <Tabs.Trigger 
                    value='collected'
                    className={styles.profileTabsTrigger}
                >
                    <Box
                        className={styles.profileTabsTriggerContent}
                    >
                        Collected
                    </Box>
                </Tabs.Trigger>
                <Tabs.Trigger 
                    value='created'
                    className={styles.profileTabsTrigger}
                >
                    <Box
                        className={styles.profileTabsTriggerContent}
                    >
                        Created
                    </Box>
                </Tabs.Trigger>
                <Tabs.Trigger 
                    value='favorited'
                    className={styles.profileTabsTrigger}
                >
                    <Box
                        className={styles.profileTabsTriggerContent}
                    >
                        Favorited
                    </Box>
                </Tabs.Trigger>
            </Tabs.List>
            <Tabs.Content 
                value='collected'
            >
                {mounted 
                    ? assets
                        ? 
                            <AssetGrid 
                                data={assets}
                                isOwner={isOwner}
                                displayFilters={false} 
                            />
                        : 
                            <Text 
                                as='span'
                            >
                                Not connected
                            </Text>
                    : ''
                }
            </Tabs.Content>
            <Tabs.Content 
                value='created'
            >
                b
            </Tabs.Content>
            <Tabs.Content 
                value='favorited'
            >
                c
            </Tabs.Content>
        </Tabs.Root>
    )
}