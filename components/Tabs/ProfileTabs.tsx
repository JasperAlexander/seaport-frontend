import { FC } from 'react'
import * as Tabs from '@radix-ui/react-tabs'
import * as styles from './ProfileTabs.css'
import { Text } from '../Text/Text'
import { Box } from '../Box/Box'
import useMounted from '../../hooks/useMounted'
import { AssetsStateType } from '../../types/assetTypes'
import { AssetGrid } from '../Grids/AssetGrid'
import { toggleOnItem } from '../../utils/changeRouter'
import { useRouter } from 'next/router'
import { TokensStateType } from '../../types/tokenTypes'
import useTranslation from 'next-translate/useTranslation'

interface Props {
    assets: AssetsStateType
    isOwner: boolean
    tokens: TokensStateType
}

export const ProfileTabs: FC<Props> = ({ 
    assets,
    isOwner,
    tokens
}) => {
    const { t } = useTranslation('common')
    const { mounted } = useMounted()

    const router = useRouter()
    const initialTab = router.query.tab
    // To do: find out if tab can be changed based on initialTab

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
                    onClick={() => {
                        toggleOnItem(router, 'tab', 'collected')
                    }}
                >
                    <Box
                        className={styles.profileTabsTriggerContent}
                    >
                        {t('collected')}
                    </Box>
                </Tabs.Trigger>
                <Tabs.Trigger 
                    value='created'
                    className={styles.profileTabsTrigger}
                    onClick={() => {
                        toggleOnItem(router, 'tab', 'created')
                    }}
                >
                    <Box
                        className={styles.profileTabsTriggerContent}
                    >
                        {t('created')}
                    </Box>
                </Tabs.Trigger>
                <Tabs.Trigger 
                    value='favorited'
                    className={styles.profileTabsTrigger}
                    onClick={() => {
                        toggleOnItem(router, 'tab', 'favorited')
                    }}
                >
                    <Box
                        className={styles.profileTabsTriggerContent}
                    >
                        {t('favorited')}
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
                                assets={assets}
                                isOwner={isOwner}
                                displayFilters={false} 
                                tokens={tokens}
                            />
                        : 
                            <Text 
                                as='span'
                            >
                                {t('notConnected')}
                            </Text>
                    : ''
                }
            </Tabs.Content>
            {/* To do */}
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