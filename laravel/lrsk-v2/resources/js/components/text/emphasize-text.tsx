import { ReactNode } from 'react';

export default function EmphasizeText({ children, addClasses }: { children: ReactNode; addClasses?: string }) {
    return <p className={`font-medium tracking-tighter italic ${addClasses}`}>{children}</p>;
}
