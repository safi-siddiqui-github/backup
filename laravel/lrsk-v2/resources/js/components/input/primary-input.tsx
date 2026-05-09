import { cn } from '@/lib/utils';
import { ChangeEventHandler } from 'react';

export default function PrimaryInput({
    id,
    label,
    inputType = 'text',
    addClasses,
    placeholder = '**********',
    onChange,
    error,
    defaultValue,
    disabled = false,
}: {
    id: string;
    label: string;
    inputType?: string;
    addClasses?: string;
    placeholder?: string;
    onChange?: ChangeEventHandler<HTMLInputElement>;
    error?: string;
    defaultValue?: string;
    disabled?: boolean;
}) {
    return (
        <div className="flex flex-col gap-1">
            <label htmlFor={id} className="cursor-pointer font-medium">
                {label}
            </label>
            <input
                id={id}
                type={inputType}
                className={`rounded border px-2 py-1 ${addClasses}`}
                placeholder={placeholder}
                onChange={onChange}
                defaultValue={defaultValue}
                disabled={disabled}
            />
            <p
                className={cn('text-red-500', {
                    hidden: !error,
                    block: error,
                })}
            >
                {error}
            </p>
        </div>
    );
}
