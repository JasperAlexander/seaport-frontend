import { Box } from '../../Box/Box'
import { AssetAccordionTableData } from './AssetAccordionTableData'
import { AssetAccordionTableDataCellPosition } from './AssetAccordionTableDataCell'
import { AssetAccordionTableHeader } from './AssetAccordionTableHeader'

interface Props {
    header: string[]
    data: string[][]
}

export const AssetAccordionTable: React.FC<Props> = ({
    header,
    data
}) => {
    return (
        <Box
            as='table'
            maxHeight='330'
            overflowY='scroll'
            width='full'
            display='grid'
            // style={{gridTemplateColumns: 'minmax(auto, auto) minmax(auto, auto) minmax(auto, auto) minmax(auto, auto) minmax(auto, auto)'}}
            style={{gridTemplateColumns: `repeat(${header.length}, minmax(auto, auto))`}}
        >
            <AssetAccordionTableHeader data={header} />
            {data
                ? data.length > 0
                    ? data.map((d, index) => (
                        <AssetAccordionTableData 
                            data={d} 
                            key={d[index]}
                            row={index === data.length - 1 
                                ? AssetAccordionTableDataCellPosition.Last 
                                : AssetAccordionTableDataCellPosition.Middle
                            } 
                            headerLength={header.length}
                        />
                    ))
                    : ''
                : ''
            }
        </Box>
    )
}