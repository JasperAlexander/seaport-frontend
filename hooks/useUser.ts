import fetcher from '../utils/fetcher'
import setParams from '../utils/params'
import useSWR from 'swr'
import { UserType } from '../types/userTypes'

const API_BASE = process.env.NEXT_PUBLIC_API_BASE

export default function useUser(
    username: string,
    fallbackData?: UserType
  ) {
    function getUrl() {
        const pathname = `${API_BASE}/api/v1/user/${username}/`
    
        let query = {}
    
        const href = setParams(pathname, query)
    
        return href
    }
  
    const href = getUrl()
  
    const user = useSWR<UserType>(href, fetcher, {
        fallbackData,
    })

    return user
  }