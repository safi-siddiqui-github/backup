// Components
import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler } from 'react';

import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import AuthLayout from '@/layouts/auth-layout';

export default function VerifyEmail() {
    const { post, processing } = useForm({});
    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('verification.send'));
    };

    return (
        <AuthLayout>
            <Head title="Email verification" />

            <form
                onSubmit={submit}
                className="space-y-6 text-center"
            >
                <h2 className="text-xl">Email Verification</h2>

                <Button
                    disabled={processing}
                    variant="secondary"
                    type="submit"
                >
                    {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                    Resend verification email
                </Button>

                <TextLink
                    href={route('logout')}
                    method="post"
                    className="mx-auto block text-sm"
                >
                    Log out
                </TextLink>
            </form>
        </AuthLayout>
    );
}
