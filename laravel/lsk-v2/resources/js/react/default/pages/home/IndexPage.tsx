import AppLayout from '@/react/default/layout/AppLayout';
import { Head } from '@inertiajs/react';

export default function Page() {
    return (
        <>
            <Head title='React Home' />
            <AppLayout>
                <div className='flex flex-col gap-4 p-4'>
                    <div className='flex flex-col'>
                        <h2 className='text-2xl font-medium'>React Home</h2>
                    </div>
                </div>
            </AppLayout>
        </>
    );
}
