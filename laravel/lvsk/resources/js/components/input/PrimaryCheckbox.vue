<script setup lang="ts">
type CheckboxType = {
    id: string;
    labelName: string;
    addClasses?: string;
};

const props = defineProps<CheckboxType>();
</script>

<template>
    <div class="flex flex-wrap items-center gap-2">
        <input :id="id" type="checkbox" :class="`size-4 ${addClasses}`" />
        <label :for="id" class="cursor-pointer font-medium">{{ labelName }}</label>
    </div>
</template>
