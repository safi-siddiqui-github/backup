import PrimaryHeading from '@/components/heading/primary-heading';
import EmphasizeText from '@/components/text/emphasize-text';
import NormalText from '@/components/text/normal-text';
import AppLayout from '@/layouts/app-layout';
import { type SharedData } from '@/types';
import { Head, usePage } from '@inertiajs/react';

export default function Page() {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Dashboard"></Head>
            <AppLayout>
                <div className="flex flex-col gap-4 p-4">
                    <div className="flex items-center gap-2">
                        <PrimaryHeading>Laravel React Starter Kit</PrimaryHeading>
                        <EmphasizeText>lrsk</EmphasizeText>
                    </div>

                    <NormalText>Dashboard</NormalText>
                </div>
            </AppLayout>
        </>
    );
}
