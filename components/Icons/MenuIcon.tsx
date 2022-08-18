import { FC } from 'react'
import { sprinkles } from '../../styles/sprinkles.css'
import { BoxProps } from '../Box/Box'

interface Props {
    width?: BoxProps['width']
    height?: BoxProps['height']
    fill?: BoxProps['fill']
    fillOnHover?: BoxProps['fill']
}

export const MenuIcon: FC<Props> = ({
    width = '24',
    height,
    fill = 'black',
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
                d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"
            />
        </svg>
    )
}