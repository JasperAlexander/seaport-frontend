import { Box } from '../../Box/Box'

export enum AssetAccordionTableHeaderCellPosition {
    First,
    Middle,
    Last
}

interface Props {
    children: React.ReactNode
    column?: AssetAccordionTableHeaderCellPosition
}

export const AssetAccordionTableHeaderCell: React.FC<Props> = ({
    children,
    column
}) => {
    return (
        <Box
            as='th'
            display='flex'
            paddingY='4'
            fontWeight='regular'
            paddingLeft={column === AssetAccordionTableHeaderCellPosition.First ? '16' : '8'}
            paddingRight={column === AssetAccordionTableHeaderCellPosition.Last ? '8' : '16'}
            style={{borderBottom: '1px solid rgb(229, 232, 235)'}}
        >
            {children}
        </Box>
    )
}