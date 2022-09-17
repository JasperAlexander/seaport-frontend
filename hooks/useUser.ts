import fetcher from '../utils/fetcher'
import setParams from '../utils/params'
import useSWR from 'swr'
import { UsersType, UserType } from '../types/userTypes'

const API_BASE = process.env.NEXT_PUBLIC_API_BASE

export default function useUser(
  username?: string,
  address?: string,
  fallbackData?: UserType
) {
  if (username) {
    const pathname = `${API_BASE}/api/v1/user/${username}/`
    
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
  // else if (address) {
  //   const pathname = `${API_BASE}/api/v1/users/`
    
  //   const query = {
  //     ...(address && { address: address })
  //   }

  //   const href = setParams(pathname, query)
  
  //   const users = useSWR<UsersType>(href, fetcher)

  //   return users.data?.users[0]
  // }
}