import { FC } from 'react'
import { SWRResponse } from 'swr'
import { AssetReadType } from '../../../types/assetTypes'
import { AssetButtonRowItem } from '../../AssetButtonRowItem/AssetButtonRowItem'
import { Box } from '../../Box/Box'
import { MoreHorizontalIcon } from '../../Icons/MoreHorizontalIcon'
import { RefreshIcon } from '../../Icons/RefreshIcon'
import { ShareIcon } from '../../Icons/ShareIcon'
import { NextLink } from '../../NextLink/NextLink'
import { LinkIcon } from '../../Icons/LinkIcon'
import { DropdownTrigger } from '../../DropdownTrigger/DropdownTrigger'
import { ShareDropdownContent } from '../../DropdownContents/ShareDropdownContent'
import { MoreDropdownContent } from '../../DropdownContents/MoreDropdownContent'

interface Props {
    asset: SWRResponse<AssetReadType, any> | undefined
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
                <DropdownTrigger
                    content={<ShareDropdownContent />}
                    offsetDistance={10}
                >
                    <AssetButtonRowItem>
                        <ShareIcon 
                            width='22'
                        />
                    </AssetButtonRowItem>
                </DropdownTrigger>
                <DropdownTrigger
                    content={<MoreDropdownContent />}
                    offsetDistance={10}
                >
                    <AssetButtonRowItem>
                        <MoreHorizontalIcon 
                            width='22'
                        />
                    </AssetButtonRowItem>
                </DropdownTrigger>
            </Box>
        </Box>
    )
}