import { FC, useRef } from 'react'
import { Box } from '../Box/Box'
import { ImgIcon } from '../Icons/ImgIcon'
import * as styles from './FormSection.css'
import { Text } from '../Text/Text'

interface Props {
    
}

export const FeaturedFormSection: FC<Props> = ({
    
}) => {
    const imageInputRef = useRef<any>(null)
    
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
                        Featured image
                    </Text>
                </Box>
                <Box
                    marginTop='4'
                >
                    <Text
                        as='span'
                        fontSize='12'
                    >
                        This image will be used for featuring your collection on the homepage, category pages, or other promotional areas of OpenSea. 600 x 400 recommended.
                    </Text>
                </Box>
            </Box>
            <Box
                className={styles.dropZone}
                style={{width: '300px'}}
                height='200'
                borderRadius='10'
                onClick={() => imageInputRef.current?.click()}
            >
                <Box 
                    as='input'
                    id='media'
                    name='media'
                    display='none'
                    type='file'
                    ref={imageInputRef}
                    // value={data.image_url || ''}
                    // onChange={handleChange('image_url')}
                    // onBlur={() => validate()}
                    // onChangeCapture={}
                />
                <ImgIcon 
                    fill='defaultTextPlaceholder'
                    width='80' 
                />
                <Box 
                    position='absolute'
                    inset='4'
                    opacity={{base: '0', hover: '1', active: '1'}}
                    borderRadius='10'
                    style={{backgroundColor: 'rgba(0, 0, 0, 0.15)'}}
                />
            </Box>
        </Box>
    )
}