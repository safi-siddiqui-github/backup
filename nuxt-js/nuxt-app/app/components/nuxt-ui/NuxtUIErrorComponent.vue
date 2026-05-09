<script setup lang="ts">
import type { DefinePropsType } from "#shared/types";

const props = defineProps<DefinePropsType>();
</script>

<template>
  <div>
    <UError :error="props?.error" />
  </div>
</template>
