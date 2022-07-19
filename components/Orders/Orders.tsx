import { OrderWithMeta } from '../../types/orderTypes'
import { useStore } from '../../hooks/useStore'
import { Order } from '../Order/Order'
import { Text } from '../Text/Text'
import * as styles from './Orders.css'
import { Box } from '../Box/Box'

type Props = {
    filter: (value: OrderWithMeta, index: number, array: OrderWithMeta[]) => unknown, thisArg?: any
}

export const Orders: React.FC<Props> = ({ filter }: Props) => {
    const { orders } = useStore()

    if(orders.length > 0 && orders.filter(filter).length > 0) {
      return(
        <div className='orders'>
          {orders.filter(filter).map(myOrder => (
            <Order order={myOrder} key={myOrder.meta.NFTID} />
          ))}
        </div>
      )
    } else {
      return(
        <Text as='span'>No orders available</Text>
      )
    }
}
