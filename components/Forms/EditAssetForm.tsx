import { FC } from 'react'
import { useForm } from '../../hooks/useForm'
import { CollectionsStateType } from '../../types/collectionTypes'
import { Box } from '../Box/Box'
import { ImageFormSection } from '../FormSections/ImageFormSection'
import { NameFormSection } from '../FormSections/NameFormSection'
import { ExternalLinkFormSection } from '../FormSections/ExternalLinkFormSection'
import { DescriptionFormSection } from '../FormSections/DescriptionFormSection'
import { CollectionFormSection } from '../FormSections/CollectionFormSection'
import { SupplyFormSection } from '../FormSections/SupplyFormSection'
import { BlockchainFormSection } from '../FormSections/BlockchainFormSection'
import { SpecialsFormSection } from '../FormSections/SpecialsFormSection'
import { MainButton } from '../Buttons/MainButton/MainButton'
import { SWRResponse } from 'swr'
import { AssetReadType } from '../../types/assetTypes'
import { Text } from '../Text/Text'
import useTranslation from 'next-translate/useTranslation'

// To do: find out why this cannot be moved to assetTypes.ts
export interface EditAssetFormType {
    image_url: string
    name: string
    external_link: string
    description: string
    collection: number
    unlockable: string
    supply: number
    is_nsfw: boolean
}

interface Props {
    asset: SWRResponse<AssetReadType, any> | undefined
    collections: CollectionsStateType
}

export const EditAssetForm: FC<Props> = ({
    asset,
    collections: { collections }
}) => {
    const { t } = useTranslation('common')

    const { handleSubmit, setData, setErrors, validate, handleChange, data, errors, } = useForm<EditAssetFormType>({
        validations: {
            // image_url: {
            //     pattern: {
            //       value: '/^[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/',
            //       message: 'Must be image_url.'
            //     },
            //     required: {
            //         value: true,
            //         message: 'This field is required.'
            //     }
            // },
            name: {
                pattern: {
                    value: '^[A-Za-z0-9]*$',
                    message: `${t('fieldOnlyAlphanumeric', { fieldName: 'Name' })}`
                },
                required: {
                    value: true,
                    message: `${t('fieldRequired')}`
                },
                custom: {
                    isValid: (value) => value?.length ? value.length < 20 : true,
                    message: `${t('fieldNotExceed', { fieldName: 'Name', amount: '20' })}`
                }
            },
            external_link: {
                pattern: {
                    value: '/^[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/',
                    message: `${t('fieldMustBeA', { fieldName: 'External link', fieldType: 'link' })}`
                },
                custom: {
                    isValid: (value) => value?.length ? value.length < 50 : true,
                    message: `${t('fieldNotExceed', { fieldName: 'External link', amount: '50' })}`
                }
            },
            description: {
                pattern: {
                    value: '^[A-Za-z]*$',
                    message: `${t('fieldOnlyAlphanumeric', { fieldName: 'Description' })}`
                },
                custom: {
                    isValid: (value) => value?.length ? value.length < 200 : true,
                    message: `${t('fieldNotExceed', { fieldName: 'Description', amount: '200' })}`
                }
            },
            collection: {
                pattern: {
                    value: '^[A-Za-z0-9 ]*$',
                    message: `${t('fieldOnlyAlphanumeric', { fieldName: 'Collection name' })}`
                },
                custom: {
                    isValid: (value) => value?.length ? value.length < 50 : true,
                    message: `${t('fieldNotExceed', { fieldName: 'Collection name', amount: '50' })}`
                }
            },
            supply: {
                pattern: {
                    value: '^[0-9]*$',
                    message: `${t('fieldMustBeA', { fieldName: 'Supply', fieldType: 'number' })}`
                },
                required: {
                    value: true,
                    message: `${t('fieldRequired')}`
                },
                custom: {
                    isValid: (value) => value?.length ? value.length < 6 : true,
                    message: `${t('fieldNotExceed', { fieldName: 'Supply', amount: '5' })}`
                }
            },
        },
        onSubmit: () => { alert('Asset submitted!'); console.log(data); }, // Open modal
        initialValues: {
            image_url: asset?.data?.image_url,
            name: asset?.data?.name,
            external_link: asset?.data?.external_link,
            description: asset?.data?.description,
            // To do: update collection api and types
            collection: 1, // asset?.data?.collection?.slug,
            unlockable: '',
            supply: 1,
            is_nsfw: asset?.data?.is_nsfw
        },
    })

    return (
        <Box
            as='section'
            style={{width: '646px', padding: '24px', margin: '0px auto'}}
            maxWidth='full'
        >
            <Box
                as='header'
                paddingTop='32' 
                paddingBottom='16' 
            >
                <Text 
                    as='h1' 
                    fontSize='40' 
                    fontWeight='600'
                >
                    {t('editAsset')} {asset?.data?.name}
                </Text>
            </Box>
            <Box
                as='form'
                onSubmit={handleSubmit}
                style={{marginBottom: '32px', maxWidth: '772px', width: '100%'}}
            >
                <Box
                    display='flex'
                    alignItems='center'
                    gap='3'
                    marginY='12'
                >
                    <Text 
                        as='span' 
                        color='error'
                        fontSize='12'
                    >
                        *
                    </Text>
                    <Text
                        as='span'
                        fontSize='12'
                    >
                        {t('requiredFields')}
                    </Text>
                </Box>

                <ImageFormSection />
                
                <NameFormSection 
                    placeholder={t('assetName')}
                    handleChange={handleChange} 
                    validate={validate} 
                    errors={errors} 
                    data={data} 
                />
               
                <ExternalLinkFormSection 
                    handleChange={handleChange} 
                    validate={validate} 
                    setErrors={setErrors}
                    errors={errors} 
                    data={data} 
                />

                <DescriptionFormSection 
                    label={t('descriptionFieldDescription')}
                    handleChange={handleChange} 
                    validate={validate} 
                    errors={errors} 
                    data={data} 
                />
                
                <CollectionFormSection 
                    handleChange={handleChange} 
                    validate={validate} 
                    errors={errors} 
                    data={data} 
                    collections={collections} 
                    setData={setData} 
                />
                
                <SpecialsFormSection 
                    handleChange={handleChange} 
                    validate={validate} 
                    errors={errors} 
                    data={data}
                    setData={setData}
                />

                <SupplyFormSection 
                    handleChange={handleChange} 
                    validate={validate} 
                    errors={errors} 
                    data={data} 
                />

                <BlockchainFormSection 
                    data={data}
                    setData={setData}
                />

                <Box 
                    height='0'
                    marginY='30'
                    borderBottomWidth='1'
                    borderStyle='solid'
                    borderColor='box'
                />

                <Box
                    display='flex'
                    alignItems='center'
                    justifyContent='space-between'
                >
                    <MainButton
                        disabled={Object.keys(errors).length > 0}
                    >
                        {t('submitChanges')}
                    </MainButton>
                    <MainButton
                        variant='secondary'
                    >
                        {t('deleteAsset')}
                    </MainButton>
                </Box>
            </Box>
        </Box>
    )
}