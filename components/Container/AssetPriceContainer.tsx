import { Fragment, useCallback, useState } from 'react'
import { sprinkles } from '../../styles/sprinkles.css'
import { AssetType } from '../../types/assetTypes'
import { EventType } from '../../types/eventTypes'
import { Box } from '../Box/Box'
import { ETH } from '../Icons/ETH'
import { BuyModal } from '../Modals/BuyModal'

interface Props {
    asset: AssetType | undefined
    assetEventsCreated: EventType[]
}

export const AssetPriceContainer: React.FC<Props> = ({
    asset,
    assetEventsCreated
}: Props) => {
    const useBooleanState = (initialValue: boolean) => {
        const [value, setValue] = useState(initialValue)
        const setTrue = useCallback(() => setValue(true), [])
        const setFalse = useCallback(() => setValue(false), [])
    
        return { setFalse, setTrue, value }
    }

    const {
        setFalse: closeBuyModal,
        setTrue: openBuyModal,
        value: buyModalOpen,
    } = useBooleanState(false)
    
    return (
        <Box
            marginY='20'
            borderRadius='10'
            borderStyle='solid'
            borderWidth='1'
            borderColor='box'
            overflow='hidden'
            className={sprinkles({
                marginX: {
                    largeScreen: '20'
                }
            })}
        >
            {assetEventsCreated.length > 0 && assetEventsCreated[0].order && asset
                ?
                    <Fragment>
                        <Box
                            padding='20'
                            style={{borderBottom: '1px solid rgb(229, 232, 235)'}}
                        >
                            Sale ends at..
                        </Box>
                        <Box
                            padding='20'
                        >
                            <Box>
                                Current price
                            </Box>
                            <Box
                                display='flex'
                                flexWrap='wrap'
                                marginBottom='8'
                            >
                                <Box
                                    fontSize='30'
                                    display='flex'
                                    alignItems='center'
                                    fontWeight='semibold'
                                    width='fit'
                                    maxWidth='full'
                                    marginLeft='-6'
                                >
                                    <ETH width='28' height='28' color='black' />
                                    <Box
                                        marginLeft='5'
                                    >
                                        Price
                                    </Box>
                                </Box>
                                <Box
                                    fontSize='15'
                                    marginLeft='8'
                                    marginTop='12'
                                    width='fit'
                                    maxWidth='full'
                                >
                                    (price)
                                </Box>
                            </Box>
                            <Box
                                display='flex'
                                maxWidth='420'
                            >
                                <Box
                                    paddingY='20'
                                    paddingX='40'
                                    background='accentColor'
                                    borderRadius='10'
                                    cursor='pointer'
                                    color='white'
                                    onClick={() => openBuyModal()}
                                >
                                    Buy now
                                </Box>
                                <BuyModal asset={asset} order={assetEventsCreated[0].order} onClose={closeBuyModal} open={buyModalOpen} />
                            </Box>
                        </Box>
                    </Fragment>
                : 
                    <Box
                        padding='20'
                    >
                        Not for sale
                    </Box>
            }
        </Box>
    )
}