import { FC } from 'react'
import { NextLink } from '../NextLink/NextLink'
import { Text } from '../Text/Text'

export const BodyHeaderNavBarFaucetItem: FC = () => {
    return (
        <NextLink 
            href='/faucet'
            paddingX='10'
            display='flex'
            alignItems='center'
            height='72'
        >
            <Text
                fontWeight='600'
            >
                Faucet
            </Text>
        </NextLink>
    )
}