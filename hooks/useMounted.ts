import { useEffect, useReducer } from 'react'

export default function useMounted() {
    const [mounted, setMounted] = useReducer(() => true, false)
    
    useEffect (
        setMounted, 
        [setMounted]
    )

    return {
        mounted
    }
}
