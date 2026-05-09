import Header from '@/react/default/components/Header';
import NotificationBar from '@/react/default/components/NotificationBar';
import { ReactNode } from 'react';

export default function AppLayout({ children }: { children: ReactNode }) {
    return (
        <div className=''>
            {/* resources/js/react/default/components/Header.tsx */}
            <Header />

            {children}

            {/* resources/js/react/default/components/NotificationBar.tsx */}
            <NotificationBar />
        </div>
    );
}
