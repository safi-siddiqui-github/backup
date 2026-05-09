<script setup lang="ts">
    import { getRouteUri } from '@/lib/utils';
    import { Link, useForm, usePage } from '@inertiajs/vue3';
    import ToggleAppearance from '@/vue/default/components/ToggleAppearance.vue';
    import { PageDataType } from '@/types/session';
    import LaravelSvg from '@/vue/default/icons/LaravelSvg.vue';
    import ReactSvg from '@/vue/default/icons/ReactSvg.vue';
    import VueSvg from '@/vue/default/icons/VueSvg.vue';
    import { LogIn, LogOut, User } from 'lucide-vue-next';

    const { auth } = usePage<PageDataType>().props;
    const form = useForm({});

    const handleLogout = () => {
        form.post(getRouteUri('logoutPost'));
    };
</script>

<template>
    <header class="flex flex-wrap items-center justify-center gap-4 border-b border-slate-500 py-1 pr-4 sm:justify-between sm:py-0">
        <div class="flex flex-wrap items-center justify-center">
            <a
                :href="route('livewire.home')"
                class="flex gap-1 p-2 md:px-6"
            >
                <LaravelSvg addClasses="size-7" />
                <span class="text-lg font-medium">Livewire</span>
            </a>
            <a
                :href="route('react.home')"
                class="flex gap-1 p-2 md:px-6"
            >
                <ReactSvg addClasses="size-7" />
                <span class="text-lg font-medium">React</span>
            </a>
            <Link
                :href="getRouteUri('home')"
                class="flex gap-1 p-2 md:px-6 bg-black text-white dark:bg-white dark:text-black"
            >
                <VueSvg addClasses="size-7" />
                <span class="text-lg font-medium">Vue</span>
            </Link>
        </div>

        <div class="flex flex-wrap items-center gap-2">
            <!-- auth -->
            <Link
                class="flex min-w-fit items-center gap-1 px-2 py-1"
                :href="getRouteUri('profileOverview')"
                v-if="auth?.user"
            >
                <User class="size-6" />
                <p class="font-medium">{{ auth?.user?.username }}</p>
            </Link>
            <button
                @click="handleLogout"
                type="button"
                class="flex min-w-fit items-center gap-1 rounded px-2 py-1"
                v-if="auth?.user"
            >
                <LogOut class="size-6" />
                <span class="font-medium">Logout</span>
            </button>
            <!-- endauth -->
            <!-- guest -->
            <Link
                :href="getRouteUri('login')"
                class="flex min-w-fit items-center gap-1 px-2 py-1"
                v-if="!auth?.user"
            >
                <LogIn class="size-6" />
                <p class="font-medium">Login</p>
            </Link>
            <!-- endguest -->

            <ToggleAppearance />
        </div>
    </header>
</template>
