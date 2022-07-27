import { Seaport } from '@opensea/seaport-js';
import create from 'zustand'
import { SeaportState } from '../types/seaportTypes'

export const useSeaport = create<SeaportState>((set) => ({
    seaport: undefined,
    setSeaport: (seaport: Seaport) => { 
        set(() => ({seaport: seaport}))
    },
}))