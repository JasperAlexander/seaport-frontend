import { FC, useState } from 'react'
import { Box } from '../Box/Box'
import * as styles from './BodyHeaderNavBar.css'
import { MenuSideDialogTrigger } from '../DialogTriggers/MenuSideDialogTrigger'
import { CustomConnectButton } from '../Buttons/CustomConnectButton'
import { BodyHeaderNavBarExploreItem } from '../NavBarItems/BodyHeaderNavBarExploreItem'
import { BodyHeaderNavBarFaucetItem } from '../NavBarItems/BodyHeaderNavBarFaucetItem'
import { BodyHeaderNavBarCreateItem } from '../NavBarItems/BodyHeaderNavBarFaucetItem copy'
import { BodyHeaderNavBarAccountItem } from '../NavBarItems/BodyHeaderNavBarAccountItem'
import { MenuDialogButton } from '../Buttons/MenuDialogButton'

export const BodyHeaderNavBar: FC = () => {
    const [menuSideDialogOpen, setMenuSideDialogOpen] = useState<boolean>(false)

    return (
        <Box 
            as='nav'
            className={styles.bodyHeaderNavBar}
        >
            <Box
                display={{
                    base: 'none',
                    largeScreen: 'flex',
                    wideScreen: 'flex'
                }}
                alignItems='center'
            >
                <BodyHeaderNavBarExploreItem />
                <BodyHeaderNavBarFaucetItem />
                <BodyHeaderNavBarCreateItem />
                <BodyHeaderNavBarAccountItem />
                <CustomConnectButton />
            </Box>

            <MenuSideDialogTrigger
                open={menuSideDialogOpen}
                setOpen={setMenuSideDialogOpen}
            >
                <MenuDialogButton 
                    open={menuSideDialogOpen}
                />
            </MenuSideDialogTrigger>
        </Box>
    )
}