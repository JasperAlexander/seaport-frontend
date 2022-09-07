import fetcher from '../utils/fetcher'
import setParams from '../utils/params'
import useSWR from 'swr'
import { UserType } from '../types/userTypes'

const API_BASE = process.env.NEXT_PUBLIC_API_BASE

export default function useUser(
  address?: string,
  fallbackData?: UserType
) {
  if (address) {
    const pathname = `${API_BASE}/api/v1/user/${address}/`
    
    const query = {}

    const href = setParams(pathname, query)
  
    let user
    if (fallbackData) {
      user = useSWR<UserType>(href, fetcher, {
        fallbackData,
      })
    } else {
      user = useSWR<UserType>(href, fetcher)
    }

    return user
  }
}