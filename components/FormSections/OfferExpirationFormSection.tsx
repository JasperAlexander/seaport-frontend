import { ChangeEvent, FC } from 'react'
import { Box } from '../Box/Box'
import * as styles from './FormSection.css'
import { MakeOfferFormType } from '../Forms/MakeOfferForm'
import { Text } from '../Text/Text'

interface Props {
    handleChange: <S extends unknown>(key: keyof MakeOfferFormType, sanitizeFn?: ((value: string) => S) | undefined) => (e: ChangeEvent<HTMLInputElement & HTMLSelectElement>) => void
    validate: () => void
    errors: Partial<Record<keyof MakeOfferFormType, string>>
    data: MakeOfferFormType
}

export const OfferExpirationFormSection: FC<Props> = ({
    handleChange,
    validate,
    errors,
    data
}) => {
    return (
        <Box className={styles.formItem}>
            <Box
                display='flex'
                alignItems='center'
                justifyContent='flex-start'
                marginBottom='8'
            >
                <Text
                    as='label'
                    fontWeight='600'
                >
                    Offer expiration
                </Text>
            </Box>
            <Box
                display='flex'
                gap='8'
            >
                <Box
                    as='button'
                    style={{width: '250px'}}
                    borderRadius='10'
                    borderColor='box'
                    borderStyle='solid'
                    borderWidth='2'
                    padding='12'
                    height='48'
                    fontSize='16'
                >
                    3 days
                </Box>
                <Box
                    display='flex'
                    alignItems='center'
                    borderRadius='10'
                    borderColor='box'
                    borderStyle='solid'
                    borderWidth='2'
                    padding='12'
                    height='48'
                    fontSize='16'
                    width='full'
                >
                    <Box 
                        as='input'
                        background='transparent'
                    />
                </Box>
            </Box>
        </Box>
    )
}