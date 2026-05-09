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
    <button
        :title="title"
        :class="`w-fit cursor-pointer rounded bg-black px-2 py-1 font-medium text-white disabled:cursor-not-allowed dark:bg-white dark:text-black ${addClasses}`"
        :type="btnType"
        :disabled="disabled"
    >
        <slot />
    </button>
</template>
