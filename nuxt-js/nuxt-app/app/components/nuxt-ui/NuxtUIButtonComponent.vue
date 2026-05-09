<script setup lang="ts">
import type { ButtonProps, NavigationMenuProps } from "@nuxt/ui";

export type NuxtUIButtonComponentProps = ButtonProps;

const props = withDefaults(defineProps<NuxtUIButtonComponentProps>(), {});
</script>
<template>
  <UButton v-bind="props"><slot /></UButton>
</template>
