<script setup lang="ts">
type ButtonType = {
    addClasses?: string;
    title?: string;
};

const props = defineProps<ButtonType>();
</script>

<template>
    <button type="button" :title="title" :class="`cursor-pointer px-2 py-1 font-medium ${addClasses}`">
        <slot />
    </button>
</template>
