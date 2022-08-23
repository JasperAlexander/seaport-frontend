// To do: find out how to make select with search using tippyjs

import { ChangeEvent, FC, useRef } from 'react'
import { Box } from '../Box/Box'
import * as styles from './FormSection.css'
import { CreateAssetFormType } from '../Forms/CreateAssetForm'
import { CollectionsType } from '../../types/collectionTypes'
import { SWRInfiniteResponse } from 'swr/infinite'
import { CollectionSelect } from '../Selects/CollectionSelect'
import { CloseIcon } from '../Icons/CloseIcon'
import { Text } from '../Text/Text'

interface Props {
    handleChange: <S extends unknown>(key: keyof CreateAssetFormType, sanitizeFn?: ((value: string) => S) | undefined) => (e: ChangeEvent<HTMLInputElement & HTMLSelectElement>) => void
    validate: () => void
    errors: Partial<Record<keyof CreateAssetFormType, string>>
    data: CreateAssetFormType
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
                    Collection
                </Box>
                <Box
                    as='span'
                    fontSize='12'
                    marginTop='4'
                    color='boxText'
                >
                    This is the collection where your item will appear.
                </Box>
            </Box>

            <CollectionSelect 
                mappedCollections={mappedCollections}
                data={data}
                setData={setData}
            />
            {/* <Tippy 
                ignoreAttributes={true}
                interactive={true}
                trigger='click'
                // visible={collectionListVisible}
                duration={0}
                maxWidth='calc(-10px + 100vw)'
                offset={[0, 0]}
                placement='bottom-start'
                content={
                    <Box 
                        style={{overflowWrap: 'break-word', boxShadow: 'rgba(0, 0, 0, 0.16) 0px 4px 16px', width: '598px', maxHeight: '295px', overflowY: 'auto'}}
                        background='defaultBackground' 
                        alignItems='center' 
                        display='flex' 
                        flexDirection='column'
                        position='relative'
                        borderRadius='10'
                        fontSize='14'
                        fontWeight='600'
                        
                    >
                        {mappedCollections.length === 0 &&
                            <Box padding='32'>
                                No results
                            </Box>
                        }
                        {mappedCollections?.map((collection: any) => (
                            <Box
                                as='button'
                                type='button'
                                key={collection.slug}
                                data-collection={collection.name}
                                onClick={setCollection}
                                // onClick={handleChange('collection', (value) => document.querySelector('testt')?.nodeName)} // () => { collectionInputRef.current.value = collection.name; } }// data.collection = collection.slug} // ; setCollectionListVisible(false); }}
                                display='flex'
                                alignItems='center'
                                width='full'
                                padding='16'
                                borderTopWidth={{notfirstchild: '1'}}
                                borderColor='box'
                                borderStyle='solid'
                                boxShadow={{hover: 'subHeader'}}
                            >
                                <Box 
                                    as='img'
                                    src={collection.image_url}
                                    aspectRatio='square'
                                    width='32'
                                    marginRight='16'
                                    style={{pointerEvents: 'none'}}
                                />
                                <Box
                                    as='span'
                                    overflow='hidden'
                                    textOverflow='ellipsis'
                                    style={{pointerEvents: 'none'}}
                                >
                                    {collection.name}
                                </Box>
                            </Box>
                        ))}
                    </Box>
                }
            >
                <Box
                    display='flex'
                    alignItems='center'
                    height='48'
                    padding='12'
                    width='full'
                    borderWidth='2'
                    borderStyle='solid'
                    borderColor='box'
                    borderRadius='10'
                >
                    <Box 
                        as='input'
                        id='collection'
                        name='collection'
                        ref={collectionInputRef}
                        value={data.collection || ''}
                        readOnly={true}
                        // onChange={handleChange('collection')} //(e) => { handleChange('collection', (e) => e); console.log('change') }}
                        // onChangeCapture={handleChange('collection')}
                        // onClick={() => setCollectionListVisible(true)}
                        onBlur={() => validate()}
                        placeholder='Select collection'
                        aria-haspopup={true}
                        background='transparent'
                        outline='none'
                        width='full'
                    />
                    <ChevronIcon />
                </Box>
            </Tippy> */}
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