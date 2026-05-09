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
    <Link
        :href="href"
        :title="title"
        :class="`w-fit rounded bg-black px-2 py-1 font-medium text-white dark:border dark:bg-white dark:text-black ${addClasses}`"
    >
        <slot />
    </Link>
</template>
