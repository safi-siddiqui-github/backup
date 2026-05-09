<script setup lang="ts">
import MainHeader from '@/components/header/MainHeader.vue';
</script>

<template>
    <div class="text-sm dark:bg-black dark:text-white">
        <MainHeader />
        <slot />
    </div>
</template>
