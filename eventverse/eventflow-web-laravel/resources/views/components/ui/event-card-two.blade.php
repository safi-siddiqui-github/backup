@props([
    'event' => $event ?? null,
    'name' => $event->name ?? 'No Name',
    'description' => $event->description ?? 'No description',
    'address' => $event->primaryLocation?->address ?? 'No Address',
    'category' => $event->eventCategory?->name ?? 'No Category',
    'attendees' => 50,
])

<div class="box-shadow-two p-4">
    <div class="box-input-primary">
        <p class="text-medium">{{ $name }}</p>
        <p class="text-leading">
            {{ $description }}
        </p>
    </div>

    <div class="box-input-primary">
        <div class="box-input-secondary">
            <x-ui.icon
                icon="calendar"
                class="text-primary"
            />
            <p class="text-leading">16 June, 2025</p>
        </div>

        <div class="box-input-secondary">
            <x-ui.icon
                icon="location"
                class="text-primary"
            />
            <p class="text-leading">{{ $address }}</p>
        </div>

        <div class="box-input-secondary">
            <x-ui.icon
                icon="users"
                class="text-primary"
            />
            <p class="text-leading">{{ $attendees }} attendees</p>
        </div>
    </div>

    <div class="box-input-secondary justify-between">
        <div class="button-outlined-primary flex-0 text-xs">{{ $category }}</div>
        <p class="text-medium">$99.99</p>
    </div>

    <div class="box-input-secondary">
        <x-ui.link
            class="button-outlined-primary"
            :href="route('general.create-event-form', ['id' => $event->id])"
        >
            <x-ui.icon icon="edit" />
            Edit
        </x-ui.link>
        <x-ui.link
            class="button-filled-primary"
            :href="route('dashboard.event-dashboard', ['id' => $event->id])"
        >
            <x-ui.icon icon="explore" />
            Configuration
        </x-ui.link>
    </div>
</div>
