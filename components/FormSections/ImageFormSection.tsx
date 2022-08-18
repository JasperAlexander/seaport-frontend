import { FC, useRef } from 'react'
import { Box } from '../Box/Box'
import { ImgIcon } from '../Icons/ImgIcon'
import * as styles from './FormSection.css'

interface Props {
    
}

export const ImageFormSection: FC<Props> = ({
    
}) => {
    const imageInputRef = useRef<any>(null)
    
    return (
        <Box className={styles.formItem}>
            <Box className={styles.formItemTop}>
                <Box
                    as='label'
                    fontWeight='600'
                    fontSize='16'
                >
                    Image
                    <Box as='span' color='error' marginLeft='3'>*</Box>
                </Box>
                <Box
                    as='span'
                    fontSize='12'
                    marginTop='4'
                >
                    File types supported: JPG, PNG. Max size: 100 MB
                </Box>
            </Box>
            <Box
                className={styles.dropZone}
                style={{height: '257px', width: '350px'}}
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
                <ImgIcon width='80' />
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