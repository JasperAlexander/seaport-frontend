import { Dispatch, FC, SetStateAction } from 'react'
import { Box } from '../Box/Box'
import * as Dialog from '@radix-ui/react-dialog'
import * as styles from './DialogContent.css'
import { Text } from '../Text/Text'
import { CloseIcon } from '../Icons/CloseIcon'
import { FilterAccordion } from '../Accordions/FilterAccordion/FilterAccordion'
import { toggleOffItems } from '../../utils/changeRouter'
import { useRouter } from 'next/router'
import { RoundButton } from '../Buttons/RoundButton'

interface Props {
    open: boolean
    setOpen: Dispatch<SetStateAction<boolean>>
}

export const FilterSideDialogContent: FC<Props> = ({
    open,
    setOpen
}) => {
    const router = useRouter()
    
    return (
        <Dialog.Content 
            asChild={true}
        >
            <Box
                as='aside'
                className={styles.sideDialogContentContainer}
            >
                <Box
                    display='flex'
                    flexDirection='column'
                    padding='16'
                >
                    <Box
                        display='flex'
                        alignItems='center'
                        justifyContent='center'
                        position='relative'
                        height='48'
                    >
                        <Text
                            fontSize='20'
                            fontWeight='600'
                        >
                            Filters
                        </Text>
                        <Box
                            position='absolute'
                            right='0'
                        >
                            <RoundButton
                                onClick={() => setOpen(false)}
                            >
                                <CloseIcon />
                            </RoundButton>
                        </Box>
                    </Box>
                    <FilterAccordion
                        items={[
                            { 
                                header: { name: 'Status', key: 'status' },
                                content: [
                                    { name: 'Buy now', key: 'buynow' }, 
                                    { name: 'Test', key: 'test' }
                                ]
                            }
                        ]}
                        display={true}
                    />
                </Box>
                <Box
                    padding='16'
                    position='sticky'
                    display='flex'
                    gap='8'
                    bottom='0'
                    borderTopWidth='1'
                    borderColor='box'
                    borderStyle='solid'
                    background='defaultBackground'
                >
                    <Box
                        as='button'
                        onClick={() => toggleOffItems(router)}
                        display='flex'
                        alignItems='center'
                        justifyContent='center'
                        padding='16'
                        borderWidth='2'
                        borderColor='box'
                        borderStyle='solid'
                        borderRadius='10'
                        width='full'
                    >
                        <Text
                            fontWeight='600'
                        >
                            Clear all
                        </Text>
                    </Box>
                    <Box
                        as='button'
                        onClick={() => setOpen(false)}
                        display='flex'
                        alignItems='center'
                        justifyContent='center'
                        padding='16'
                        borderWidth='2'
                        borderColor='box'
                        borderStyle='solid'
                        borderRadius='10'
                        width='full'
                    >
                        <Text
                            fontWeight='600'
                        >
                            Done
                        </Text>
                    </Box>
                </Box>
            </Box>
        </Dialog.Content>
    )
}