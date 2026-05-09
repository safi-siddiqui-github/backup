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
            <Head title="Home"></Head>
            <AppLayout>
                <div className="flex flex-col gap-4 p-4">
                    <div className="flex items-center gap-2">
                        <PrimaryHeading>Laravel React Starter Kit</PrimaryHeading>
                        <EmphasizeText>lrsk</EmphasizeText>
                    </div>

                    <NormalText>All components are built in laravel ecosystem</NormalText>

                    <div className="flex flex-col">
                        <NormalText addClasses='font-medium'>Tech:</NormalText>
                        <NormalText>Laravel</NormalText>
                        <NormalText>Inertia JS</NormalText>
                        <NormalText>React JS</NormalText>
                        <NormalText>Tailwind CSS</NormalText>
                        <NormalText>HTML</NormalText>
                    </div>

                    <div className="flex flex-col">
                        <NormalText addClasses='font-medium'>Components:</NormalText>
                        <NormalText>Register</NormalText>
                        <NormalText>Email Verification</NormalText>
                        <NormalText>Login</NormalText>
                        <NormalText>Forgot Password</NormalText>
                        <NormalText>Logout</NormalText>
                    </div>

                    <div className="flex flex-col">
                        <NormalText addClasses='font-medium'>Addons:</NormalText>
                        <NormalText>Dark Mode</NormalText>
                        <NormalText>Side bar</NormalText>
                        <NormalText>Responsive</NormalText>
                    </div>
                </div>
            </AppLayout>
        </>
    );
}
