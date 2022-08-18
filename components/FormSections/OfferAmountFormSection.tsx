import { ChangeEvent, FC } from 'react'
import { Box } from '../Box/Box'
import * as styles from './FormSection.css'
import { MakeOfferFormType } from '../DiaglogContents/MakeOfferDialogContent'
import { Input } from '../Input/Input'

interface Props {
    handleChange: <S extends unknown>(key: keyof MakeOfferFormType, sanitizeFn?: ((value: string) => S) | undefined) => (e: ChangeEvent<HTMLInputElement & HTMLSelectElement>) => void
    validate: () => void
    errors: Partial<Record<keyof MakeOfferFormType, string>>
    data: MakeOfferFormType
    wethValue: string
}

export const OfferAmountFormSection: FC<Props> = ({
    handleChange,
    validate,
    errors,
    data,
    wethValue
}) => {
    return (
        <Box className={styles.formItem}>
            <Box
                display='flex'
                alignItems='center'
                justifyContent='space-between'
                marginBottom='8'
            >
                <Box
                    as='label'
                    fontSize='16'
                    fontWeight='600'
                >
                    Offer amount
                </Box>
                <Box
                    as='span'
                    fontSize='12'
                    color='boxText'
                    fontWeight='500'
                >
                    {/* Should be based on payment token and account data */}
                    Balance: {wethValue} WETH
                </Box>
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
                    WETH
                </Box>
                <Input 
                    type='text'
                    name='offer_amount'
                    placeholder='Amount'
                    value={data.offer_amount || ''}
                    onChange={handleChange('offer_amount')}
                    onBlur={() => validate()}
                />
            </Box>
            <Box
                display='flex'
                alignItems='center'
                justifyContent='space-between'
                marginTop='8'
            >
                {errors.offer_amount &&
                    <Box
                        as='span'
                        fontSize='12'
                        color='error'
                    >
                        {errors.offer_amount}
                    </Box>
                }
                <Box
                    as='span'
                    fontSize='12'
                    color='boxText'
                    marginLeft='auto'
                    fontWeight='500'
                >
                    {/* Should be based on input value, adding USD value onBlur */}
                    Total offer amount: 0 WETH
                </Box>
            </Box>
        </Box>
        )
}