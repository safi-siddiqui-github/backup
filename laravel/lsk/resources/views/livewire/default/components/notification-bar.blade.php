<?php

use App\Enums\NotifyBarEnum;

use function Livewire\Volt\{computed, mount, state};

state([
    'status' => session('status', false),
    // 'title' => '',
    // 'message' => '',
]);

$title = computed(function () {
    switch ($this->status) {
        case NotifyBarEnum::REGISTER_SUCCESS:
            return 'Register Success';
        case NotifyBarEnum::LOGIN_SUCCESS:
            return 'Login Success';
        case NotifyBarEnum::LOGOUT_SUCCESS:
            return 'Logout Success';
        case NotifyBarEnum::VERIFICATION_SUCCESS:
            return 'Verification Success';
        case NotifyBarEnum::PASSWORD_REQUEST:
            return 'Password Requested';
        case NotifyBarEnum::PASSWORD_RESET:
            return 'Password Reset';
        default:
            return 'Success';
    }
});

$message = computed(function () {
    switch ($this->status) {
        case NotifyBarEnum::REGISTER_SUCCESS:
            return 'User Registered Successfully';
        case NotifyBarEnum::LOGIN_SUCCESS:
            return 'User Logged In Successfully';
        case NotifyBarEnum::LOGOUT_SUCCESS:
            return 'User Logged Out';
        case NotifyBarEnum::VERIFICATION_SUCCESS:
            return 'Email Verified Successfully';
        case NotifyBarEnum::PASSWORD_REQUEST:
            return 'Password Request Email Sent';
        case NotifyBarEnum::PASSWORD_RESET:
            return 'Password Updated Succesfully';
        default:
            return 'Success';
    }
});

$removeBar = function () {
    $this->status = false;
};

?>

<div class="fixed right-0 bottom-0 w-full">
    <div
        class="flex flex-col items-end p-2"
        x-data="{
            status: $wire.status,
            removeStatus() {
                this.status = false
            },
        }"
        x-init="
            $watch('status', (value) => {
                if (! value) {
                    $wire.removeBar()
                }
            })
        "
    >
        <div
            wire:transition
            x-init="
                setTimeout(() => {
                    removeStatus()
                }, 5000)
            "
            class="flex w-full max-w-80 rounded border p-2 sm:w-80"
            :class="status ? '' : 'hidden'"
        >
            <button class="flex cursor-default items-center justify-center px-2">
                <livewire:default.svg.check />
            </button>

            <div class="flex flex-1 flex-col">
                <p class="">
                    {{ $this->title }}
                </p>

                <p class="text-xs">
                    {{ $this->message }}
                </p>
            </div>

            <button
                @click="status=!status"
                type="button"
                class="flex items-center justify-center px-2"
            >
                <livewire:default.svg.trash />
            </button>
        </div>
    </div>
</div>
