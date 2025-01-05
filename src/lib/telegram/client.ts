// src/lib/telegram/client.ts
interface WebApp {
    ready: () => void;
    initDataUnsafe: {
        user?: {
            id: number;
            first_name: string;
            last_name?: string;
            username?: string;
            language_code?: string;
            is_premium?: boolean;
        };
        start_param?: string;
    };
}

declare global {
    interface Window {
        Telegram: {
            WebApp: WebApp;
        };
    }
}

export const initTelegramWebApp = () => {
    console.log("yooo");
    if (typeof window !== 'undefined' && window.Telegram?.WebApp) {
        const webApp = window.Telegram.WebApp;
        webApp.ready();
        console.log(webApp)
        return webApp;
    }
    console.log("nothiing")
    return null;
};