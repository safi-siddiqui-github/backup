<script setup lang="ts">
    import { getRouteUri } from '@/lib/utils';
    import LaravelSvg from '@/vue/default/icons/LaravelSvg.vue';
    import ReactSvg from '@/vue/default/icons/ReactSvg.vue';
    import VueSvg from '@/vue/default/icons/VueSvg.vue';
    import { Link } from '@inertiajs/vue3';
    import NotificationBar from '@/vue/default/components/NotificationBar.vue';
</script>

<template>
    <div class="flex h-screen min-h-fit items-center justify-center overflow-y-auto">
        <div
            class="flex w-full flex-col divide-y-1 divide-slate-300 overflow-hidden sm:max-w-lg sm:rounded-lg sm:border sm:border-slate-300 sm:shadow"
        >
            <div class="flex flex-wrap">
                <a
                    :href="route('livewire.login')"
                    class="flex flex-1 items-center justify-center gap-1 p-2"
                >
                    <LaravelSvg addClasses="size-7" />
                    <p class="text-lg">Livewire</p>
                </a>
                <a
                    :href="route('react.login')"
                    class="flex flex-1 items-center justify-center gap-1 p-2"
                >
                    <ReactSvg addClasses="size-7" />
                    <p class="text-lg">React</p>
                </a>

                <Link
                    :href="getRouteUri('login')"
                    class="flex flex-1 items-center justify-center gap-1 p-2 bg-black text-white dark:bg-white dark:text-black"
                >
                    <VueSvg addClasses="size-7" />
                    <p class="text-lg">Vue</p>
                </Link>
            </div>

            <!-- Slot -->
            <slot />
        </div>
    </div>

    <NotificationBar />
</template>
