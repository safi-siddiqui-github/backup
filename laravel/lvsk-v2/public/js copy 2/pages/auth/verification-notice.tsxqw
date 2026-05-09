import PrimaryButton from '@/components/button/primary-button';
import PrimaryHeading from '@/components/heading/primary-heading';
import EmphasizeText from '@/components/text/emphasize-text';
import NormalText from '@/components/text/normal-text';
import AuthLayout from '@/layouts/auth-layout';
import { cn } from '@/lib/utils';
import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler, useCallback } from 'react';

export default function Page() {
    const { post, errors, processing } = useForm<Required<{ throttle: string }>>({
        throttle: '',
    });

    const handleSubmit = useCallback<FormEventHandler<HTMLFormElement>>((e) => {
        e.preventDefault();
        post(route('verification.resend'), {});
    }, []);

    return (
        <>
            <Head title="Verification Notice"></Head>
            <AuthLayout>
                <form
                    onSubmit={handleSubmit}
                    className="flex w-full max-w-sm flex-col gap-4 p-6 sm:rounded-xl sm:border sm:border-slate-200 sm:shadow-xl dark:shadow-white/20"
                >
                    <div className="flex flex-col items-center gap-2">
                        <div className="flex flex-wrap items-center gap-1">
                            <PrimaryHeading>LRSK</PrimaryHeading>
                            <EmphasizeText>verification notice</EmphasizeText>
                        </div>

                        <NormalText>Verification mail has been sent to your email</NormalText>

                        <p
                            className={cn('text-red-500', {
                                hidden: !errors?.throttle,
                                block: errors?.throttle,
                            })}
                        >
                            {errors?.throttle}
                        </p>
                    </div>
                    <PrimaryButton btnType="submit" addClasses="w-full flex items-center justify-center gap-1" disabled={processing}>
                        {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                        Resend Email
                    </PrimaryButton>
                </form>
            </AuthLayout>
        </>
    );
}
