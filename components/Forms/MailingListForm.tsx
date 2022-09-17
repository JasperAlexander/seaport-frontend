import { FC, useRef } from 'react'
import { useForm } from '../../hooks/useForm'
import { Box } from '../Box/Box'
import { CloseIcon } from '../Icons/CloseIcon'
import { Text } from '../Text/Text'
import useTranslation from 'next-translate/useTranslation'

export interface MailingListFormType {
    email: string
}

interface Props {
    
}

export const MailingListForm: FC<Props> = ({
    
}) => {
    const emailInput = useRef<HTMLInputElement>(null)

    const { t } = useTranslation('common')
    const { handleSubmit, setErrors, validate, handleChange, data, errors, } = useForm<MailingListFormType>({
        validations: {
            email: {
                pattern: {
                    value: '^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$',
                    message:`${t('fieldNotMatch', { fieldType: 'email' })}`
                },
                required: {
                    value: true,
                    message: `${t('fieldRequired')}`
                }
            }
        },
        onSubmit: () => { validate() },
        initialValues: {
            email: ''
        },
    })

    return (
        <Box
            as='form' 
            onSubmit={handleSubmit}
            width='full'
            marginTop='16'
            textAlign='left'
        >
            <Box
                display='flex' 
                width='full'
                textAlign='left'
            >
                <Box 
                    display='flex'
                    flexDirection='column'
                    width='full'
                    paddingRight='8'
                >
                    <Box 
                        display='flex'
                        flexDirection='column'
                        textAlign='left'
                    >
                        <Box 
                            display='flex'
                            flexDirection='column'
                            textAlign='left'
                        >
                            <Box
                                as='label'
                                width='1'
                                height='1'
                                margin='-1'
                                position='absolute'
                                overflow='hidden' 
                            >
                                {t('emailAddress')}
                            </Box>
                        </Box>
                        <Box 
                            style={{minWidth: '50px'}}
                            width='full'
                            display='flex'
                            alignItems='center'
                            padding='12'
                            height='48'
                            borderRadius='12'
                            borderWidth='2'
                            borderStyle='solid'
                            borderColor='box'
                            background='white'
                            cursor='text'
                            {...(emailInput?.current && { onClick: () => emailInput?.current?.focus() })}
                        >
                            <Box
                                as='input' 
                                type='email'
                                placeholder={t('yourEmailAddress')}
                                name="email" 
                                value={data.email || ''}
                                onChange={handleChange('email')}
                                onBlur={() => { 
                                    if (data.email.length === 0) {
                                        // Remove regex error when input is empty
                                        setErrors((currentErrors: any) => {
                                            const { email, ...errors } = currentErrors
                                            return errors
                                        })
                                    } else {
                                        validate()
                                    }
                                }}
                                ref={emailInput}
                                width='full'
                                background='transparent'
                            />
                        </Box>
                    </Box>
                </Box>
                <Box
                    as='button'
                    disabled={Object.keys(errors).length > 0}
                    display='inline-flex'
                    alignItems='center'
                    justifyContent='center'
                    paddingY='16'
                    paddingX='24'
                    background={{
                        base: 'accentColorHover',
                        hover: 'accentColorHoverHover',
                        active: 'accentColorHoverHover'
                    }}
                    opacity={{ disabled: 'disabled' }}
                    cursor={{ base: 'pointer', disabled: 'default' }}
                    type="button"
                    borderWidth='2'
                    borderStyle='solid'
                    borderColor={{
                        base: 'accentColorHover',
                        hover: 'accentColorHoverHover',
                        active: 'accentColorHoverHover'
                    }}
                    marginX='8'
                    marginBottom='8'
                    style={{height: '50px', width: '162px'}}
                    borderRadius='12'
                >
                    <Text
                        fontWeight='600'
                        color='white'
                    >
                        {t('signUp')}
                    </Text>
                </Box>
            </Box>
            {errors.email &&
                <Box
                    display='flex'
                    alignItems='center'
                    padding='4'
                    gap='2'
                >
                    <CloseIcon 
                        fill='white' 
                    />
                    <Text
                        fontSize='12'
                        color='white'
                    >
                        {errors.email}
                    </Text>
                </Box>
            }
        </Box>
    )
}