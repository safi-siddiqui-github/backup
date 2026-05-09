import { cn } from '@/lib/utils';
import GithubSvg from '@/react/default/icons/githubSvg';
import GoogleSvg from '@/react/default/icons/googleSvg';
import { PageDataType } from '@/types/session';
import { usePage } from '@inertiajs/react';

export default function SocialLogin() {
    const { errors } = usePage<PageDataType>().props;
    return (
        <>
            <div className='flex flex-col gap-2'>
                <div className='flex w-full flex-wrap items-center gap-2'>
                    <a
                        href={route('social.google.login')}
                        className='flex min-w-fit flex-1 items-center justify-center gap-1.5 rounded border px-2 py-1.5 hover:outline'
                    >
                        <GoogleSvg />
                        <p className='font-medium tracking-tight'>Continue with Google</p>
                    </a>

                    <a
                        href={route('social.github.login')}
                        className='flex min-w-fit flex-1 items-center justify-center gap-1.5 rounded border px-2 py-1.5 hover:outline'
                    >
                        <GithubSvg />
                        <p className='font-medium tracking-tight'>Continue with Github</p>
                    </a>
                </div>

                <p
                    className={cn('text-red-500', {
                        hidden: !errors?.socialAuth,
                    })}
                >
                    {errors?.socialAuth?.[0]}
                </p>
            </div>
        </>
    );
}
