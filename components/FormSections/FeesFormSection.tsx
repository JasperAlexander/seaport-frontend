import { FC, useState } from 'react'
import { Box } from '../Box/Box'
import * as styles from './FormSection.css'
import { CreateCollectionFormType } from '../Forms/CreateCollectionForm'
import { Text } from '../Text/Text'
import { Input } from '../Input/Input'
import { DeleteOutlinedIcon } from '../Icons/DeleteOutlinedIcon'
import useTranslation from 'next-translate/useTranslation'

interface Props {
    setData: (e: any) => void
    validate: () => void
    errors: 
        (Partial<Record<keyof CreateCollectionFormType, string>>)
    data: CreateCollectionFormType
}

export const FeesFormSection: FC<Props> = ({
    setData,
    validate,
    errors,
    data
}) => {
    const { t } = useTranslation('common')

    const [inputs, setInputs] = useState<JSX.Element[]>([])

    return (
        <Box className={styles.formItem}>
            <Box className={styles.formItemTop}>
                <Text
                    as='label'
                    fontWeight='600'
                >
                    {t('creatorEarnings')}
                </Text>
                <Box
                    marginTop='4'
                >
                    <Text
                        as='span'
                        fontSize='12'
                        color='boxText'
                    >
                        {t('creatorEarningsFieldDescription')}
                    </Text>
                </Box>
            </Box>
            <Box>
                <Box
                    display='flex'
                    flexDirection='column'
                    gap='20'
                    marginBottom='20'
                >
                    {inputs.map((input, index) => (
                        <Box
                            key={index}
                        >
                            {input}
                        </Box>
                    ))}
                </Box>
                <Box
                    display='flex'
                    alignItems='center'
                    gap='12'
                >
                    <Box
                        as='button'
                        type='button'
                        onClick={() => {
                            const newInputs = [...inputs]
                            newInputs.push(
                                <Box
                                    display='flex'
                                    gap='12'
                                >
                                    <Box
                                        width='full'
                                    >
                                        <Input 
                                            type='text'
                                            name='payment_tokens'
                                            placeholder={t('fieldAddressOrEns')}
                                            value={data.payment_tokens || ''}
                                            onChange={() => { return null }}// handleChange('discord_link')}
                                            onBlur={() => validate()}
                                        />
                                    </Box>
                                    <Box
                                        display='flex'
                                        alignItems='center'
                                        gap='8'
                                    >
                                        <Input 
                                            type='text'
                                            name='payment_tokens'
                                            placeholder='0%'
                                            value={data.payment_tokens || ''}
                                            onChange={() => { return null }}// handleChange('discord_link')}
                                            onBlur={() => validate()}
                                        />
                                        <Box
                                            as='button'
                                            type='button'
                                            onClick={() => {
                                                // Should only delete clicked input
                                                const newInputs = [...inputs]
                                                newInputs.slice(1)
                                                setInputs(newInputs)
                                            }}
                                        >
                                            <DeleteOutlinedIcon />
                                        </Box>
                                    </Box>
                                </Box>
                            )
                            setInputs(newInputs)
                        }}

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
                            {t('addAddress')}
                        </Text>
                    </Box>
                </Box>


                {errors.payment_tokens &&
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
                            color='error'
                        >
                            {errors.payment_tokens}
                        </Text>
                    </Box>
                }
            </Box>
        </Box>
    )
}