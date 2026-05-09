<script setup lang="ts">
import SocialLogin from '@/components/auth/SocialLogin.vue';
import PrimaryButton from '@/components/button/PrimaryButton.vue';
import PrimaryHeading from '@/components/heading/PrimaryHeading.vue';
import PrimaryCheckbox from '@/components/input/PrimaryCheckbox.vue';
import PrimaryInput from '@/components/input/PrimaryInput.vue';
import PrimaryPassword from '@/components/input/PrimaryPassword.vue';
import NormalLink from '@/components/link/NormalLink.vue';
import EmphasizeText from '@/components/text/EmphasizeText.vue';
import NormalText from '@/components/text/NormalText.vue';
import AuthLayout from '@/layouts/AuthLayout.vue';
import { Head, useForm } from '@inertiajs/vue3';
import { LoaderCircle } from 'lucide-vue-next';

type LoginForm = {
    email: string;
    password: string;
    remember: boolean;
};

const { reset, post, errors, clearErrors, processing, email, password, remember } = useForm<Required<LoginForm>>({
    email: '',
    password: '',
    remember: true,
});

const handleSubmit = () => {
    console.log(email);

    try {
        post(route('loginForm'), {
            onError: () => console.log(errors)
        });
        
    } catch (error) {
        console.log(error);
    }

};
</script>

<template>
    <Head title="Login"></Head>
    <AuthLayout>
        <form
            @submit.prevent="handleSubmit"
            class="flex w-full max-w-sm flex-col gap-4 p-6 dark:shadow-white/20 sm:rounded-xl sm:border sm:border-slate-200 sm:shadow-xl"
        >
            <div class="flex flex-col gap-2">
                <div class="flex flex-wrap items-center gap-1">
                    <PrimaryHeading>LRSK</PrimaryHeading>
                    <EmphasizeText>login</EmphasizeText>
                </div>

                <div class="flex flex-wrap items-center">
                    <NormalText>Create your new account?</NormalText>
                    <NormalLink :href="route('register')">Sign Up</NormalLink>
                </div>
            </div>

            <SocialLogin />

            <PrimaryInput id="email" labelName="Email" placeholder="safi@gmail.com" :error="errors?.email" />

            <PrimaryPassword id="password" labelName="Password" :forgot="true" :error="errors?.password" />

            <PrimaryCheckbox id="remember" labelName="Remember Me" defaultChecked="false" />

            <PrimaryButton btnType="submit" addClasses="w-full flex items-center justify-center gap-1" :disabled="processing">
                <LoaderCircle v-if="processing" class="h-4 w-4 animate-spin" />
                Submit
            </PrimaryButton>
        </form>
    </AuthLayout>
</template>
