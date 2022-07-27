// import { Box } from '../Box/Box'

interface Props {
    width: string,
    height?: string,
    color: string,
}

export const ETH: React.FC<Props> = ({
    width,
    height,
    color,
}: Props ) => {
    return (
        // <Box display='flex' width='12' marginRight='8'>
        //     <svg width="33" height="33" viewBox="0 0 33 53" fill="none" xmlns="http://www.w3.org/2000/svg">
        //         <path d="M16.3576 0.666687L16.0095 1.85009V36.1896L16.3576 36.5371L32.2976 27.115L16.3576 0.666687Z" fill="#343434"/>
        //         <path d="M16.3578 0.666687L0.417816 27.115L16.3578 36.5372V19.8699V0.666687Z" fill="#8C8C8C"/>
        //         <path d="M16.3575 39.5552L16.1613 39.7944V52.0268L16.3575 52.6L32.307 30.1378L16.3575 39.5552Z" fill="#3C3C3B"/>
        //         <path d="M16.3578 52.5998V39.5551L0.417816 30.1377L16.3578 52.5998Z" fill="#8C8C8C"/>
        //         <path d="M16.3575 36.537L32.2973 27.1151L16.3575 19.8699V36.537Z" fill="#141414"/>
        //         <path d="M0.417816 27.1151L16.3576 36.537V19.8699L0.417816 27.1151Z" fill="#393939"/>
        //     </svg>
        // </Box>
        <svg width={width} height={height ? height : ''} viewBox="-38.39985 -104.22675 332.7987 625.3605" fill={color}><path d="M125.166 285.168l2.795 2.79 127.962-75.638L127.961 0l-2.795 9.5z"></path><path d="M127.962 287.959V0L0 212.32z"></path><path d="M126.386 412.306l1.575 4.6L256 236.587l-128.038 75.6-1.575 1.92z"></path><path d="M0 236.585l127.962 180.32v-104.72z"></path><path d="M127.961 154.159v133.799l127.96-75.637z"></path><path d="M127.96 154.159L0 212.32l127.96 75.637z"></path></svg>
    )
}
  