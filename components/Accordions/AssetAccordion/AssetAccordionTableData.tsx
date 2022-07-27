import { Box } from '../../Box/Box'
import { AssetAccordionTableDataCell, AssetAccordionTableDataCellPosition } from './AssetAccordionTableDataCell'

interface Props {
    data: string[]
    row: AssetAccordionTableDataCellPosition
    headerLength: number
}

export const AssetAccordionTableData: React.FC<Props> = ({
    data,
    row,
    headerLength
}) => {
    return (
    <Box
        as='td'
        style={{display: 'contents'}}
    >
        {data 
            ? data.length > 0 
                ? data.map((d, index) => { 
                    if(index < headerLength) // Todo: add check if datalength is smaller than headerlength
                        return (
                            <AssetAccordionTableDataCell 
                                key={d}
                                column={
                                    index === 0 
                                        ? AssetAccordionTableDataCellPosition.First 
                                        : index === data.length - 1
                                            ? AssetAccordionTableDataCellPosition.Last
                                            : AssetAccordionTableDataCellPosition.Middle
                                }
                                row={row}
                            >
                                {d}
                            </AssetAccordionTableDataCell>
                        )
                })
                : ''
            : ''
        }
    </Box>
    )
}