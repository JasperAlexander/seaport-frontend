import fetcher from '../utils/fetcher'
import setParams from '../utils/params'
import useSWR from 'swr'
import { UserType } from '../types/userTypes'

export default function useUser(
    username: string,
    fallbackData?: UserType
  ) {
    function getUrl() {
        const pathname = `http://localhost:8000/api/v1/user/${username}/`
    
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