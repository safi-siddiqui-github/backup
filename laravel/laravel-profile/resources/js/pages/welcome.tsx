import { type SharedData } from '@/types';
import { Head, usePage } from '@inertiajs/react';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Welcome">

            </Head>
            <div className="p-6">

                <div className="flex">
                    <h2 className="text-xl font-medium">
                        Safi Siddiqui
                    </h2>
                </div>

                
            </div>
        </>
    );
}
