<script setup lang="ts">
import PrimaryHeading from '@/components/heading/PrimaryHeading.vue';
import EmphasizeText from '@/components/text/EmphasizeText.vue';
import NormalText from '@/components/text/NormalText.vue';
import AppLayout from '@/layouts/AppLayout.vue';
import { Head } from '@inertiajs/vue3';
</script>

<template>
    <Head title="Dashboard"></Head>
    <AppLayout>
        <div class="flex flex-col gap-4 p-4">
            <div class="flex items-center gap-2">
                <PrimaryHeading>Laravel React Starter Kit</PrimaryHeading>
                <EmphasizeText>lrsk</EmphasizeText>
            </div>
            <NormalText>Dashboard</NormalText>
        </div>
    </AppLayout>
</template>
