import React, { useState } from 'react'
import { Box } from '../../Box/Box'
import { Checkbox } from '../../Input/Checkbox'

interface Props {
    title: string
}

export const FilterAccordionMainItem: React.FC<Props> = ({
    title
}) => {
    const [inputState, setInputState] = useState({
        filter: false,
    })

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputState({
            ...inputState,
            [e.target.name]: e.target.checked
        })
    }

    return (
        <Box
            as='button'
            display='flex'
            alignItems='center'
            justifyContent='space-between'
            width='full'
            height='48'
            paddingX='10'
        >
            {title}
            <Checkbox 
                name='filter'
                checked={inputState.filter}
                onChange={handleCheckboxChange}
            />
        </Box>
    )
}