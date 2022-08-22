// To do: fix type errors (temp. fixed with ts-ignore)

import { FC, useState } from 'react'
import Select from 'react-select'
import { ListAssetFormType } from '../Forms/ListAssetForm'

interface Props {
    data: ListAssetFormType
    setData: (e: any) => void
}

export const ListingDurationSelect: FC<Props> = ({ 
    data,
    setData
}) => {
    const [selectedOption, setSelectedOption] = useState<any>({ value: '1', label: '1 day' })
    const durationSet = [
        { value: '86400', label: '1 day' },
        { value: '259200', label: '3 days' },
        { value: '604800', label: '7 days' },
        { value: '2629743', label: '1 month' },
        { value: '7889229', label: '3 months' },
        { value: '15778458', label: '6 months' },
    ]

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
            cursor: 'pointer',
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
            cursor: 'pointer',
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
            key='duration'
            name='duration'
            placeholder='Select duration'
            defaultValue={selectedOption}
            onChange={(e) => { 
                setData({
                    ...data,
                    // @ts-ignore
                    duration: e.value
              });
              // @ts-ignore
              setSelectedOption(e.value) 
            }}
            // @ts-ignore
            options={durationSet}
            styles={customStyles}
        />
    )
}