import { Dispatch, SetStateAction, useEffect, useRef } from 'react'
import { sprinkles } from '../../styles/sprinkles.css'
import { Box } from '../Box/Box'
import { FilterList } from '../Icons/FilterList'
import { Select } from '../Input/Select'

interface Props {
    sortState: { sort: string },
    setSortState: Dispatch<SetStateAction<{
        sort: string
    }>>,
    toggleShowFilters: () => void
}

export const AssetsHeader: React.FC<Props> = ({
    sortState,
    setSortState,
    toggleShowFilters
}) => {
    const observer = useRef<IntersectionObserver | null>(null)
      
    useEffect(() => {
        if(observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver( 
            ([e]) => {
                if(e.boundingClientRect['top'] < 100) {
                    e.target.classList.toggle('stuck', e.intersectionRatio < 1)
                    document.getElementById('stuckedHeader')?.classList.toggle('unstuck', e.intersectionRatio < 1)
                }
            },
            {
                threshold: [1], 
                rootMargin: '-72px 0px 0px 0px'
            }
        )
        const { current: currentObserver } = observer
        currentObserver.observe(document.querySelector('#unstuckedHeader')!)

        return () => currentObserver.disconnect()
    })

    const handleSortChange = async(key: string) => {
        setSortState({sort: key})
    }

    return (
        <Box
            position='sticky'
            id='unstuckedHeader'
            height='66'
            style={{marginLeft: 'calc(50% - 50vw)', marginRight: 'calc(50% - 50vw)'}}
            top='71'
            display='flex'
            alignItems='center'
            paddingX='32'
            background='defaultBackground'
            zIndex='2'
        >
            <Box
                as='button'
                padding='12'
                borderRadius='24'
                className={sprinkles({
                    background: {
                        hover: 'filterHover'
                    }
                })}
                onClick={toggleShowFilters}
            >
                <FilterList width='24' color='black' />
            </Box>
            <Box
                marginLeft='auto'
                flexShrink='0'
            >
                <Select 
                    type='select'
                    name='sort' 
                    value={sortState.sort} 
                    onChange={(e) => handleSortChange(e.target.value)} 
                    options={['Recently listed', 'Recently created']}
                />
            </Box>
            <Box>
            {/* View mode */}
            </Box>
        </Box>
    )
}