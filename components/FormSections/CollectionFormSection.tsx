import { ChangeEvent, FC } from 'react'
import { Box } from '../Box/Box'
import * as styles from './FormSection.css'
import { CreateAssetFormType } from '../Forms/CreateAssetForm'
import { CollectionsType } from '../../types/collectionTypes'
import { SWRInfiniteResponse } from 'swr/infinite'
import { CollectionSelect } from '../Selects/CollectionSelect'
import { CloseIcon } from '../Icons/CloseIcon'
import { Text } from '../Text/Text'
import { EditAssetFormType } from '../Forms/EditAssetForm'
import useTranslation from 'next-translate/useTranslation'

interface Props {
    handleChange: 
        (<S extends unknown>(key: keyof CreateAssetFormType, sanitizeFn?: ((value: string) => S) | undefined) => (e: ChangeEvent<HTMLInputElement & HTMLSelectElement>) => void) |
        (<S extends unknown>(key: keyof EditAssetFormType, sanitizeFn?: ((value: string) => S) | undefined) => (e: ChangeEvent<HTMLInputElement & HTMLSelectElement>) => void)
    validate: () => void
    errors: 
        (Partial<Record<keyof CreateAssetFormType, string>>) |
        (Partial<Record<keyof EditAssetFormType, string>>)
    data: CreateAssetFormType | EditAssetFormType
    collections: SWRInfiniteResponse<CollectionsType, any>
    setData: (e: any) => void
}

export const CollectionFormSection: FC<Props> = ({
    handleChange,
    validate,
    errors,
    data,
    collections,
    setData
}) => {
    const { t } = useTranslation('common')
    
    const { data: collectionsData, isValidating, size } = collections
    const mappedCollections = collectionsData ? collectionsData.map(({ collections }) => collections).flat() : []
    
    return (
        <Box className={styles.formItem}>
            <Box className={styles.formItemTop}>
                <Box
                    as='label'
                    fontWeight='600'
                    fontSize='16'
                >
                    {t('collection')}
                </Box>
                <Box
                    as='span'
                    fontSize='12'
                    marginTop='4'
                    color='boxText'
                >
                    {t('collectionFieldDescription')}
                </Box>
            </Box>

            <CollectionSelect 
                mappedCollections={mappedCollections}
                data={data}
                setData={setData}
            />
            {errors.collection &&
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
                        {errors.collection}
                    </Text>
                </Box>
            }
        </Box>
    )
}