<?php

use App\Enums\NotifyBarEnum;

use function Livewire\Volt\{computed, mount, state};

state([
    'status' => session('status', false),
    // 'title' => '',
    // 'message' => '',
]);

// mount(function () {
//     $this->msgMaker();
// });

// $msgMaker = function () {
//     $title = 'Success';
//     $message = 'Success';

//     switch ($this->status) {
//         case NotifyBarEnum::REGISTER_SUCCESS:
//             $title = 'Register Success';
//             $message = 'User Registered Succesfully';
//             break;
//         case NotifyBarEnum::LOGIN_SUCCESS:
//             $title = 'Login Success';
//             $message = 'User Logged In Succesfully';
//             break;
//         case NotifyBarEnum::LOGOUT_SUCCESS:
//             $title = 'Logout Success';
//             $message = 'User Logged Out';
//             break;
//         case NotifyBarEnum::VERIFICATION_SUCCESS:
//             $title = 'Verification Success';
//             $message = 'Email Verified Successfully';
//             break;

//         default:

//             break;
//     }

//     $this->title = $title;
//     $this->message = $message;
// };


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
}

?>

<div class="fixed w-full bottom-0 right-0">

    <div class="flex flex-col items-end p-2">

        @if($this->status)
        <div
            wire:transition
            x-init="
                setTimeout(() => {
                    $wire.removeBar();
                }, 5000)
            "
            class="flex border rounded p-2 w-full max-w-80 sm:w-80">

            <button class="flex items-center justify-center px-2 cursor-default">
                <livewire:svg.check />
            </button>

            <div class="flex flex-col flex-1">

                <p class="">
                    {{$this->title}}
                </p>

                <p class="text-xs">
                    {{$this->message}}
                </p>

            </div>

            <button
                wire:click="removeBar"
                type="button"
                class="flex items-center justify-center px-2">
                <livewire:svg.trash />
            </button>

        </div>
        @endif

    </div>

</div>
