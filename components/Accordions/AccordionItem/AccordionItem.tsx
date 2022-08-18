import * as Accordion from '@radix-ui/react-accordion'
import * as styles from './AccordionItem.css'
import { FC, ReactNode } from 'react'

interface Props {
    children: ReactNode
    value: string
}

export const AccordionItem: FC<Props> = ({
    children,
    value
}) => {
    return (
        <Accordion.Item 
            value={value}
            key={value}
            className={styles.item}
        >
            {children}
        </Accordion.Item>
    )
}