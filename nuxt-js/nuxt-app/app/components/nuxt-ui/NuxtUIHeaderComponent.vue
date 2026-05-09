<script setup lang="ts"></script>
<template>
  <UHeader>
    <template #left>
      <div class="flex flex-col">
        <slot name="left" />
      </div>
    </template>
    <div class="flex flex-col">
      <slot name="center" />
    </div>
    <template #right>
      <div class="flex flex-col">
        <slot name="right" />
      </div>
    </template>
    <template #body>
      <div class="flex flex-col">
        <slot name="body" />
      </div>
    </template>
  </UHeader>
</template>
