import { ChangeEvent, FC, Fragment } from 'react'
import { Box } from '../Box/Box'
import * as styles from './FormSection.css'
import { CloseIcon } from '../Icons/CloseIcon'
import { CreateCollectionFormType } from '../Forms/CreateCollectionForm'
import { Text } from '../Text/Text'
import { MainButton } from '../Buttons/MainButton/MainButton'
import { AssetButtonRowItem } from '../AssetButtonRowItem/AssetButtonRowItem'
import { AllNFTsIcon } from '../Icons/AllNFTsIcon'
import useTranslation from 'next-translate/useTranslation'
import { DropdownTrigger } from '../DropdownTrigger/DropdownTrigger'
import { CategoryDropdownContent } from '../DropdownContents/CategoryDropdownContent'

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
    const { t } = useTranslation('common')

    return (
        <Box className={styles.formItem}>
            <Box className={styles.formItemTop}>
                <Text
                    as='label'
                    fontWeight='600'
                >
                    {t('category')}
                </Text>
                <Box
                    marginTop='4'
                >
                    <Text
                        as='span'
                        fontSize='12'
                        color='boxText'
                    >
                        {t('categoryFieldDescription')}
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
                    <DropdownTrigger
                        content={
                            <CategoryDropdownContent 
                                data={data}
                                setData={setData}
                            />
                        }
                        offsetDistance={10}
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

                            boxShadow={{ 
                                hover: 'subHeader' 
                            }}
                            background={{
                                base: 'defaultBackground',
                                active: 'buttonBackgroundActive'
                            }}
                            opacity={{ 
                                disabled: 'disabled' 
                            }}
                            cursor={{ 
                                base: 'pointer', 
                                disabled: 'default' 
                            }}

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
                                {t('addCategory')}
                            </Text>
                        </Box>
                    </DropdownTrigger>
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

                            boxShadow={{ 
                                hover: 'subHeader' 
                            }}
                            background={{
                                base: 'defaultBackground',
                                active: 'buttonBackgroundActive'
                            }}
                            opacity={{ 
                                disabled: 'disabled' 
                            }}
                            cursor={{ 
                                base: 'pointer', 
                                disabled: 'default' 
                            }}

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
                                        {t('art')}
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
                            {t('fieldSelectMaxOf', { amount: t('one'), fieldName: t('categoryWithoutCapital') })}
                        </Text>
                    </Box>
                }
            </Box>
        </Box>
    )
}