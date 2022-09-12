import { FC } from 'react'
import { sprinkles } from '../../styles/sprinkles.css'
import { BoxProps } from '../Box/Box'

interface Props {
    width?: BoxProps['width']
    height?: BoxProps['height']
}

export const AllNFTsIcon: FC<Props> = ({
    width = '24',
    height
}) => {
    return (
        <svg 
            className={sprinkles({
                width: width,
                height: height ? height : width
            })}
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 100 100" 
        >
            <circle 
                xmlns="http://www.w3.org/2000/svg" 
                cx="50" 
                cy="50" 
                r="49.5" 
                fill="#fff" 
                stroke="#E5E8EB"
            />
            <path 
                xmlns="http://www.w3.org/2000/svg" 
                fill="#1868B7" 
                d="M23 25C23 23.8954 23.8954 23 25 23H37C38.1046 23 39 23.8954 39 25V37C39 38.1046 38.1046 39 37 39H25C23.8954 39 23 38.1046 23 37V25Z"
            />
            <path 
                xmlns="http://www.w3.org/2000/svg" 
                fill="#2BCDE4" 
                d="M23 44C23 42.8954 23.8954 42 25 42H37C38.1046 42 39 42.8954 39 44V56C39 57.1046 38.1046 58 37 58H25C23.8954 58 23 57.1046 23 56V44Z"
            />
            <path 
                xmlns="http://www.w3.org/2000/svg" 
                fill="#1868B7" 
                d="M23 63C23 61.8954 23.8954 61 25 61H37C38.1046 61 39 61.8954 39 63V75C39 76.1046 38.1046 77 37 77H25C23.8954 77 23 76.1046 23 75V63Z"
            />
            <path 
                xmlns="http://www.w3.org/2000/svg" 
                fill="#2BCDE4" 
                d="M42 25C42 23.8954 42.8954 23 44 23H56C57.1046 23 58 23.8954 58 25V37C58 38.1046 57.1046 39 56 39H44C42.8954 39 42 38.1046 42 37V25Z"
            />
            <path 
                xmlns="http://www.w3.org/2000/svg" 
                fill="#1868B7" 
                d="M42 44C42 42.8954 42.8954 42 44 42H56C57.1046 42 58 42.8954 58 44V56C58 57.1046 57.1046 58 56 58H44C42.8954 58 42 57.1046 42 56V44Z"
            />
            <path 
                xmlns="http://www.w3.org/2000/svg" 
                fill="#2BCDE4" 
                d="M42 63C42 61.8954 42.8954 61 44 61H56C57.1046 61 58 61.8954 58 63V75C58 76.1046 57.1046 77 56 77H44C42.8954 77 42 76.1046 42 75V63Z"
            />
            <path 
                xmlns="http://www.w3.org/2000/svg" 
                fill="#1868B7" 
                d="M61 25C61 23.8954 61.8954 23 63 23H75C76.1046 23 77 23.8954 77 25V37C77 38.1046 76.1046 39 75 39H63C61.8954 39 61 38.1046 61 37V25Z"
            />
            <path 
                xmlns="http://www.w3.org/2000/svg" 
                fill="#2BCDE4" 
                d="M61 44C61 42.8954 61.8954 42 63 42H75C76.1046 42 77 42.8954 77 44V56C77 57.1046 76.1046 58 75 58H63C61.8954 58 61 57.1046 61 56V44Z"
            />
            <path 
                xmlns="http://www.w3.org/2000/svg" 
                fill="#1868B7" 
                d="M61 63C61 61.8954 61.8954 61 63 61H75C76.1046 61 77 61.8954 77 63V75C77 76.1046 76.1046 77 75 77H63C61.8954 77 61 76.1046 61 75V63Z"
            />
        </svg>
    )
}