<script setup lang="ts">
    import Header from '@/vue/default/components/Header.vue';
    import NotificationBar from '@/vue/default/components/NotificationBar.vue';
</script>

<template>
    <div class="">
        <Header />
        <slot />
        <NotificationBar />
    </div>
</template>
