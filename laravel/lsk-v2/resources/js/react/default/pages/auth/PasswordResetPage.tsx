import { cn, getRouteUri } from '@/lib/utils';
import AuthLayout from '@/react/default/layout/AuthLayout';
import { PasswordResetFormDataType } from '@/types/form';
import { PageDataType } from '@/types/session';
import { Head, useForm, usePage } from '@inertiajs/react';
import { Eye, EyeClosed, LoaderCircle } from 'lucide-react';
import { FormEvent, useCallback, useState } from 'react';

export default function Page() {
    const { email } = usePage<PageDataType>().props;

    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirmation, setShowPasswordConfirmation] = useState(false);

    const toggleShowPassword = useCallback(() => {
        setShowPassword(!showPassword);
    }, [showPassword, setShowPassword]);

    const toggleShowPasswordConfirmation = useCallback(() => {
        setShowPasswordConfirmation(!showPasswordConfirmation);
    }, [showPasswordConfirmation, setShowPasswordConfirmation]);

    const { data, setData, post, processing, errors } = useForm<Required<PasswordResetFormDataType>>({
        email: email ?? 'required',
        pin: '',
        password: '',
        password_confirmation: '',
    });

    const handleSubmit = useCallback(
        (e: FormEvent) => {
            e.preventDefault();
            post(getRouteUri('passwordResetPost'));
        },
        [post, getRouteUri]
    );

    const resendPin = useCallback(() => {
        post(getRouteUri('passwordResetRequestResendPost'));
    }, [post, getRouteUri]);

    return (
        <>
            <Head title='React Password Reset' />
            <AuthLayout>
                <div className='flex flex-col gap-6 px-4 py-8'>
                    <div className='flex flex-col items-center gap-2'>
                        <h2 className='text-2xl'>PASSWORD UPDATE</h2>

                        <button
                            onClick={resendPin}
                            type='button'
                            className='flex flex-wrap items-center gap-1 outline-none hover:underline'
                        >
                            <span className='tracking-tight'>Get password reset email?</span>
                            <span className='font-medium'>Resend</span>
                        </button>
                    </div>

                    <form
                        onSubmit={handleSubmit}
                        className='flex w-full flex-col gap-4'
                    >
                        <div className='flex flex-col gap-1'>
                            <label
                                htmlFor='email'
                                className='w-fit font-medium'
                            >
                                Email
                            </label>

                            <input
                                id='email'
                                type='text'
                                placeholder='safi@gmail.com'
                                className='w-full rounded border px-2 py-1'
                                defaultValue={data?.email}
                                disabled={true}
                            />

                            <p
                                className={cn('text-red-500', {
                                    hidden: !errors?.email,
                                })}
                            >
                                {errors?.email}
                            </p>
                        </div>

                        <div className='flex flex-col gap-1'>
                            <label
                                htmlFor='pin'
                                className='w-fit font-medium'
                            >
                                Pin Code
                            </label>

                            <input
                                id='pin'
                                type='text'
                                placeholder='0000'
                                autoComplete='on'
                                className='w-full rounded border px-2 py-1'
                                onChange={(e) => setData('pin', e.target.value)}
                            />

                            <p
                                className={cn('text-red-500', {
                                    hidden: !errors?.pin,
                                })}
                            >
                                {errors?.pin}
                            </p>
                        </div>

                        <div className='group flex flex-col gap-1'>
                            <label
                                htmlFor='password'
                                className='w-fit font-medium'
                            >
                                Password
                            </label>

                            <div className='flex rounded border px-2 py-1 group-focus-within:outline'>
                                <input
                                    id='password'
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder='**********'
                                    autoComplete={'new-password'}
                                    className='flex-1 outline-none'
                                    onChange={(e) => setData('password', e.target.value)}
                                />

                                <button
                                    className='flex outline-none'
                                    type='button'
                                    onClick={toggleShowPassword}
                                >
                                    <EyeClosed
                                        className={cn('', {
                                            hidden: showPassword,
                                        })}
                                    />
                                    <Eye
                                        className={cn('', {
                                            hidden: !showPassword,
                                        })}
                                    />
                                </button>
                            </div>

                            <p
                                className={cn('text-red-500', {
                                    hidden: !errors?.password,
                                })}
                            >
                                {errors?.password}
                            </p>
                        </div>

                        <div className='group flex flex-col gap-1'>
                            <label
                                htmlFor='password'
                                className='w-fit font-medium'
                            >
                                Password Confirmation
                            </label>

                            <div className='flex rounded border px-2 py-1 group-focus-within:outline'>
                                <input
                                    id='password_confirmation'
                                    type={showPasswordConfirmation ? 'text' : 'password'}
                                    placeholder='**********'
                                    autoComplete={'new-password'}
                                    className='flex-1 outline-none'
                                    onChange={(e) => setData('password_confirmation', e.target.value)}
                                />

                                <button
                                    className='flex outline-none'
                                    type='button'
                                    onClick={toggleShowPasswordConfirmation}
                                >
                                    <EyeClosed
                                        className={cn('', {
                                            hidden: showPasswordConfirmation,
                                        })}
                                    />
                                    <Eye
                                        className={cn('', {
                                            hidden: !showPasswordConfirmation,
                                        })}
                                    />
                                </button>
                            </div>

                            <p
                                className={cn('text-red-500', {
                                    hidden: !errors?.password_confirmation,
                                })}
                            >
                                {errors?.password_confirmation}
                            </p>
                        </div>

                        <button
                            type='submit'
                            className='relative flex items-center justify-center gap-2 rounded border py-1 font-medium'
                            disabled={processing}
                        >
                            <LoaderCircle
                                className={cn('absolute right-2 size-4 animate-spin', {
                                    hidden: !processing,
                                })}
                            />

                            <span>Update Password</span>
                        </button>
                    </form>
                </div>
            </AuthLayout>
        </>
    );
}
