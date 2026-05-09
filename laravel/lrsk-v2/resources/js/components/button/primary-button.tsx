import { MouseEventHandler, ReactNode } from 'react';

export default function PrimaryButton({
    children,
    addClasses,
    btnType = 'button',
    onClick,
    disabled = false,
}: {
    children: ReactNode;
    addClasses?: string;
    btnType?: 'button' | 'submit' | 'reset' | undefined;
    onClick?: MouseEventHandler<HTMLButtonElement>;
    disabled?: boolean;
}) {
    return (
        <button
            type={btnType}
            className={`w-fit cursor-pointer rounded bg-black px-2 py-1 font-medium text-white disabled:cursor-not-allowed dark:bg-white dark:text-black ${addClasses}`}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    );
}
