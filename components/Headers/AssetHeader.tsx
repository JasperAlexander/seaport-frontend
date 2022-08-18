import { FC } from 'react'
import Link from 'next/link'
import { sprinkles } from '../../styles/sprinkles.css'
import { AssetType } from '../../types/assetTypes'
import { Box } from '../Box/Box'
import { FlagIcon } from '../Icons/FlagIcon'

interface Props {
    asset: AssetType | undefined
}

export const AssetHeader: FC<Props> = ({
    asset,
}) => {
  return (
    <Box
        display='flex'
        flexDirection='column'
        flexWrap='wrap'
        justifyContent='space-between'
        className={sprinkles({
            margin: {
                wideScreen: '20',
                largeScreen: '20'
            }
        })}
    >
        <Box
            display='flex'
            justifyContent='space-between'
            alignItems='center'
            marginBottom='5'
            maxWidth='full'
        >
            <Link href={`/collection/${asset?.collection?.slug}/`}>
                <a
                    className={sprinkles({
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        maxWidth: 'full',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        color: 'accentColor'
                    })}
                    
                >
                    {asset?.collection?.name}
                </a>
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
                    <FlagIcon width='20' />
                </Box>
            </Box>
        </Box>
        <Box
        as='h1'
        fontSize='32'
        fontWeight='600'
        overflow='hidden'
        textOverflow='ellipsis'
        >
            {asset?.name}
        </Box>
    </Box>
  )
}