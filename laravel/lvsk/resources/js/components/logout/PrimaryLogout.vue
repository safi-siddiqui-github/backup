<script setup lang="ts">
import PrimaryButton from '@/components/button/PrimaryButton.vue';
import { useForm } from '@inertiajs/vue3';
import { LoaderCircle } from 'lucide-vue-next';

type LogoutType = {
    addClasses?: string;
    title?: string;
};

const props = defineProps<LogoutType>();

const { post, processing } = useForm({});

const logout = () => {
    post('logout');
};
</script>

<template>
    <PrimaryButton @click="logout" addClasses="w-full flex items-center justify-center gap-1" :disabled="processing">
        <LoaderCircle v-if="processing" className="h-4 w-4 animate-spin" />
        Logout
    </PrimaryButton>
</template>
