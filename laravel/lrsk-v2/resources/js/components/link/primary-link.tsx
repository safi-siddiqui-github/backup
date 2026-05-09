import { Link } from '@inertiajs/react';
import { ReactNode } from 'react';

export default function PrimaryLink({ children, href }: { children: ReactNode; href: string }) {
    return (
        <Link href={href} className="rounded bg-black px-2 py-1 font-medium text-white dark:border dark:bg-white dark:text-black w-fit">
            {children}
        </Link>
    );
}
