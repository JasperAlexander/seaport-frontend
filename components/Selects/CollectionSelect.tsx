// To do: fix type errors (temp. fixed with ts-ignore)

import { FC, useState } from 'react'
import Select from 'react-select'
import { CollectionType } from '../../types/collectionTypes'
import { CreateAssetFormType } from '../Forms/CreateAssetForm'

interface Props {
    mappedCollections: CollectionType[]
    data: CreateAssetFormType
    setData: (e: any) => void
}

export const CollectionSelect: FC<Props> = ({ 
    mappedCollections,
    data,
    setData
}) => {
    const [selectedOption, setSelectedOption] = useState<string>('')

    const collectionSet = mappedCollections?.map((c) => ({['value']: c.slug, ['label']: c.name}))

    const customStyles = {
        container: (base: any) => ({
            ...base,
            '&:hover': {
                boxShadow: 'rgba(0, 0, 0, 0.05) 0px 2px 10px'
            },
            borderRadius: '10px',
        }),
        control: (base: any, state: any) => ({
            ...base,
            height: '48px',
            borderWidth: '2px',
            borderRadius: '10px',
            borderColor: state.isFocused ? '#a7a7a7' : 'rgb(229, 232, 235)',
            '&:hover': {
                borderColor: state.isFocused ? '#a7a7a7' : 'rgb(229, 232, 235)'
            },
            boxShadow: 'rgba(0, 0, 0, 0.05) 0px 2px 10px',
            transition: 'border-color 0.25s ease-in-out 0s, background-color 0.25s ease-in-out 0s'
        }),
        valueContainer: (base: any) => ({
            ...base,
            padding: '12px'
        }),
        input: (base: any) => ({
            ...base,
            padding: '0px',
            margin: '0px'
        }),
        singleValue: (base: any) => ({
            ...base,
            margin: '0px'
        }),
        indicatorSeparator: (base: any) => ({
            ...base,
            width: '0px'
        }),
        menu: (base: any) => ({
            ...base,
            margin: '0px',
            boxShadow: 'rgba(0, 0, 0, 0.16) 0px 4px 16px',
            borderRadius: '10px'
        }),
        menuList: (base: any) => ({
            ...base,
            padding: '0px',
            borderRadius: '10px'
        }),
        option: (base: any, state: any) => ({
            ...base,
            borderBottom: '1px solid rgb(229, 232, 235)',
            padding: '16px',
            backgroundColor: state.isSelected ? 'white' : 'white',
            color: state.isSelected ? 'black' : 'black',
            '&:hover': {
                boxShadow: 'rgba(4, 17, 29, 0.25) 0px 0px 8px 0px',
                backgroundColor: 'white'
            }
        })
    }

    return (
        <Select
            key='collection'
            name='selection'
            placeholder='Select collection'
            defaultValue={selectedOption}
            onChange={(e) => { 
                setData({
                    ...data,
                    // @ts-ignore
                    collection: e.value
              });
              // @ts-ignore
              setSelectedOption(e.value) 
            }}
            // @ts-ignore
            options={collectionSet}
            styles={customStyles}
        />
    )
}