<script setup lang="ts">
import type { NuxtUINavigationMenuComponentProps } from "~/components/nuxt-ui/NuxtUINavigationMenuComponent.vue";

const date = new Date().getFullYear();

const navigationMenuItems = ref<NuxtUINavigationMenuComponentProps["items"]>([
  {
    label: "GitHub",
    icon: "i-simple-icons-github",
    to: "https://github.com/safi-siddiqui-github",
    target: "_blank",
  },
]);
</script>
<template>
  <NuxtUIFooterComponent>
    <template #right>
      <p class="text-2xl font-bold">Safi Siddiqui</p>
    </template>
    <template #center>
      <NuxtUINavigationMenuComponent
        :items="navigationMenuItems"
        variant="link"
      />
    </template>
    <template #left>
      <p>Copyright &copy; {{ date }}</p>
    </template>
  </NuxtUIFooterComponent>
</template>
