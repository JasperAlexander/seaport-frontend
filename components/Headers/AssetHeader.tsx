import { sprinkles } from '../../styles/sprinkles.css'
import { AssetType } from '../../types/assetTypes'
import { Box } from '../Box/Box'
import { Flag } from '../Icons/Flag'

interface Props {
    asset: AssetType | undefined
}

export const AssetHeader: React.FC<Props> = ({
    asset,
}: Props) => {
  return (
    <Box
        display='flex'
        flexDirection='column'
        flexWrap='wrap'
        justifyContent='space-between'
        className={sprinkles({
            margin: {
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
            <Box
                as='a'
                cursor='pointer'
                display='flex'
                alignItems='center'
                maxWidth='full'
                overflow='hidden'
                textOverflow='ellipsis'
                whiteSpace='nowrap'
                color='accentColor'
            >
                {typeof asset !== 'undefined' ? asset.asset_contract.name : ''}
            </Box>
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
                    <Flag width='20' color='black' />
                </Box>
            </Box>
        </Box>
        <Box
        as='h1'
        fontSize='32'
        fontWeight='semibold'
        overflow='hidden'
        textOverflow='ellipsis'
        >
            {asset
                ? asset.name
                : ''
            }
        </Box>
    </Box>
  )
}