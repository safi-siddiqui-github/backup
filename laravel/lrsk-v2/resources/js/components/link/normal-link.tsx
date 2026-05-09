import { Link } from '@inertiajs/react';
import { ReactNode } from 'react';

export default function NormalLink({
    children,
    href,
    addClasses,
    title,
}: {
    children: ReactNode;
    href: string;
    addClasses?: string;
    title?: string;
}) {
    return (
        <Link href={href} className={`px-2 py-1 font-medium hover:underline ${addClasses}`} title={title}>
            {children}
        </Link>
    );
}
