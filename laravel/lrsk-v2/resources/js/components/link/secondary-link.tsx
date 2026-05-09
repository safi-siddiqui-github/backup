import { Link } from '@inertiajs/react';
import { ReactNode } from 'react';

export default function SecondaryLink({ children, href, addClasses }: { children: ReactNode; href: string; addClasses?: string }) {
    return (
        <Link href={href} className={`w-fit rounded border px-2 py-1 font-medium ${addClasses}`}>
            {children}
        </Link>
    );
}
