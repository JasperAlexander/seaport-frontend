import { Box } from '../../Box/Box'
import { AssetAccordionTableHeaderCell, AssetAccordionTableHeaderCellPosition } from './AssetAccordionTableHeaderCell'

interface Props {
    data: string[]
}

export const AssetAccordionTableHeader: React.FC<Props> = ({
    data,
}) => {
    return (
    <Box
        as='tr'
        style={{display: 'contents'}}
    >
        {data 
            ? data.length > 0 
                ? data.map((d, index) => (
                    <AssetAccordionTableHeaderCell 
                        key={d}
                        column={
                            index === 0 
                                ? AssetAccordionTableHeaderCellPosition.First 
                                : index === data.length - 1
                                    ? AssetAccordionTableHeaderCellPosition.Last
                                    : AssetAccordionTableHeaderCellPosition.Middle
                        }
                    >
                        {d}
                    </AssetAccordionTableHeaderCell>
                ))
                : ''
            : ''
        }
    </Box>
    )
}