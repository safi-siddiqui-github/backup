<?php

use App\Models\EventModule;
use Illuminate\Support\Facades\Auth;
use Illuminate\View\View;
use Livewire\Attributes\Computed;
use Livewire\Attributes\Layout;
use Livewire\Attributes\Session;
use Livewire\Attributes\Title;
use Livewire\Attributes\Url;
use Livewire\Volt\Component;
use Livewire\WithoutUrlPagination;
use Livewire\WithPagination;

new #[Title('Event Configuration')] class extends Component {
    use WithPagination, WithoutUrlPagination;

    public $id;

    #[Computed]
    public function eventsFN()
    {
        return EventModule::find($this->id)->load(['primaryLocation', 'eventCategory']);
    }

    public function rendering(View $view): void
    {
        $view->layout('livewire.layout.dashboard', [
            'id' => $this->id,
            'eventDashboardRoute' => url()->current() === route('dashboard.event-dashboard', ['id' => $this->id]),
            'rsvpRoute' => url()->current() === route('dashboard.rsvp-page', ['id' => $this->id]),
            'seatingRoute' => url()->current() === route('dashboard.seating-page', ['id' => $this->id]),
        ]);
    }

    public function with()
    {
        return [
            'event' => $this->eventsFN(),
        ];
    }
};

?>

<div class="flex-secondary">
    <div class="box-input-primary">
        <p class="text-large">
            {{ $event->name }}
        </p>
        <p class="text-leading">
            {{ $event->description }}
        </p>
    </div>
</div>
