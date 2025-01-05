import { useTelegram } from '@/components/providers/TelegramProvider';

export default function UserHeader() {
    const { user, isLoading } = useTelegram();

    if (isLoading) {
        return (
            <div className="fixed top-4 left-4 bg-white/50 backdrop-blur-sm rounded-lg px-4 py-2 shadow-sm">
                Loading...
            </div>
        );
    }

    if (!user) return null;

    return (
        <div className="fixed top-4 left-4 bg-white/50 backdrop-blur-sm rounded-lg px-4 py-2 shadow-sm">
            <div className="flex items-center gap-2">
                <div className="text-sm font-medium text-gray-900">
                    {user.username ? `@${user.username}` : user.first_name}
                </div>
            </div>
        </div>
    );
}