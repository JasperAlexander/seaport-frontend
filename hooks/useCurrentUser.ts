import create from 'zustand'
import { UserState } from '../types/userTypes'
import { UserType } from '../types/userTypes'

export const useCurrentUser = create<UserState>((set) => ({
    user: undefined,
    setUser: (user: UserType) => { 
        set(() => ({user: user}))
    },
}))