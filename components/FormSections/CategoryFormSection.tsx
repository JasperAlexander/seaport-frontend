import { ChangeEvent, FC, Fragment } from 'react'
import { Box } from '../Box/Box'
import * as styles from './FormSection.css'
import { CloseIcon } from '../Icons/CloseIcon'
import { CreateCollectionFormType } from '../Forms/CreateCollectionForm'
import { Text } from '../Text/Text'
import { MainButton } from '../Buttons/MainButton'
import { CategoryDropdownTrigger } from '../DropdownTriggers/CategoryDropdownTrigger'
import { AssetButtonRowItem } from '../AssetButtonRowItem/AssetButtonRowItem'
import { AllNFTsIcon } from '../Icons/AllNFTsIcon'

interface Props {
    setData: (e: any) => void
    validate: () => void
    errors: 
        (Partial<Record<keyof CreateCollectionFormType, string>>)
    data: CreateCollectionFormType
}

export const CategoryFormSection: FC<Props> = ({
    setData,
    validate,
    errors,
    data
}) => {
    return (
        <Box className={styles.formItem}>
            <Box className={styles.formItemTop}>
                <Text
                    as='label'
                    fontWeight='600'
                >
                    Category
                </Text>
                <Box
                    marginTop='4'
                >
                    <Text
                        as='span'
                        fontSize='12'
                        color='boxText'
                    >
                        Adding a category will help make your item discoverable on OpenSea.
                    </Text>
                </Box>
            </Box>
            <Box>
                {/* <Input 
                    type='text'
                    name='category'
                    required={true}
                    placeholder={placeholder}
                    value={data.name || ''}
                    onChange={handleChange('category')}
                    onBlur={() => validate()}
                /> */}
                <Box
                    display='flex'
                    alignItems='center'
                    gap='12'
                >
                    <CategoryDropdownTrigger
                        data={data}
                        setData={setData}
                    >
                        <Box
                            as='button'
                            type='button'
                            disabled={data.category === '' ? false : true}

                            display='inline-flex'
                            gap='8'
                            alignItems='center'
                            justifyContent='center'
                            textAlign='center'
                            height='48'

                            boxShadow={{ hover: 'subHeader' }}
                            background={{
                                base: 'defaultBackground',
                                active: 'buttonBackgroundActive'
                            }}
                            opacity={{ disabled: 'disabled' }}
                            cursor={{ base: 'pointer', disabled: 'default' }}

                            borderRadius='10'
                            borderWidth='2'
                            borderStyle='solid'
                            borderColor='box'

                            paddingX='24'
                            paddingY='10'
                        >
                            <Text
                                as='span'
                                fontWeight='600'
                            >
                                Add category
                            </Text>
                        </Box>
                    </CategoryDropdownTrigger>
                    {data.category &&
                        <Box
                            as='button'
                            type='button'
                            onClick={() => setData({
                                ...data,
                                // @ts-ignore
                                category: ''
                            })}

                            display='inline-flex'
                            gap='8'
                            alignItems='center'
                            justifyContent='center'
                            textAlign='center'
                            height='48'

                            boxShadow={{ hover: 'subHeader' }}
                            background={{
                                base: 'defaultBackground',
                                active: 'buttonBackgroundActive'
                            }}
                            opacity={{ disabled: 'disabled' }}
                            cursor={{ base: 'pointer', disabled: 'default' }}

                            borderRadius='10'
                            borderWidth='2'
                            borderStyle='solid'
                            borderColor='box'

                            paddingX='20'
                            paddingY='8'
                        >
                            {data.category === 'art' &&
                                <Fragment>
                                    <AllNFTsIcon />
                                    <Text
                                        as='span'
                                    >
                                        Art
                                    </Text>
                                    <CloseIcon 
                                        fill='boxText'
                                    />
                                </Fragment>
                            }
                        </Box>
                    }
                </Box>

                {data.category &&
                    <Box
                        display='flex'
                        alignItems='center'
                        padding='4'
                        gap='2'
                        marginY='14'
                    >
                        <Text
                            fontSize='12'
                            fontWeight='500'
                            color='boxText'
                        >
                            You can select a maximum of one category.
                        </Text>
                    </Box>
                }
            </Box>
        </Box>
    )
}