import fetcher from '../utils/fetcher'
import setParams from '../utils/params'
import useSWR from 'swr'
import { AssetReadType } from '../types/assetTypes'

const API_BASE = process.env.NEXT_PUBLIC_API_BASE

export default function useAsset(
    fallbackData: AssetReadType | undefined,
    contract_address?: string | undefined,
    token_id?: string | undefined
  ) {
    function getUrl() {
        if (!contract_address || !token_id) return undefined
    
        const pathname = `${API_BASE}/api/v1/asset/${contract_address}/${token_id}/`
    
        let query = {
            // id: collectionId,
        }
    
        const href = setParams(pathname, query)
    
        return href
    }
  
    const href = getUrl()
  
    if (typeof href !== 'undefined') {
        const asset = useSWR<AssetReadType>(href, fetcher, {
            fallbackData,
        })
    
        return asset
    }
  }