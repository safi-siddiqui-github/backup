import { cn, getRouteUri } from '@/lib/utils';
import GithubSvg from '@/react/default/icons/githubSvg';
import GoogleSvg from '@/react/default/icons/googleSvg';
import AppLayout from '@/react/default/layout/AppLayout';
import { PageDataType } from '@/types/session';
import { Head, useForm, usePage } from '@inertiajs/react';
import { CircleAlert, CircleCheck, Trash2 } from 'lucide-react';

export default function Page() {
    const { auth, socialAuthStatus } = usePage<PageDataType>().props;

    const { post } = useForm();

    function deleteUser() {
        post(getRouteUri('deleteUser'));
    }

    return (
        <>
            <Head title='React Profile Overview' />
            <AppLayout>
                <div className='flex flex-col gap-4 p-4'>
                    <img
                        src={auth?.user?.avatar}
                        alt={auth?.user?.username}
                        className='object-conver h-32 w-32 rounded'
                    />

                    <div className='flex flex-col'>
                        <h2 className='text-2xl font-medium'>{auth?.user?.name}</h2>
                        <p className='tracking-tight'>{auth?.user?.email}</p>
                        <p className='tracking-tight'>&#64;{auth?.user?.username}</p>
                    </div>

                    <div className='flex flex-col gap-2'>
                        <p className='text-lg font-medium'>Social Profiles</p>

                        <div className='flex items-center gap-2'>
                            <div className='flex items-center gap-1'>
                                <GithubSvg />
                                <p className=''>Github</p>
                            </div>

                            <div className='flex items-center'>
                                <div
                                    className={cn('flex items-center gap-1', {
                                        hidden: !socialAuthStatus?.github,
                                    })}
                                >
                                    <CircleCheck />
                                    <p>Connected</p>
                                </div>
                                <div
                                    className={cn('flex items-center gap-1', {
                                        hidden: socialAuthStatus?.github,
                                    })}
                                >
                                    <CircleAlert />
                                    <p className=''>Disconnected</p>
                                </div>
                            </div>
                        </div>

                        <div className='flex items-center gap-2'>
                            <div className='flex items-center gap-1'>
                                <GoogleSvg />
                                <p className=''>Google</p>
                            </div>

                            <div className='flex items-center'>
                                <div
                                    className={cn('flex items-center gap-1', {
                                        hidden: !socialAuthStatus?.google,
                                    })}
                                >
                                    <CircleCheck />
                                    <p>Connected</p>
                                </div>
                                <div
                                    className={cn('flex items-center gap-1', {
                                        hidden: socialAuthStatus?.google,
                                    })}
                                >
                                    <CircleAlert />
                                    <p className=''>Disconnected</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='flex flex-col items-start gap-2'>
                        <p className='text-lg font-medium'>Delete Profile</p>

                        <button
                            onClick={deleteUser}
                            type='button'
                            className='flex gap-1 rounded border px-2 py-1 hover:border-red-500 hover:text-red-500 hover:outline-red-500'
                        >
                            <Trash2 />
                            <span className=''>Delete</span>
                        </button>
                    </div>
                </div>
            </AppLayout>
        </>
    );
}
