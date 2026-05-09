<script setup lang="ts">
    import { Head, useForm, usePage } from '@inertiajs/vue3';
    import AuthLayout from '@/vue/default/layout/AuthLayout.vue';
    import { PasswordResetFormDataType } from '@/types/form';
    import { ref } from 'vue';
    import { getRouteUri } from '@/lib/utils';
    import { LoaderCircle, EyeClosed, Eye } from 'lucide-vue-next';
    import { PageDataType } from '@/types/session';

    const { email } = usePage<PageDataType>().props;

    const showPassword = ref(false);
    const showPasswordConfirmation = ref(false);

    const form = useForm<Required<PasswordResetFormDataType>>({
        email: email ?? 'required',
        pin: '',
        password: '',
        password_confirmation: '',
    });

    const toggleShowPassword = () => {
        showPassword.value = !showPassword.value;
    };

    const toggleShowPasswordConfirmation = () => {
        showPasswordConfirmation.value = !showPasswordConfirmation.value;
    };

    const handleSubmit = () => {
        form.post(getRouteUri('passwordResetPost'));
    };

    const resendPin = () => {
        form.post(getRouteUri('passwordResetRequestResendPost'));
    };
</script>

<template>
    <Head title="Vue Login"></Head>
    <AuthLayout>
        <div class="flex flex-col gap-6 px-4 py-8">
            <div class="flex flex-col items-center gap-2">
                <h2 class="text-2xl">PASSWORD UPDATE</h2>

                <button
                    @click="resendPin"
                    class="flex flex-wrap items-center gap-1 outline-none hover:underline"
                >
                    <span class="tracking-tight">Get verfication Email?</span>
                    <span class="font-medium">Resend</span>
                </button>
            </div>

            <form
                @submit.prevent="handleSubmit"
                class="flex w-full flex-col gap-4"
            >
                <div>
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

                <div class="flex flex-col gap-1">
                    <label
                        for="pin"
                        class="w-fit font-medium"
                    >
                        Pin Code
                    </label>

                    <input
                        id="pin"
                        type="text"
                        placeholder="0000"
                        class="w-full rounded border px-2 py-1"
                        v-model="form.pin"
                    />

                    <p
                        class="text-red-500"
                        v-if="form.errors.pin"
                    >
                        {{ form.errors?.pin?.[0] }}
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

                <div class="group flex flex-col gap-1">
                    <label
                        for="password_confirmation"
                        class="w-fit font-medium"
                    >
                        Password Confirmation
                    </label>

                    <div class="flex rounded border px-2 py-1 group-focus-within:outline">
                        <input
                            id="password_confirmation"
                            :type="showPasswordConfirmation ? 'text' : 'password'"
                            placeholder="**********"
                            autoComplete="current-password"
                            class="flex-1 outline-none"
                            v-model="form.password_confirmation"
                        />

                        <button
                            class="flex outline-none"
                            type="button"
                            @click="toggleShowPasswordConfirmation"
                        >
                            <EyeClosed v-if="!showPasswordConfirmation" />
                            <Eye v-if="showPasswordConfirmation" />
                        </button>
                    </div>

                    <p
                        class="text-red-500"
                        v-if="form.errors.password_confirmation"
                    >
                        {{ form.errors?.password_confirmation?.[0] }}
                    </p>
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

                    <span>Update Password</span>
                </button>
            </form>
        </div>
    </AuthLayout>
</template>
