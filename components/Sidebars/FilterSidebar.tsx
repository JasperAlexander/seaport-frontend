import { Box } from '../Box/Box'
import { useSidebars } from '../../hooks/useSidebars'
import { sprinkles } from '../../styles/sprinkles.css'
import { FilterAccordion } from '../Accordions/FilterAccordion/FilterAccordion'
import { toggleOffItems } from '../../utils/router'
import { useRouter } from 'next/router'
import useMounted from '../../hooks/useMounted'
import { CloseIcon } from '../Icons/CloseIcon'

export const FilterSidebar: React.FC = () => {
  const { isFilterSidebarOpen, toggleFilterSidebar } = useSidebars()
  const router = useRouter()

  const { mounted } = useMounted()

    return (
        <Box
            as='aside'
            style={{
                transition: 'all 0.3s ease 0s, opacity 0.3s ease 0s', 
                transform: isFilterSidebarOpen ? 'translate3d(0px, 0px, 0px) translate3d(0px, 0px, 0px)' : 'translate3d(0px, 100%, 0px) translate3d(0px, 0px, 0px)',
                filter: 'drop-shadow(rgba(0, 0, 0, 0.25) 0px 4px 4px)'
            }}
            zIndex='300'
            background='defaultBackground'
            whiteSpace='nowrap'
            inset='0'
            flexGrow='1'
            position='fixed'
            opacity={isFilterSidebarOpen ? '1' : '0'}
        >
            <Box
                display='flex'
                flexDirection='column'
                padding='16'
            >
                <Box
                    display='flex'
                    alignItems='center'
                    justifyContent='center'
                    position='relative'
                    fontSize='20'
                    fontWeight='600'
                    height='48'
                >
                    Filters
                    <Box
                        as='button'
                        position='absolute'
                        right='0'
                        onClick={toggleFilterSidebar}
                        padding='12'
                        display='flex'
                        alignItems='center'
                        borderRadius='full'
                        className={sprinkles({
                            boxShadow: {
                              hover: 'subHeader'
                            },
                            background: {
                              active: 'buttonBackgroundActive'
                            }
                        })}
                    >
                        <CloseIcon />
                    </Box>
                </Box>
                <FilterAccordion
                    items={[
                        { 
                            header: { name: 'Status', key: 'status' },
                            content: [
                                { name: 'Buy now', key: 'buynow' }, 
                                { name: 'Test', key: 'test' }
                            ]
                        }
                    ]}
                    display={true}
                />
            </Box>
            <Box
                padding='16'
                position='sticky'
                display='flex'
                gap='8'
                bottom='0'
                borderTopWidth='1'
                borderColor='box'
                borderStyle='solid'
            >
                <Box
                    as='button'
                    onClick={() => toggleOffItems(router)}
                    display='flex'
                    alignItems='center'
                    justifyContent='center'
                    fontWeight='600'
                    padding='16'
                    borderWidth='2'
                    borderColor='box'
                    borderStyle='solid'
                    borderRadius='10'
                    width='full'
                >
                    Clear all
                </Box>
                <Box
                    as='button'
                    onClick={toggleFilterSidebar}
                    display='flex'
                    alignItems='center'
                    justifyContent='center'
                    fontWeight='600'
                    padding='16'
                    borderWidth='2'
                    borderColor='box'
                    borderStyle='solid'
                    borderRadius='10'
                    width='full'
                >
                    Done
                </Box>
            </Box>
        </Box>
    )
}