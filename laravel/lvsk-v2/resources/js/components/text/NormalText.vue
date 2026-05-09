<script setup lang="ts">
type TextType = {
    addClasses?: string;
};

const props = defineProps<TextType>();
</script>

<template>
    <p :class="`tracking-tight ${addClasses}`">
        <slot />
    </p>
</template>
