import { Box } from '../../Box/Box'

export enum AssetAccordionTableDataCellPosition {
    First,
    Middle,
    Last
}

interface Props {
    children: React.ReactNode
    column?: AssetAccordionTableDataCellPosition
    row?: AssetAccordionTableDataCellPosition
}

export const AssetAccordionTableDataCell: React.FC<Props> = ({
    children,
    column,
    row
}) => {
    return (
        <Box
            as='td'
            display='flex'
            alignItems='center'
            paddingY='16'
            paddingLeft={column === AssetAccordionTableDataCellPosition.First ? '16' : '8'}
            paddingRight={column === AssetAccordionTableDataCellPosition.Last ? '8' : '16'}
            style={{borderBottom: row === AssetAccordionTableDataCellPosition.Last ? '0' : '1px solid rgb(229, 232, 235)'}}
        >
            {children}
        </Box>
    )
}