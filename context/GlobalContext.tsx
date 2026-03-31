'use client'
import getUnReadMessageCount from '@/app/actions/getUnReadMessageCount'
import { useSession } from 'next-auth/react'
import { createContext, useContext, useEffect, useState } from 'react'

type GlobalContextType = {
    unreadCount: number
    setUnreadCount: React.Dispatch<React.SetStateAction<number>>
}
const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

// Create Provider
export function GlobalProvider({ children }: { children: React.ReactNode }) {
    const [unreadCount, setUnreadCount] = useState<number>(0)
    const { data: session } = useSession();

    useEffect(() => {
        if (session && session.user) {
            getUnReadMessageCount()
                .then((res) => {
                    if (res.count) setUnreadCount(res.count);
                });
        }
    }, [session, getUnReadMessageCount])

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