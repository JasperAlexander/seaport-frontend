import { Seaport } from '@opensea/seaport-js'

export interface SeaportState {
    seaport: Seaport | undefined,
    setSeaport: (seaport: Seaport) => void
}
