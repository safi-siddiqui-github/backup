import { ReactNode } from 'react';

export default function PrimaryHeading({ children, addClasses }: { children: ReactNode; addClasses?: string }) {
    return <h2 className={`font-medium tracking-tight text-2xl ${addClasses}`}>{children}</h2>;
}
