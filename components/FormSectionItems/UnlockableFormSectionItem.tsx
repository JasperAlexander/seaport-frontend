import { ChangeEvent, FC, useState } from 'react'
import { Box } from '../Box/Box'
import * as styles from './FormSectionItem.css'
import { LockOpenIcon } from '../Icons/LockOpenIcon'
import { Textarea } from '../Textarea/Textarea'
import { FormToggle } from '../Toggles/FormToggle'
import { CreateAssetFormType } from '../Forms/CreateAssetForm'

interface Props {
    handleChange: <S extends unknown>(key: keyof CreateAssetFormType, sanitizeFn?: ((value: string) => S) | undefined) => (e: ChangeEvent<HTMLInputElement & HTMLSelectElement>) => void
    errors: Partial<Record<keyof CreateAssetFormType, string>>
    validate: () => void
    data: CreateAssetFormType
}

export const UnlockableFormSectionItem: FC<Props> = ({
    handleChange,
    errors,
    validate,
    data
}) => {
    const [unlockableActive, setUnlockableActive] = useState<boolean>(false)

    return (
        <Box className={styles.formItemSectionItem}>
            <Box
                display='flex'
                justifyContent='space-between'
                alignItems='center'
            >
                <Box display='flex'>
                    <LockOpenIcon />
                    <Box marginLeft='16'>
                        <Box 
                            as='span' 
                            fontWeight='600' 
                            fontSize='16'
                            display='block'
                        >
                            Unlockable Content
                        </Box>
                        <Box as='span' fontSize='15'>
                            Include unlockable content that can only be revealed by the owner of the item.
                        </Box>
                    </Box>
                </Box>
                <Box>
                    <FormToggle 
                        active={unlockableActive}
                        setActive={setUnlockableActive}
                    />
                </Box>
            </Box>
            {unlockableActive &&
                <Box paddingTop='16'>
                    <Textarea 
                        name='unlockable'
                        placeholder='Enter content (access key, code to redeem, link to a file, etc.)'
                        value={data.unlockable || ''}
                        onChange={handleChange('unlockable')}
                        onBlur={() => validate()}
                        rows={4}
                        resize='vertical'
                    />
                    <Box marginTop='8' marginBottom='5' fontSize='15'>
                        <Box as='a' href='https://www.markdownguide.org/cheat-sheet/' color='accentColor'>Markdown </Box>
                        syntax is supported.
                    </Box>
                </Box>
            }
        </Box>
    )
}