<script setup lang="ts">
import type { InputProps } from "@nuxt/ui";

export type NuxtUIInputComponentProps = InputProps;

const props = defineProps<NuxtUIInputComponentProps>();

const safeProps = computed(() => ({
  ...props,
  modelValue: props.modelValue ?? "",
  defaultValue: props.defaultValue ?? undefined,
}));
</script>
<template>
  <UInput
    v-bind="safeProps"
    @update:model-value="$emit('update:modelValue', $event)"
  />
</template>
