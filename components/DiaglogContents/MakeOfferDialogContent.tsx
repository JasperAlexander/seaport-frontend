import { Dispatch, FC, SetStateAction, useState } from 'react'
import * as Dialog from '@radix-ui/react-dialog'
import { Box } from '../Box/Box'
import { CloseIcon } from '../Icons/CloseIcon'
import { MainButton } from '../Buttons/MainButton'
import { useForm } from '../../hooks/useForm'
import { Input } from '../Input/Input'
import { OfferAmountFormSection } from '../FormSections/OfferAmountFormSection'
import { OfferExpirationFormSection } from '../FormSections/OfferExpirationFormSection'
import * as styles from './DialogContent.css'

export interface MakeOfferFormType {
    offer_amount: number
    // offer_expiration: number
}

interface Props {
    open: boolean
    setOpen: Dispatch<SetStateAction<boolean>>
}

export const MakeOfferDialogContent: FC<Props> = ({
    open,
    setOpen
}) => {
    const [wethValue, setWethValue] = useState<string>('1.4') // Should be derived from user

    const { handleSubmit, validate, handleChange, data, errors, } = useForm<MakeOfferFormType>({
        validations: {
            offer_amount: {
                pattern: {
                value: '^[0-9.]*$',
                message:
                    "Amount must only contain numbers.",
                },
                required: {
                    value: true,
                    message: 'This field is required.'
                },
                custom: {
                    isValid: (value) => isNaN(parseInt(value)) ? true : Number(value) >= Number(wethValue),
                    message: `You don't have enough WETH.` // Based on selected payment token
                }
            },
            // offer_expiration: {
            //     pattern: {
            //     value: '^[0-9]*$',
            //     message:
            //         "Supply must be a number.",
            //     },
            //     required: {
            //         value: true,
            //         message: 'This field is required.'
            //     },
            //     custom: {
            //         isValid: (value) => value?.length ? value.length < 6 : true,
            //         message: 'Supply must not exceed 5 numbers.'
            //     }
            // },
        },
        onSubmit: () => { alert('Asset submitted!'); console.log(data); }, // Open modal
        initialValues: {
            offer_amount: 0,
            // offer_expiration: 0
        },
    })

    return (
        <Dialog.Content asChild={true}>
            <Box
                style={{
                    transform: 'translate(-50%, -50%)',
                    width: '700px', 
                    height: '450px',
                    backgroundColor: 'white',
                    zIndex: '900'
                }}
                position='fixed'
                top='50p'
                left='50p'
                // background='defaultBackground'
                borderRadius='16'
                maxWidth='full'
                maxHeight='full'
            >
                <Box
                    display='flex'
                    flexDirection='column'
                    alignItems='center'
                    justifyContent='center'
                    height='full'
                >
                    <Box className={styles.dialogContentHeader}>
                        Make an offer
                        <Box
                            as='button'
                            onClick={() => setOpen(false)}
                            position='absolute'
                            right='24'
                            top='24'
                            display='flex'
                            alignItems='center'
                            justifyContent='center'
                        >
                            <CloseIcon fill='defaultTextPlaceholder' fillOnHover='boxText' />
                        </Box>
                    </Box>

                    <Box
                        as='section'
                        padding='24'
                        overflowY='scroll'
                        height='full'
                        width='full'
                    >
                        <OfferAmountFormSection 
                            handleChange={handleChange}
                            validate={validate}
                            errors={errors}
                            data={data}
                            wethValue={wethValue}
                        />

                        <OfferExpirationFormSection
                            handleChange={handleChange}
                            validate={validate}
                            errors={errors}
                            data={data}
                        />
                    </Box>

                    <Box as='footer' padding='24' width='full'>
                        <MainButton
                            onClick={() => { return null }}
                            width='full'
                            disabled={Object.keys(errors).length > 0}
                        >
                            Make offer
                        </MainButton>
                    </Box>
                </Box>
            </Box>
        </Dialog.Content>
    )
}