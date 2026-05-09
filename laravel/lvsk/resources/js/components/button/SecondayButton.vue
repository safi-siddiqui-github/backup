<script setup lang="ts">
type ButtonType = {
    addClasses?: string;
    title?: string;
    btnType?: 'button' | 'submit' | 'reset' | undefined;
    disabled?: boolean;
};

const props = defineProps<ButtonType>();
</script>

<template>
    <button :title="title" :class="`w-fit border px-2 py-1 font-medium ${addClasses}`" :type="btnType" :disabled="disabled">
        <slot />
    </button>
</template>
