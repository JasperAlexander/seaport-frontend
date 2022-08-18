import fetcher from '../utils/fetcher'
import setParams from '../utils/params'
import useSWR from 'swr'
import { AssetType } from '../types/assetTypes'

export default function useAsset(
    fallbackData: AssetType | undefined,
    contract_address?: string | undefined,
    token_id?: string | undefined
  ) {
    function getUrl() {
        if (!contract_address || !token_id) return undefined
    
        const pathname = `http://localhost:8000/api/v1/asset/${contract_address}/${token_id}/`
    
        let query = {
            // id: collectionId,
        }
    
        const href = setParams(pathname, query)
    
        return href
    }
  
    const href = getUrl()
  
    if (typeof href !== 'undefined') {
        const asset = useSWR<AssetType>(href, fetcher, {
            fallbackData,
        })
    
        return asset
    }
  }