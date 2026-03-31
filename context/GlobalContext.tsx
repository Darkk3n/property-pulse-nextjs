'use client'

import { createContext, useContext, useState } from 'react'

type GlobalContextType = {
    unreadCount: number
    setUnreadCount: React.Dispatch<React.SetStateAction<number>>
}
const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

// Create Provider
export function GlobalProvider({ children }: { children: React.ReactNode }) {
    const [unreadCount, setUnreadCount] = useState<number>(0)
    return (
        <GlobalContext.Provider value={{ unreadCount, setUnreadCount }}>
            {children}
        </GlobalContext.Provider>
    );
}

export function useGlobalContext() {
    const context = useContext<GlobalContextType | undefined>(GlobalContext);
    if (!context) {
        throw new Error('useGlobalContext must be used within GlobalProvider');
    }
    return context
}