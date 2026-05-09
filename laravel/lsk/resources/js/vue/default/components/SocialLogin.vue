<script setup lang="ts">
    import { usePage } from '@inertiajs/vue3';
    import { PageDataType } from '@/types/session';
    import GoogleSvg from '@/vue/default/icons/GoogleSvg.vue';
    import GithubSvg from '@/vue/default/icons/GithubSvg.vue';

    const { errors } = usePage<PageDataType>().props;
</script>

<template>
    <div class="flex flex-col gap-2">
        <div class="flex w-full flex-wrap items-center gap-2">
            <a
                :href="route('social.google.login')"
                class="flex min-w-fit flex-1 items-center justify-center gap-1.5 rounded border px-2 py-1.5 hover:outline"
            >
                <GoogleSvg />
                <p class="font-medium tracking-tight">Continue with Google</p>
            </a>

            <a
                :href="route('social.github.login')"
                class="flex min-w-fit flex-1 items-center justify-center gap-1.5 rounded border px-2 py-1.5 hover:outline"
            >
                <GithubSvg />
                <p class="font-medium tracking-tight">Continue with Github</p>
            </a>
        </div>

        <p
            class="text-red-500"
            v-if="errors?.socialAuth"
        >
            {{ errors?.socialAuth?.[0] }}
        </p>
    </div>
</template>
