// To do: add authorization to IPFS connection

import create from 'zustand'
import { create as createIPFSclient } from 'ipfs-http-client'
import { IPFSstate } from '../types/ipfsTypes'

export const useIpfs = create<IPFSstate>(() => ({
    client: createIPFSclient()
}))
