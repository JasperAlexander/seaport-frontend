// To do: fix type errors (temp. fixed with ts-ignore)

import { FC, useState } from 'react'
import Select from 'react-select'
import { Box } from '../Box/Box'
import { CreateAssetFormType } from '../Forms/CreateAssetForm'
import { CreateCollectionFormType } from '../Forms/CreateCollectionForm'
import { Text } from '../Text/Text'

interface Props {
    data: CreateAssetFormType | CreateCollectionFormType
    setData: (e: any) => void
}

export const BlockchainSelect: FC<Props> = ({ 
    data,
    setData
}) => {
    const [selectedOption, setSelectedOption] = useState<any>(
        // { value: 'ethereum', label: 'Ethereum', image_url: 'https://opensea.io/static/images/logos/ethereum.svg' }
        { value: 'hardhat', label: 'Hardhat', image_url: 'https://chainstack.com/wp-content/uploads/2021/12/hardhat.png' }
    )
    const blockchainSet = [
        { value: 'hardhat', label: 'Hardhat', image_url: 'https://chainstack.com/wp-content/uploads/2021/12/hardhat.png' },
        // { value: 'ethereum', label: 'Ethereum', image_url: 'https://opensea.io/static/images/logos/ethereum.svg' },
        // { value: 'polygon', label: 'Polygon', image_url: 'https://opensea.io/static/images/logos/polygon.svg' }
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

    const BlockchainOption = (props: any) => {
        const { innerProps, innerRef } = props

        return (
            <Box
                display='flex'
                alignItems='center'
                height='48'
                padding='12'
                gap='8'
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
            key='blockchain'
            name='blockchain'
            placeholder='Select blockchain'
            defaultValue={selectedOption}
            onChange={(e) => { 
                setData({
                    ...data,
                    // @ts-ignore
                    method: e.blockchain
              });
              // @ts-ignore
              setSelectedOption(e.value) 
            }}
            // @ts-ignore
            options={blockchainSet}
            components={{Option: BlockchainOption}} // To do: add selected token image url to control (component)
            noOptionsMessage={() => 'No blockchains found'}
            styles={customStyles}
        />
    )
}