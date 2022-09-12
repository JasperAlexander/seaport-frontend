import { FC } from 'react'
import { useForm } from '../../hooks/useForm'
import { CollectionsStateType } from '../../types/collectionTypes'
import { Box } from '../Box/Box'
import { ImageFormSection } from '../FormSections/ImageFormSection'
import { NameFormSection } from '../FormSections/NameFormSection'
import { ExternalLinkFormSection } from '../FormSections/ExternalLinkFormSection'
import { DescriptionFormSection } from '../FormSections/DescriptionFormSection'
import { BlockchainFormSection } from '../FormSections/BlockchainFormSection'
import { MainButton } from '../Buttons/MainButton'
import { TokensStateType } from '../../types/tokenTypes'
import { Text } from '../Text/Text'
import { LogoFormSection } from '../FormSections/LogoFormSection'
import { FeaturedFormSection } from '../FormSections/FeaturedFormSection'
import { BannerFormSection } from '../FormSections/BannerFormSection'
import { SlugFormSection } from '../FormSections/SlugFormSection'
import { CategoryFormSection } from '../FormSections/CategoryFormSection'
import { LinkFormSection } from '../FormSections/LinksFormSection'
import { FeesFormSection } from '../FormSections/FeesFormSection'
import { TokenFormSection } from '../FormSections/TokenFormSection'
import { NsfwFormSectionItem } from '../FormSectionItems/NsfwFormSectionItem'

// To do: find out why this cannot be moved to collectionTypes.ts
export interface CreateCollectionFormType {
    image_url: string
    featured_image_url: string
    banner_image_url: string
    name: string
    slug: string
    description: string
    category: string
    external_link: string
    discord_link: string
    instagram_link: string
    medium_link: string
    telegram_link: string
    // Creator earnings
    blockchain: string
    payment_tokens: string[]
    display_type: string
    is_nsfw: boolean
}

interface Props {
    tokens: TokensStateType
}

export const CreateCollectionForm: FC<Props> = ({
    tokens: { tokens }
}) => {
    const { handleSubmit, setData, setErrors, validate, handleChange, data, errors, } = useForm<CreateCollectionFormType>({
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
            }
        },
        onSubmit: () => { alert('Asset submitted!'); console.log(data); }, // Open modal
        initialValues: {
            image_url: 'https://www.gaiazoo.nl/CropUp/800x600/media/1986228/giraffe-afb-website.jpg',
            featured_image_url: 'https://www.gaiazoo.nl/CropUp/800x600/media/1986228/giraffe-afb-website.jpg',
            banner_image_url: 'https://www.gaiazoo.nl/CropUp/800x600/media/1986228/giraffe-afb-website.jpg',
            name: '',
            slug: '',
            description: '',
            category: '',
            external_link: '',
            discord_link: '',
            instagram_link: '',
            medium_link: '',
            telegram_link: '',
            // Creator earnings
            blockchain: '',
            payment_tokens: [''],
            display_type: '',
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
                paddingTop='32' 
                paddingBottom='16' 
            >
                <Text 
                    as='h1' 
                    fontSize='40' 
                    fontWeight='600'
                >
                    Create new collection
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
                        Required fields
                    </Text>
                </Box>

                <LogoFormSection />

                <FeaturedFormSection />

                <BannerFormSection />
                
                <NameFormSection 
                    placeholder='Example: Treasures of the Sea'
                    handleChange={handleChange} 
                    validate={validate} 
                    errors={errors} 
                    data={data} 
                />
               
                <SlugFormSection 
                    handleChange={handleChange} 
                    validate={validate} 
                    setErrors={setErrors}
                    errors={errors} 
                    data={data} 
                />

                <DescriptionFormSection 
                    handleChange={handleChange} 
                    validate={validate} 
                    errors={errors} 
                    data={data} 
                />
                
                <CategoryFormSection 
                    setData={setData} 
                    validate={validate} 
                    errors={errors} 
                    data={data} 
                />

                <LinkFormSection 
                    handleChange={handleChange} 
                    validate={validate} 
                    errors={errors} 
                    data={data} 
                />

                <FeesFormSection 
                    setData={setData} 
                    validate={validate} 
                    errors={errors} 
                    data={data} 
                />

                <BlockchainFormSection 
                    data={data}
                    setData={setData}
                />

                <TokenFormSection 
                    handleChange={handleChange} 
                    validate={validate} 
                    errors={errors} 
                    data={data} 
                    tokens={tokens} 
                    setData={setData} 
                />

                {/* DisplayFormSection */}

                <NsfwFormSectionItem
                    data={data}
                    setData={setData}
                    bottomBorder={false}
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