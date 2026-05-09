import { type ReactNode } from 'react';

export default function AuthLayout({ children }: { children: ReactNode }) {
    return (
        <div className="text-sm dark:bg-black dark:text-white">
            {/* Children */}
            <div className="flex h-screen min-h-fit items-center justify-center overflow-y-scroll">{children}</div>
        </div>
    );
}
