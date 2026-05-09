<script setup lang="ts">
    import { Head, useForm, Link } from '@inertiajs/vue3';
    import AuthLayout from '@/vue/default/layout/AuthLayout.vue';
    import { LoginFormDataType } from '@/types/form';
    import { ref } from 'vue';
    import { getRouteUri } from '@/lib/utils';
    import { LoaderCircle, EyeClosed, Eye } from 'lucide-vue-next';
    import SocialLogin from '@/vue/default/components/SocialLogin.vue';

    const showPassword = ref(false);

    const form = useForm<Required<LoginFormDataType>>({
        email: '',
        password: '',
        remember: true,
    });

    const toggleShowPassword = () => {
        showPassword.value = !showPassword.value;
    };

    const handleSubmit = () => {
        form.post(getRouteUri('loginPost'));
    };

    const forgotPasswordRequest = () => {
        form.post(getRouteUri('passwordResetRequestPost'));
    };
</script>

<template>
    <Head title="Vue Login"></Head>
    <AuthLayout>
        <div class="flex flex-col gap-6 px-4 py-8">
            <div class="flex flex-col items-center gap-2">
                <h2 class="text-4xl">LOGIN</h2>

                <Link
                    :href="getRouteUri('register')"
                    class="flex flex-wrap items-center gap-1"
                >
                    <span class="tracking-tight">Create your new account?</span>
                    <span class="font-medium">Sign Up</span>
                </Link>
            </div>

            <SocialLogin />

            <form
                @submit.prevent="handleSubmit"
                class="flex w-full flex-col gap-4"
            >
                <div class="flex flex-col gap-1">
                    <label
                        for="email"
                        class="w-fit font-medium"
                    >
                        Email
                    </label>

                    <input
                        id="email"
                        type="text"
                        placeholder="safi@gmail.com"
                        autoComplete="on"
                        class="w-full rounded border px-2 py-1"
                        v-model="form.email"
                    />

                    <p
                        class="text-red-500"
                        v-if="form.errors.email"
                    >
                        {{ form.errors?.email?.[0] }}
                    </p>
                </div>

                <div class="group flex flex-col gap-1">
                    <label
                        for="password"
                        class="w-fit font-medium"
                    >
                        Password
                    </label>

                    <div class="flex rounded border px-2 py-1 group-focus-within:outline">
                        <input
                            id="password"
                            :type="showPassword ? 'text' : 'password'"
                            placeholder="**********"
                            autoComplete="current-password"
                            class="flex-1 outline-none"
                            v-model="form.password"
                        />

                        <button
                            class="flex outline-none"
                            type="button"
                            @click="toggleShowPassword"
                        >
                            <EyeClosed v-if="!showPassword" />
                            <Eye v-if="showPassword" />
                        </button>
                    </div>

                    <p
                        class="text-red-500"
                        v-if="form.errors.password"
                    >
                        {{ form.errors?.password?.[0] }}
                    </p>
                </div>

                <div class="flex items-center justify-between">
                    <div class="flex w-fit cursor-pointer items-center gap-2">
                        <input
                            id="remember"
                            type="checkbox"
                            class="size-4"
                            checked="true"
                            v-model="form.remember"
                        />

                        <label
                            for="remember"
                            class="font-medium"
                        >
                            Remember Me
                        </label>
                    </div>

                    <button
                        type="button"
                        @click="forgotPasswordRequest"
                        class="rounded px-2 py-1 font-medium"
                    >
                        Forgot Password?
                    </button>
                </div>

                <button
                    type="submit"
                    class="relative flex items-center justify-center gap-2 rounded border py-1 font-medium"
                    :disabled="form.processing"
                >
                    <LoaderCircle
                        class="absolute right-2 size-4 animate-spin"
                        v-if="form.processing"
                    />

                    <span>Sign In</span>
                </button>
            </form>
        </div>
    </AuthLayout>
</template>
