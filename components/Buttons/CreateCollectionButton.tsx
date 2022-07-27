import { Button } from './Button'
import { CollectionInputState } from '../../pages/collection/create'
import router from 'next/router'
import { useCollections } from '../../hooks/useCollections'

export function CreateCollectionButton({
    inputState
}: {
    inputState: CollectionInputState
}) {
    const { addCollection } = useCollections()

    return (
        <Button
            label='Create Collection'
            onClick={() => {
                addCollection(
                        inputState.name,
                        inputState.external_link,
                        inputState.description,
                    ),
                    router.push('/profile') 
            }}
        />
    )
}