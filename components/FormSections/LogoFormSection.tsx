import { FC, useRef } from 'react'
import { Box } from '../Box/Box'
import { ImgIcon } from '../Icons/ImgIcon'
import * as styles from './FormSection.css'
import { Text } from '../Text/Text'
import useTranslation from 'next-translate/useTranslation'

interface Props {
    
}

export const LogoFormSection: FC<Props> = ({
    
}) => {
    const { t } = useTranslation('common')

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
                        {t('logoImg')}
                    </Text>
                    <Text 
                        as='span' 
                        color='error' 
                    >
                        *
                    </Text>
                </Box>
                <Box
                    marginTop='4'
                >
                    <Text
                        as='span'
                        fontSize='12'
                    >
                        {t('logoImgFieldDescription')}
                    </Text>
                </Box>
            </Box>
            <Box
                className={styles.dropZone}
                width='160'
                height='160'
                borderRadius='50p'
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
                    borderRadius='50p'
                    style={{backgroundColor: 'rgba(0, 0, 0, 0.15)'}}
                />
            </Box>
        </Box>
    )
}