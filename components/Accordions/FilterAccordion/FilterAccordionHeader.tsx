import { Box } from '../../Box/Box'
import { ExpandLess } from '../../Icons/ExpandLess'
import { ExpandMore } from '../../Icons/ExpandMore'

interface Props {
    title: string
    toggleExpand: () => void
    isExpanded: boolean
}

export const FilterAccordionHeader: React.FC<Props> = ({
    title,
    toggleExpand,
    isExpanded,
}: Props) => {
    return (
        <Box
            as='button'
            display='flex'
            alignItems='center'
            justifyContent='space-between'
            width='full'
            height='48'
            paddingX='10'
            fontWeight='semibold'
            onClick={() => toggleExpand()}
          >
            {title}
            <Box>
                {isExpanded 
                    ? <ExpandLess width='24' color='black' />
                    : <ExpandMore width='24' color='black' />
                }
            </Box>
        </Box>
    )
}