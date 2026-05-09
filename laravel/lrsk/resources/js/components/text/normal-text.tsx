import { ReactNode } from 'react';

export default function NormalText({ children, addClasses }: { children: ReactNode; addClasses?: string }) {
    return <p className={`tracking-tight ${addClasses}`}>{children}</p>;
}
