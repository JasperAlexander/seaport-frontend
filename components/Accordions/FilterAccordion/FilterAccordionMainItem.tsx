import React, { ChangeEventHandler } from 'react'
import { sprinkles } from '../../../styles/sprinkles.css'
import { Box } from '../../Box/Box'
import { Checkbox } from '../../Input/Checkbox'

interface Props {
    title: string,
    checked: boolean,
    handleFilterChange: ChangeEventHandler
}

export const FilterAccordionMainItem: React.FC<Props> = ({
    title,
    checked,
    handleFilterChange
}) => {
    return (
        <Box
            as='button'
            display='flex'
            alignItems='center'
            justifyContent='space-between'
            width='full'
            height='48'
            paddingX='10'
            borderRadius='10'
            className={sprinkles({
                background: {
                    hover: 'filterHover'
                }
            })}
        >
            {title}
            <Checkbox 
                name={title}
                key={title}
                checked={checked}
                onChange={handleFilterChange}
            />
        </Box>
    )
}