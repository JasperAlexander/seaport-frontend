import { FC, Fragment, useEffect, useRef, useState } from 'react'
import { Box } from '../../Box/Box'
import { RoundButton } from '../../Buttons/RoundButton'
import { FilterSideDialogTrigger } from '../../DialogTriggers/FilterSideDialogTrigger'
import { FilterListIcon } from '../../Icons/FilterListIcon'
import { SortIcon } from '../../Icons/SortIcon'
import { SortSelect } from '../../Selects/SortSelect'
import * as styles from './AssetGridHeader.css'
import { Text } from '../../Text/Text'

interface Props {
    toggleShowFilters: () => void
    mutate?: any
}

export const AssetGridHeader: FC<Props> = ({
    toggleShowFilters,
    mutate
}) => {
    const [filterSideDialogOpen, setFilterSideDialogOpen] = useState<boolean>(false)

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
                className={styles.assetGridHeaderSmall}
            >
                <Box
                    display='flex'
                    width='full'
                    alignItems='center'
                    gap='8'
                    paddingTop='16'
                >
                    <FilterSideDialogTrigger
                        open={filterSideDialogOpen}
                        setOpen={setFilterSideDialogOpen}
                    >
                        <Box
                            as='button'
                            className={styles.assetGridHeaderButton}
                        >
                            <Box
                                display='flex'
                                alignItems='center'
                                gap='8'
                            >
                                <FilterListIcon />
                                <Text
                                    fontWeight='600'
                                >
                                    Filters
                                </Text>
                            </Box>
                        </Box>
                    </FilterSideDialogTrigger>
                    <Box
                        as='button'
                        className={styles.assetGridHeaderButton}
                    >
                        <Box
                            display='flex'
                            alignItems='center'
                            gap='8'
                        >
                            <SortIcon />
                            <Text
                                fontWeight='600'
                            >
                                Sort
                            </Text>
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
                    style={{left: 'calc(50% + 0px - 50vw)', right: 'calc(50% + 0px - 50vw)'}}
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