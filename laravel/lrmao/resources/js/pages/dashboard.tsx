import TextLink from '@/components/text-link';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';

export default function Dashboard() {
    return (
        <AppLayout>
            <Head title="Dashboard" />

            <div className="">Dashboard</div>

            <TextLink
                href={route('logout')}
                method="post"
            >
                Logout
            </TextLink>
        </AppLayout>
    );
}
