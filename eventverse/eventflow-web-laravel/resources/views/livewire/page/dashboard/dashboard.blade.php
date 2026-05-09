<?php

use App\Models\EventModule;
use Illuminate\Support\Facades\Auth;
use Livewire\Attributes\Computed;
use Livewire\Attributes\Layout;
use Livewire\Attributes\Session;
use Livewire\Attributes\Title;
use Livewire\Volt\Component;
use Livewire\WithoutUrlPagination;
use Livewire\WithPagination;

new #[Title('Dashboard')] #[Layout('livewire.layout.app')] class extends Component {
    use WithPagination, WithoutUrlPagination;

    #[Session]
    public $isHost = true;

    #[Session]
    public $eventType = 'upcoming';

    #[Computed]
    public function eventsFN()
    {
        return EventModule::query()
            ->where('user_id', Auth::id())
            ->with(['primaryLocation', 'eventCategory'])
            ->paginate(5);
    }

    public function with()
    {
        return [
            'events' => $this->eventsFN(),
        ];
    }
};

?>

<div
    class="flex-primary"
    x-data="{
        isHost: $wire.entangle('isHost'),
        eventType: $wire.entangle('eventType'),
    }"
>
    <div class="box-shadow">
        <div class="box-input-primary">
            <p class="text-large">Dashboard</p>
            <p class="text-leading">Manage your events and experiences</p>
        </div>

        <div class="box-input-secondary">
            <label :class="isHost ? 'button-filled-primary' : 'button-outlined-primary'">
                <input
                    type="radio"
                    name="isHost"
                    value="true"
                    class="hidden"
                    wire:model.boolean.live="isHost"
                />
                Events I am Hosting
            </label>
            <label :class="!isHost ? 'button-filled-primary' : 'button-outlined-primary'">
                <input
                    type="radio"
                    name="isHost"
                    value="false"
                    class="hidden"
                    wire:model.boolean.live="isHost"
                />
                Events I am Attending
            </label>
        </div>
    </div>

    <div
        class="box-shadow"
        x-transition
        x-show="isHost"
    >
        <div class="flex-secondary md:grid md:grid-cols-3">
            <div class="box-shadow flex-row justify-between">
                <div class="box-input primary">
                    <p class="label">Total Events</p>
                    <p class="text-medium">3</p>
                </div>

                <x-ui.icon icon="event" />
            </div>
            <div class="box-shadow flex-row justify-between">
                <div class="box-input primary">
                    <p class="label">Upcoming Events</p>
                    <p class="text-medium">3</p>
                </div>

                <x-ui.icon icon="event" />
            </div>
            <div class="box-shadow flex-row justify-between">
                <div class="box-input primary">
                    <p class="label">Total Guest</p>
                    <p class="text-medium">3</p>
                </div>

                <x-ui.icon icon="users" />
            </div>
        </div>

        <div class="flex-secondary">
            <div class="box-input-primary">
                <p class="text-medium">Events I am Hosting (3)</p>
                <div class="button-outlined-primary cursor-text pr-1">
                    <x-ui.icon icon="search" />
                    <input
                        type="text"
                        class="flex-1 outline-none"
                    />
                </div>
            </div>

            <div class="box-input-secondary">
                <label :class="eventType === 'upcoming' ? 'button-filled-primary' : 'button-outlined-primary'">
                    <input
                        type="radio"
                        name="eventType"
                        value="upcoming"
                        class="hidden"
                        wire:model.live="eventType"
                    />
                    Upcoming
                </label>
                <label :class="eventType === 'ongoing' ? 'button-filled-primary' : 'button-outlined-primary'">
                    <input
                        type="radio"
                        name="eventType"
                        value="ongoing"
                        class="hidden"
                        wire:model.live="eventType"
                    />
                    Ongoing
                </label>
                <label :class="eventType === 'past' ? 'button-filled-primary' : 'button-outlined-primary'">
                    <input
                        type="radio"
                        name="eventType"
                        value="past"
                        class="hidden"
                        wire:model.live="eventType"
                    />
                    Past
                </label>
                <label :class="eventType === 'draft' ? 'button-filled-primary' : 'button-outlined-primary'">
                    <input
                        type="radio"
                        name="eventType"
                        value="draft"
                        class="hidden"
                        wire:model.live="eventType"
                    />
                    Draft
                </label>
            </div>

            <div class="flex-secondary md:grid md:grid-cols-2 xl:grid-cols-3">
                @foreach ($events as $each)
                    <x-ui.event-card-two :event="$each" />
                @endforeach
            </div>
        </div>
    </div>
</div>
