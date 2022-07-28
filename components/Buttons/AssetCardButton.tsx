import { sprinkles } from '../../styles/sprinkles.css'
import { Box } from '../Box/Box'

type Props = {
    title: string,
    onClick: () => void
}

export const AssetCardButton: React.FC<Props> = ({ 
    title,
    onClick
}: Props) => {
    return (
        <Box
            as='button'
            borderWidth='0'
            borderRadius='0'
            padding='10'
            display='flex'
            justifyContent='center'
            margin='0'
            background='orderAction'
            color='orderBackground'
            transition='default'
            className={sprinkles({
                background: {
                hover: 'accentColorHover'
                },
                boxShadow: {
                hover: 'default'
                },
                borderColor: {
                hover: 'actionButtonBorderMobile',
                focus: 'actionButtonBorderMobile'
                }
            })}
            cursor='pointer'
            onClick={onClick}
            style={{ 
                borderTop: '1px solid #EEEEEE', 
                borderBottom: 'none !important', 
                borderLeft: 'none !important', 
                borderRight: 'none !important',
                zIndex: '1'
            }}
        >
            {title}
        </Box>
    )
}