<script setup lang="ts">
import { Link } from '@inertiajs/vue3';

type LinkType = {
    href: string;
    addClasses?: string;
    title?: string;
};

const props = defineProps<LinkType>();
</script>

<template>
    <Link :href="href" :title="title" :class="`px-2 py-1 font-medium hover:underline ${addClasses}`">
        <slot />
    </Link>
</template>
