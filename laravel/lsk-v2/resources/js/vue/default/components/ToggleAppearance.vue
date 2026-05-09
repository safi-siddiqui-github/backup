<script setup lang="ts">
    import { useAppearance } from '@/vue/composables/useAppearance';
    import { Moon, Sun } from 'lucide-vue-next';

    const { appearance, updateAppearance } = useAppearance();

    const toggleAppearnece = () => {
        if (appearance.value == 'dark') {
            updateAppearance('light');
        } else {
            updateAppearance('dark');
        }
    };
</script>

<template>
    <button
        type="button"
        @click="toggleAppearnece"
        class="flex w-12 cursor-pointer items-center gap-1 rounded-full border border-black dark:border-white px-1 py-0.5"
        :class="appearance == 'light' ? 'justify-start' : 'justify-end'"
    >
        <Moon
            class="size-5 animate-in slide-in-from-left"
            v-if="appearance == 'light'"
        />
        <Sun
            class="size-5 animate-in slide-in-from-right"
            v-if="appearance != 'light'"
        />
    </button>
</template>
