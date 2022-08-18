import { FC } from 'react'
import { sprinkles } from '../../styles/sprinkles.css'
import { BoxProps } from '../Box/Box'

interface Props {
    width?: BoxProps['width']
    height?: BoxProps['height']
    fill?: BoxProps['fill']
    fillOnHover?: BoxProps['fill']
}

export const WethIcon: FC<Props> = ({
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
            viewBox="0 0 33 53" 
        >
            <path d="M16.8498 0.666687L16.4974 1.85009V36.1896L16.8498 36.5371L32.9842 27.115L16.8498 0.666687Z" fill="#DA3979"/>
            <path d="M16.85 0.666687L0.715607 27.115L16.85 36.5372V19.8699V0.666687Z" fill="#E781A9"/>
            <path d="M16.8497 39.5552L16.6511 39.7944V52.0268L16.8497 52.6L32.9937 30.1378L16.8497 39.5552Z" fill="#DA3979"/>
            <path d="M16.85 52.5998V39.5551L0.715607 30.1377L16.85 52.5998Z" fill="#E781A9"/>
            <path d="M16.8497 36.537L32.9838 27.1151L16.8497 19.8699V36.537Z" fill="#671334"/>
            <path d="M0.715607 27.1151L16.8498 36.537V19.8699L0.715607 27.1151Z" fill="#DA3979"/>
        </svg>
    )
}
  