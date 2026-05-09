import { cn, getRouteUri } from '@/lib/utils';
import ToggleAppearance from '@/react/default/components/ToggleAppearance';
import LaravelSvg from '@/react/default/icons/laravelSvg';
import ReactSvg from '@/react/default/icons/reactSvg';
import VueSvg from '@/react/default/icons/vueSvg';
import { PageDataType } from '@/types/session';
import { Link, useForm, usePage } from '@inertiajs/react';
import { LogIn, LogOut, User } from 'lucide-react';
import { useCallback } from 'react';

export default function Header() {
    const { auth } = usePage<PageDataType>().props;

    const { post } = useForm();

    const handleLogout = useCallback(() => {
        post(getRouteUri('logoutPost'));
    }, [post]);

    return (
        <header className='flex flex-wrap items-center justify-center gap-4 border-b border-slate-500 py-1 pr-4 sm:justify-between sm:py-0'>
            <div className='flex flex-wrap items-center justify-center'>
                <a
                    href={route('livewire.home')}
                    className='flex gap-1 p-2 md:px-6'
                >
                    <LaravelSvg addClasses='size-7' />
                    <span className='text-lg font-medium'>Livewire</span>
                </a>
                <Link
                    href={getRouteUri('home')}
                    className='flex gap-1 p-2 md:px-6 bg-black text-white dark:bg-white dark:text-black'
                >
                    <ReactSvg addClasses='size-7' />
                    <span className='text-lg font-medium'>React</span>
                </Link>
                <a
                    href={route('vue.home')}
                    className='flex gap-1 p-2 md:px-6'
                >
                    <VueSvg addClasses='size-7' />
                    <span className='text-lg font-medium'>Vue</span>
                </a>
            </div>

            <div className='flex flex-wrap items-center gap-2'>
                {/* auth */}
                <Link
                    href={getRouteUri('profileOverview')}
                    className={cn('flex min-w-fit items-center gap-1 px-2 py-1', {
                        hidden: !auth?.user,
                    })}
                >
                    <User className='size-6' />
                    <p className='font-medium'>{auth?.user?.username}</p>
                </Link>
                <button
                    type='button'
                    className={cn('flex min-w-fit items-center gap-1 rounded px-2 py-1', {
                        hidden: !auth?.user,
                    })}
                    onClick={handleLogout}
                >
                    <LogOut className='size-6' />
                    <span className='font-medium'>Logout</span>
                </button>
                {/* endauth */}
                {/* guest */}
                <Link
                    href={getRouteUri('login')}
                    className={cn('flex min-w-fit items-center gap-1 px-2 py-1', {
                        hidden: auth?.user,
                    })}
                >
                    <LogIn className='size-6' />
                    <p className='font-medium'>Login</p>
                </Link>
                {/* endguest */}

                <ToggleAppearance />
            </div>
        </header>
    );
}
