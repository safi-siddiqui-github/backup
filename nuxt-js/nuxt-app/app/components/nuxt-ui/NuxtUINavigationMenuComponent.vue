<script setup lang="ts">
import type { NavigationMenuProps } from "@nuxt/ui";

export type NuxtUINavigationMenuComponentProps = NavigationMenuProps;

const props = withDefaults(
  defineProps<NuxtUINavigationMenuComponentProps>(),
  {},
);
</script>
<template>
  <UNavigationMenu v-bind="props" />
</template>
