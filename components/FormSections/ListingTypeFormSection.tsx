import { ChangeEvent, FC } from 'react'
import { Box } from '../Box/Box'
import * as styles from './FormSection.css'
import { ListAssetFormType } from '../Forms/ListAssetForm'
import { CloseIcon } from '../Icons/CloseIcon'
import { PriceIcon } from '../Icons/PriceIcon'
import { TimeLapseIcon } from '../Icons/TimeLapseIcon'

interface Props {
    handleChange: <S extends unknown>(key: keyof ListAssetFormType, sanitizeFn?: ((value: string) => S) | undefined) => (e: ChangeEvent<HTMLInputElement & HTMLSelectElement>) => void
    validate: () => void
    errors: Partial<Record<keyof ListAssetFormType, string>>
    data: ListAssetFormType
    setData: (e: any) => void
}

export const ListingTypeFormSection: FC<Props> = ({
    handleChange,
    validate,
    errors,
    data,
    setData
}) => {
    return (
        <Box className={styles.formItem}>
            <Box className={styles.formItemTop}>
                <Box
                    as='label'
                    fontWeight='600'
                    fontSize='16'
                >
                    Type
                    <Box as='span' color='error' marginLeft='3'>*</Box>
                </Box>
            </Box>
            <Box>
                {/* Box select */}
                <Box
                    display='flex'
                    width='full'
                    style={{height: '108px'}}
                >
                    <Box
                        as='button'
                        type='button'
                        display='inline-flex'
                        onClick={() => {
                            setData({
                                ...data,
                                // @ts-ignore
                                listing_type: 'fixed'
                            })
                        }}
                        background={data.listing_type === 'fixed' ? 'tabBackground' : 'defaultBackground'}
                        flexDirection='column'
                        gap='10'
                        alignItems='center'
                        justifyContent='center'
                        paddingY='16'
                        paddingX='24'
                        fontWeight='600'
                        fontSize='16'
                        borderTopWidth='2'
                        borderLeftWidth='2'
                        borderBottomWidth='2'
                        borderRightWidth={{
                            firstchild: '0'
                        }}
                        borderStyle='solid'
                        borderColor='box'
                        borderTopLeftRadius='10'
                        borderBottomLeftRadius='10'
                        boxShadow={{
                            hover: 'subHeader'
                        }}
                    >
                        <PriceIcon width='22' />
                        Fixed Price
                    </Box>
                    <Box
                        as='button'
                        type='button'
                        display='inline-flex'
                        onClick={() => {
                            setData({
                                ...data,
                                // @ts-ignore
                                listing_type: 'timed'
                            })
                        }}
                        flexDirection='column'
                        gap='10'
                        alignItems='center'
                        justifyContent='center'
                        paddingY='16'
                        background={data.listing_type === 'timed' ? 'tabBackground' : 'defaultBackground'}
                        paddingX='24'
                        fontWeight='600'
                        fontSize='16'
                        borderWidth='2'
                        borderStyle='solid'
                        borderColor='box'
                        borderTopRightRadius='10'
                        borderBottomRightRadius='10'
                        boxShadow={{
                            hover: 'subHeader'
                        }}
                    >
                        <TimeLapseIcon width='22' />
                        Timed Auction
                    </Box>
                </Box>
                {errors.listing_type &&
                    <Box
                        display='flex'
                        alignItems='center'
                        color='error'
                        padding='4'
                    >
                        <CloseIcon fill='error' />
                        <Box
                            marginLeft='2'
                            fontSize='12'
                        >
                            {errors.listing_type}
                        </Box>
                    </Box>
                }
            </Box>
        </Box>
    )
}