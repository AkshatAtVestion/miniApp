"use client"
import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { TelegramUser } from '@/types/telegram';
import { initTelegramWebApp } from '@/lib/telegram/client';

interface TelegramContextType {
    user: TelegramUser | null;
    isLoading: boolean;
    error: Error | null;
}

const TelegramContext = createContext<TelegramContextType>({
    user: null,
    isLoading: true,
    error: null,
});

export const TelegramProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<TelegramUser | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const initApp = async () => {
            try {
                const webApp = initTelegramWebApp();
                if (!webApp) {
                    throw new Error('Telegram WebApp initialization failed');
                }

                const userData = webApp.initDataUnsafe.user;
                if (!userData) {
                    throw new Error('No user data available');
                }

                setUser(userData);
            } catch (err) {
                setError(err instanceof Error ? err : new Error('Unknown error occurred'));
            } finally {
                setIsLoading(false);
            }
        };

        initApp();
    }, []);

    return (
        <TelegramContext.Provider value={{ user, isLoading, error }}>
            {children}
        </TelegramContext.Provider>
    );
};

export const useTelegram = () => {
    const context = useContext(TelegramContext);
    console.log("telegram user context: ", context);
    if (!context) {
        throw new Error('useTelegram must be used within TelegramProvider');
    }
    return context;
};