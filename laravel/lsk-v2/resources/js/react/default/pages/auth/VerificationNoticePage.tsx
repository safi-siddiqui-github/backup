import { cn, getRouteUri } from '@/lib/utils';
import AuthLayout from '@/react/default/layout/AuthLayout';
import { VerificationNoticeFormDataType } from '@/types/form';
import { PageDataType } from '@/types/session';
import { Head, useForm, usePage } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEvent, useCallback } from 'react';

export default function Page() {
    const { auth } = usePage<PageDataType>().props;

    const { data, setData, post, processing, errors } = useForm<Required<VerificationNoticeFormDataType>>({
        email: auth?.user?.email ?? 'required',
        pin: '',
    });

    const handleSubmit = useCallback(
        (e: FormEvent) => {
            e.preventDefault();
            post(getRouteUri('verificationNoticePost'));
        },
        [post, getRouteUri]
    );

    const resendPin = useCallback(() => {
        post(getRouteUri('verificationNoticeResendPost'));
    }, [post, getRouteUri]);

    return (
        <>
            <Head title='React Verification Notice' />
            <AuthLayout>
                <div className='flex flex-col gap-6 px-4 py-8'>
                    <div className='flex flex-col items-center gap-2'>
                        <h2 className='text-2xl'>EMAIL VERIFICATION</h2>

                        <button
                            onClick={resendPin}
                            type='button'
                            className='flex flex-wrap items-center gap-1 outline-none hover:underline'
                        >
                            <span className='tracking-tight'>Get verfication Email?</span>
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

                            <span>Verify Email</span>
                        </button>
                    </form>
                </div>
            </AuthLayout>
        </>
    );
}
