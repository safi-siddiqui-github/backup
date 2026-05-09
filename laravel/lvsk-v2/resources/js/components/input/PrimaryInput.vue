<script setup lang="ts">
import { cn } from '@/lib/utils.js';

type InputType = {
    id: string;
    labelName: string;
    addClasses?: string;
    inputType?: string;
    placeholder?: string;
    error?: string;
    defaultValue?: string;
    disabled?: boolean;
};

const props = defineProps<InputType>();
</script>

<template>
    <div class="flex flex-col gap-1">
        <label :for="id" class="cursor-pointer font-medium"> {{labelName}} </label>
        <input :id="id" :type="inputType" :class="`rounded border px-2 py-1 ${addClasses}`" :placeholder="placeholder" :disabled="disabled" />
        <p
            :class="
                cn('text-red-500', {
                    hidden: !error,
                    block: error,
                })
            "
        >
            {{ error }}
        </p>
    </div>
</template>
