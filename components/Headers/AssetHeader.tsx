import { FC } from 'react'
import Link from 'next/link'
import { sprinkles } from '../../styles/sprinkles.css'
import { AssetType } from '../../types/assetTypes'
import { Box } from '../Box/Box'
import { FlagIcon } from '../Icons/FlagIcon'
import { Text } from '../Text/Text'

interface Props {
    asset: AssetType | undefined
}

export const AssetHeader: FC<Props> = ({
    asset
}) => {
  return (
    <Box
        display='flex'
        flexDirection='column'
        flexWrap='wrap'
        justifyContent='space-between'
        margin={{
            wideScreen: '20',
            largeScreen: '20'
        }}
    >
        <Box
            display='flex'
            justifyContent='space-between'
            alignItems='center'
            marginBottom='5'
            maxWidth='full'
        >
            <Link 
                href={`/collection/${asset?.collection?.slug}/`} 
                passHref={true}
            >
                <Box
                    as='a'
                    display='flex'
                    alignItems='center'
                    maxWidth='full'
                    cursor='pointer'
                >
                    <Text
                        whiteSpace='nowrap'
                        color='accentColor'
                    >
                        {asset?.collection?.name}
                    </Text>
                </Box>
            </Link>
            <Box
                maxWidth='fit'
                display='flex'
                width='fit'
            >
                <Box
                    borderRadius='10'
                    display='inline-flex'
                    justifyContent='center'
                    padding='12'
                    borderWidth='2'
                    borderColor='box'
                    borderStyle='solid'
                    cursor='pointer'
                >
                    <FlagIcon 
                        width='20' 
                    />
                </Box>
            </Box>
        </Box>
        <Text
            as='h1'
            fontSize='32'
            fontWeight='600'
        >
            {asset?.name}
        </Text>
    </Box>
  )
}