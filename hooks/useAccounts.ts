import create from 'zustand'
import { AccountType } from '../types/accountTypes'

interface AccountState {
    accounts: AccountType[]
    addAccount: (
        address: string,
        user: string,
        config: string
    ) => void
}

export const useAccounts = create<AccountState>((set) => ({
    accounts: [],
    addAccount: (
        address: string,
        user: string,
        config: string
    ) => { 
        set((state) => ({ 
            accounts: [
                ...state.accounts, 
                { 
                    address: address,
                    user: user,
                    config: config
                },
            ] 
        }))
    },
}))