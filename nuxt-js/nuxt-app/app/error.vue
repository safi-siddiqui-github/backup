<script setup lang="ts">
import type { DefinePropsType } from "#shared/types";

const props = defineProps<DefinePropsType>();
</script>

<template>
  <NuxtUIAppComponent>
    <NuxtUIErrorComponent :error="error" />
  </NuxtUIAppComponent>
</template>
