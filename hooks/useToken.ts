import fetcher from '../utils/fetcher'
import setParams from '../utils/params'
import useSWR, { SWRResponse } from 'swr'
import { TokenType } from '../types/tokenTypes'
import { useEffect, useState } from 'react'

const API_BASE = process.env.NEXT_PUBLIC_API_BASE

export default function useToken(
    address: string | undefined,
    fallbackData?: TokenType
  ) {
    const [token, setToken] = useState<SWRResponse<TokenType, any> | null>(null)
    useEffect(() => {
        if (typeof address !== 'undefined') {
            const pathname = `${API_BASE}/api/v1/token/${address}/`
    
            let query = {}
        
            const href = setParams(pathname, query)
        
            const tokenData = useSWR<TokenType>(href, fetcher, {
                fallbackData,
            })
    
            setToken(tokenData)
        }
    }, [address])

    return token
  }