import { Dispatch, FC, SetStateAction } from 'react'
import { Box } from '../Box/Box'
import * as Dialog from '@radix-ui/react-dialog'
import * as styles from './DialogContent.css'
import { ChevronRightIcon } from '../Icons/ChevronRightIcon'
import { Text } from '../Text/Text'
import { ExploreIcon } from '../Icons/ExploreIcon'
import { MainButton } from '../Buttons/MainButton'
import { NextLink } from '../NextLink/NextLink'

interface Props {
    open: boolean
    setOpen: Dispatch<SetStateAction<boolean>>
}

export const MenuSideDialogContent: FC<Props> = ({
    open,
    setOpen
}) => {
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
                    height='full'
                    paddingX='10'
                >
                    <NextLink 
                        href='/assets' 
                        onClick={() => setOpen(false)}
                        className={styles.sideDialogMenuItem}
                    >
                        <Box
                            display='flex'
                            alignItems='center'
                            gap='8'
                        >
                            <ExploreIcon 
                                width='32' 
                            />
                            <Text
                                hoverColor='defaultTextHover'
                                fontWeight='600'
                            >
                                Explore
                            </Text>
                        </Box>
                        <ChevronRightIcon />
                    </NextLink>
                    <NextLink 
                        href='/faucet' 
                        onClick={() => setOpen(false)}
                        className={styles.sideDialogMenuItem}
                    >
                        <Text
                            hoverColor='defaultTextHover'
                            fontWeight='600'
                        >
                            Faucet
                        </Text>
                        <ChevronRightIcon />
                    </NextLink>
                    <NextLink 
                        href='/create' 
                        onClick={() => setOpen(false)}
                        className={styles.sideDialogMenuItem}
                    >
                        <Text
                            hoverColor='defaultTextHover'
                            fontWeight='600'
                        >
                            Create
                        </Text>
                        <ChevronRightIcon />
                    </NextLink>
                    <Box
                        marginY='20'
                    >
                        <MainButton>
                            Connect wallet
                        </MainButton>
                    </Box>
                </Box>
            </Box>
        </Dialog.Content>
    )
}