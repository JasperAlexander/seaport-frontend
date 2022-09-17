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
import { Text } from '../Text/Text'
import useTranslation from 'next-translate/useTranslation'
import useApi from '../../hooks/useApi'
import { useAccount } from 'wagmi'

// To do: find out why this cannot be moved to assetTypes.ts
export interface CreateAssetFormType {
    name: string
    description: string
    image_url: string
    external_link: string
    asset_contract: string
    collection: string
    owner: string
    creator: string
    transfer_fee: string
    transfer_fee_payment_token: string
    is_nsfw: boolean

    unlockable: string
    supply: number
}

interface Props {
    collections: CollectionsStateType
}

export const CreateAssetForm: FC<Props> = ({
    collections: { collections }
}) => {
    const { t } = useTranslation('common')
    const { saveAsset } = useApi()
    const { address } = useAccount()

    const { handleSubmit, setData, setErrors, validate, handleChange, data, errors, } = useForm<CreateAssetFormType>({
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
                    value: '^[A-Za-z0-9 ]*$',
                    message: `${t('fieldOnlyAlphanumeric', { fieldName: 'Description' })}`
                },
                custom: {
                    isValid: (value) => value?.length ? value.length < 2000 : true,
                    message: `${t('fieldNotExceed', { fieldName: 'Description', amount: '200' })}`
                }
            },
            collection: {
                pattern: {
                    value: '^[A-Za-z0-9 ]*$',
                    message: `${t('fieldOnlyAlphanumeric', { fieldName: 'Collection name' })}`
                },
                custom: {
                    isValid: (value) => value?.length ? value.length < 2000 : true,
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
        onSubmit: () => { 
            saveAsset({
                token_id: '1', // tokenid
                name: data.name,
                description: data.description,
                image_url: data.image_url,
                external_link: data.external_link,
                asset_contract: data.asset_contract,
                collection: data.collection,
                owner: data.owner,
                creator: data.creator,
                transfer_fee: data.transfer_fee,
                transfer_fee_payment_token: data.transfer_fee_payment_token,
                is_nsfw: data.is_nsfw
            })
            console.log(data)
        }, // Open modal
        initialValues: {
            name: '',
            description: '',
            image_url: 'https://www.gaiazoo.nl/CropUp/800x600/media/1986228/giraffe-afb-website.jpg',
            external_link: '',
            asset_contract: '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0', // To do: should be based on blockchain, currently address of HardHat ERC721
            collection: 'blue', // To do: currently slug of collection
            owner: address,
            creator: address,
            transfer_fee: '0',
            transfer_fee_payment_token: '0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0', // To do
            is_nsfw: false,

            unlockable: '',
            supply: 1
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
            >
                <Box
                    paddingTop='32' 
                    paddingBottom='16'
                >
                    <Text 
                        as='h1' 
                        fontSize='40'  
                        fontWeight='600'
                    >
                        {t('createNewAsset')}
                    </Text>
                </Box>
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

                <MainButton
                    type='submit'
                    disabled={Object.keys(errors).length > 0}
                    onClick={() => console.log(errors)}
                >
                    {t('create')}
                </MainButton>
            </Box>
        </Box>
    )
}