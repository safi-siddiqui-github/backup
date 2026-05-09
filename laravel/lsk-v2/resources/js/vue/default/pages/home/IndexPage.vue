<script setup lang="ts">
    import { Head } from '@inertiajs/vue3';
    import AppLayout from '@/vue/default/layout/AppLayout.vue';
</script>

<template>
    <Head title="Vue Home"></Head>
    <AppLayout>
        <div class="flex flex-col gap-4 p-4">
            <div class="flex flex-col">
                <h2 class="text-2xl font-medium">Vue Home</h2>
            </div>
        </div>
    </AppLayout>
</template>
