<script setup lang="ts">
    import { PageDataType } from '@/types/session';
    import { usePage } from '@inertiajs/vue3';
    import { ref, watch } from 'vue';
    const { session } = usePage<PageDataType>().props;
    import { CheckCircle, Trash2 } from 'lucide-vue-next';

    const showMessage = ref(false);
    const title = ref('');
    const message = ref('');

    const handleSession = (value?: string) => {
        switch (value) {
            case 'LOGIN_SUCCESS':
                title.value = 'Login Success';
                message.value = 'User Logged In Successfully';
                showMessage.value = true;
                break;
            case 'REGISTER_SUCCESS':
                title.value = 'Register Success';
                message.value = 'User Registered Successfully';
                showMessage.value = true;
                break;
            case 'LOGOUT_SUCCESS':
                title.value = 'Logout Success';
                message.value = 'User Logged Out';
                showMessage.value = true;
                break;
            case 'VERIFICATION_SUCCESS':
                title.value = 'Verification Success';
                message.value = 'Email Verified Successfully';
                showMessage.value = true;
                break;
            case 'PASSWORD_REQUEST':
                title.value = 'Password Requested';
                message.value = 'Password Request Email Sent';
                showMessage.value = true;
                break;
            case 'PASSWORD_RESET':
                title.value = 'Password Reset';
                message.value = 'Password Updated Successfully';
                showMessage.value = true;
                break;
            default:
                return;
        }
    };

    watch(
        () => session?.flash,
        (newValue) => {
            handleSession(newValue);
            setTimeout(() => {
                showMessage.value = false;
            }, 5000);
        },
        { immediate: true }
    );

    const toggleShowPassword = () => {
        // showMessage.value = !showMessage.value;
        showMessage.value = false;
    };
</script>

<template>
    <div class="fixed right-0 bottom-0 w-full">
        <div class="flex flex-col items-end p-2">
            <div
                class="flex w-full max-w-80 rounded border p-2 gap-2 sm:w-80 items-center"
                v-if="showMessage"
            >
                <CheckCircle />

                <div class="flex flex-1 flex-col">
                    <p class="">{{ title }}</p>
                    <p class="text-xs">{{ message }}</p>
                </div>

                <button
                    @click="toggleShowPassword"
                    type="button"
                    class="flex items-center justify-center p-2 rounded"
                >
                    <Trash2 />
                </button>
            </div>
        </div>
    </div>
</template>
