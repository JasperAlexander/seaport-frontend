import create from 'zustand'

interface SidebarState {
    isMenuSidebarOpen: boolean,
    toggleMenuSidebar: () => void,
    closeMenuSidebar: () => void,

    isFilterSidebarOpen: boolean,
    toggleFilterSidebar: () => void,
    closeFilterSidebar: () => void
}

export const useSidebars = create<SidebarState>((set) => ({
    isMenuSidebarOpen: false,
    toggleMenuSidebar: () => set((state) => ({isMenuSidebarOpen: !state.isMenuSidebarOpen})),
    closeMenuSidebar: () => set(() => ({isMenuSidebarOpen: false})),

    isFilterSidebarOpen: false,
    toggleFilterSidebar: () => set((state) => ({isFilterSidebarOpen: !state.isFilterSidebarOpen})),
    closeFilterSidebar: () => set(() => ({isFilterSidebarOpen: false}))
}))