<?php

use Illuminate\Support\Facades\Auth;
use Livewire\Attributes\Session;
use Livewire\Volt\Component;

new class extends Component {

    #[Session]
    public $showMenu = true;

    public $currentRoute = null;
    public $dashboardRoute = null;
    public $workOrderManagementRoute = null;
    public $taskCardLibraryRoute = null;
    public $assetManagementRoute = null;
    public $maintenanceScheduleRoute = null;
    public $profileSettingRoute = null;

    public $user = null;
    public $userName = null;

    public function mount()
    {
        $this->currentRoute = url()->current();
        $this->dashboardRoute = route('dashboard');
        $this->workOrderManagementRoute = route('work-order-management');
        $this->taskCardLibraryRoute = route('task-card-library');
        $this->assetManagementRoute = route('asset-management');
        $this->maintenanceScheduleRoute = route('maintenance-schedule');
        $this->profileSettingRoute = route('profile-setting');

        $this->user = Auth::user();
        $this->userName = ucfirst(Auth::user()->name);
    }

    public function updateShowMenu($value)
    {
        $this->showMenu = $value;
    }

    public function logout()
    {
        Auth::logout();
        request()->session()->invalidate();
        request()->session()->regenerateToken();
        $this->redirectRoute('login', navigate: true);
    }
}; ?>

<div class="flex flex-col max-w-xs border-r border-gray-200 gap-2"
    x-data="{
        show: $wire.entangle('showMenu') ?? true,
        toggleShow() {
            this.show = ! this.show;
            },
            
        }"
    x-init="$watch('show', value => $wire.updateShowMenu(value))">

    <div class="flex flex-col items-center">
        <img src="{{asset('images/logo.png')}}" alt="Global Tribune" class="object-cover max-w-xs" x-show="show">
        <p class="text-lg text-gray-400 tracking-tight font-medium" x-show="show">Aircraft Engine Maintenance System</p>
        <img src="{{asset('images/logo-two.png')}}" alt="Global Tribune" class="object-cover w-20 h-20" x-show="!show">
    </div>

    <hr class="border-gray-200">

    <div class="flex gap-4 py-2 px-4 items-center">
        <img src="{{asset('images/logo.png')}}" alt="Global Tribune" class="rounded-full w-10 h-10 object-cover" x-show="show">

        <div class="flex flex-col w-full" x-show="show">
            <p class="text-lg font-medium text-neutral-800">
                {{$userName}}
            </p>
            <p class="text-gray-400">
                @can('executive')
                Executive
                @elsecan('manager')
                Workshop Manager
                @elsecan('technician')
                Technician
                @endcan
            </p>
        </div>

        <button class="p-4 cursor-pointer text-gray-500 hover:bg-gray-50 rounded-md"
            @click="toggleShow()">
            <livewire:svg.menu />
        </button>
    </div>

    <hr class="border-gray-200">

    <div class="flex flex-col gap-2 px-4 py-2">

        <a class="@if($currentRoute == $dashboardRoute) primary-button font-medium @else secondary-button @endif text-lg" wire:navigate href="{{$dashboardRoute}}" :class="show ? 'w-full' : 'w-fit'">
            <livewire:svg.dashboard />
            <span x-show="show">
                Dashboard
            </span>
        </a>

        <a class="@if($currentRoute == $workOrderManagementRoute) primary-button font-medium @else secondary-button @endif text-lg" wire:navigate href="{{$workOrderManagementRoute}}" :class="show ? 'w-full' : 'w-fit'">
            <livewire:svg.checklist />
            <span x-show="show">
                Work Order Management
            </span>
        </a>

        <a class="@if($currentRoute == $taskCardLibraryRoute) primary-button font-medium @else secondary-button @endif text-lg" wire:navigate href="{{$taskCardLibraryRoute}}" :class="show ? 'w-full' : 'w-fit'">
            <livewire:svg.folder />
            <span x-show="show">
                Task Card Library
            </span>
        </a>

        <a class="@if($currentRoute == $assetManagementRoute) primary-button font-medium @else secondary-button @endif text-lg" wire:navigate href="{{$assetManagementRoute}}" :class="show ? 'w-full' : 'w-fit'">
            <livewire:svg.wrench />
            <span x-show="show">
                Asset Management
            </span>
        </a>

        <a class="@if($currentRoute == $maintenanceScheduleRoute) primary-button font-medium @else secondary-button @endif text-lg" wire:navigate href="{{$maintenanceScheduleRoute}}" :class="show ? 'w-full' : 'w-fit'">
            <livewire:svg.calender />
            <span x-show="show">
                Maintenance Schedule
            </span>
        </a>

    </div>

    <hr class="border-gray-200">

    <div class="flex flex-col gap-2 px-4 py-2">

        <a class="@if($currentRoute == $profileSettingRoute) primary-button font-medium @else secondary-button @endif text-lg" wire:navigate href="{{$profileSettingRoute}}" :class="show ? 'w-full' : 'w-fit'">
            <livewire:svg.setting />
            <span x-show="show">
                Profile Settings
            </span>
        </a>

        <button class="secondary-button text-lg" type="button" wire:click="logout" :class="show ? 'w-full' : 'w-fit'">
            <livewire:svg.logout />
            <span x-show="show">
                Logout
            </span>
        </button>

    </div>

</div>