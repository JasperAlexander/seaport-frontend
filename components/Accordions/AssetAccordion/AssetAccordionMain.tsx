import { AssetType } from '../../../types/assetTypes'
import { Box } from '../../Box/Box'

interface Props {
    children?: React.ReactNode
    asset: AssetType | undefined
    height?: any
}

export const AssetAccordionMain: React.FC<Props> = ({
    children,
    asset,
    height = '330'
}: Props) => {
    return (
        <Box
            maxHeight={height}
            overflow='hidden'
            fontSize='15'
            style={{
                borderTop: height === '330' ? '1px solid rgb(229, 232, 235)' : 'none',
                transition: 'max-height 250ms ease-in-out'
            }}
        >
            {children}
        </Box>
    )
}