import { FC } from 'react'
import { NextLink } from '../NextLink/NextLink'
import { Text } from '../Text/Text'

export const BodyHeaderNavBarCreateItem: FC = () => {
    return (
        <NextLink 
            href='/create'
            paddingX='10'
            display='flex'
            alignItems='center'
            height='72'
        >
            <Text
                fontWeight='600'
            >
                Create
            </Text>
        </NextLink>
    )
}