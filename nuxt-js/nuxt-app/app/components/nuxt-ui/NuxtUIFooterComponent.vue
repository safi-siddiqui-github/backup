<script setup lang="ts"></script>
<template>
  <UFooter>
    <template #right>
      <div class="flex flex-col">
        <slot name="right" />
      </div>
    </template>
    <div class="flex flex-col">
      <slot name="center" />
    </div>
    <template #left>
      <div class="flex flex-col">
        <slot name="left" />
      </div>
    </template>
  </UFooter>
</template>
