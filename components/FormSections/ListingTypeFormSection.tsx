import { ChangeEvent, FC } from 'react'
import { Box } from '../Box/Box'
import * as styles from './FormSection.css'
import { ListAssetFormType } from '../Forms/ListAssetForm'
import { CloseIcon } from '../Icons/CloseIcon'
import { PriceIcon } from '../Icons/PriceIcon'
import { TimeLapseIcon } from '../Icons/TimeLapseIcon'
import { Text } from '../Text/Text'
import useTranslation from 'next-translate/useTranslation'

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
    const { t } = useTranslation('common')

    return (
        <Box className={styles.formItem}>
            <Box className={styles.formItemTop}>
                <Box
                    display='flex'
                    gap='3'
                >
                    <Text
                        as='label'
                        fontWeight='600'
                    >
                        {t('type')}
                    </Text>
                    <Text 
                        as='span' 
                        color='error' 
                    >
                        *
                    </Text>
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
                            validate()
                        }}
                        background={data.listing_type === 'fixed' ? 'tabBackground' : 'defaultBackground'}
                        flexDirection='column'
                        gap='10'
                        alignItems='center'
                        justifyContent='center'
                        paddingY='16'
                        paddingX='24'
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
                        width='full'
                    >
                        <PriceIcon width='22' />
                        <Text
                            fontWeight='600'
                        >
                            {t('fixedPrice')}
                        </Text>
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
                            validate()
                        }}
                        flexDirection='column'
                        gap='10'
                        alignItems='center'
                        justifyContent='center'
                        paddingY='16'
                        background={data.listing_type === 'timed' ? 'tabBackground' : 'defaultBackground'}
                        paddingX='24'
                        borderWidth='2'
                        borderStyle='solid'
                        borderColor='box'
                        borderTopRightRadius='10'
                        borderBottomRightRadius='10'
                        boxShadow={{
                            hover: 'subHeader'
                        }}
                        width='full'
                    >
                        <TimeLapseIcon width='22' />
                        <Text
                            fontWeight='600'
                        >
                            {t('timedAuction')}
                        </Text>
                    </Box>
                </Box>
                {errors.listing_type &&
                    <Box
                        display='flex'
                        alignItems='center'
                        padding='4'
                        gap='2'
                    >
                        <CloseIcon fill='error' />
                        <Text
                            fontSize='12'
                            color='error'
                        >
                            {errors.listing_type}
                        </Text>
                    </Box>
                }
            </Box>
        </Box>
    )
}