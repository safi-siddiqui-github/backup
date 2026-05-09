<script setup lang="ts">
import type { SelectProps } from "@nuxt/ui";

export type NuxtUISelectComponentProps = SelectProps;

const props = withDefaults(defineProps<NuxtUISelectComponentProps>(), {});

const safeProps = computed(() => ({
  ...props,
  modelValue: props.modelValue ?? undefined,
  defaultValue: props.defaultValue ?? undefined,
}));
</script>
<template>
  <!-- <USelect v-bind="props" /> -->
  <!-- <USelect {...props} /> -->
</template>

<!-- 
  
@update:open="$emit('update:open', $event)"
v-bind="props"
@update:open="$emit('update:open', $event)"

    @update:model-value="$emit('update:modelValue', $event)"

 -->
