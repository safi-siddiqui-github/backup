<script setup lang="ts">
import type { NuxtUINavigationMenuComponentProps } from "~/components/nuxt-ui/NuxtUINavigationMenuComponent.vue";

const navigationMenuItems = ref<NuxtUINavigationMenuComponentProps["items"]>([
  {
    label: "Home",
    icon: "i-mdi-home",
    to: "/",
  },
  {
    label: "About",
    icon: "i-mdi-information",
    to: "/about",
  },
  {
    label: "secret",
    icon: "i-mdi-lock",
    to: "/secret",
  },
  {
    label: "GitHub",
    icon: "i-simple-icons-github",
    to: "https://github.com/safi-siddiqui-github",
    target: "_blank",
  },
]);
</script>

<template>
  <NuxtUIHeaderComponent>
    <template #left>
      <p class="text-2xl font-bold">Safi Siddiqui</p>
    </template>
    <template #center>
      <NuxtUINavigationMenuComponent :items="navigationMenuItems" />
    </template>
    <template #right>
      <UColorModeButton />
    </template>
    <template #body>
      <NuxtUINavigationMenuComponent
        :items="navigationMenuItems"
        variant="link"
        orientation="vertical"
      />
    </template>
  </NuxtUIHeaderComponent>
</template>
