import { FC } from 'react'
import { sprinkles } from '../../styles/sprinkles.css'
import { BoxProps } from '../Box/Box'

interface Props {
    width?: BoxProps['width']
    height?: BoxProps['height']
    fill?: BoxProps['fill']
    fillOnHover?: BoxProps['fill']
}

export const ChevronRightIcon: FC<Props> = ({
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
                d="M0 0h24v24H0z" 
                fill="none"
            />
            <path 
                d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"
            />
        </svg>
    )
}