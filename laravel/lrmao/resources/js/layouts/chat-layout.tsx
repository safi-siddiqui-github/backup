import { type ReactNode } from 'react';
import AppLayout from './app-layout';
import { usePage } from '@inertiajs/react';
import { SharedData } from '@/types';

export default function ChatLayout({ children }: { children: ReactNode }) {

    const { props } = usePage<SharedData>();
    const conversations = props.conversations;
    const selectedConversations = props.selectedConversations;

    console.log(conversations, selectedConversations);

    return (
        <AppLayout>

            {children}
        </AppLayout>
    )
}
