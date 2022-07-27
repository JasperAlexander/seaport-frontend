import { Box } from '../../Box/Box'
import { useState } from 'react'
import { FilterAccordionHeader } from './FilterAccordionHeader'
import { FilterAccordionMain } from './FilterAccordionMain'
import { FilterAccordionMainItem } from './FilterAccordionMainItem'

interface Props {
    initialExpandedState?: boolean,
    headerTitle: string,
    items: string[]
}

export const FilterAccordion: React.FC<Props> = ({
    initialExpandedState = false,
    headerTitle,
    items
}) => {
    const [isExpanded, setIsExpanded] = useState(initialExpandedState)

    return (
        <Box
          position='sticky'
          marginLeft='-10'
          marginRight='16'
          paddingRight='16'
          paddingTop='8'
          style={{top: '138px', height: 'calc(-138px + 100vh)', width: '340px'}}
        >
            <FilterAccordionHeader 
                title={headerTitle}
                toggleExpand={() => setIsExpanded(!isExpanded)} 
                isExpanded={isExpanded} 
            />
            {items.length > 0
            ?
                <FilterAccordionMain height={isExpanded ? '330' : '0'}>
                    {items.map((i) => (
                        <FilterAccordionMainItem title={i} />
                    ))}
                </FilterAccordionMain>
            : ''
            }
        </Box>
    )
}