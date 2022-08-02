import { useState, useEffect } from 'react'
import { useAssets } from '../../hooks/useAssets'
import { Box } from '../Box/Box'
import { Button } from './Button'
import { AssetInputState } from '../../pages/create'
import { useAccount } from 'wagmi'
import toast from 'react-hot-toast'
import router from 'next/router'
import { randomBN } from '../../utils/encoding'
import { useEvents } from '../../hooks/useEvents'
import { EventTypes } from '../../types/eventTypes'
import { BigNumber } from 'ethers'

const contractAddresses = require(('../../utils/contractAddresses.json'))

export function CreateAssetButton({
    inputState
}: {
    inputState: AssetInputState
}) {
    const [isLoadingDOM, setIsLoadingDOM] = useState(true)
    const { assets, addAsset } = useAssets()
    const { addEvent } = useEvents()
    const { address } = useAccount()
    const tempTokenID = randomBN()

    useEffect(() => {
        setIsLoadingDOM(false)
    }, [])

    return (
        <Button
            label='Create Asset'
            onClick={() => { !isLoadingDOM && inputState.name 
                ? ( 
                    addAsset(
                        tempTokenID,
                        inputState.image_url,
                        inputState.background_color,
                        inputState.name,
                        inputState.description,
                        inputState.external_link,
                        {
                            address: contractAddresses.TestERC721,
                            name: 'Bored Ape Yacht Club',
                            symbol: 'BAYC',
                            image_url: 'https://img.seadn.io/files/282f2571f72e2f4c6597dc36885923b8.png?fit=max&w=600',
                            description: 'testtt',
                            external_link: 'https://google.com'
                        },
                        address ? address : '',
                        'test'
                    ),
                    addEvent(
                        EventTypes.created,
                        {
                            contract_address: contractAddresses.TestERC721,
                            token_id: tempTokenID
                        },
                        new Date(),
                        '',
                        address ? address : '',
                        false,
                        '',
                        1,
                        '',
                        undefined
                    ),
                    router.push('/profile') 
                )
                : toast('Enter a name') 
            }}
        />
    )
}