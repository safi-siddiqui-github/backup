<script setup lang="ts">
import { useAppearance } from '@/composables/useAppearance';
import { cn } from '@/lib/utils';
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
        :class="
            cn('flex w-12 cursor-pointer items-center gap-1 rounded-full border border-black dark:border-white px-1 py-0.5', {
                'justify-start': appearance == 'light',
                'justify-end': appearance == 'dark',
            })
        "
    >
        <Moon
            :class="
                cn('size-5 animate-in slide-in-from-left', {
                    hidden: appearance == 'light',
                })
            "
        />
        <Sun
            :class="
                cn('size-5 animate-in slide-in-from-right', {
                    hidden: appearance == 'dark',
                })
            "
        />
    </button>
</template>
