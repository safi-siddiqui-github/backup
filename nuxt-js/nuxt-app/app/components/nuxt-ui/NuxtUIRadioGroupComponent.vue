<script setup lang="ts">
import type { RadioGroupProps } from "@nuxt/ui";

export type NuxtUIRadioGroupComponentProps = RadioGroupProps;

const props = defineProps<NuxtUIRadioGroupComponentProps>();

const safeProps = computed(() => ({
  ...props,
  modelValue: props.modelValue ?? "",
  defaultValue: props.defaultValue ?? undefined,
}));
</script>
<template>
  <URadioGroup
    v-bind="safeProps"
    @update:model-value="$emit('update:modelValue', $event)"
  />
</template>
