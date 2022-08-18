import { FC, Fragment, useEffect, useRef } from 'react'
import { useSidebars } from '../../hooks/useSidebars'
import { sprinkles } from '../../styles/sprinkles.css'
import { Box } from '../Box/Box'
import { FilterListIcon } from '../Icons/FilterListIcon'
import { SortIcon } from '../Icons/SortIcon'
import SortMenu from '../Menus/SortMenu'

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
            style={{marginLeft: 'calc(50% - 50vw)', marginRight: 'calc(50% - 50vw)'}}
            top='71'
            display='flex'
            alignItems='center'
            paddingX='16'
            background='defaultBackground'
            zIndex='200'
            className={sprinkles({
                display: {
                    largeScreen: 'none',
                    wideScreen: 'none'
                }
            })}
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
                    className={sprinkles({
                        boxShadow: {
                            hover: 'subHeader'
                        },
                        background: {
                            active: 'buttonBackgroundActive'
                        }
                    })}
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
                    className={sprinkles({
                        boxShadow: {
                            hover: 'subHeader'
                        },
                        background: {
                            active: 'buttonBackgroundActive'
                        }
                    })}
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
            id='unstuckedHeader'
            height='66'
            style={{marginLeft: 'calc(50% - 50vw)', marginRight: 'calc(50% - 50vw)'}}
            top='71'
            // display='flex'
            alignItems='center'
            width='full'
            paddingX='32'
            background='defaultBackground'
            zIndex='200'
            className={sprinkles({
                display: {
                    largeScreen: 'flex',
                    wideScreen: 'flex'
                }
            })}
            display='none'
        >
            {/* <Box
                display='flex'
                width='full'
                alignItems='center'
                gap='8'
                paddingTop='16'
                className={sprinkles({
                    display: {
                        largeScreen: 'none',
                        wideScreen: 'none'
                    }
                })}
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
            </Box> */}
            {/* <Box
                // display='none'
                // width='full'
                // alignItems='center'
                // className={sprinkles({
                //     display: {
                //         largeScreen: 'flex',
                //         wideScreen: 'flex'
                //     }
                // })}
            > */}
                <Box
                    as='button'
                    display='flex'
                    alignItems='center'
                    justifyContent='center'
                    padding='12'
                    borderRadius='24'
                    className={sprinkles({
                        boxShadow: {
                            hover: 'subHeader'
                        },
                        background: {
                            active: 'buttonBackgroundActive'
                        }
                    })}
                    onClick={toggleShowFilters}
                >
                    <FilterListIcon />
                </Box>
                <Box
                    marginLeft='auto'
                    flexShrink='0'
                >
                    <SortMenu 
                        options={[
                            { key: 'recentlycreated', name: 'Recently created' },
                            { key: 'recentlylisted', name: 'Recently listed' }
                        ]}
                        defaultOptionName={'Recently created'}
                        mutateData={mutate}
                    />
                </Box>
                <Box>
                {/* View mode */}
                </Box>
            </Box>
        {/* </Box> */}
        </Fragment>
    )
}