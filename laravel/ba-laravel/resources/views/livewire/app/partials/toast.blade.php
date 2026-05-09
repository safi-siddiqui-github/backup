<?php

use App\Enums\ToastBarEnum;

use function Livewire\Volt\{computed, mount, state};

state([
    'status' => session('status', false),
    // 'title' => '',
    // 'message' => '',
]);

$title = computed(function () {
    switch ($this->status) {
        case ToastBarEnum::LOGIN_SUCCESS:
            return 'Login Success';
        case ToastBarEnum::LOGOUT_SUCCESS:
            return 'Logout Success';
        case ToastBarEnum::BOOKING_SUCCESS:
            return 'Booking Success';
        case ToastBarEnum::BOOKING_UPDATED:
            return 'Booking Updated';
        default:
            return 'Success';
    }
});

$message = computed(function () {
    switch ($this->status) {
        case ToastBarEnum::LOGIN_SUCCESS:
            return 'User Logged In Successfully';
        case ToastBarEnum::LOGOUT_SUCCESS:
            return 'User Logged Out';
        case ToastBarEnum::BOOKING_SUCCESS:
            return 'Booking Was Requested';
        case ToastBarEnum::BOOKING_UPDATED:
            return 'Booking Was Updated';
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
            wire:transition
            x-init="
                setTimeout(() => {
                    removeStatus()
                }, 5000)
            "
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
