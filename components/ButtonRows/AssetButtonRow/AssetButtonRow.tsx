import { FC } from 'react'
import { SWRResponse } from 'swr'
import { AssetType } from '../../../types/assetTypes'
import { AssetButtonRowItem } from '../../AssetButtonRowItem/AssetButtonRowItem'
import { Box } from '../../Box/Box'
import { MoreHorizontalIcon } from '../../Icons/MoreHorizontalIcon'
import { RefreshIcon } from '../../Icons/RefreshIcon'
import { ShareIcon } from '../../Icons/ShareIcon'
import { MoreDropdownTrigger } from '../../DropdownTriggers/MoreDropdownTrigger'
import { ShareDropdownTrigger } from '../../DropdownTriggers/ShareDropdownTrigger'
import { NextLink } from '../../NextLink/NextLink'
import { LinkIcon } from '../../Icons/LinkIcon'

interface Props {
    asset: SWRResponse<AssetType, any> | undefined
}

export const AssetButtonRow: FC<Props> = ({ 
    asset
}) => {
    return (
        <Box 
            marginLeft='auto'
        >
            <Box 
                display='flex'
            >
                <AssetButtonRowItem
                    onClick={() => { 
                        asset?.mutate()
                    }}
                >
                    <RefreshIcon 
                        width='22'
                    />
                </AssetButtonRowItem>
                {asset?.data?.collection?.slug &&
                    <AssetButtonRowItem>
                        <NextLink
                            href={`/collection/${asset?.data?.collection?.slug}`}
                            height='22'
                        >
                            <LinkIcon 
                                width='22'
                            />
                        </NextLink>
                    </AssetButtonRowItem>
                }
                <ShareDropdownTrigger>
                    <AssetButtonRowItem>
                        <ShareIcon 
                            width='22'
                        />
                    </AssetButtonRowItem>
                </ShareDropdownTrigger>
                <MoreDropdownTrigger>
                    <AssetButtonRowItem>
                        <MoreHorizontalIcon 
                            width='22'
                        />
                    </AssetButtonRowItem>
                </MoreDropdownTrigger>
            </Box>
        </Box>
    )
}