<script setup lang="ts">
    import { Head, useForm } from '@inertiajs/vue3';
    import AppLayout from '@/vue/default/layout/AppLayout.vue';
    import { getRouteUri } from '@/lib/utils';
    import { usePage } from '@inertiajs/vue3';
    import { PageDataType } from '@/types/session';
    import GoogleSvg from '@/vue/default/icons/GoogleSvg.vue';
    import GithubSvg from '@/vue/default/icons/GithubSvg.vue';
    import { CircleAlert, CircleCheck, Trash2 } from 'lucide-vue-next';

    const { auth, socialAuthStatus } = usePage<PageDataType>().props;

    const form = useForm({});

    function deleteUser() {
        form.post(getRouteUri('deleteUser'));
    }
</script>

<template>
    <Head title="Vue Profile Overview" />
    <AppLayout>
        <div class="flex flex-col gap-4 p-4">
            <img
                :src="auth?.user?.avatar"
                :alt="auth?.user?.username"
                class="object-conver h-32 w-32 rounded"
            />

            <div class="flex flex-col">
                <h2 class="text-2xl font-medium">{{ auth?.user?.name }}</h2>
                <p class="tracking-tight">{{ auth?.user?.email }}</p>
                <p class="tracking-tight">&#64;{{ auth?.user?.username }}</p>
            </div>

            <div class="flex flex-col gap-2">
                <p class="text-lg font-medium">Social Profiles</p>

                <div class="flex items-center gap-2">
                    <div class="flex items-center gap-1">
                        <GithubSvg />
                        <p class="">Github</p>
                    </div>

                    <div class="flex items-center">
                        <div
                            class="flex items-center gap-1"
                            v-if="!socialAuthStatus?.github"
                        >
                            <CircleCheck />
                            <p>Connected</p>
                        </div>
                        <div
                            class="flex items-center gap-1"
                            v-if="socialAuthStatus?.github"
                        >
                            <CircleAlert />
                            <p class="">Disconnected</p>
                        </div>
                    </div>
                </div>

                <div class="flex items-center gap-2">
                    <div class="flex items-center gap-1">
                        <GoogleSvg />
                        <p class="">Google</p>
                    </div>

                    <div class="flex items-center">
                        <div
                            class="flex items-center gap-1"
                            v-if="!socialAuthStatus?.google"
                        >
                            <CircleCheck />
                            <p>Connected</p>
                        </div>
                        <div
                            class="flex items-center gap-1"
                            v-if="socialAuthStatus?.google"
                        >
                            <CircleAlert />
                            <p class="">Disconnected</p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="flex flex-col items-start gap-2">
                <p class="text-lg font-medium">Delete Profile</p>

                <button
                    @click="deleteUser"
                    type="button"
                    class="flex gap-1 rounded border px-2 py-1 hover:border-red-500 hover:text-red-500 hover:outline-red-500"
                >
                    <Trash2 />
                    <span class="">Delete</span>
                </button>
            </div>
        </div>
    </AppLayout>
</template>
