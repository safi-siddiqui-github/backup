import { ChangeEventHandler } from 'react';

export default function PrimaryCheckbox({
    id,
    label,
    addClasses,
    defaultChecked = false,
    onChange,
}: {
    id: string;
    label: string;
    addClasses?: string;
    defaultChecked?: boolean;
    onChange: ChangeEventHandler<HTMLInputElement>;
}) {
    return (
        <div className="flex flex-wrap items-center gap-2">
            <input id={id} type="checkbox" className={`size-4 ${addClasses}`} defaultChecked={defaultChecked} onChange={onChange} />
            <label htmlFor={id} className="cursor-pointer font-medium">
                {label}
            </label>
        </div>
    );
}
