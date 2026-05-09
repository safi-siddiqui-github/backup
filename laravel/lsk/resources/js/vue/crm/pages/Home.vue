<script setup lang="ts">
    import AppLayout from '@/vue/default/layout/AppLayout.vue';
    import { Head } from '@inertiajs/vue3';

    const doThis = () => {
        console.log('haha');
    };
</script>

<template>
    <Head title="Home"></Head>
    <AppLayout>
        <div class="flex flex-col gap-2">
            Vue CRM App
            <button class="border" @click="doThis">Click Me</button>
        </div>
    </AppLayout>
</template>
