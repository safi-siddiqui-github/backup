<?php

use Illuminate\Support\Facades\Auth;
use Livewire\Attributes\Layout;
use Livewire\Attributes\Title;
use Livewire\Volt\Component;

new #[Title('Home')] #[Layout('livewire.layout.app')] class extends Component {
    public $eventsInCites = null;
    public $howItWorks = null;

    public function mount()
    {
        $this->eventsInCites = ['Tbilisi, Georgia', 'New York, USA', 'Paris, France', 'London, UK', 'Vienna, Austria', 'Montreal, Canada'];

        $this->howItWorks = [
            [
                'name' => 'For Organizers',
                'options' => [
                    [
                        'icon' => 'edit',
                        'name' => 'Plan Your Events',
                        'description' => 'Choose name, date and customize design',
                    ],
                    [
                        'icon' => 'share',
                        'name' => 'Share Your Events',
                        'description' => 'Copy link, invite friends and increase reach',
                    ],
                    [
                        'icon' => 'setting',
                        'name' => 'Manage Your Events',
                        'description' => 'Control privacy, settings and options',
                    ],
                ],
            ],
            [
                'name' => 'For Attendees',
                'options' => [
                    [
                        'icon' => 'mail',
                        'name' => 'Stay Connected',
                        'description' => 'Never miss updates with instant alerts',
                    ],
                    [
                        'icon' => 'check',
                        'name' => 'Verified Access',
                        'description' => 'Secure login with trusted verification',
                    ],
                    [
                        'icon' => 'table',
                        'name' => 'Track Activities',
                        'description' => 'View and manage your event history',
                    ],
                ],
            ],
            [
                'name' => 'For Vendors',
                'options' => [
                    [
                        'icon' => 'bag',
                        'name' => 'List your services',
                        'description' => 'Add details and your vendor reach grow',
                    ],
                    [
                        'icon' => 'ticket',
                        'name' => 'Track your bookings',
                        'description' => 'Stay updated with every new ticket sale',
                    ],
                    [
                        'icon' => 'bell',
                        'name' => 'Get instant alerts',
                        'description' => 'Receive quick alerts for all actions',
                    ],
                ],
            ],
        ];
    }
};

?>

<div class="flex flex-col">
    <x-ui.landing-card-one :image="asset('images/carousel-image-one.png')">
        <div class="flex-primary items-center text-center">
            <p class="text-extra-large">Create Unforgettable Experience</p>
            <p class="w-5/6 max-w-xl tracking-tight">
                From intimate gatherings to large-scale conferences, EventFlow provides everything you need to plan, manage, and execute memorable
                events with ease.
            </p>

            <div class="flex-secondary md:flex-row">
                <x-ui.link
                    :href="route('general.create-event')"
                    class="button-filled-primary"
                >
                    <x-ui.icon icon="plus" />
                    Create your Event
                </x-ui.link>
                <x-ui.link
                    :href="route('general.create-event')"
                    class="button-outlined-primary"
                >
                    <x-ui.icon icon="search" />
                    Discover new Event
                </x-ui.link>
            </div>

            <div class="flex-secondary md:flex-row">
                <div class="flex items-center gap-2">
                    <x-ui.icon icon="users" />
                    <p class="">10,000+ Event Planners</p>
                </div>
                <div class="flex items-center gap-2">
                    <x-ui.icon icon="star-filled" />
                    <p class="">4.9/5 Average Rating</p>
                </div>
                <div class="flex items-center gap-2">
                    <x-ui.icon icon="globe-filled" />
                    <p class="">50+ Countires Worldwide</p>
                </div>
            </div>
        </div>
    </x-ui.landing-card-one>

    <div class="flex-section">
        <div class="flex-secondary md:grid md:grid-cols-2">
            <div
                class="bg-primary flex-primary rounded-xl text-white"
                x-data="{
                    show: true,
                    toggle() {
                        this.show = ! this.show
                    },
                }"
            >
                <img
                    src="{{ asset('images/discover.png') }}"
                    alt="discover.png"
                    class="h-full max-h-82 w-full flex-1 rounded-lg object-cover"
                />

                <div class="flex-secondary justify-between">
                    <p class="text-large">
                        <span x-show="show">Discover Your Next Great Experience</span>
                        <span x-show="!show">Connect And Explore What You Love</span>
                    </p>

                    <p class="w-5/6 tracking-tight">
                        <span x-show="show">
                            Explore a diverse array of events that catre to your passion. From workshops to concerts, finding your perfect match has
                            never been easier with out streamlined platform.
                        </span>
                        <span x-show="!show">
                            Dive deeper into your interests by joining communities, following event updates, and engaging with like-minded
                            individuals. Your next unforgettable moment at click.
                        </span>
                    </p>

                    <x-ui.link
                        :href="route('general.discover-event')"
                        class="button-outlined-primary flex-0"
                    >
                        <x-ui.icon icon="link" />
                        Join Upcoming Event
                    </x-ui.link>

                    <div class="flex items-center justify-between">
                        <div class="font-medium">
                            <p x-show="show">
                                <span class="text-2xl">1 /</span>
                                <span class="text-sm">2</span>
                            </p>
                            <p x-show="!show">
                                <span class="text-sm">1</span>
                                <span class="text-2xl">/ 2</span>
                            </p>
                        </div>
                        <p class="font-medium"></p>

                        <div class="flex items-center">
                            <button @click="toggle()">
                                <x-ui.icon
                                    icon="arrow-left"
                                    class="size-9"
                                />
                            </button>
                            <button @click="toggle()">
                                <x-ui.icon
                                    icon="arrow-right"
                                    class="size-9"
                                />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div class="flex-secondary">
                <img
                    src="{{ asset('images/featured-event-1.png') }}"
                    alt="featured-event-1.png"
                    class="h-full max-h-96 flex-1 rounded-lg object-cover md:max-h-none"
                />

                <p class="text-large text-primary">Transform Your Experience with Event</p>

                <p class="text-secondary w-5/6 tracking-tight">
                    Explore a diverse array of events that catre to your passion. From workshops to concerts, finding your perfect match has never
                    been easier with out streamlined platform.
                </p>

                <x-ui.link
                    :href="route('general.discover-event')"
                    class="button-filled-primary flex-0"
                >
                    <x-ui.icon icon="plus" />
                    Create New Event
                </x-ui.link>
            </div>
        </div>

        <div class="flex-secondary gap-8">
            <div class="flex flex-col items-center gap-1 md:flex-row md:justify-between">
                <p class="text-large">Featured Events</p>
                <p class="text-medium text-secondary">See All</p>
            </div>

            <div class="flex gap-4 overflow-x-auto pb-8">
                @for ($i=1;$i< 5;$i++)
                    <x-ui.event-card :eventData="$i" />
                @endfor
            </div>
        </div>

        <div class="flex-secondary gap-8">
            <div class="flex flex-col items-center gap-1 md:flex-row md:justify-between">
                <p class="text-large">Upcoming Events</p>
                <p class="text-medium text-secondary">See All</p>
            </div>

            <div class="flex gap-4 overflow-x-auto pb-8">
                @for ($i=1;$i< 5;$i++)
                    <x-ui.event-card :eventData="$i" />
                @endfor
            </div>
        </div>

        <div class="flex-secondary gap-8">
            <p class="text-large text-center">Explore Event Categories</p>

            <div class="grid w-full max-w-7xl grid-cols-2 gap-4 self-center lg:grid-cols-4">
                <div class="flex flex-col items-center gap-1 rounded-lg bg-purple-100 px-2 py-4 text-center">
                    <img
                        src="{{ asset('images/category-music.svg') }}"
                        alt="category-music.svg"
                        class="h-10 object-contain"
                    />
                    <p class="text-medium text-purple-600">Music</p>
                    <p class="">1240 Events</p>
                </div>
                <div class="flex flex-col items-center gap-1 rounded-lg bg-cyan-100 px-2 py-4 text-center">
                    <img
                        src="{{ asset('images/category-education.svg') }}"
                        alt="category-education.svg"
                        class="h-10 object-contain"
                    />
                    <p class="text-medium text-cyan-600">Education</p>
                    <p class="">1240 Events</p>
                </div>
                <div class="flex flex-col items-center gap-1 rounded-lg bg-green-100 px-2 py-4 text-center">
                    <img
                        src="{{ asset('images/category-arts.svg') }}"
                        alt="category-arts.svg"
                        class="h-10 object-contain"
                    />
                    <p class="text-medium text-green-600">Arts & Culture</p>
                    <p class="">1240 Events</p>
                </div>
                <div class="flex flex-col items-center gap-1 rounded-lg bg-orange-100 px-2 py-4 text-center">
                    <img
                        src="{{ asset('images/category-fitness.svg') }}"
                        alt="category-fitness.svg"
                        class="h-10 object-contain"
                    />
                    <p class="text-medium text-orange-600">Fitness & Sports</p>
                    <p class="">1240 Events</p>
                </div>
                <div class="flex flex-col items-center gap-1 rounded-lg bg-indigo-100 px-2 py-4 text-center">
                    <img
                        src="{{ asset('images/category-business.svg') }}"
                        alt="category-business.svg"
                        class="h-10 object-contain"
                    />
                    <p class="text-medium text-indigo-600">Business</p>
                    <p class="">1240 Events</p>
                </div>
                <div class="flex flex-col items-center gap-1 rounded-lg bg-pink-100 px-2 py-4 text-center">
                    <img
                        src="{{ asset('images/category-entertainment.svg') }}"
                        alt="category-entertainment.svg"
                        class="h-10 object-contain"
                    />
                    <p class="text-medium text-pink-600">Interest</p>
                    <p class="">1240 Events</p>
                </div>
                <div class="flex flex-col items-center gap-1 rounded-lg bg-teal-100 px-2 py-4 text-center">
                    <img
                        src="{{ asset('images/category-food.svg') }}"
                        alt="category-food.svg"
                        class="h-10 object-contain"
                    />
                    <p class="text-medium text-teal-600">Foods & Drinks</p>
                    <p class="">1240 Events</p>
                </div>
                <div class="flex flex-col items-center gap-1 rounded-lg bg-yellow-100 px-2 py-4 text-center">
                    <img
                        src="{{ asset('images/category-charity.svg') }}"
                        alt="category-charity.svg"
                        class="h-10 object-contain"
                    />
                    <p class="text-medium text-yellow-600">Charity & Causes</p>
                    <p class="">1240 Events</p>
                </div>
            </div>
        </div>

        <div class="flex-secondary items-center text-center">
            <div class="flex flex-col items-center gap-2">
                <p class="text-large">Ready to Create Something Amazing?</p>
                <p class="text-secondary w-5/6 max-w-xl tracking-tight">
                    Join thousands of event planners, who trust EventFlow to bring their visions to life.
                </p>
            </div>

            <div class="flex-secondary md:flex-row">
                <x-ui.link
                    :href="route('general.create-event')"
                    class="button-filled-primary"
                >
                    <x-ui.icon icon="plus" />
                    Create your Event
                </x-ui.link>
                <x-ui.link
                    :href="route('general.create-event')"
                    class="button-outlined-primary"
                >
                    <x-ui.icon icon="search" />
                    Discover new Event
                </x-ui.link>
            </div>

            <p class="text-secondary tracking-tight">No credit card required • Free plan • Cancel anytime</p>
        </div>

        <div class="flex-secondary">
            <p class="text-large text-primary text-center">How It Works</p>

            <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
                @foreach ($howItWorks as $eachHIW)
                    <div
                        class="box-shadow"
                        x-data="{
                            open: false,
                            toggle() {
                                if (window.innerWidth >= 768) {
                                    this.open = true
                                    return
                                } else {
                                    this.open = ! this.open
                                }
                            },
                            init() {
                                window.innerWidth >= 768 ? (this.open = true) : null
                            },
                        }"
                    >
                        <button
                            class="flex items-center justify-between md:cursor-default"
                            @click="toggle()"
                        >
                            <p class="text-medium">{{ $eachHIW['name'] }}</p>
                            <span
                                class="transition md:hidden"
                                :class="open ? 'rotate-90' : '' "
                            >
                                <x-ui.icon icon="arrow-right" />
                            </span>
                        </button>

                        <div
                            class="flex flex-col gap-4 p-4"
                            x-transition
                            x-show="open"
                        >
                            @foreach ($eachHIW['options'] as $eachOPT)
                                <div class="flex gap-2">
                                    <x-ui.icon
                                        :icon="$eachOPT['icon']"
                                        class="text-primary min-w-fit"
                                    />

                                    <div class="flex flex-col">
                                        <p class="font-medium">{{ $eachOPT['name'] }}</p>
                                        <p class="text-secondary">{{ $eachOPT['description'] }}</p>
                                    </div>
                                </div>
                            @endforeach
                        </div>
                    </div>
                @endforeach
            </div>
        </div>

        <div class="flex-secondary">
            <div class="relative flex items-center justify-center">
                <div class="absolute flex items-center gap-10">
                    <img
                        src="{{ asset('images/feature-two.png') }}"
                        alt="feature-two.png"
                        class="h-20 w-20 rounded-full object-cover"
                    />
                    <img
                        src="{{ asset('images/feature-three.png') }}"
                        alt="feature-three.png"
                        class="h-20 w-20 rounded-full object-cover"
                    />
                </div>

                <img
                    src="{{ asset('images/feature-one.png') }}"
                    alt="feature-one.png"
                    class="z-10 h-24 w-24 rounded-full object-cover"
                />
            </div>

            <div class="flex flex-col items-center gap-2">
                <p class="text-large text-primary">Key Features</p>
                <p class="text-secondary">Explore the key features of our app</p>
            </div>

            <div class="grid max-w-4xl grid-cols-1 gap-4 self-center md:grid-cols-3">
                <x-ui.feature-card-one
                    icon="plus"
                    heading="Create Events Easily"
                    description="Transform ideas into action by launching your own experiences to share with the world"
                />
                <x-ui.feature-card-one
                    icon="explore"
                    heading="Explore Options"
                    description="Dive into a variety of offerings tailored to your interests and preferences"
                />
                <x-ui.feature-card-one
                    icon="calendar"
                    heading="Join Event and Get Tickets"
                    description="Secure your spot for your favorite events with ease and efficiency"
                />
            </div>
        </div>
    </div>

    <x-ui.landing-card-one :image="asset('images/events-city.png')">
        <div class="flex-primary items-center text-center">
            <p class="text-extra-large">Find Events In Cities You Love</p>
            <p class="w-5/6 max-w-xl tracking-tight">
                Explore a diverse array of events that catre to your passion. From workshops to concerts, finding your perfect match has never been
                easier with out streamlined platform.
            </p>

            <div class="grid grid-cols-1 place-items-center gap-4 sm:grid-cols-2 md:grid-cols-3 md:gap-6">
                @foreach ($eventsInCites as $each)
                    <button class="button-outlined-primary">
                        <x-ui.icon icon="globe-filled" />
                        {{ $each }}
                    </button>
                @endforeach
            </div>
        </div>
    </x-ui.landing-card-one>
</div>
