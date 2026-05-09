import { MouseEventHandler, ReactNode } from 'react';

export default function NormalButton({
    children,
    addClasses,
    onClick,
}: {
    children: ReactNode;
    addClasses?: string;
    onClick?: MouseEventHandler<HTMLButtonElement>;
}) {
    return (
        <button type="button" className={`cursor-pointer px-2 py-1 font-medium ${addClasses}`} onClick={onClick}>
            {children}
        </button>
    );
}
