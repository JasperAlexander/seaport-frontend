import { FC } from 'react'
import { sprinkles } from '../../styles/sprinkles.css'
import { BoxProps } from '../Box/Box'

interface Props {
    width?: BoxProps['width']
    height?: BoxProps['height']
    fill?: BoxProps['fill']
    fillOnHover?: BoxProps['fill']
}

export const EthFlatIcon: FC<Props> = ({
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
            viewBox="0 0 20 20"
        >
            <path 
                d="M10.1895 12.9442L10.0821 13.0512L5.16413 10.1484L10.0821 2L10.1895 2.36459V12.9442Z" 
                fill="#707A83"
            />
            <path 
                d="M10.082 13.0513V2L15 10.1484L10.082 13.0513Z" 
                fill="#707A83"
            />
            <path 
                d="M10.1427 17.8234L10.0822 18L5.16124 11.0797L10.0821 13.9811L10.1427 14.0547L10.1427 17.8234Z" 
                fill="#707A83"
            />
            <path 
                d="M15 11.0797L10.082 18V13.9811L15 11.0797Z" 
                fill="#707A83"
            />
            <path 
                d="M10.0823 7.91629V13.0512L5.16442 10.1484L10.0823 7.91629Z" 
                fill="#707A83"
            />
            <path 
                d="M10.0821 7.91629L15 10.1484L10.0821 13.0512V7.91629Z" 
                fill="#707A83"
            />
        </svg>
    )
}
