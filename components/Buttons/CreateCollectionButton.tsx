import router from 'next/router'
import { CollectionInputType } from '../../types/collectionTypes'
import useMounted from '../../hooks/useMounted'

const addCollection = async(inputState: CollectionInputType) => {
    const href = `http://localhost:8000/api/v1/collections/create/`

    const options = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: inputState.name,
            description: inputState.description,
            slug: inputState.slug,
            banner_image_url: inputState.banner_image_url,
            image_url: inputState.image_url,
            external_url: inputState.external_url,
            twitter_username: inputState.twitter_username,
            instagram_username: inputState.instagram_username,
            medium_username: inputState.medium_username,
            is_nsfw: inputState.is_nsfw,
            payment_tokens: inputState.payment_tokens
        })
    }

    const res = await fetch(href, options)

    console.log('POST done with response: ', res)

    return res.json()
}

export function CreateCollectionButton({
    inputState
}: {
    inputState: CollectionInputType
}) {
    const { mounted } = useMounted()

    return (
        // <Button
        //     label='Create Collection'
        //     onClick={() => {
        //         mounted &&
        //             addCollection(inputState),
        //             router.push(`/collection/${inputState.slug}`) 
        //     }}
        // />
        <p>test</p>
    )
}