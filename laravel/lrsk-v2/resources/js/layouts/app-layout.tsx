import MainHeader from '@/components/header/main-header';
import { type ReactNode } from 'react';

export default function AppLayout({ children }: { children: ReactNode }) {
    return (
        <div className="text-sm dark:bg-black dark:text-white">
            {/* Header */}
            <MainHeader />
            {/* Children */}
            {children}
            {/* Footer */}
        </div>
    );
}
