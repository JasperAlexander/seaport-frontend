import { ChangeEvent, FC, useState } from 'react'
import { Box } from '../Box/Box'
import * as styles from './FormSectionItem.css'
import { LockOpenIcon } from '../Icons/LockOpenIcon'
import { Textarea } from '../Textarea/Textarea'
import { FormToggle } from '../Toggles/FormToggle'
import { CreateAssetFormType } from '../Forms/CreateAssetForm'
import { Text } from '../Text/Text'

interface Props {
    handleChange: <S extends unknown>(key: keyof CreateAssetFormType, sanitizeFn?: ((value: string) => S) | undefined) => (e: ChangeEvent<HTMLInputElement & HTMLSelectElement>) => void
    errors: Partial<Record<keyof CreateAssetFormType, string>>
    validate: () => void
    data: CreateAssetFormType
    bottomBorder?: boolean
}

export const UnlockableFormSectionItem: FC<Props> = ({
    handleChange,
    errors,
    validate,
    data,
    bottomBorder = true
}) => {
    const [unlockableActive, setUnlockableActive] = useState<boolean>(false)

    return (
        <Box 
            className={styles.formSectionItem}
            borderBottomWidth={bottomBorder ? '1' : '0'}
        >
            <Box
                display='flex'
                justifyContent='space-between'
                alignItems='center'
            >
                <Box 
                    display='flex'
                >
                    <LockOpenIcon />
                    <Box 
                        marginLeft='16'
                    >
                        <Text 
                            as='span' 
                            fontWeight='600' 
                            display='block'
                        >
                            Unlockable Content
                        </Text>
                        <Text 
                            as='span' 
                            fontSize='15'
                        >
                            Include unlockable content that can only be revealed by the owner of the item.
                        </Text>
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
                <Box 
                    paddingTop='16'
                >
                    <Textarea 
                        name='unlockable'
                        placeholder='Enter content (access key, code to redeem, link to a file, etc.)'
                        value={data.unlockable || ''}
                        onChange={handleChange('unlockable')}
                        onBlur={() => validate()}
                        rows={4}
                        resize='vertical'
                    />
                    <Box 
                        display='flex'
                        gap='3'
                        marginTop='8' 
                        marginBottom='5' 
                    >
                        <Box 
                            as='a' 
                            href='https://www.markdownguide.org/cheat-sheet/' 
                        >
                            <Text
                                color='accentColor'
                                fontSize='15'
                            >
                                Markdown
                            </Text> 
                        </Box>
                        <Text
                            fontSize='15'
                        >
                            syntax is supported.
                        </Text>
                    </Box>
                </Box>
            }
        </Box>
    )
}