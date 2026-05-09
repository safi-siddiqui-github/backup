<?php

use App\Models\EventModule;
use Illuminate\Support\Facades\Auth;
use Livewire\Attributes\Layout;
use Livewire\Attributes\Title;
use Livewire\Volt\Component;

new #[Title('Create Event')] #[Layout('livewire.layout.app')] class extends Component {
    public function createEvent()
    {
        if (Auth::check()) {
            $eventModule = new EventModule();
            $eventModule->user_id = Auth::id();
            $eventModule->save();

            $this->redirectRoute('general.create-event-form', ['id' => $eventModule->id], navigate: true);
            return;
        }
        $this->redirectRoute('login', navigate: true);
    }
};
?>

<div class="flex-secondary">
    <div class="flex-secondary items-center bg-gradient-to-r from-white to-purple-100 text-center">
        <img
            src="{{ asset('images/work-illustration.png') }}"
            alt="images/work-illustration.png"
            class="max-h-96 flex-1 object-cover"
        />

        <div class="flex-primary items-center">
            <p class="text-extra-large text-primary">Create Unforgettable Events</p>
            <p class="text-leading">
                From intimate gatherings to large-scale conferences, EventFlow provides everything you need to plan, manage, and execute memorable
                events with ease.
            </p>

            <x-ui.button
                class="button-filled-primary flex-0"
                icon="plus"
                wire:click="createEvent"
            >
                Start Planning your event
            </x-ui.button>

            <div class="flex flex-col items-center gap-4">
                <img
                    src="{{ asset('images/user.png') }}"
                    alt="images/user.png"
                    class="h-28 w-28 rounded-full object-cover"
                />

                <div class="flex flex-col items-center gap-2">
                    <p class="text-leading">
                        <span class="text-medium">"</span>
                        From intimate gatherings to large-scale conferences, EventFlow provides everything you need to plan.
                        <span class="text-medium">"</span>
                    </p>
                    <p class="text-medium">John Doe</p>
                </div>
            </div>
        </div>
    </div>

    <div class="flex-primary">
        <div class="flex-secondary items-center text-center">
            <p class="text-large">How It Works</p>
            <p class="text-leading">Get started in minutes with our intuitive three-step process</p>
        </div>

        <div class="grid max-w-7xl grid-cols-1 gap-4 self-center md:grid-cols-3">
            <x-ui.feature-card-one
                icon="explore"
                heading="Customize & Plan"
                description="Add guests, create schedules, manage budgets, and configure all your event features"
            />
            <x-ui.feature-card-one
                icon="plus"
                heading="Create Your Event"
                description="Set up your event details, dates, and basic information in just a few clicks"
            />
            <x-ui.feature-card-one
                icon="users"
                heading="Executive & Enjoy"
                description="Use our real-time tools during your event and collect memories afterward"
            />
        </div>
    </div>

    <div class="flex-primary">
        <div class="flex-secondary items-center text-center">
            <p class="text-large">Everything You Need In One Platform</p>
            <p class="text-leading">Get started in minutes with our intuitive three-step process</p>
        </div>

        <div class="grid max-w-7xl grid-cols-1 gap-4 self-center md:grid-cols-3">
            <x-ui.feature-card-two
                icon="calendar"
                heading="Smart Scheduling"
                description="Multi-day planning with intelligent timeline management and automated notifications"
                freeButton="Free Forever"
            />
            <x-ui.feature-card-two
                icon="explore"
                heading="RSVP & Guest Management"
                description="Organize guests into groups, track responses, and manage seating arrangements"
                freeButton="Free Forever"
            />
            <x-ui.feature-card-two
                icon="table"
                heading="Advanced Seating"
                description="Visual table planning with drag-and-drop interface and guest preferences"
                premiumButton="Premium- $5.99"
            />
            <x-ui.feature-card-two
                icon="location"
                heading="Budget & Vendors"
                description="Comprehensive cost tracking, vendor management, and payment processing"
                premiumButton="Premium- $5.99"
            />
            <x-ui.feature-card-two
                icon="share"
                heading="Media & Sharing"
                description="Photo albums with QR access, live feeds, and guest contribution features"
                premiumButton="Premium- $5.99"
            />
            <x-ui.feature-card-two
                icon="ticket"
                heading="Digital Check-in"
                description="QR code tickets, mobile check-in, and real-time attendance tracking"
                premiumButton="Premium- $5.99"
            />
        </div>
    </div>

    <div class="flex-primary">
        <div class="flex-secondary items-center text-center">
            <p class="text-large">Loved by Event Planners Everywhere</p>
            <p class="text-leading">Join thousands of happy event creators</p>
        </div>

        <div class="grid max-w-7xl grid-cols-1 gap-4 self-center md:grid-cols-3">
            <x-ui.review-card-one
                icon="star-filled"
                heading="Customize & Plan"
                description="Add guests, create schedules, manage budgets, and configure all your event reviews"
            />
            <x-ui.review-card-one
                icon="star-filled"
                heading="Create Your Event"
                description="Set up your event details, dates, and basic information in just a few clicks"
            />
            <x-ui.review-card-one
                icon="star-filled"
                heading="Executive & Enjoy"
                description="Use our real-time tools during your event and collect memories afterward"
            />
        </div>
    </div>

    <div class="flex-secondary items-center bg-gradient-to-r from-white to-blue-100 text-center">
        <img
            src="{{ asset('images/calendar-illustration.png') }}"
            alt="images/calendar-illustration.png"
            class="max-h-96 flex-1 object-cover"
        />

        <div class="flex-primary items-center">
            <p class="text-large text-primary">Elevate Your Event Planning Experience</p>
            <p class="text-leading">
                Transform the way you organize and manage events. Our comprehensive platform empowers you to create, invite, and track events
                seamlessly. From budgeting to RSVPs, everything you need is just a click away.
            </p>

            <x-ui.link class="button-filled-primary flex-0">
                <x-ui.icon icon="explore" />
                Get Started with event today
            </x-ui.link>

            <ul class="flex list-inside list-disc flex-col items-start gap-2 text-left">
                <li>Quickly generate events with all necessary details like date, time, and location</li>
                <li>Send personalized invitations to your guests effortlessly</li>
                <li>Easily monitor RSVPs and adjust your plans as needed</li>
                <li>Stay within your budget with our intuitive expense tracking features</li>
            </ul>
        </div>
    </div>
</div>
