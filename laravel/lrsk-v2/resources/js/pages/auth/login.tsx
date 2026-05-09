import SocialLogin from '@/components/auth/social-login';
import PrimaryButton from '@/components/button/primary-button';
import PrimaryHeading from '@/components/heading/primary-heading';
import PrimaryCheckbox from '@/components/input/primary-checkbox';
import PrimaryInput from '@/components/input/primary-input';
import PrimaryPassword from '@/components/input/primary-password';
import NormalLink from '@/components/link/normal-link';
import EmphasizeText from '@/components/text/emphasize-text';
import NormalText from '@/components/text/normal-text';
import AuthLayout from '@/layouts/auth-layout';
import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import { FormEventHandler, useCallback } from 'react';

type LoginForm = {
    email: string;
    password: string;
    remember: boolean;
};

export default function Page() {
    const { setData, data, reset, post, errors, clearErrors, processing } = useForm<Required<LoginForm>>({
        email: '',
        password: '',
        remember: true,
    });

    const handleSubmit = useCallback<FormEventHandler<HTMLFormElement>>(
        (e) => {
            e.preventDefault();
            post(route('loginForm'), {});
        },
        [data],
    );

    return (
        <>
            <Head title="Login"></Head>
            <AuthLayout>
                <form
                    onSubmit={handleSubmit}
                    className="flex w-full max-w-sm flex-col gap-4 p-6 sm:rounded-xl sm:border sm:border-slate-200 sm:shadow-xl dark:shadow-white/20"
                >
                    <div className="flex flex-col gap-2">
                        <div className="flex flex-wrap items-center gap-1">
                            <PrimaryHeading>LRSK</PrimaryHeading>
                            <EmphasizeText>login</EmphasizeText>
                        </div>

                        <div className="flex flex-wrap items-center">
                            <NormalText>Create your new account?</NormalText>
                            <NormalLink href={route('register')}>Sign Up</NormalLink>
                        </div>
                    </div>

                    <SocialLogin />

                    <PrimaryInput
                        id="email"
                        label="Email"
                        placeholder="safi@gmail.com"
                        onChange={(e) => {
                            setData('email', e.currentTarget.value);
                        }}
                        error={errors?.email}
                    />

                    <PrimaryPassword
                        id="password"
                        label="Password"
                        forgot={true}
                        onChange={(e) => {
                            setData('password', e.currentTarget.value);
                        }}
                        error={errors?.password}
                    />

                    <PrimaryCheckbox
                        id="remember"
                        label="Remember Me"
                        defaultChecked={data.remember}
                        onChange={(e) => {
                            setData('remember', e.currentTarget.checked);
                        }}
                    />

                    <PrimaryButton btnType="submit" addClasses="w-full flex items-center justify-center gap-1" disabled={processing}>
                        {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                        Submit
                    </PrimaryButton>
                </form>
            </AuthLayout>
        </>
    );
}
