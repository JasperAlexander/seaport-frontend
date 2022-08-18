import { ComponentPropsWithoutRef, FC, useEffect, useState } from 'react'
import { sprinkles } from '../../styles/sprinkles.css'
import { Box } from '../Box/Box'

interface Props {
    placeholderSrc: any
    src: any 
    props: ComponentPropsWithoutRef<"img">
}

export const ProgressiveImg: FC<Props> = ({
    placeholderSrc, 
    src, 
    ...props
}) => {
    const [imgSrc, setImgSrc] = useState(placeholderSrc || src)

    useEffect(() => {
        const img = new Image()
        img.src = src
        img.onload = () => {
            setImgSrc(src)
        }
    }, [src])

    const customClass =
    placeholderSrc && imgSrc === placeholderSrc ? "loading" : "loaded"
    
    return (
        <Box
            as='img'
            {...{ src: imgSrc, ...props }}
            alt={props.props.alt || ""}
            // className="image"
            dimension='full'
            className={sprinkles({
                transition: 'assetCardImage',
                scale: {
                    hover: 'growLg'
                }
            }) + `image ${customClass}`} 
        />
    )
}