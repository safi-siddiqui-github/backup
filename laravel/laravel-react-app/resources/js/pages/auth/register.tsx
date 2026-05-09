import SocialLogin from '@/components/general/social-login';
import AuthLayout from '@/components/layout/auth-layout';
import ButtonComponent from '@/components/ui/button-component';
import ErrorTextComponent from '@/components/ui/error-text-component';
import InputComponent from '@/components/ui/input-component';
import LabelComponent from '@/components/ui/label-component';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler, useCallback } from 'react';

type Form = {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
};

export default function Page() {
    const { setData, reset, post, errors, clearErrors, processing } = useForm<Required<Form>>({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const handleSubmit = useCallback<FormEventHandler<HTMLFormElement>>(
        (e) => {
            e.preventDefault();
            post(route('register.form'), {});
            reset('password');
            clearErrors();
        },
        [post, reset, clearErrors],
    );

    return (
        <>
            <Head title="Register"></Head>
            <AuthLayout>
                <form
                    onSubmit={handleSubmit}
                    className="flex w-full max-w-sm flex-col gap-6 p-4"
                >
                    <div className="flex flex-col items-start">
                        <h2 className="text-xl font-medium">Register</h2>
                        <Link
                            href={route('login.page')}
                            className="py-1 text-sm"
                        >
                            Already have an Account?
                        </Link>
                    </div>

                    <SocialLogin />

                    <div className="flex flex-col gap-1">
                        <LabelComponent htmlFor="name">Name</LabelComponent>
                        <InputComponent
                            id="name"
                            placeholder="fullname"
                            onChange={(e) => {
                                setData('name', e.currentTarget.value);
                            }}
                        />
                        {errors.name && <ErrorTextComponent children={errors.name} />}
                    </div>

                    <div className="flex flex-col gap-1">
                        <LabelComponent htmlFor="email">Email</LabelComponent>
                        <InputComponent
                            id="email"
                            placeholder="emal@example.com"
                            onChange={(e) => {
                                setData('email', e.currentTarget.value);
                            }}
                        />
                        {errors.email && <ErrorTextComponent children={errors.email} />}
                    </div>

                    <div className="flex flex-col gap-1">
                        <LabelComponent htmlFor="password">Password</LabelComponent>
                        <InputComponent
                            id="password"
                            placeholder="**********"
                            onChange={(e) => {
                                setData('password', e.currentTarget.value);
                            }}
                        />
                        {errors.password && <ErrorTextComponent children={errors.password} />}
                    </div>

                    <div className="flex flex-col gap-1">
                        <LabelComponent htmlFor="password_confirmation">Password Confirmation</LabelComponent>
                        <InputComponent
                            id="password_confirmation"
                            placeholder="**********"
                            onChange={(e) => {
                                setData('password_confirmation', e.currentTarget.value);
                            }}
                        />
                        {errors.password_confirmation && <ErrorTextComponent children={errors.password_confirmation} />}
                    </div>

                    <ButtonComponent
                        type="submit"
                        disabled={processing}
                    >
                        Register
                    </ButtonComponent>
                </form>
            </AuthLayout>
        </>
    );
}
