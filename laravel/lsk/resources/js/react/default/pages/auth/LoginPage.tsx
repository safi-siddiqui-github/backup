import { cn, getRouteUri } from '@/lib/utils';
import SocialLogin from '@/react/default/components/SocialLogin';
import AuthLayout from '@/react/default/layout/AuthLayout';
import { LoginFormDataType } from '@/types/form';
import { Head, Link, useForm } from '@inertiajs/react';
import { Eye, EyeClosed, LoaderCircle } from 'lucide-react';
import { FormEvent, useCallback, useState } from 'react';

export default function Page() {
    const [showPassword, setShowPassword] = useState(false);

    const { setData, post, processing, errors } = useForm<Required<LoginFormDataType>>({
        email: '',
        password: '',
        remember: false,
    });

    const toggleShowPassword = useCallback(() => {
        setShowPassword(!showPassword);
    }, [showPassword, setShowPassword]);

    const handleSubmit = useCallback(
        (e: FormEvent) => {
            e.preventDefault();
            post(getRouteUri('loginPost'));
        },
        [post, getRouteUri]
    );

    const forgotPasswordRequest = useCallback(() => {
        post(getRouteUri('passwordResetRequestPost'));
    }, [post, getRouteUri]);

    return (
        <>
            <Head title='React Login' />
            <AuthLayout>
                <div className='flex flex-col gap-6 px-4 py-8'>
                    <div className='flex flex-col items-center gap-2'>
                        <h2 className='text-4xl'>LOGIN</h2>

                        <Link
                            href={getRouteUri('register')}
                            className='flex flex-wrap items-center gap-1'
                        >
                            <span className='tracking-tight'>Create your new account?</span>
                            <span className='font-medium'>Sign Up</span>
                        </Link>
                    </div>

                    <SocialLogin />

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
                                autoComplete='on'
                                className='w-full rounded border px-2 py-1'
                                onChange={(e) => setData('email', e.target.value)}
                            />

                            <p
                                className={cn('text-red-500', {
                                    hidden: !errors?.email,
                                })}
                            >
                                {errors?.email}
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
                                    autoComplete={'current-password'}
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

                        <div className='flex items-center justify-between'>
                            <div className='flex w-fit cursor-pointer items-center gap-2'>
                                <input
                                    id='remember'
                                    type='checkbox'
                                    className='size-4'
                                    defaultChecked={true}
                                    onChange={(e) => setData('remember', e.target.checked)}
                                />

                                <label
                                    htmlFor='remember'
                                    className='font-medium'
                                >
                                    Remember Me
                                </label>
                            </div>

                            <button
                                type='button'
                                onClick={forgotPasswordRequest}
                                className='rounded px-2 py-1 font-medium'
                            >
                                Forgot Password?
                            </button>
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

                            <span>Sign In</span>
                        </button>
                    </form>
                </div>
            </AuthLayout>
        </>
    );
}
