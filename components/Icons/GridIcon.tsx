import { FC } from 'react'
import { sprinkles } from '../../styles/sprinkles.css'
import { BoxProps } from '../Box/Box'

interface Props {
    width?: BoxProps['width']
    height?: BoxProps['height']
    fill?: BoxProps['fill']
    fillOnHover?: BoxProps['fill']
}

export const GridIcon: FC<Props> = ({
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
                d="M20 2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM8 20H4v-4h4v4zm0-6H4v-4h4v4zm0-6H4V4h4v4zm6 12h-4v-4h4v4zm0-6h-4v-4h4v4zm0-6h-4V4h4v4zm6 12h-4v-4h4v4zm0-6h-4v-4h4v4zm0-6h-4V4h4v4z"
            />
        </svg>
    )
}