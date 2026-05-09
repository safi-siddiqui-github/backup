<script setup lang="ts">
import NormalButton from '@/components/button/NormalButton.vue';
import NormalLink from '@/components/link/NormalLink.vue';
import { cn } from '@/lib/utils.js';
import { Eye, EyeOff } from 'lucide-vue-next';
import { ref } from 'vue';

type InputType = {
    id: string;
    labelName: string;
    addClasses?: string;
    inputType?: string;
    placeholder?: string;
    error?: string;
    defaultValue?: string;
    disabled?: boolean;
    forgot?: boolean;
};

const show = ref(false);

const toggle = () => {
    show.value = !show.value;
};

const props = defineProps<InputType>();
</script>

<template>
    <div class="flex flex-col gap-1">
        <div class="flex items-center justify-between">
            <label :for="id" class="cursor-pointer font-medium">
                {{ labelName }}
            </label>

            <NormalLink v-if="forgot" :href="route('password.request')">Forgot Password?</NormalLink>
        </div>
        <div :class="`group flex rounded border ${addClasses}`">
            <input :id="id" :type="show ? 'text' : 'password'" class="flex-1 px-2 outline-none" :placeholder="placeholder" />

            <NormalButton @click="toggle">
                <Eye
                    :class="
                        cn('size-5', {
                            hidden: show,
                        })
                    "
                />
                <EyeOff
                    :class="
                        cn('size-5', {
                            hidden: !show,
                        })
                    "
                />
            </NormalButton>
        </div>
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
