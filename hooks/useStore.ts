import { Seaport } from '@opensea/seaport-js';
import create from 'zustand'
import { OrderWithCounter, OrderState } from '../types/orderTypes'

export const useStore = create<OrderState>((set) => ({
    orders: [],
    addOrder: (
        NFTID: string, 
        NFTname: string, 
        NFTdescription?: string, 
        NFTimage?: File, 
        NFTcreator?: string,
        order?: OrderWithCounter
    ) => { 
        set((state) => ({ 
            orders: [
                ...state.orders, 
                { meta: { 
                    NFTID: NFTID, 
                    NFTname: NFTname, 
                    NFTdescription: NFTdescription,
                    NFTimage: NFTimage,
                    NFTcreator: NFTcreator
                }, order: order }
            ] 
        }))
    },
    updateOrder: (NFTID: string, order?: OrderWithCounter) => {
        set((state) => ({
            orders: state.orders.map((currentOrder) =>
            currentOrder.meta.NFTID === NFTID
                ? ({ ...currentOrder, order: order })
                : currentOrder
            ),
        }));
    },
    seaport: undefined,
    setSeaport: (seaport: Seaport) => { 
        set(() => ({seaport: seaport}))
    },
}))