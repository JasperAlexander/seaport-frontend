import { Box } from '../Box/Box'
import { FilterList } from '../Icons/FilterList'

export const AssetsHeader: React.FC = () => {
    return (
        <Box
            position='sticky'
            height='66'
            top='72'
            display='flex'
            alignItems='center'
            paddingX='32'
            background='defaultBackground'
            zIndex='2'
            boxShadow='subHeader'
        >
            <Box
            as='button'
            padding='12'
            >
            <FilterList width='24' color='black' />
            </Box>
            <Box
            marginLeft='auto'
            flexShrink='0'
            >
            {/* <Input 
                type='select'
                name='sort' 
                value={inputState.sort} 
                onChange={handleInputChange} 
                options={['Recently listed', 'Recently created']}
                /> */}
            </Box>
            <Box>
            {/* View mode */}
            </Box>
        </Box>
    )
}