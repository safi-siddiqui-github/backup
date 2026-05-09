<a
    class="box-shadow-two w-full min-w-60"
    wire:navigate
    href="{{ route('general.event-detail') }}"
>
    <img
        src="{{ asset('images/featured-event-' . $eventData . '.png') }}"
        alt="featured-event-1.png"
        class="h-40 w-full object-cover"
    />

    <div class="flex flex-col gap-4 p-4">
        <div class="flex items-center gap-2">
            <x-ui.icon
                icon="calendar"
                class="text-primary"
            />
            <p class="tracking-tight">16 June, 2025</p>
        </div>

        <p class="text-medium">Summer music Festival 2025</p>

        <div class="flex items-center gap-2">
            <x-ui.icon
                icon="location"
                class="text-primary"
            />
            <p class="tracking-tight">Central Park, New York</p>
        </div>

        <div class="flex items-center justify-between">
            <div class="button-outlined-primary w-fit flex-0 text-xs">Music</div>

            <p class="text-medium ">$99.99</p>
        </div>
    </div>
</a>
