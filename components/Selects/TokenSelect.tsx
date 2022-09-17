// To do: fix type errors (temp. fixed with ts-ignore)

import { FC, useState } from 'react'
import Select from 'react-select'
import { TokenType } from '../../types/tokenTypes'
import { Box } from '../Box/Box'
import { CreateCollectionFormType } from '../Forms/CreateCollectionForm'
import { ListAssetFormType } from '../Forms/ListAssetForm'
import { MakeOfferFormType } from '../Forms/MakeOfferForm'
import { Text } from '../Text/Text'
import useTranslation from 'next-translate/useTranslation'

interface Props {
    mappedTokens: TokenType[]
    data: ListAssetFormType | MakeOfferFormType | CreateCollectionFormType
    setData: (e: any) => void
}

export const TokenSelect: FC<Props> = ({ 
    mappedTokens,
    data,
    setData
}) => {
    const { t } = useTranslation('common')

    const tokenSet = mappedTokens?.map((t) => ({
        ['value']: t.address, 
        ['label']: t.symbol,
        ['image_url']: t.image_url
    }))
    const [selectedOption, setSelectedOption] = useState<any>(tokenSet.length > 0 ? tokenSet[0] : {})

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
            width: '160px',
            display: 'flex',
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
        }),
        noOptionsMessage: (base: any) => ({
            ...base,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '48px'
        })
    }

    const TokenOption = (props: any) => {
        const { innerProps, innerRef } = props

        return (
            <Box
                display='flex'
                alignItems='center'
                height='48'
                padding='12'
                gap='4'
                cursor='pointer'
                {...innerProps}
            >
                <Box 
                    as='img'
                    width='24'
                    aspectRatio='square'
                    src={props.data?.image_url}
                />
                <Text>
                    {props.data?.label}
                </Text>
            </Box>
        )
    }

    return (
        <Select
            key='payment_token'
            name='payment_token'
            placeholder={t('selectField', { fieldName: 'token' })}
            defaultValue={selectedOption}
            onChange={(e) => { 
                setData({
                    ...data,
                    // @ts-ignore
                    duration: e.value
                })
              // @ts-ignore
              setSelectedOption(e.value) 
            }}
            // @ts-ignore
            options={tokenSet}
            components={{Option: TokenOption}} // To do: add selected token image url to control (component)
            noOptionsMessage={() => t('noItemsFound', { fieldName: 'tokens'})}
            styles={customStyles}
        />
    )
}