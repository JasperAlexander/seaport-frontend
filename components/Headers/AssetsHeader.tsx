import { FC, Fragment, useEffect, useRef } from 'react'
import { useSidebars } from '../../hooks/useSidebars'
import { Box } from '../Box/Box'
import { RoundButton } from '../Buttons/RoundButton'
import { FilterListIcon } from '../Icons/FilterListIcon'
import { SortIcon } from '../Icons/SortIcon'
import { SortSelect } from '../Selects/SortSelect'

interface Props {
    toggleShowFilters: () => void
    mutate?: any
}

export const AssetsHeader: FC<Props> = ({
    toggleShowFilters,
    mutate
}) => {
    const { toggleFilterSidebar } = useSidebars()

    const observer = useRef<IntersectionObserver | null>(null)
      
    useEffect(() => {
        if(observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver( 
            ([e]) => {
                // Toggle classes only when observed target has height and top is below 100
                if(e?.rootBounds?.height && e.boundingClientRect['top'] < 100) {
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

    return (
        <Fragment>
            <Box
                height='66'
                style={{
                    marginLeft: 'calc(50% - 50vw)', 
                    marginRight: 'calc(50% - 50vw)'
                }}
                top='71'
                alignItems='center'
                paddingX='16'
                background='defaultBackground'
                zIndex='200'
                display={{
                    base: 'flex',
                    largeScreen: 'none',
                    wideScreen: 'none'
                }}
            >
                <Box
                    display='flex'
                    width='full'
                    alignItems='center'
                    gap='8'
                    paddingTop='16'
                >
                    <Box
                        as='button'
                        onClick={toggleFilterSidebar}
                        display='flex'
                        alignItems='center'
                        justifyContent='center'
                        width='50p'
                        borderRadius='10'
                        borderStyle='solid'
                        borderWidth='2'
                        borderColor='box'
                        paddingY='12'
                        fontWeight='600'
                        gap='8'
                        boxShadow={{
                            hover: 'subHeader'
                        }}
                        background={{
                            active: 'buttonBackgroundActive'
                        }}
                    >
                        <Box
                            display='flex'
                            alignItems='center'
                            gap='8'
                        >
                            <FilterListIcon />
                            Filters
                        </Box>
                    </Box>
                    <Box
                        as='button'
                        display='flex'
                        alignItems='center'
                        justifyContent='center'
                        width='50p'
                        borderRadius='10'
                        borderStyle='solid'
                        borderWidth='2'
                        borderColor='box'
                        paddingY='12'
                        fontWeight='600'
                        boxShadow={{
                            hover: 'subHeader'
                        }}
                        background={{
                            active: 'buttonBackgroundActive'
                        }}
                    >
                        <Box
                            display='flex'
                            alignItems='center'
                            gap='8'
                        >
                            <SortIcon />
                            Sort
                        </Box>
                    </Box>
                </Box>
            </Box>

            <Box
                position='sticky'
                height='66'
                top='71'
                alignItems='center'
                width='full'
                background='defaultBackground'
                zIndex='200'
                display={{
                    base: 'none',
                    largeScreen: 'flex',
                    wideScreen: 'flex'
                }}
            >
                <Box
                    position='absolute'
                    id='unstuckedHeader'
                    style={{width: '100vw', left: 'calc(50% + 0px - 50vw)', right: 'calc(50% + 0px - 50vw)'}}
                    height='full'
                    top='0'
                >
                    <Box
                        display='flex'
                        alignItems='center'
                        width='full'
                        height='full'
                        paddingX='32'
                    >
                        <RoundButton
                            onClick={toggleShowFilters}
                        >
                            <FilterListIcon />
                        </RoundButton>
                        <Box
                            marginLeft='auto'
                            flexShrink='0'
                        >
                            <SortSelect 
                                mutateData={mutate}
                            />
                        </Box>
                        {/* To do: add buttons to change view mode */}
                    </Box>
                </Box>
            </Box>
        </Fragment>
    )
}