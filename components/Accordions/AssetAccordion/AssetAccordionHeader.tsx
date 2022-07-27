import { Box } from '../../Box/Box'
import { ExpandLess } from '../../Icons/ExpandLess'
import { ExpandMore } from '../../Icons/ExpandMore'

interface Props {
    title: string
    toggleExpand: () => void
    isExpanded: boolean
}

export const AssetAccordionHeader: React.FC<Props> = ({
    title,
    toggleExpand,
    isExpanded,
}: Props) => {
    return (
        <Box
            as='button'
            margin='0'
            borderWidth='0'
            width='full'
            display='flex'
            padding='20'
            alignItems='center'
            userSelect='none'
            cursor='pointer'
            borderRadius='10'
            fontWeight='semibold'
            onClick={() => toggleExpand()}
        >
            {title}
            <Box
                marginLeft='auto'
            >
                {isExpanded 
                    ? <ExpandLess width='24' color='black' />
                    : <ExpandMore width='24' color='black' />
                }
            </Box>
        </Box>
    )
}