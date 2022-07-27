import { Box } from '../../Box/Box'
import { AssetAccordionHeader } from './AssetAccordionHeader'
import { AssetAccordionMain } from './AssetAccordionMain'
import { useState } from 'react'
import { AssetType } from '../../../types/assetTypes'

interface Props {
    children?: React.ReactNode
    asset: AssetType | undefined
    title: string
    marginTop?: any // Todo
}

export const AssetAccordion: React.FC<Props> = ({
    children,
    asset,
    title,
    marginTop = '20'
}: Props) => {
    const [isExpanded, setIsExpanded] = useState(false)

    return (
        <Box
            marginX='20'
            marginBottom='20'
            marginTop={marginTop}
            borderRadius='10'
            borderStyle='solid'
            borderWidth='1'
            borderColor='box'
            overflow='hidden'
        >
            <AssetAccordionHeader title={title} toggleExpand={() => setIsExpanded(!isExpanded)} isExpanded={isExpanded} />
            <AssetAccordionMain asset={asset} height={isExpanded ? '330' : '0'}>
                {children}
            </AssetAccordionMain>
        </Box>
    )
}