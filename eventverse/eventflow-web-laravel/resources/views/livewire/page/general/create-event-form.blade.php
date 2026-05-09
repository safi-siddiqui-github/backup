<?php

use App\Models\EventCategory;
use App\Models\EventLocation;
use App\Models\EventLocationType;
use App\Models\EventModule;
use App\Models\RsvpModule;
use App\Models\SeatingModule;
use App\Models\StandardTimezone;
use App\Traits\UtilTrait;
use Illuminate\Support\Arr;
use Livewire\Attributes\Computed;
use Livewire\Attributes\Layout;
use Livewire\Attributes\Session;
use Livewire\Attributes\Title;
use Livewire\Volt\Component;

new #[Title('Create Event Form')] #[Layout('livewire.layout.app')] class extends Component {
    use UtilTrait;

    public $id;
    public $today;

    #[Session]
    public $step = 1;

    public $category;
    public $subCategory;
    public $isPublic = false;
    public $name;
    public $description;
    public $startDate;
    public $endDate;
    public $timezone;
    public $eventLocationType;
    public $capacity;
    public $address;
    public $venue;
    public $selectedModules = [];

    public function clearStepOne()
    {
        $this->reset([
            'category',
            'subCategory',
            'isPublic',
            'name',
            'description',
            'startDate',
            'endDate',
            'timezone',
            'eventLocationType',
            'capacity',
            'address',
            'venue',
        ]);
    }

    public function clearStepTwo()
    {
        $this->reset(['selectedModules']);
    }

    #[Computed]
    public function featureMDFN()
    {
        return [
            [
                'name' => 'Essential Modules',
                'description' => 'Core functionality every event needs',
                'modules' => [
                    [
                        'name' => 'Event Schedule',
                        'description' => 'Timeline and agenda management',
                        'key' => 'event-schedule',
                        'options' => ['Custom timeline', 'Session management', 'Speaker profiles'],
                        'isFree' => true,
                        'price' => 0,
                    ],
                    [
                        'name' => 'RSVP Management',
                        'description' => 'Guest responses and attendance tracking',
                        'key' => 'rsvp-management',
                        'options' => ['Response tracking', 'Dietary preferences', 'Plus-one management'],
                        'isFree' => true,
                        'price' => 0,
                    ],
                    [
                        'name' => 'Announcements',
                        'description' => 'Keep guests informed with update',
                        'key' => 'announcements',
                        'options' => ['Real-time updates', 'Push notifications', 'Priority messaging'],
                        'isFree' => true,
                        'price' => 0,
                    ],
                ],
            ],
            [
                'name' => 'Guest Engagement',
                'description' => 'Interactive features to enhance experience',
                'modules' => [
                    [
                        'name' => 'Interactive Games',
                        'description' => 'Fun activities and competitions',
                        'key' => 'interactive-games',
                        'options' => ['Trivia games', 'Photo contests', 'Leaderboards'],
                        'isFree' => false,
                        'price' => 15,
                    ],
                    [
                        'name' => 'Surveys & Feedback',
                        'description' => 'Guest responses and attendance tracking',
                        'key' => 'surveys-feedback',
                        'options' => ['Custom surveys', 'Real-time results', 'Analytics'],
                        'isFree' => false,
                        'price' => 10,
                    ],
                    [
                        'name' => 'Photo & Media Sharing',
                        'description' => 'Collaborative photo galleries',
                        'key' => 'photo-media-sharing',
                        'options' => ['Shared albums', 'Live photo feed', 'QR code sharing'],
                        'isFree' => false,
                        'price' => 20,
                    ],
                ],
            ],
            [
                'name' => 'Business Features',
                'description' => 'Professional event management tools',
                'modules' => [
                    [
                        'name' => 'Seating Management',
                        'description' => 'Table assignments and floor plans',
                        'key' => 'seating-management',
                        'options' => ['Visual seating charts', 'Auto-assignment', 'Guest preferences'],
                        'isFree' => false,
                        'price' => 30,
                    ],
                    [
                        'name' => 'Ticket System',
                        'description' => 'Sell tickets and manage registrations',
                        'key' => 'ticket-system',
                        'options' => ['Multiple ticket types', 'Payment processing', 'Promo codes'],
                        'isFree' => false,
                        'price' => 20,
                    ],
                    [
                        'name' => 'Budget Planner',
                        'description' => 'Track expenses and manage costs',
                        'key' => 'budget-planner',
                        'options' => ['Expense tracking', 'Vendor management', 'Budget analytics'],
                        'isFree' => false,
                        'price' => 20,
                    ],
                ],
            ],
            [
                'name' => 'Analytics & Insights',
                'description' => 'Data-driven event optimization',
                'modules' => [
                    [
                        'name' => 'Event Analytics',
                        'description' => 'Detailed insights and reporting',
                        'key' => 'event-analytics',
                        'options' => ['Attendance tracking', 'Engagement metrics', 'Custom reports'],
                        'isFree' => false,
                        'price' => 35,
                    ],
                ],
            ],
        ];
    }

    #[Computed]
    public function eventModuleFN()
    {
        return EventModule::find($this->id) ?? [];
    }

    public function stepOneMount()
    {
        $eventModule = EventModule::find($this->id)?->load(['eventCategory']);
        $eventLocation = EventLocation::where([['event_module_id', $this->id], ['isPrimary', true]])->first();

        if ($eventModule?->event_category_id) {
            if ($eventModule?->eventCategory->parent_id === null) {
                // if parent
                $this->category = $eventModule?->event_category_id;
            } else {
                $this->category = $eventModule?->eventCategory->parent_id;
                $this->subCategory = $eventModule?->event_category_id;
            }
        }

        $this->isPublic = $eventModule?->isPublic;
        $this->name = $eventModule?->name;
        $this->description = $eventModule?->description;
        $this->today = now();
        $this->startDate = $this->formatDate($eventModule?->startDate);
        $this->endDate = $this->formatDate($eventModule?->endDate);
        $this->timezone = $eventModule?->standard_timezone_id;

        // Event Location
        $this->eventLocationType = $eventLocation?->event_location_type_id;
        $this->capacity = $eventLocation?->capacity;
        $this->address = $eventLocation?->address;
        $this->venue = $eventLocation?->venue;
    }

    public function stepTwoMount()
    {
        $rsvpModule = RsvpModule::where('event_module_id', $this->id)->first();
        if ($rsvpModule?->isActive) {
            $this->selectedModules[] = 'rsvp-management';
        }
    }

    #[Computed]
    public function selectedModuleFN()
    {
        return [];
    }

    public function mount()
    {
        // $this->startDate = now()->format('Y-m-d\TH:i');
        // $this->endDate = now()
        //     ->addDay()
        //     ->format('Y-m-d\TH:i');
        // ! $this->step ? ($this->step = 1) : null;

        switch ($this->step) {
            case 1:
                $this->stepOneMount();
                break;
            case 2:
                $this->stepTwoMount();
                break;

            default:
                break;
        }
    }

    public function submitStepOne()
    {
        $this->validate([
            'isPublic' => ['boolean'],

            'category' => ['nullable', 'exists:event_categories,id'],
            'subCategory' => ['nullable', 'exists:event_categories,id'],
            'name' => ['nullable', 'string', 'min:3', 'max:100'],
            'description' => ['nullable', 'string', 'min:5', 'max:1000'],
            'startDate' => ['nullable', 'date', 'after:today'],
            'endDate' => ['nullable', 'date', 'after:startDate'],
            'timezone' => ['nullable', 'exists:standard_timezones,id'],

            'eventLocationType' => ['nullable', 'exists:event_location_types,id'],
            'capacity' => ['nullable', 'integer'],
            'address' => ['nullable', 'string', 'min:4', 'max:100'],
            'venue' => ['nullable', 'string', 'min:4', 'max:100'],
        ]);

        $eventModule = EventModule::find($this->id);
        $eventModule->isPublic = $this->isPublic;
        $eventModule->event_category_id = $this->subCategory ?? $this->category;
        $eventModule->name = $this->name;
        $eventModule->description = $this->description;
        $eventModule->startDate = $this->startDate;
        $eventModule->endDate = $this->endDate;
        $eventModule->standard_timezone_id = $this->timezone;
        $eventModule->save();

        $eventLocation = EventLocation::where([['event_module_id', $this->id], ['isPrimary', true]])->first();
        if (! $eventLocation) {
            $eventLocation = new EventLocation();
            $eventLocation->event_module_id = $this->id;
            $eventLocation->isPrimary = true;
        }
        $eventLocation->event_location_type_id = $this->eventLocationType;
        $eventLocation->capacity = $this->capacity;
        $eventLocation->address = $this->address;
        $eventLocation->venue = $this->venue;
        $eventLocation->save();
    }

    public function submitStepTwo()
    {
        $this->validate([
            'selectedModules' => [
                'nullable',
                'array',
                'in:event-schedule,rsvp-management,announcements,interactive-games,surveys-feedback,photo-media-sharing,seating-management,ticket-system,budget-planner,event-analytics',
            ],
        ]);

        $rsvpModule = RsvpModule::where('event_module_id', $this->id)->first();
        if (! $rsvpModule) {
            $rsvpModule = new RsvpModule();
            $rsvpModule->event_module_id = $this->id;
        }
        if (in_array('rsvp-management', $this->selectedModules)) {
            $rsvpModule->isActive = true;
        } else {
            $rsvpModule->isActive = false;
        }
        $rsvpModule->save();

        $seatingModule = SeatingModule::where('event_module_id', $this->id)->first();
        if (! $seatingModule) {
            $seatingModule = new SeatingModule();
            $seatingModule->event_module_id = $this->id;
        }
        if (in_array('seating-management', $this->selectedModules)) {
            $seatingModule->isActive = true;
        } else {
            $seatingModule->isActive = false;
        }
        $seatingModule->save();

        // 'event-schedule',
        // 'rsvp-management',
        // 'announcements',
        // 'interactive-games',
        // 'surveys-feedback',
        // 'photo-media-sharing',
        // 'seating-management',
        // 'ticket-system',
        // 'budget-planner',
        // 'event-analytics',
    }

    public function with()
    {
        return [
            'categories' => EventCategory::whereNull('parent_id')
                ->get()
                ->load('subCategories')
                ->loadCount('subCategories'),
            'timezones' => StandardTimezone::all(),
            'eventLocationTypes' => EventLocationType::all(),
            'featureMD' => $this->featureMDFN(),
        ];
    }
};
?>

<div class="flex-secondary items-center">
    <div
        class="flex-primary max-w-6xl gap-20"
        x-data="{
            step: $wire.entangle('step'),
        }"
        x-init="
            $watch('step', (value) => {
                switch (step) {
                    case 1:
                        $wire.stepOneMount()
                        break
                    case 2:
                        $wire.stepTwoMount()
                        break

                    default:
                        break
                }
            })
        "
    >
        <div class="flex-secondary items-center pt-10 text-center">
            <p class="text-extra-large text-primary">Create Unforgettable Events</p>
            <p class="text-leading">
                From intimate gatherings to large-scale conferences, EventFlow provides everything you need to plan, manage, and execute memorable
                events with ease.
            </p>
        </div>

        <div class="flex-secondary flex-row flex-wrap justify-center">
            <label :class="step === 1 ? 'button-filled-primary' : 'button-outlined-primary'">
                <input
                    type="radio"
                    name="step"
                    class="hidden"
                    value="1"
                    wire:model.number.live="step"
                />
                General Information
            </label>
            <label :class="step === 2 ? 'button-filled-primary' : 'button-outlined-primary'">
                <input
                    type="radio"
                    name="step"
                    class="hidden"
                    value="2"
                    wire:model.number.live="step"
                />
                Features
            </label>
            <label :class="step === 3 ? 'button-filled-primary' : 'button-outlined-primary'">
                <input
                    type="radio"
                    name="step"
                    class="hidden"
                    value="3"
                    wire:model.number.live="step"
                />
                Configuration
            </label>
            <label :class="step === 4 ? 'button-filled-primary' : 'button-outlined-primary'">
                <input
                    type="radio"
                    name="step"
                    class="hidden"
                    value="4"
                    wire:model.number.live="step"
                />
                Launch
            </label>
        </div>

        <form
            class="flex-secondary gap-20"
            x-show="step === 1"
            x-transition
            x-data="{
                category: $wire.entangle('category'),
                subCategory: $wire.entangle('subCategory'),
            }"
            wire:submit="submitStepOne"
        >
            <div class="flex-secondary">
                <p class="text-large text-center">What is the category of your event?</p>

                <div class="grid grid-cols-1 gap-4 md:grid-cols-3">
                    @foreach ($categories as $each)
                        <label
                            class="cursor-pointer"
                            :class="category == {{ $each->id }} ? 'box-shadow-outline' : ''"
                        >
                            <input
                                type="radio"
                                name="category"
                                value="{{ $each->id }}"
                                wire:model.blur="category"
                                class="hidden"
                            />
                            <x-ui.event-category-card
                                icon="event"
                                :category="$each"
                            />
                        </label>
                    @endforeach
                </div>

                @error('category')
                    <p class="text-error text-center">{{ $message }}</p>
                @enderror
            </div>

            <div
                class="flex-secondary"
                x-show="category"
                x-transition
            >
                <p class="text-medium text-center">Subcategories</p>

                @foreach ($categories as $each)
                    <div
                        class="grid grid-cols-1 gap-4 md:grid-cols-3"
                        x-transition
                        x-show="category == {{ $each->id }}"
                    >
                        @foreach ($each->subCategories as $eachSub)
                            <label
                                class="cursor-pointer"
                                :class="subCategory == {{ $eachSub->id }} ? 'box-shadow-outline' : ''"
                            >
                                <input
                                    type="radio"
                                    name="category"
                                    value="{{ $eachSub->id }}"
                                    wire:model.blur="subCategory"
                                    class="hidden"
                                />
                                <x-ui.event-category-card
                                    icon="event"
                                    :category="$eachSub"
                                />
                            </label>
                        @endforeach
                    </div>
                @endforeach

                @error('subCategory')
                    <p class="text-error text-center">{{ $message }}</p>
                @enderror
            </div>

            <div
                class="flex-secondary items-center"
                x-data="{
                    isPublic: $wire.entangle('isPublic'),
                }"
            >
                <p class="text-large text-center">Is the Event public or private</p>

                <div class="button-outlined-primary w-full max-w-xs overflow-hidden p-0">
                    <label
                        class="flex-1 cursor-pointer p-4 text-center"
                        :class="isPublic ? 'bg-primary text-white': ''"
                    >
                        Public
                        <input
                            type="radio"
                            name="status"
                            value="true"
                            wire:model.boolean="isPublic"
                            class="hidden"
                        />
                    </label>
                    <label
                        class="flex-1 cursor-pointer p-4 text-center"
                        :class="!isPublic ? 'bg-primary text-white': ''"
                    >
                        Private
                        <input
                            type="radio"
                            name="status"
                            value="false"
                            wire:model.boolean="isPublic"
                            class="hidden"
                        />
                    </label>
                </div>
            </div>

            <div class="flex-secondary">
                <p class="text-large text-center">Event Description</p>

                <div class="flex-secondary md:flex-row">
                    <div class="box-shadow flex-1">
                        <x-ui.icon
                            icon="setting"
                            class="text-primary size-8"
                        />
                        <p class="text-medium">AI Generate Event And Description</p>
                        <p class="text-leading">Click "Generate Ideas" to get AI-powered name suggestions for your wedding</p>

                        <div class="flex-secondary flex-1 justify-end">
                            <x-ui.button
                                class="button-filled-primary flex-0"
                                icon="bulb"
                            >
                                Generate Event Ideas
                            </x-ui.button>
                        </div>
                    </div>

                    <div class="flex-secondary flex-1">
                        <div class="box-input-primary">
                            <label class="label">Name</label>
                            <input
                                name="name"
                                type="text"
                                class="input"
                                wire:model="name"
                                placeholder="Name your event"
                            />
                            @error('name')
                                <p class="text-error">{{ $message }}</p>
                            @enderror
                        </div>
                        <div class="box-input-primary">
                            <label class="label">Description</label>
                            <textarea
                                name="description"
                                class="input"
                                wire:model="description"
                                placeholder="Describe your event"
                                rows="5"
                            ></textarea>
                            @error('description')
                                <p class="text-error">{{ $message }}</p>
                            @enderror
                        </div>
                    </div>
                </div>
            </div>

            <div class="flex-secondary">
                <p class="text-large text-center">Create You Theme</p>

                <div class="flex-secondary md:flex-row">
                    <div class="box-shadow flex-1">
                        <x-ui.icon
                            icon="setting"
                            class="text-primary size-8"
                        />
                        <p class="text-medium">AI Generate Theme</p>

                        <div class="box-input-primary">
                            <lablel class="label">Describe your ideal theme</lablel>
                            <input
                                type="text"
                                class="input"
                                placeholder="e. g.  Elegant winter wedding with gold accents"
                            />
                        </div>

                        <div class="box-input-secondary">
                            <p class="font-medium">Try This</p>

                            <button class="button-outlined-secondary flex-0 text-sm">Elegant winter wedding</button>
                            <button class="button-outlined-secondary flex-0 text-sm">Fun tropical party</button>
                        </div>

                        <div class="flex-secondary flex-1 justify-end">
                            <x-ui.button
                                class="button-filled-primary flex-0"
                                icon="bulb"
                            >
                                Generate Theme
                            </x-ui.button>
                        </div>
                    </div>

                    <div class="box-shadow bg-primary flex-1 text-white">
                        <div class="box-input-primary">
                            <p class="text-medium">Generated Theme</p>
                            <p class="">Cool blues and whites with falling snow effects</p>
                        </div>

                        <div class="box-input-primary">
                            <p class="font-medium">Colors</p>

                            <div class="box-input-secondary">
                                <div class="h-20 w-20 rounded-2xl bg-black"></div>
                                <div class="h-20 w-20 rounded-2xl bg-red-500"></div>
                                <div class="h-20 w-20 rounded-2xl bg-yellow-500"></div>
                            </div>
                        </div>

                        <div class="box-input-primary">
                            <p class="font-medium">Effects</p>

                            <div class="box-input-secondary">
                                <button class="button-outlined-primary flex-0 text-sm">Elegant</button>
                                <button class="button-outlined-primary flex-0 text-sm">Snow</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="flex-secondary">
                <p class="text-large text-center">Event Schedule</p>

                <div class="flex-secondary grid grid-cols-1 md:grid-cols-2">
                    <div class="box-input-primary">
                        <label class="label">Start Date / Time</label>
                        <input
                            type="datetime-local"
                            class="input"
                            wire:model="startDate"
                        />
                        @error('startDate')
                            <p class="text-error">{{ $message }}</p>
                        @enderror
                    </div>
                    <div class="box-input-primary">
                        <label class="label">End Date / Time</label>
                        <input
                            type="datetime-local"
                            class="input"
                            wire:model="endDate"
                        />
                        @error('endDate')
                            <p class="text-error">{{ $message }}</p>
                        @enderror
                    </div>
                    <div class="box-input-primary">
                        <label class="label">Timezone</label>
                        <select
                            class="input"
                            wire:model="timezone"
                        >
                            <option value="0">Select</option>
                            @foreach ($timezones as $each)
                                <option value="{{ $each->id }}">{{ $each->name }}</option>
                            @endforeach
                        </select>
                        @error('timezone')
                            <p class="text-error">{{ $message }}</p>
                        @enderror
                    </div>
                </div>
            </div>

            <div class="flex-secondary">
                <p class="text-large text-center">Add Location</p>

                <div class="box-input-primary items-center text-center">
                    <p class="text-medium">Where will your event take place?</p>
                    <p class="text-leading">You can either add your venue details now or skip this step and add them later.</p>
                </div>

                <div class="flex-secondary grid grid-cols-1 md:grid-cols-2">
                    <div class="box-input-primary">
                        <label class="label">Location Type</label>
                        <select
                            class="input"
                            wire:model="eventLocationType"
                        >
                            <option value="0">Select</option>
                            @foreach ($eventLocationTypes as $each)
                                <option value="{{ $each->id }}">{{ $each->name }}</option>
                            @endforeach
                        </select>
                        @error('eventLocationType')
                            <p class="text-error">{{ $message }}</p>
                        @enderror
                    </div>
                    <div class="box-input-primary">
                        <label class="label">Capacity</label>
                        <input
                            type="text"
                            class="input"
                            wire:model="capacity"
                            placeholder="Enter location capacity"
                        />
                        @error('capacity')
                            <p class="text-error">{{ $message }}</p>
                        @enderror
                    </div>
                    <div class="box-input-primary">
                        <label class="label">Complete Address</label>
                        <input
                            type="text"
                            class="input"
                            wire:model="address"
                            placeholder="Enter location address"
                        />
                        @error('address')
                            <p class="text-error">{{ $message }}</p>
                        @enderror
                    </div>
                    <div class="box-input-primary">
                        <label class="label">Venue Name</label>
                        <input
                            type="text"
                            class="input"
                            wire:model="venue"
                            placeholder="Enter location venue"
                        />
                        @error('venue')
                            <p class="text-error">{{ $message }}</p>
                        @enderror
                    </div>
                </div>

                <div class="box-input-primary">
                    <p class="text-medium">Venue Features</p>
                    <div class="box-input-secondary">
                        <x-ui.button
                            icon="wifi"
                            class="button-outlined-secondary flex-0"
                        >
                            Free Wifi
                        </x-ui.button>
                        <x-ui.button
                            icon="parking"
                            class="button-outlined-secondary flex-0"
                        >
                            Free Parking
                        </x-ui.button>
                    </div>
                </div>
            </div>

            <div class="box-input-secondary justify-center">
                <x-ui.button
                    icon="check"
                    class="button-outlined-primary flex-0"
                    type="submit"
                    wire:dirty.class="button-filled-primary"
                    wire:dirty.remove.class="button-outlined-primary"
                >
                    <span wire:dirty>Unsaved Changes</span>
                    <span wire:dirty.remove>Changes Saved</span>
                </x-ui.button>

                <x-ui.button
                    icon="cross"
                    class="button-outlined-secondary flex-0"
                    wire:click="clearStepOne"
                >
                    Clear
                </x-ui.button>
            </div>
        </form>

        <form
            class="flex-secondary gap-20"
            x-show="step === 2"
            x-transition
            wire:submit="submitStepTwo"
        >
            <div class="flex-secondary">
                <div class="box-input-primary items-center text-center">
                    <p class="text-large">Choose Your Event Features</p>
                    <p class="text-leading">Select modules to customize your event experience</p>
                </div>

                <div class="box-shadow self-center">
                    <x-ui.icon
                        icon="setting"
                        class="text-primary size-8"
                    />
                    <p class="text-medium">Smart Module Recommendations</p>
                    <p class="text-leading">Based on your networking with 50 expected guests</p>

                    <div class="flex-secondary flex-1 justify-end">
                        <x-ui.button
                            class="button-filled-primary flex-0"
                            icon="bulb"
                        >
                            Get Smart Recommendations
                        </x-ui.button>
                    </div>
                </div>
            </div>

            @foreach ($featureMD as $each)
                <div class="flex-secondary">
                    <div class="box-input-primary items-center text-center">
                        <p class="text-large">{{ $each['name'] }}</p>
                        <p class="text-leading">{{ $each['description'] }}</p>
                    </div>

                    <div class="flex-secondary grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                        @foreach ($each['modules'] as $eachFMD)
                            <label class="box-shadow">
                                <div class="box-input-secondary items-start">
                                    <div class="box-input-primary flex-1">
                                        <p class="text-medium">{{ $eachFMD['name'] }}</p>
                                        <p class="text-leading">{{ $eachFMD['description'] }}</p>
                                    </div>
                                    <input
                                        type="checkbox"
                                        wire:model="selectedModules"
                                        value="{{ $eachFMD['key'] }}"
                                        class="size-5"
                                    />
                                </div>
                                <div class="box-input-primary">
                                    @foreach ($eachFMD['options'] as $eachOPT)
                                        <p class="text-leading">{{ $eachOPT }}</p>
                                    @endforeach
                                </div>

                                <div class="flex flex-1 flex-col justify-end">
                                    <x-ui.button
                                        icon="explore"
                                        class="button-outlined-primary flex-0"
                                        x-show="Boolean({{$eachFMD['isFree']}})"
                                    >
                                        Free
                                    </x-ui.button>
                                    <x-ui.button
                                        icon="dollar"
                                        class="button-filled-primary flex-0"
                                        x-show="Boolean({{!$eachFMD['isFree']}})"
                                    >
                                        {{ $eachFMD['price'] }} / month
                                    </x-ui.button>
                                </div>
                            </label>
                        @endforeach
                    </div>
                </div>
            @endforeach

            @error('selectedModules')
                <p class="text-error">{{ $message }}</p>
            @enderror

            <div class="box-input-secondary justify-center">
                <x-ui.button
                    icon="check"
                    class="button-outlined-primary flex-0"
                    type="submit"
                    wire:dirty.class="button-filled-primary"
                    wire:dirty.remove.class="button-outlined-primary"
                >
                    <span wire:dirty>Unsaved Changes</span>
                    <span wire:dirty.remove>Changes Saved</span>
                </x-ui.button>

                <x-ui.button
                    icon="cross"
                    class="button-outlined-secondary flex-0"
                    wire:click="clearStepTwo"
                >
                    Clear
                </x-ui.button>
            </div>
        </form>

        <div
            class="flex-secondary items-center text-center"
            x-show="step === 3"
            x-transition
        >
            <p class="text-large">Review your module setup</p>
            <p class="text-leading">
                Here is the curent status of your selected modules. Don't worry - you can configure everything in detail after creating your event
            </p>
            <x-ui.link
                :href="route('dashboard.event-dashboard', ['id' => $id])"
                class="button-filled-primary"
            >
                Configuration Overview
            </x-ui.link>
        </div>

        <div
            class="flex-secondary"
            x-show="step === 4"
            x-transition
        >
            <p class="text-large">Ready to launch</p>
            <p class="text-leading">Choose how you want to launch your amazing event</p>
        </div>
    </div>
</div>
