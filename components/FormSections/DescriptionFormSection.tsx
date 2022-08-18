import { ChangeEvent, FC } from 'react'
import { Box } from '../Box/Box'
import * as styles from './FormSection.css'
import { CreateAssetFormType } from '../Forms/CreateAssetForm'
import { Textarea } from '../Textarea/Textarea'
import { CloseIcon } from '../Icons/CloseIcon'

interface Props {
    handleChange: <S extends unknown>(key: keyof CreateAssetFormType, sanitizeFn?: ((value: string) => S) | undefined) => (e: ChangeEvent<HTMLInputElement & HTMLSelectElement>) => void
    validate: () => void
    errors: Partial<Record<keyof CreateAssetFormType, string>>
    data: CreateAssetFormType
}

export const DescriptionFormSection: FC<Props> = ({
    handleChange,
    validate,
    errors,
    data
}) => {
    return (
        <Box className={styles.formItem}>
            <Box className={styles.formItemTop}>
                <Box
                    as='label'
                    fontWeight='600'
                    fontSize='16'
                >
                    Description
                </Box>
                <Box
                    as='span'
                    fontSize='12'
                    marginTop='4'
                    color='boxText'
                >
                    The description will be included on the item's detail page underneath its image. 
                    <Box 
                        as='a' 
                        href='https://www.markdownguide.org/cheat-sheet/' 
                        color='accentColor'
                        marginX='3'
                    >
                        Markdown
                    </Box> 
                    syntax is supported.
                </Box>
            </Box>
            <Textarea 
                name='description'
                placeholder='Provide a detailed description of your asset.'
                value={data.description || ''}
                onChange={handleChange('description')}
                onBlur={() => validate()}
                rows={4}
                resize='vertical'
            />
            {errors.description &&
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
                        {errors.description}
                    </Box>
                </Box>
            }
        </Box>
    )
}