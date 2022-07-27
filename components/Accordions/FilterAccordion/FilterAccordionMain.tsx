import { Box } from '../../Box/Box'

interface Props {
    children?: React.ReactNode
    height?: any
}

export const FilterAccordionMain: React.FC<Props> = ({
    children,
    height = '330'
}: Props) => {
    return (
        <Box
            display='flex'
            flexDirection='column'
            maxHeight={height}
            overflow='hidden'
            fontSize='15'
            // style={{
            //     transition: 'max-height 250ms ease-in-out'
            // }}
        >
            {children}
        </Box>
    )
}