<script setup lang="ts">
import { LayoutConstants } from "#shared/constants/layout";

// expose variables using useRuntimeConfig composable
const runtimeConfig = useRuntimeConfig();
// console.log("Runtime Config:", runtimeConfig?.public?.apiBase);

// expose public variables at build time
// globally available
const appConfig = useAppConfig();
// console.log("App Config:", appConfig?.title);

definePageMeta({
  layout: LayoutConstants?.WEB_GENERAL_LAYOUT,
});
</script>
<template>
  <div>Secret Page</div>
</template>
