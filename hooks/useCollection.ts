import fetcher from '../utils/fetcher'
import setParams from '../utils/params'
import useSWR from 'swr'
import { CollectionType } from '../types/collectionTypes'

const API_BASE = process.env.NEXT_PUBLIC_API_BASE

export default function useCollection(
    fallbackData: CollectionType | undefined,
    slug?: string | undefined
  ) {
    function getUrl() {
        if (!slug) return undefined
    
        const pathname = `${API_BASE}/api/v1/collection/${slug}/`
    
        let query = {
            // id: collectionId,
        }
    
        const href = setParams(pathname, query)
    
        return href
    }
  
    const href = getUrl()
  
    if (typeof href !== 'undefined') {
        const collection = useSWR<CollectionType>(href, fetcher, {
            fallbackData,
        })
    
        return collection
    }
  }