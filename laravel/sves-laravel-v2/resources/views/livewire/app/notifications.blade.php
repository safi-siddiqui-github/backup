<?php

use App\Http\Requests\NotificationRequest;
use Flux\Flux;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Livewire\Attributes\Computed;
use Livewire\Attributes\Layout;
use Livewire\Attributes\Title;
use Livewire\Volt\Component;

new #[Layout('livewire.layouts.app')] #[Title('Notifications - SVES')] class extends Component {
    public $landingImage = '';

    public function mount()
    {
        $this->landingImage = Storage::url('web/rays.mp4');
    }

    #[Computed]
    public function user()
    {
        /** @var \App\Models\User $user */
        $user = Auth::user();
        $user = $user
            ?->load([
                'notifications' => fn ($query) => $query->latest(),
            ])
            ?->loadCount(['notifications']);
        return $user;
    }

    public function handleNotification($action, $notification_id)
    {
        $notificationRequest = new NotificationRequest();

        $user_id = Auth::id();
        if (! $user_id) {
            Flux::modal('app-login')->show();
            return;
        }

        if ($action == 'read') {
            $notificationRequest->markRead(notification_id: $notification_id);
        } else {
            $notificationRequest->markUnread(notification_id: $notification_id);
        }

        $this->dispatch('notification-updated');
    }
};
?>

<div class="flex flex-col">
    <livewire:app.partials.landing-section
        :image="$landingImage"
        btnText="View Notifications"
        description="Never miss an important update. From order progress to special offers, all your notifications are here to keep you informed and in control—anytime, anywhere."
        heading="Stay Updated with the Latest Alerts"
    />
    <div class="flex flex-col items-center gap-10 p-4">
        <div class="flex flex-col items-center text-center">
            <flux:heading size="xl">
                My Notifications ({{ $this->user?->notifications_count ?? 0 }})
            </flux:heading>
            <flux:text>Check the recent notifications, manage read, and unread alerts.</flux:text>
        </div>

        <div class="flex w-full max-w-5xl flex-col gap-10">
            @foreach ($this->user?->notifications ?? [] as $each)
                <div
                    class="flex items-center gap-2"
                    key="$each->id.'notification'"
                >
                    <div class="flex flex-col">
                        <flux:heading>
                            {{ $each->data['name'] }}
                        </flux:heading>
                        <flux:text>
                            {{ $each->data['msg'] }}
                        </flux:text>
                    </div>

                    <flux:spacer />

                    <flux:button.group>
                        <flux:button
                            class=""
                            wire:click="handleNotification('read', '{{ $each->id }}')"
                            icon="bell"
                        >
                            <span class="max-sm:hidden">Mark as read</span>
                        </flux:button>
                        <flux:button
                            class=""
                            wire:click="handleNotification('unread', '{{ $each->id }}')"
                            icon="bell-alert"
                        >
                            <span class="max-sm:hidden">Mark as unread</span>
                        </flux:button>
                    </flux:button.group>
                </div>
            @endforeach
        </div>
    </div>
</div>
