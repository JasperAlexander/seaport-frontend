export interface UserType {
    id: number
    username: string
    address: string
    profile_img_url: string
    config: string
    created_timestamp: string
}

export interface UsersType {
    next: string | null
    previous: string | null
    users: UserType[]
}

export interface UsersQueryType {
    sortBy?: string
    address?: string
}

export interface UserState {
    user: UserType | undefined,
    setUser: (user: UserType) => void
}
