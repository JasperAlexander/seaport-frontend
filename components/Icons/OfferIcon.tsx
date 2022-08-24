import { FC } from 'react'
import { sprinkles } from '../../styles/sprinkles.css'
import { BoxProps } from '../Box/Box'

interface Props {
    width?: BoxProps['width']
    height?: BoxProps['height']
    fill?: BoxProps['fill']
    fillOnHover?: BoxProps['fill']
}

export const OfferIcon: FC<Props> = ({
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
                d="M0 15.1622V6.78378C0 6.2973 0.162162 5.86486 0.486486 5.54054C0.810811 5.21622 1.24324 5 1.72973 5H2.64865C3.13513 5 3.56757 5.16216 3.89189 5.54054C4.21622 5.91892 4.43243 6.2973 4.43243 6.78378V15.1622C4.43243 15.6486 4.27027 16.0811 3.89189 16.4054C3.51351 16.7297 3.13513 16.9459 2.64865 16.9459H1.78378C1.2973 16.9459 0.864865 16.7838 0.54054 16.4054C0.216216 16.027 0 15.6486 0 15.1622ZM14.1622 17.9189L6.16216 15.6486V5.05405H8.64865C8.81081 5.05405 8.97297 5.05405 9.13514 5.10811C9.2973 5.16216 9.40541 5.16216 9.56757 5.21622L15.4595 7.43243C16.2703 7.7027 16.9189 8.18919 17.4595 8.83784C17.9459 9.48649 18.2162 10.1351 18.2162 10.7838C18.2162 10.8378 18.2162 10.8378 18.2162 10.8919C18.2162 10.9459 18.1622 10.9459 18.1081 10.9459H15.9459C15.2973 10.9459 14.7027 10.8919 14.1081 10.8378C13.5135 10.7838 12.9189 10.6216 12.2703 10.4054L10.7568 9.91892C10.5946 9.86486 10.3784 9.86486 10.2162 9.97297C10.0541 10.027 9.94595 10.1892 9.89189 10.4054C9.83784 10.6216 9.83784 10.7838 9.89189 10.9459C9.94595 11.1081 10.1081 11.2162 10.3243 11.3243L11.6216 11.7568C12.1081 11.9189 12.7568 12.0811 13.4595 12.1892C14.1622 12.2973 15.027 12.3514 16.0541 12.3514H20.8649C22.2162 12.3514 23.0811 12.6216 23.4595 13.1081C23.8378 13.5946 24 14.4595 24 15.7027L15.5135 17.9189C15.2973 18.027 15.027 18.027 14.8649 18.027C14.6486 18.027 14.3784 17.973 14.1622 17.9189Z"
            />
        </svg>
    )
}