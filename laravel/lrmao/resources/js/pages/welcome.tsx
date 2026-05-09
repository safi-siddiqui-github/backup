import ChatLayout from '@/layouts/chat-layout';
import { type SharedData } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import Echo from 'laravel-echo';
import { useEffect } from 'react';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    useEffect(() => {
        Echo.join('online')
            .here(()=> {
                console.log('here');
            })
            .joining(()=> {
                console.log('joining');
            })
            .leaving(()=> {
                console.log('leaving');
            })
            .error((error)=> {
                console.error(error);
            })


    }, [])

    return (
        <>
            <Head title="Welcome">
                <link
                    rel="preconnect"
                    href="https://fonts.bunny.net"
                />
                <link
                    href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600"
                    rel="stylesheet"
                />
            </Head>

            <ChatLayout>
                <div className="flex flex-col">
                    <h2 className="text-xl">Home</h2>
                </div>
            </ChatLayout>
        </>
    );
}
