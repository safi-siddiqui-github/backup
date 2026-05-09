import { getRouteUri } from '@/lib/utils';
import NotificationBar from '@/react/default/components/NotificationBar';
import LaravelSvg from '@/react/default/icons/laravelSvg';
import ReactSvg from '@/react/default/icons/reactSvg';
import VueSvg from '@/react/default/icons/vueSvg';
import { Link } from '@inertiajs/react';
import { ReactNode } from 'react';

export default function AuthLayout({ children }: { children: ReactNode }) {
    return (
        <>
            <div className='flex h-screen min-h-fit items-center justify-center overflow-y-auto'>
                <div className='flex w-full flex-col divide-y-1 divide-slate-300 overflow-hidden sm:max-w-lg sm:rounded-lg sm:border sm:border-slate-300 sm:shadow'>
                    <div className='flex flex-wrap'>
                        <a
                            href={route('livewire.login')}
                            className='flex flex-1 items-center justify-center gap-1 p-2'
                        >
                            <LaravelSvg addClasses='size-7' />
                            <p className='text-lg'>Livewire</p>
                        </a>
                        <Link
                            href={getRouteUri('login')}
                            className='flex flex-1 items-center justify-center gap-1 p-2 bg-black text-white dark:bg-white dark:text-black'
                        >
                            <ReactSvg addClasses='size-7' />
                            <p className='text-lg'>React</p>
                        </Link>

                        <a
                            href={route('vue.login')}
                            className='flex flex-1 items-center justify-center gap-1 p-2'
                        >
                            <VueSvg addClasses='size-7' />
                            <p className='text-lg'>Vue</p>
                        </a>
                    </div>

                    {/* Children */}
                    {children}
                </div>
            </div>

            {/* resources/js/react/default/components/NotificationBar.tsx */}
            <NotificationBar />
        </>
    );
}
