// To do: fix type errors (temp. fixed with ts-ignore)

import { useRouter } from 'next/router'
import { FC, useEffect, useState } from 'react'
import Select from 'react-select'
import { toggleOnItem } from '../../utils/changeRouter'
import useTranslation from 'next-translate/useTranslation'

interface Props {
    mutateData?: any
}

export const SortSelect: FC<Props> = ({
    mutateData
}) => {
    const { t } = useTranslation('common')

    const sortSet = [
        { value: 'createdlast', label: t('recentlyCreated') },
        { value: 'listedlast', label: t('recentlyListed') },
        { value: 'soldlast', label: t('recentlySold') },
        { value: 'ending', label: t('endingSoon') },
        { value: 'priceup', label: t('priceLowToHigh') },
        { value: 'pricedown', label: t('priceHighToLow') },
    ]

    const router = useRouter()
    useEffect(() => {
        if (router.query['sort']) {
            const foundSort = sortSet.find(sort => {
                return sort.value === router.query['sort']
            })
            setSelectedOption(foundSort) 
        }
    }, [router.query])

    const [selectedOption, setSelectedOption] = useState<any>()

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
            width: '240px',
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
            key='method'
            name='method'
            placeholder={t('sortBy')}
            defaultValue={selectedOption}
            onChange={(e) => { 
                mutateData()
                toggleOnItem(router, 'sort', e.value)
              // @ts-ignore
              setSelectedOption(e.value) 
            }}
            // @ts-ignore
            options={sortSet}
            styles={customStyles}
        />
    )
}