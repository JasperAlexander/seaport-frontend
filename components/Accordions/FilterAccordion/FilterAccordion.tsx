import { Box } from '../../Box/Box'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { FilterAccordionHeader } from './FilterAccordionHeader'
import { FilterAccordionMain } from './FilterAccordionMain'
import { FilterAccordionMainItem } from './FilterAccordionMainItem'

interface Props {
    initialExpandedState?: boolean,
    headerTitle: string,
    items: string[],
    filterState: { filter: string[] },
    setFilterState: Dispatch<SetStateAction<{
        filter: string[]
    }>>,
    display?: boolean
}

export const FilterAccordion: React.FC<Props> = ({
    initialExpandedState = false,
    headerTitle,
    items,
    filterState,
    setFilterState,
    display = true
}) => {
    const [isExpanded, setIsExpanded] = useState(initialExpandedState)

    const handleFilterChange = async(key: string) => {
        let fil = filterState.filter
        let find = fil.indexOf(key)

        if(find > -1) {
            fil = fil.filter((f) => { return f !== key })
        } else {
            fil.push(key)
        }

        setFilterState({filter: fil})
    }

    return (
        <Box
            display={display ? 'initial' : 'none'}
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
                    {items.map((item) => (
                        <FilterAccordionMainItem 
                            title={item} 
                            key={item}
                            checked={filterState.filter.includes(item)}
                            handleFilterChange={() => handleFilterChange(item)} 
                        />
                    ))}
                </FilterAccordionMain>
            : ''
            }
        </Box>
    )
}