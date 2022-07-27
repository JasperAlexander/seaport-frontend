import create from 'zustand'

interface SidebarState {
    isMenuSidebarOpen: boolean,
    toggleMenuSidebar: () => void,
    closeMenuSidebar: () => void,
    isWalletSidebarOpen: boolean,
    toggleWalletSidebar: () => void,
    closeWalletSidebar: () => void
}

export const useSidebars = create<SidebarState>((set) => ({
    isMenuSidebarOpen: false,
    toggleMenuSidebar: () => set((state) => ({isMenuSidebarOpen: !state.isMenuSidebarOpen})),
    closeMenuSidebar: () => set(() => ({isMenuSidebarOpen: false})),
    isWalletSidebarOpen: false,
    toggleWalletSidebar: () => set((state) => ({isWalletSidebarOpen: !state.isWalletSidebarOpen})),
    closeWalletSidebar: () => set(() => ({isWalletSidebarOpen: false}))
}))