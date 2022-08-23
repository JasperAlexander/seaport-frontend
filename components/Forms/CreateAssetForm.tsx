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
import { MainButton } from '../Buttons/MainButton'
import { Text } from '../Text/Text'

// To do: find out why this cannot be moved to assetTypes.ts
export interface CreateAssetFormType {
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
    collections: CollectionsStateType
}

export const CreateAssetForm: FC<Props> = ({
    collections: { collections }
}) => {
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
                    message: 'Name must only contain alphanumeric characters.'
                },
                required: {
                    value: true,
                    message: 'This field is required.'
                },
                custom: {
                    isValid: (value) => value?.length ? value.length < 20 : true,
                    message: 'Name must not exceed 20 characters.'
                }
            },
            external_link: {
                pattern: {
                    value: '/^[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/',
                    message: 'External link must be a link.'
                },
                custom: {
                    isValid: (value) => value?.length ? value.length < 50 : true,
                    message: 'External link must not exceed 50 characters.'
                }
            },
            description: {
                pattern: {
                    value: '^[A-Za-z0-9 ]*$',
                    message: 'Description must only contain alphanumeric characters.'
                },
                custom: {
                    isValid: (value) => value?.length ? value.length < 2000 : true,
                    message: 'Description must not exceed 2000 characters.'
                }
            },
            collection: {
                pattern: {
                    value: '^[A-Za-z0-9 ]*$',
                    message: 'Collection name must only contain alphanumeric characters.'
                },
                custom: {
                    isValid: (value) => value?.length ? value.length < 2000 : true,
                    message: 'Collection name must not exceed 50 characters.'
                }
            },
            supply: {
                pattern: {
                    value: '^[0-9]*$',
                    message: 'Supply must be a number.'
                },
                required: {
                    value: true,
                    message: 'This field is required.'
                },
                custom: {
                    isValid: (value) => value?.length ? value.length < 6 : true,
                    message: 'Supply must not exceed 5 numbers.'
                }
            },
        },
        onSubmit: () => { alert('Asset submitted!'); console.log(data); }, // Open modal
        initialValues: {
            image_url: 'https://www.gaiazoo.nl/CropUp/800x600/media/1986228/giraffe-afb-website.jpg',
            name: '',
            external_link: '',
            description: '',
            collection: 0,
            unlockable: '',
            supply: 1,
            is_nsfw: false
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
                        Create new asset
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
                        Required fields
                    </Text>
                </Box>

                <ImageFormSection />
                
                <NameFormSection 
                    placeholder='Asset name'
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
                    label={`The description will be included on the item's detail page underneath its image.`}
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
                    disabled={Object.keys(errors).length > 0}
                >
                    Create
                </MainButton>
            </Box>
        </Box>
    )
}