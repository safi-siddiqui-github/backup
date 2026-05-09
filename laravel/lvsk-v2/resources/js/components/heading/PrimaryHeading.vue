<script setup lang="ts">
type TextType = {
    addClasses?: string;
};

const props = defineProps<TextType>();
</script>

<template>
    <h2 :class="`text-2xl font-medium tracking-tight ${addClasses}`">
        <slot />
    </h2>
</template>
