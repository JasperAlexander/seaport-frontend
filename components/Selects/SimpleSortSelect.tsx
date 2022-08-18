import { useRouter } from 'next/router'
import { FC, useEffect, useState } from 'react'
import { sprinkles } from '../../styles/sprinkles.css'
import { toggleOnItem } from '../../utils/router'

interface Props {
    options: {
        key: string
        name: string
        value: string
    }[]
    defaultOptionKey?: string
    mutateData?: any
}

export const SimpleSortSelect: FC<Props> = ({
    options,
    defaultOptionKey = 'placeholder',
    mutateData
}) => {
    const router = useRouter()
    const [selection, setSelection] = useState<string>(defaultOptionKey)

    useEffect(() => {
        const sort = router?.query['sort']?.toString()
        if (sort) setSelection(sort)
    }, [router.query])
    
    return (
        <select
            name='select1'
            id='select1'
            key='select1'
            aria-label='Select options'
            defaultValue={selection}
            className={sprinkles({
                padding: '10',
                borderWidth: '2',
                borderStyle: 'solid',
                borderColor: 'box',
                borderRadius: '10',
                background: 'defaultBackground',
                color: 'defaultTextPlaceholder',
                fontSize: '16',
                fontWeight: '600'
            })}
        >
            <option
                key='placeholder'
            >
                Sort by
            </option>
            {options.map((option) => (
                <option 
                    key={option.key} 
                    aria-label={`Sort by ${option.name}`}
                    value={option.value}
                    onClick={() => {
                        if (mutateData) mutateData()
                        toggleOnItem(router, 'sort', option.key)
                    }}
                >
                    {option.name}
                </option>
            ))}
        </select>
    )
}