<?php

use Illuminate\Support\Facades\Auth;
use Livewire\Attributes\Layout;
use Livewire\Attributes\Title;
use Livewire\Volt\Component;

new #[Title('Join Event')] #[Layout('livewire.layout.app')] class extends Component {
    public $categories = null;
    public $category = null;
    public $location = null;
    public $startDate = null;
    public $endDate = null;
    public $priceRange = null;
    public $eventType = null;
    public $startPrice = 0;
    public $endPrice = 9999;

    public function mount()
    {
        $this->categories = ['Food', 'Music', 'Business', 'Arts & Culture', 'Sports', 'Education', 'Charity'];
    }
};
?>

<div class="flex flex-col gap-4">
    <x-ui.landing-card-one :image="asset('images/carousel-image-one.png')">
        <div class="flex-primary items-center text-center">
            <p class="text-extra-large">Find Your Next Experience</p>
            <p class="w-5/6 max-w-xl tracking-tight">
                Discover unforgettable experiences around you — from local gatherings to major events. Explore what's trending, find what fits your
                vibe, or create your own event and invite the world to join in.
            </p>

            <div class="button-outlined-primary w-full max-w-2xl pr-2">
                <x-ui.icon icon="search" />

                <input
                    type="text"
                    class="flex-1 truncate outline-none"
                    placeholder="Search for events, venues or categories"
                />

                <button class="button-filled-primary text-sx flex-0">Search</button>
            </div>

            <div class="flex flex-wrap justify-center gap-2">
                <a
                    href="{{ route('general.home') }}"
                    class="button-filled-primary"
                >
                    All Categories
                </a>
                @foreach ($categories as $each)
                    <a
                        href="{{ route('general.home') }}"
                        class="button-filled-primary"
                    >
                        {{ $each }}
                    </a>
                @endforeach
            </div>
        </div>
    </x-ui.landing-card-one>

    <div
        class="flex flex-col gap-8 p-4"
        x-data="{
            open: false,
            toggle() {
                this.open = ! this.open
            },
            init() {
                if (window.innerWidth >= 768) {
                    this.open = true
                }
            },
        }"
    >
        <div class="flex flex-col gap-4 sm:flex-row sm:justify-between">
            <p class="text-large">All Events</p>

            <div class="flex items-center gap-4">
                <button class="button-filled-secondary">
                    Sort By
                    <livewire:svg.chevron-up-outlined class="!size-4" />
                </button>

                <button
                    class="button-filled-secondary"
                    @click="toggle()"
                >
                    <livewire:svg.dashboard />
                    Filters
                </button>
            </div>
        </div>

        <div class="flex flex-col items-start gap-4 md:flex-row">
            <div
                class="box-shadow flex-1 md:max-w-sm"
                x-show="open"
                x-transition
            >
                <div class="flex flex-col gap-1">
                    <label
                        for="category"
                        class="label"
                    >
                        Category
                    </label>

                    <select
                        id="category"
                        wire:model="category"
                        type="text"
                        class="input"
                    >
                        <option value="">Category</option>
                        <option value="">Category 1</option>
                        <option value="">Category 2</option>
                    </select>

                    @error('category')
                        <p class="text-error">{{ $message }}</p>
                    @enderror
                </div>

                <div class="flex flex-col gap-1">
                    <label
                        for="location"
                        class="label"
                    >
                        Location
                    </label>

                    <select
                        id="location"
                        wire:model="location"
                        type="text"
                        class="input"
                    >
                        <option value="">City, Country</option>
                        <option value="">Location 1</option>
                        <option value="">Location 2</option>
                    </select>

                    @error('location')
                        <p class="text-error">{{ $message }}</p>
                    @enderror
                </div>

                <div class="flex flex-col gap-1">
                    <label
                        for="startDate"
                        class="label"
                    >
                        Start Date
                    </label>

                    <input
                        type="date"
                        id="startDate"
                        wire:model="startDate"
                        class="input"
                    />

                    @error('startDate')
                        <p class="text-error">{{ $message }}</p>
                    @enderror
                </div>

                <div class="flex flex-col gap-1">
                    <label
                        for="endDate"
                        class="label"
                    >
                        End Date
                    </label>

                    <input
                        type="date"
                        id="endDate"
                        wire:model="endDate"
                        class="input"
                    />

                    @error('endDate')
                        <p class="text-error">{{ $message }}</p>
                    @enderror
                </div>

                <div class="flex flex-col gap-1">
                    <label class="font-medium">Event Type</label>

                    <label class="flex items-center gap-2">
                        <input
                            type="radio"
                            value="online"
                            wire:model="eventType"
                            class=""
                        />
                        <span>Online Events</span>
                    </label>

                    <label class="flex items-center gap-2">
                        <input
                            type="radio"
                            value="free"
                            wire:model="eventType"
                            class=""
                        />
                        <span>Free Events</span>
                    </label>

                    @error('eventType')
                        <p class="text-error">{{ $message }}</p>
                    @enderror
                </div>

                <div
                    class="flex flex-col gap-4"
                    x-data="{ startPrice: 0, endPrice: 9999 }"
                >
                    <label class="label">
                        Price (
                        <span x-text="`$${startPrice}`"></span>
                        <span x-text="` - $${endPrice}`"></span>
                        )
                    </label>

                    <div class="flex items-center">
                        <input
                            type="range"
                            id="startPrice"
                            wire:model="startPrice"
                            x-model="startPrice"
                            class="range-slider"
                            min="0"
                            max="1000"
                        />

                        <input
                            type="range"
                            id="endPrice"
                            wire:model="endPrice"
                            x-model="endPrice"
                            class="range-slider"
                            min="1001"
                            max="9999"
                        />
                    </div>
                    @error('startPrice')
                        <p class="text-error">{{ $message }}</p>
                    @enderror
                </div>

                <button class="button-filled-primary mt-4">
                    <livewire:svg.refresh />
                    Reset
                </button>
            </div>

            <div
                class="gird-cols-1 grid flex-1 gap-4 sm:grid-cols-2"
                :class="{
                    'sm:grid-cols-2': !open,
                    'lg:grid-cols-2': open,
                    'lg:grid-cols-3': !open,
                    'xl:grid-cols-3': open,
                    'xl:grid-cols-4': !open,
                }"
            >
                @for ($i=1;$i< 5;$i++)
                    <x-ui.event-card :eventData="$i" />
                @endfor

                @for ($i=1;$i< 5;$i++)
                    <x-ui.event-card :eventData="$i" />
                @endfor
            </div>
        </div>
    </div>
</div>
