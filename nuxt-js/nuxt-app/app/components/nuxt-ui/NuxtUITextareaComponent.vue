<script setup lang="ts">
import type { TextareaProps } from "@nuxt/ui";

export type NuxtUITextareaComponentProps = TextareaProps;

const props = defineProps<NuxtUITextareaComponentProps>();

const safeProps = computed(() => ({
  ...props,
  modelValue: props.modelValue ?? "",
  defaultValue: props.defaultValue ?? undefined,
}));
</script>
<template>
  <UTextarea
    v-bind="safeProps"
    @update:model-value="$emit('update:modelValue', $event)"
  />
</template>
