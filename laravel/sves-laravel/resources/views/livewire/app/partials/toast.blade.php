<?php

use App\Enums\ToastBarEnum;

use function Livewire\Volt\computed;
use function Livewire\Volt\state;

state([
    'status' => session('status', false),
    // 'title' => '',
    // 'message' => '',
]);

$title = computed(function () {
    switch ($this->status) {
        case ToastBarEnum::REGISTER_SUCCESS:
            return 'Register Success';
        case ToastBarEnum::LOGIN_SUCCESS:
            return 'Login Success';
        case ToastBarEnum::LOGOUT_SUCCESS:
            return 'Logout Success';
        case ToastBarEnum::VERIFICATION_SUCCESS:
            return 'Verification Success';
        case ToastBarEnum::PASSWORD_REQUEST:
            return 'Password Requested';
        case ToastBarEnum::PASSWORD_RESET:
            return 'Password Reset';
        case ToastBarEnum::PROFILE_UPDATED:
            return 'Profile Updated';
        default:
            return 'Success';
    }
});

$message = computed(function () {
    switch ($this->status) {
        case ToastBarEnum::REGISTER_SUCCESS:
            return 'User Registered Successfully';
        case ToastBarEnum::LOGIN_SUCCESS:
            return 'User Logged In Successfully';
        case ToastBarEnum::LOGOUT_SUCCESS:
            return 'User Logged Out';
        case ToastBarEnum::VERIFICATION_SUCCESS:
            return 'Email Verified Successfully';
        case ToastBarEnum::PASSWORD_REQUEST:
            return 'Password Request Email Sent';
        case ToastBarEnum::PASSWORD_RESET:
            return 'Password Updated Succesfully';
        case ToastBarEnum::PROFILE_UPDATED:
            return 'Profile Updated Succesfully';
        default:
            return 'Success';
    }
});

$removeBar = function () {
    $this->status = false;
};

?>

<div class="fixed right-0 bottom-0 z-50 w-full">
    <div
        class="flex flex-col items-end p-2"
        x-data="{
            status: $wire.status,
            removeStatus() {
                this.status = false
            },
        }"
        x-init="
            $watch('status', value => {
                if (! value) {
                    $wire.removeBar()
                }
            })
        "
    >
        <div
            class="flex w-full max-w-80 items-center gap-2 rounded border p-2 backdrop-blur-lg sm:w-80"
            :class="status ? '' : 'hidden'"
            x-init="
                setTimeout(() => {
                    removeStatus()
                }, 5000)
            "
            x-transition
        >
            <flux:icon.check-circle />

            <div class="flex flex-col">
                <p class="">
                    {{ $this->title }}
                </p>

                <p class="text-xs">
                    {{ $this->message }}
                </p>
            </div>

            <flux:spacer />

            <flux:button
                @click="status=!status"
                icon="trash"
            ></flux:button>
        </div>
    </div>
</div>
