import NormalButton from '@/components/button/normal-button';
import { cn } from '@/lib/utils';
import { Eye, EyeOff } from 'lucide-react';
import { ChangeEventHandler, useCallback, useState } from 'react';
import NormalLink from '../link/normal-link';

export default function PrimaryPassword({
    id,
    label,
    addClasses,
    placeholder = '**********',
    forgot = false,
    onChange,
    error,
}: {
    id: string;
    label: string;
    addClasses?: string;
    placeholder?: string;
    forgot?: boolean;
    onChange: ChangeEventHandler<HTMLInputElement>;
    error?: string;
}) {
    const [show, setShow] = useState(false);

    const toggle = useCallback(() => {
        setShow(!show);
    }, [show]);

    return (
        <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between">
                <label htmlFor={id} className="cursor-pointer font-medium">
                    {label}
                </label>

                {forgot ? <NormalLink href={route('password.request')}>Forgot Password?</NormalLink> : null}
            </div>
            <div className={`group flex rounded border ${addClasses}`}>
                <input id={id} type={show ? 'text' : 'password'} className="flex-1 px-2 outline-none" placeholder={placeholder} onChange={onChange} />

                <NormalButton onClick={toggle}>
                    <Eye
                        className={cn('size-5', {
                            hidden: show,
                        })}
                    />
                    <EyeOff
                        className={cn('size-5', {
                            hidden: !show,
                        })}
                    />
                </NormalButton>
            </div>
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
