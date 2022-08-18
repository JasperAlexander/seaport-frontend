import { FC } from 'react'
import { sprinkles } from '../../styles/sprinkles.css'
import { BoxProps } from '../Box/Box'

interface Props {
    width?: BoxProps['width']
    height?: BoxProps['height']
    fillCircle?: BoxProps['stroke']
    fillProgress?: BoxProps['stroke']
    fillText?: BoxProps['fill']
    text?: string
    fontSize?: BoxProps['fontSize']
    fontWeight?: BoxProps['fontWeight']
    progressing?: boolean
}

export const LoadingIcon: FC<Props> = ({
    width = '38',
    height,
    fillCircle = 'box',
    fillProgress = 'accentColor',
    fillText = 'black',
    text,
    fontSize = '16',
    fontWeight = '600',
    progressing = true
}) => {
    return (
        <svg 
            className={sprinkles({
                overflow: 'visible',
                width: width,
                height: height ? height : width,
            })}
        >
            <circle 
                cx="19" 
                cy="19" 
                fill="#FFFFFF" 
                r="18" 
                strokeDasharray="117.49556524425827" 
                strokeDashoffset="0" 
                strokeWidth="3" 
                className={sprinkles({
                    stroke: fillCircle,
                    transition: 'progress'
                })}
            />
            <circle 
                cx="19" 
                cy="19" 
                fill="none" 
                r="17" 
                strokeDasharray="106.81415022205297" 
                strokeDashoffset="53.40707511102649" 
                strokeWidth="4" 
                className={sprinkles({
                    stroke: fillProgress,
                    animation: 'progress',
                    transformOrigin: 'progress',
                    transition: 'progress'
                })}
            />
            <text 
                className={sprinkles({
                    fill: fillText,
                    fontSize: fontSize,
                    fontWeight: fontWeight
                })}
                dominantBaseline="middle" 
                textAnchor="middle" 
                x="50%" 
                y="55%"
            >
                {text}
            </text>
        </svg>
    )
}