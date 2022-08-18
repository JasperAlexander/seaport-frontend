import { FC } from 'react'
import { Box } from '../Box/Box'
import * as styles from './FormSectionItem.css'
import { LockOpenIcon } from '../Icons/LockOpenIcon'
import { Textarea } from '../Textarea/Textarea'

interface Props {
    
}

export const UnlockableFormSectionItem: FC<Props> = ({
    
}) => {
    return (
        <Box className={styles.formItemSectionItem}>
            <Box
                display='flex'
                justifyContent='space-between'
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
                    <Box
                        display='flex'
                        alignItems='center'
                        justifyContent='center'
                    >
                        {/* Input checkbox */}
                    </Box>
                </Box>
            </Box>
            <Box paddingTop='16'>
                <Textarea 
                    name='unlockable'
                    placeholder='Enter content (access key, code to redeem, link to a file, etc.)'
                    // value={data.unlockable || ''}
                    value={''}
                    onChange={() => { return null }}
                    // onChange={handleChange('unlockable')}
                    // onBlur={() => validate()}
                    rows={4}
                    resize='vertical'
                />
                <Box marginTop='8' marginBottom='5' fontSize='15'>
                    <Box as='a' href='https://www.markdownguide.org/cheat-sheet/' color='accentColor'>Markdown </Box>
                    syntax is supported.
                </Box>
            </Box>
        </Box>
    )
}