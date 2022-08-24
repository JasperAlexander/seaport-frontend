import { FC } from 'react'
import { sprinkles } from '../../styles/sprinkles.css'
import { BoxProps } from '../Box/Box'

interface Props {
    width?: BoxProps['width']
    height?: BoxProps['height']
    fill?: BoxProps['fill']
    fillOnHover?: BoxProps['fill']
}

export const TransferIcon: FC<Props> = ({
    width = '24',
    height,
    fill = 'defaultText',
    fillOnHover
}) => {
    return (
        <svg 
            className={sprinkles({
                width: width,
                height: height ? height : width,
                fill: {
                    // @ts-ignore
                    base: fill,
                    // @ts-ignore
                    hover: fillOnHover ? fillOnHover : fill
                }
            })}
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
        >
            <path 
                d="m17 4 4 4-4 4V9h-4V7h4V4zm-7 3c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1zM6 7c-.55 0-1 .45-1 1s.45 1 1 1 1-.45 1-1-.45-1-1-1zm1 10h4v-2H7v-3l-4 4 4 4v-3zm7 0c.55 0 1-.45 1-1s-.45-1-1-1-1 .45-1 1 .45 1 1 1zm4 0c.55 0 1-.45 1-1s-.45-1-1-1-1 .45-1 1 .45 1 1 1z"
            />
        </svg>
    )
}