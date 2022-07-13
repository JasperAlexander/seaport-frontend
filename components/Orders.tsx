import { OrderWithMeta } from '../types/orderTypes'
import { useStore } from '../hooks/useStore'
import { Order } from './Order'

type Props = {
    filter: (value: OrderWithMeta, index: number, array: OrderWithMeta[]) => unknown, thisArg?: any
}

export const Orders: React.FC<Props> = ({ filter }: Props) => {
    const { orders } = useStore()

    return (
        <div className='orders'>
          {orders.length > 0 && orders.filter(filter).length > 0
          ?
            orders.filter(filter).map(myOrder => (
              <Order order={myOrder} />
            ))
          : <span>No orders available</span>}
        </div>
    )
}
