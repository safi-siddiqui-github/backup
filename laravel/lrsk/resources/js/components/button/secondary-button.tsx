import { MouseEventHandler, ReactNode } from 'react';

export default function SecondaryButton({
    children,
    addClasses,
    onClick,
}: {
    children: ReactNode;
    addClasses?: string;
    onClick?: MouseEventHandler<HTMLButtonElement>;
}) {
    return (
        <button type="button" className={`w-fit border px-2 py-1 font-medium ${addClasses}`}>
            {children}
        </button>
    );
}
