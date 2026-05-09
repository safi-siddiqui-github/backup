<script setup lang="ts">
type TextType = {
    addClasses?: string;
};

const props = defineProps<TextType>();
</script>

<template>
    <p :class="`font-medium italic tracking-tighter ${addClasses}`">
        <slot />
    </p>
</template>
