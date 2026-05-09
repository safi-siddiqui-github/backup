<script setup lang="ts">
import type { CheckboxProps } from "@nuxt/ui";

export type NuxtUICheckboxComponentProps = CheckboxProps;

const props = defineProps<NuxtUICheckboxComponentProps>();

const safeProps = computed(() => ({
  ...props,
  modelValue: props.modelValue ?? "",
  defaultValue: props.defaultValue ?? undefined,
}));
</script>
<template>
  <UCheckbox
    v-bind="safeProps"
    @update:model-value="$emit('update:modelValue', $event)"
  />
</template>
