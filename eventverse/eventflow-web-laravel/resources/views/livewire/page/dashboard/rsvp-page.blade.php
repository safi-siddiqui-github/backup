<?php

use App\Models\RsvpCommunicationInvitationTemplate;
use App\Models\RsvpCommunicationReminderSchedule;
use App\Models\RsvpFormBuilder;
use App\Models\RsvpFormBuilderFood;
use App\Models\RsvpFormBuilderFoodType;
use App\Models\RsvpFormBuilderOption;
use App\Models\RsvpFormBuilderType;
use App\Models\RsvpGiftRegistryPlatform;
use App\Models\RsvpGroup;
use App\Models\RsvpGuestList;
use App\Models\RsvpModule;
use App\Models\RsvpResponseOption;
use App\Traits\UtilTrait;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Auth;
use Illuminate\View\View;
use Livewire\Attributes\Computed;
use Livewire\Attributes\Layout;
use Livewire\Attributes\Session;
use Livewire\Attributes\Title;
use Livewire\Volt\Component;

new #[Title('RSVP Page')] #[Layout('livewire.layout.dashboard')] class extends Component {
    use UtilTrait;

    #[Session]
    public $rsvpSection = 'dashboard';

    public $id;
    public function rendering(View $view): void
    {
        $view->layout('', [
            'id' => $this->id,
            'eventDashboardRoute' => url()->current() === route('dashboard.event-dashboard', ['id' => $this->id]),
            'rsvpRoute' => url()->current() === route('dashboard.rsvp-page', ['id' => $this->id]),
            'seatingRoute' => url()->current() === route('dashboard.seating-page', ['id' => $this->id]),
        ]);
    }

    public $rsvpModule;
    public $today;

    public $deadline;
    public $rsvp_response_option_id;
    public $capacity;
    public bool $allowPlusOnes;
    public $plusOnesLimit;
    public bool $isWaitlisted;
    public bool $collectDietryInformation;
    public bool $enableCustomFields;
    public bool $publicRegistration;
    public bool $requireApproval;
    public bool $automaticReminders;
    public $rsvp_gift_registry_platform_id;
    public $giftRegistryName;
    public $giftRegistryUrl;
    public $giftRegistryDescription;
    public $rsvp_communication_invitation_template_id;
    public $rsvp_communication_reminder_schedule_id;
    public $customMessage;
    public bool $smsNotification;

    public $guestSearch;
    public $rsvp_group_id;
    #[Session]
    public $guestType;

    #[Computed]
    public function rsvpModuleFN()
    {
        return RsvpModule::where('event_module_id', $this->id)->first();
    }

    #[Computed]
    public function rsvpGiftRegistryPlatformsFN()
    {
        return RsvpGiftRegistryPlatform::orderBy('name')->get();
    }

    #[Computed]
    public function rsvpResponseOptionsFN()
    {
        return RsvpResponseOption::orderBy('name')->get();
    }

    #[Computed]
    public function rsvpCommunicationInvitationTemplatesFN()
    {
        return RsvpCommunicationInvitationTemplate::orderBy('name')->get();
    }

    #[Computed]
    public function rsvpCommunicationReminderSchedulesFN()
    {
        return RsvpCommunicationReminderSchedule::orderBy('name')->get();
    }

    #[Computed]
    public function rsvpGroupsFN()
    {
        return RsvpGroup::where('rsvp_module_id', $this->id)->get();
    }

    #[Computed]
    public function rsvpFormBuilderTypesFN()
    {
        return RsvpFormBuilderType::with(['rsvpFormBuilderOptions'])
            ->whereNull('user_id')
            ->get();
    }

    #[Computed]
    public function rsvpFormBuilderTypesCustomFN()
    {
        return RsvpFormBuilderType::where('user_id', Auth::id())
            ->orderBy('order')
            ->with(['rsvpFormBuilderOptions'])
            ->get();
    }

    #[Computed]
    public function rsvpFormBuilderFoodTypesFN()
    {
        // return RsvpFormBuilderFoodType::with(['rsvpFormBuilderFoodOptions'])->get();
        return RsvpFormBuilderFoodType::where('user_id', Auth::id())
            ->get()
            ->groupBy('type');
    }

    #[Computed]
    public function rsvpFormBuildersFN()
    {
        return RsvpFormBuilder::orderBy('order')
            ->where('rsvp_module_id', $this->id)
            ->with(['rsvpFormBuilderOptions'])
            ->get();
    }

    #[Computed]
    public function rsvpFormBuilderFoodsFN()
    {
        // return RsvpFormBuilderFood::orderBy('order')
        //     ->where('rsvp_module_id', $this->id)
        //     ->with(['rsvpFormBuilderOptions'])
        //     ->get();
        return RsvpFormBuilderFood::orderBy('order')
            ->where('rsvp_module_id', $this->id)
            ->get();
    }

    #[Computed]
    public function rsvpGuestListsFN()
    {
        return RsvpGuestList::where('rsvp_module_id', $this->id)
            ->when($this->guestSearch, function ($query) {
                $query->where(function ($q) {
                    $search = '%' . trim($this->guestSearch) . '%';
                    $q->whereLike('name', $search)
                        ->orWhereLike('email', $search)
                        ->orWhereLike('phone', $search)
                        ->orWhereLike('plusOnes', $search)
                        ->orWhereLike('dietryRestrictions', $search)
                        ->orWhereLike('notes', $search);
                });
            })
            ->when($this->rsvp_group_id, fn ($q) => $q->where('rsvp_group_id', $this->rsvp_group_id))
            ->with(['rsvpGroup'])
            ->get();
    }

    public function mount()
    {
        $this->rsvpModule = $this->rsvpModuleFN();
        $this->today = now();

        $this->deadline = $this->formatDate($this->rsvpModule?->deadline);
        $this->rsvp_response_option_id = $this->rsvpModule?->rsvp_response_option_id;
        $this->capacity = $this->rsvpModule?->capacity;
        $this->allowPlusOnes = $this->rsvpModule?->allowPlusOnes ?? false;
        $this->plusOnesLimit = $this->rsvpModule?->plusOnesLimit;
        $this->isWaitlisted = $this->rsvpModule?->isWaitlisted ?? false;
        $this->collectDietryInformation = $this->rsvpModule?->collectDietryInformation ?? false;
        $this->enableCustomFields = $this->rsvpModule?->enableCustomFields ?? false;

        $this->publicRegistration = $this->rsvpModule?->publicRegistration ?? false;
        $this->requireApproval = $this->rsvpModule?->requireApproval ?? false;
        $this->automaticReminders = $this->rsvpModule?->automaticReminders ?? false;

        $this->rsvp_gift_registry_platform_id = $this->rsvpModule?->rsvp_gift_registry_platform_id;
        $this->giftRegistryName = $this->rsvpModule?->giftRegistryName;
        $this->giftRegistryUrl = $this->rsvpModule?->giftRegistryUrl;
        $this->giftRegistryDescription = $this->rsvpModule?->giftRegistryDescription;

        $this->rsvp_communication_invitation_template_id = $this->rsvpModule?->rsvp_communication_invitation_template_id;
        $this->rsvp_communication_reminder_schedule_id = $this->rsvpModule?->rsvp_communication_reminder_schedule_id;
        $this->customMessage = $this->rsvpModule?->customMessage;
        $this->smsNotification = $this->rsvpModule?->smsNotification ?? false;

        ! $this->guestType ? ($this->guestType = 'standard') : null;
    }

    public function with()
    {
        return [
            'rsvpGiftRegistryPlatforms' => $this->rsvpGiftRegistryPlatformsFN(),
            'rsvpResponseOptions' => $this->rsvpResponseOptionsFN(),
            'rsvpCommunicationInvitationTemplates' => $this->rsvpCommunicationInvitationTemplatesFN(),
            'rsvpCommunicationReminderSchedules' => $this->rsvpCommunicationReminderSchedulesFN(),
            'rsvpGroups' => $this->rsvpGroupsFN(),
            'rsvpGuestLists' => $this->rsvpGuestListsFN(),
            'rsvpFormBuilderTypes' => $this->rsvpFormBuilderTypesFN(),
            'rsvpFormBuilderTypesCustom' => $this->rsvpFormBuilderTypesCustomFN(),
            'rsvpFormBuilders' => $this->rsvpFormBuildersFN(),
            'rsvpFormBuilderFoodTypes' => $this->rsvpFormBuilderFoodTypesFN(),
            'rsvpFormBuilderFoods' => $this->rsvpFormBuilderFoodsFN(),
        ];
    }

    public function rsvpFN($step, $id = null)
    {
        switch ($step) {
            case 'settings-response':
                $this->validate([
                    'deadline' => ['nullable', 'date', 'after:today'],
                    'rsvp_response_option_id' => ['nullable', 'exists:rsvp_response_options,id'],
                    'capacity' => ['nullable', 'integer'],
                    'allowPlusOnes' => ['nullable', 'boolean'],
                    'plusOnesLimit' => ['nullable', 'integer'],
                    'isWaitlisted' => ['nullable', 'boolean'],
                    'collectDietryInformation' => ['nullable', 'boolean'],
                    'enableCustomFields' => ['nullable', 'boolean'],
                ]);

                $this->rsvpModule->deadline = $this->deadline;
                $this->rsvpModule->rsvp_response_option_id = $this->rsvp_response_option_id;
                $this->rsvpModule->capacity = $this->capacity;
                $this->rsvpModule->allowPlusOnes = $this->allowPlusOnes;
                $this->rsvpModule->plusOnesLimit = $this->plusOnesLimit;
                $this->rsvpModule->isWaitlisted = $this->isWaitlisted;
                $this->rsvpModule->collectDietryInformation = $this->collectDietryInformation;
                $this->rsvpModule->enableCustomFields = $this->enableCustomFields;
                $this->rsvpModule->save();

                break;
            //
            case 'settings-control':
                $this->validate([
                    'publicRegistration' => ['nullable', 'boolean'],
                    'requireApproval' => ['nullable', 'boolean'],
                    'automaticReminders' => ['nullable', 'boolean'],
                ]);

                $this->rsvpModule->publicRegistration = $this->publicRegistration;
                $this->rsvpModule->requireApproval = $this->requireApproval;
                $this->rsvpModule->automaticReminders = $this->automaticReminders;
                $this->rsvpModule->save();

                break;
            //
            case 'settings-gift':
                $this->validate([
                    'rsvp_gift_registry_platform_id' => ['nullable', 'exists:rsvp_gift_registry_platforms,id'],
                    'giftRegistryName' => ['nullable', 'string', 'min:3', 'max:100'],
                    'giftRegistryUrl' => ['nullable', 'url', 'min:3', 'max:100'],
                    'giftRegistryDescription' => ['nullable', 'min:3', 'max:1000'],
                ]);

                $this->rsvpModule->rsvp_gift_registry_platform_id = $this->rsvp_gift_registry_platform_id;
                $this->rsvpModule->giftRegistryName = $this->giftRegistryName;
                $this->rsvpModule->giftRegistryUrl = $this->giftRegistryUrl;
                $this->rsvpModule->giftRegistryDescription = $this->giftRegistryDescription;
                $this->rsvpModule->save();

                break;
            //
            case 'settings-communication':
                $this->validate([
                    'rsvp_communication_invitation_template_id' => ['nullable', 'exists:rsvp_communication_invitation_templates,id'],
                    'rsvp_communication_reminder_schedule_id' => ['nullable', 'exists:rsvp_communication_reminder_schedules,id'],
                    'customMessage' => ['nullable', 'min:3', 'max:1000'],
                    'smsNotification' => ['nullable', 'boolean'],
                ]);

                $this->rsvpModule->rsvp_communication_invitation_template_id = $this->rsvp_communication_invitation_template_id;
                $this->rsvpModule->rsvp_communication_reminder_schedule_id = $this->rsvp_communication_reminder_schedule_id;
                $this->rsvpModule->customMessage = $this->customMessage;
                $this->rsvpModule->smsNotification = $this->smsNotification;
                $this->rsvpModule->save();

                break;
            //
            case 'guest-list-delete':
                RsvpGuestList::find($id)->delete();

                break;
            //
            case 'form-builder-add':
                $last = Arr::last($this->rsvpFormBuildersFN()->toArray(), fn ($a) => $a, null);
                if ($last) {
                    $last = $last['order'] + 1;
                } else {
                    $last = 1;
                }

                $rsvpFormBuilderType = RsvpFormBuilderType::find($id)->load(['rsvpFormBuilderOptions']);

                $rsvpFB = new RsvpFormBuilder();
                $rsvpFB->rsvp_module_id = $this->id;
                $rsvpFB->name = $rsvpFormBuilderType->name;
                $rsvpFB->placeholder = $rsvpFormBuilderType->placeholder;
                $rsvpFB->isRequired = $rsvpFormBuilderType->isRequired;
                $rsvpFB->type = $rsvpFormBuilderType->type;
                $rsvpFB->order = $last;
                $rsvpFB->save();

                foreach ($rsvpFormBuilderType->rsvpFormBuilderOptions ?? [] as $eachOption) {
                    $rsvpFBO = new RsvpFormBuilderOption();
                    $rsvpFBO->rsvp_form_builder_id = $rsvpFB->id;
                    $rsvpFBO->name = $eachOption->name;
                    $rsvpFBO->save();
                }

                break;
            //
            case 'form-builder-delete':
                RsvpFormBuilder::find($id)?->delete();

                break;
            //
            case 'rsvp-group-delete':
                RsvpGroup::find($id)->delete();

                break;
            //
            case 'rsvp-form-builder-type-delete':
                RsvpFormBuilderType::find($id)->delete();

                break;
            //
            case 'rsvp-form-builder-food-type-delete':
                RsvpFormBuilderFoodType::find($id)->delete();

                break;
            //
            case 'form-builder-food-add':
                $last = Arr::last($this->rsvpFormBuilderFoodsFN()->toArray(), fn ($a) => $a, null);
                if ($last) {
                    $last = $last['order'] + 1;
                } else {
                    $last = 1;
                }

                // $rsvpFormBuilderFoodType = RsvpFormBuilderFoodType::find($id)->load(['rsvpFormBuilderOptions']);
                $rsvpFormBuilderFoodType = RsvpFormBuilderFoodType::find($id);

                $rsvpFBF = new RsvpFormBuilderFood();
                $rsvpFBF->rsvp_module_id = $this->id;
                $rsvpFBF->name = $rsvpFormBuilderFoodType->name;
                $rsvpFBF->description = $rsvpFormBuilderFoodType->description;
                $rsvpFBF->price = $rsvpFormBuilderFoodType->price;
                $rsvpFBF->type = $rsvpFormBuilderFoodType->type;
                $rsvpFBF->order = $last;
                $rsvpFBF->save();

                // foreach ($rsvpFormBuilderType->rsvpFormBuilderOptions ?? [] as $eachOption) {
                //     $rsvpFBO = new RsvpFormBuilderOption();
                //     $rsvpFBO->rsvp_form_builder_id = $rsvpFB->id;
                //     $rsvpFBO->name = $eachOption->name;
                //     $rsvpFBO->save();
                // }

                break;
            //
            case 'form-builder-food-delete':
                RsvpFormBuilderFood::find($id)->delete();

            //
            default:
                # code...
                break;
        }
    }
};

?>

<div class="flex-secondary">
    <div class="box-input-secondary justify-between">
        <div class="box-input-primary flex-1">
            <p class="text-large">RSVP Management</p>
            <p class="text-leading">Manage guest lists and track responses</p>
        </div>

        <div class="box-input-secondary">
            <x-ui.button
                icon="document"
                class="button-filled-primary"
                @click="$dispatch('modal-event', {type: 'rsvp-form-builder-preview', id: {{ $rsvpModule->id }} })"
            >
                Preview Form
            </x-ui.button>
            <x-ui.button
                icon="document"
                class="button-outlined-primary"
                @click="$dispatch('modal-event', {type: 'rsvp-guest-list', id: {{ $rsvpModule->id }} })"
            >
                Add Guest
            </x-ui.button>
        </div>
    </div>

    <div
        class="box-shadow"
        x-data="{
            rsvpSection: $wire.entangle('rsvpSection'),
            guestType: $wire.entangle('guestType'),
        }"
    >
        <div class="flex-secondary grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5">
            <label
                class="box-input-secondary cursor-pointer"
                :class="{
                    'text-primary': rsvpSection === 'dashboard'
                }"
            >
                <input
                    type="radio"
                    name="rsvpSection"
                    class="hidden"
                    wire:model.live="rsvpSection"
                    value="dashboard"
                />
                <x-ui.icon icon="dashboard" />
                Dashboard
            </label>
            <label
                class="box-input-secondary cursor-pointer"
                :class="{
                    'text-primary': rsvpSection === 'formBuilder'
                }"
            >
                <input
                    type="radio"
                    name="rsvpSection"
                    class="hidden"
                    wire:model.live="rsvpSection"
                    value="formBuilder"
                />
                <x-ui.icon icon="document" />
                Form Builder
            </label>
            <label
                class="box-input-secondary cursor-pointer"
                :class="{
                    'text-primary': rsvpSection === 'group'
                }"
            >
                <input
                    type="radio"
                    name="rsvpSection"
                    class="hidden"
                    wire:model.live="rsvpSection"
                    value="group"
                />
                <x-ui.icon icon="users" />
                Groups
            </label>
            <label
                class="box-input-secondary cursor-pointer"
                :class="{
                    'text-primary': rsvpSection === 'guest'
                }"
            >
                <input
                    type="radio"
                    name="rsvpSection"
                    class="hidden"
                    wire:model.live="rsvpSection"
                    value="guest"
                />
                <x-ui.icon icon="table" />
                Guest List
            </label>
            <label
                class="box-input-secondary cursor-pointer"
                :class="{
                    'text-primary': rsvpSection === 'setting'
                }"
            >
                <input
                    type="radio"
                    name="rsvpSection"
                    class="hidden"
                    wire:model.live="rsvpSection"
                    value="setting"
                />
                <x-ui.icon icon="setting" />
                Settings
            </label>
        </div>

        <x-ui.divider />

        <div
            class="flex-secondary"
            x-transition
            x-show="rsvpSection === 'dashboard'"
        >
            <p class="text-medium">Dashbaord</p>

            <div class="box-input-secondary">
                <div class="button-outlined-primary">
                    <p class="">3</p>
                    <p class="">Total Invited</p>
                </div>
                <div class="button-outlined-primary">
                    <p class="">1</p>
                    <p class="">Attending</p>
                </div>
                <div class="button-outlined-primary">
                    <p class="">1</p>
                    <p class="">Pending</p>
                </div>
                <div class="button-outlined-primary">
                    <p class="">1</p>
                    <p class="">Declined</p>
                </div>
                <div class="button-outlined-primary">
                    <p class="">67%</p>
                    <p class="">Response Rate</p>
                </div>
            </div>

            <x-ui.divider />

            <div class="box-input-primary">
                <p class="font-medium">Quick Actions</p>

                <div class="box-input-secondary">
                    <x-ui.button
                        icon="plus"
                        class="button-outlined-secondary"
                    >
                        Add Guest
                    </x-ui.button>
                    <x-ui.button
                        icon="mail"
                        class="button-outlined-secondary"
                    >
                        Send Invites
                    </x-ui.button>
                    <x-ui.button
                        icon="export"
                        class="button-outlined-secondary"
                    >
                        Export List
                    </x-ui.button>
                </div>
            </div>

            <x-ui.divider />

            <div class="flex-secondary">
                <div class="box-input-primary">
                    <p class="text-medium">Recent Activity</p>
                    <p class="text-leading">Latest RSVP Responses</p>
                </div>

                <div class="flex-secondary">
                    <div class="box-input-secondary gap-4">
                        <x-ui.icon
                            icon="cross"
                            class="text-error"
                        />

                        <div class="box-input-primary gap-0">
                            <p class="font-medium">Emma Davis</p>
                            <p class="text-leading">12/02/25</p>
                        </div>

                        <div class="button-outlined-secondary flex-0 text-xs">Declined</div>
                    </div>

                    <div class="box-input-secondary gap-4">
                        <x-ui.icon
                            icon="check"
                            class="text-primary"
                        />

                        <div class="box-input-primary gap-0">
                            <p class="font-medium">John Doe</p>
                            <p class="text-leading">12/02/25</p>
                        </div>

                        <div class="button-outlined-secondary flex-0 text-xs">Attending</div>
                    </div>
                </div>
            </div>
        </div>

        <div
            class="flex-secondary"
            x-transition
            x-show="rsvpSection === 'formBuilder'"
        >
            <div class="flex-secondary grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
                <div class="flex-secondary">
                    <div class="box-input-primary">
                        <p class="text-medium">Field Library</p>
                        <p class="text-leading">Add fields to your form</p>
                    </div>

                    <x-ui.divider />

                    <div class="box-input-secondary">
                        <label :class="guestType === 'standard' ? 'button-filled-primary': 'button-outlined-primary'">
                            <input
                                type="radio"
                                name="guestType"
                                wire:model.live="guestType"
                                value="standard"
                                class="hidden"
                            />
                            Standard
                        </label>
                        <label :class="guestType === 'custom' ? 'button-filled-primary': 'button-outlined-primary'">
                            <input
                                type="radio"
                                name="guestType"
                                wire:model.live="guestType"
                                value="custom"
                                class="hidden"
                            />
                            Custom
                        </label>
                        <label :class="guestType === 'food' ? 'button-filled-primary': 'button-outlined-primary'">
                            <input
                                type="radio"
                                name="guestType"
                                wire:model.live="guestType"
                                value="food"
                                class="hidden"
                            />
                            Food
                        </label>
                    </div>

                    <div
                        class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-1"
                        x-show="guestType === 'standard'"
                        x-transition
                    >
                        @foreach ($rsvpFormBuilderTypes ?? [] as $each)
                            <button
                                class="button-outlined-secondary justify-start gap-4 text-left"
                                wire:click="rsvpFN('form-builder-add', {{ $each->id }})"
                            >
                                <x-ui.icon icon="document" />
                                <div class="box-input-primary gap-0">
                                    <p class="font-medium">
                                        {{ $each->name }}
                                    </p>
                                    <p class="text-xs">
                                        (
                                        @if ($each->isRequired)
                                            Required
                                        @else
                                            Standard
                                        @endif
                                        -

                                        @switch($each->type)
                                            @case('text')
                                                Text Input

                                                @break
                                            @case('textarea')
                                                Long Input

                                                @break
                                            @case('select')
                                                Dropdown

                                                @break
                                            @case('radio')
                                                Multiple Choice

                                                @break
                                            @case('checkbox')
                                                Checkboxes

                                                @break
                                        @endswitch
                                        )
                                    </p>
                                    <p class="font-normal tracking-tight">{{ $each->placeholder }}</p>
                                </div>
                            </button>
                        @endforeach
                    </div>

                    <div
                        class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-1"
                        x-show="guestType === 'custom'"
                        x-transition
                    >
                        <div class="box-input-primary col-span-full">
                            <p class="text-medium">Custom Fields</p>
                            <x-ui.button
                                icon="plus"
                                class="button-filled-primary w-fit lg:w-auto"
                                @click="$dispatch('modal-event', {type: 'rsvp-form-builder-type', id: {{ $rsvpModule->id }} })"
                            >
                                Add Fields
                            </x-ui.button>
                        </div>

                        <x-ui.divider />

                        @foreach ($rsvpFormBuilderTypesCustom ?? [] as $each)
                            <div class="box-input-primary">
                                <button
                                    class="button-outlined-secondary justify-start gap-4 text-left"
                                    wire:click="rsvpFN('form-builder-add', {{ $each->id }})"
                                >
                                    <x-ui.icon icon="document" />
                                    <div class="box-input-primary gap-0">
                                        <p class="font-medium">
                                            {{ $each->name }}
                                        </p>
                                        <p class="text-xs">
                                            (
                                            @if ($each->isRequired)
                                                Required
                                            @else
                                                Standard
                                            @endif
                                            -

                                            @switch($each->type)
                                                @case('text')
                                                    Text Input

                                                    @break
                                                @case('textarea')
                                                    Long Input

                                                    @break
                                                @case('textarea')
                                                    Long Input

                                                    @break
                                                @case('select')
                                                    Dropdown

                                                    @break
                                                @case('radio')
                                                    Multiple Choice

                                                    @break
                                                @case('checkboxes')
                                                    Checkboxes

                                                    @break
                                            @endswitch
                                            )
                                        </p>
                                        <p class="font-normal tracking-tight">{{ $each->placeholder }}</p>
                                    </div>
                                </button>

                                <div class="box-input-secondary">
                                    <x-ui.button
                                        icon="edit"
                                        class="button-outlined-primary"
                                        @click="$dispatch('modal-event', {type: 'rsvp-form-builder-type-edit', id: {{$each->id}}, rsvp_module_id: {{$rsvpModule->id}} })"
                                    >
                                        Edit
                                    </x-ui.button>
                                    <x-ui.button
                                        icon="trash"
                                        class="button-outlined-secondary"
                                        wire:click="rsvpFN('rsvp-form-builder-type-delete',{{$each->id}})"
                                    >
                                        Delete
                                    </x-ui.button>
                                </div>
                            </div>
                        @endforeach
                    </div>

                    <div
                        class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-1"
                        x-show="guestType === 'food'"
                        x-transition
                    >
                        <div class="box-input-primary col-span-full">
                            <p class="text-medium">Custom Food Fields</p>
                            <x-ui.button
                                icon="plus"
                                class="button-filled-primary w-fit lg:w-auto"
                                @click="$dispatch('modal-event', {type: 'rsvp-form-builder-food-type', id: {{ $rsvpModule->id }} })"
                            >
                                Add Fields
                            </x-ui.button>
                        </div>

                        <x-ui.divider />

                        @foreach ($rsvpFormBuilderFoodTypes ?? [] as $key => $groupItems)
                            <p class="text-medium">
                                @switch($key)
                                    @case('appetizer')
                                    @case('beverage')
                                    @case('desert')
                                        {{ ucfirst($key) }} ({{ count($groupItems) }})

                                        @break
                                    @case('main')
                                        Main Course ({{ count($groupItems) }})

                                        @break
                                @endswitch
                            </p>

                            @foreach ($groupItems as $each)
                                <div class="box-input-primary">
                                    <button
                                        class="button-outlined-secondary justify-start gap-4 text-left"
                                        wire:click="rsvpFN('form-builder-food-add', {{ $each->id }})"
                                    >
                                        <x-ui.icon icon="document" />
                                        <div class="box-input-primary gap-0">
                                            <p class="font-medium">
                                                {{ $each->name }}
                                            </p>
                                            <p class="text-sm">$ {{ $each->price }}</p>
                                            <p class="font-normal tracking-tight">{{ $each->placeholder }}</p>
                                        </div>
                                    </button>

                                    <div class="box-input-secondary">
                                        <x-ui.button
                                            icon="edit"
                                            class="button-outlined-primary"
                                            @click="$dispatch('modal-event', {type: 'rsvp-form-builder-food-type-edit', id: {{$each->id}}, rsvp_module_id: {{$rsvpModule->id}} })"
                                        >
                                            Edit
                                        </x-ui.button>
                                        <x-ui.button
                                            icon="trash"
                                            class="button-outlined-secondary"
                                            wire:click="rsvpFN('rsvp-form-builder-food-type-delete',{{$each->id}})"
                                        >
                                            Delete
                                        </x-ui.button>
                                    </div>
                                </div>
                            @endforeach
                        @endforeach
                    </div>
                </div>

                <div class="flex-secondary xl:col-span-2">
                    <div class="box-input-primary">
                        <p class="text-medium">Form Builder Canvas</p>
                        <p class="text-leading">Total Modules ({{ count($rsvpFormBuilders) }})</p>
                    </div>

                    <x-ui.divider />

                    <div class="flex-secondary grid grid-cols-1">
                        @foreach ($rsvpFormBuilders ?? [] as $each)
                            <div class="box-shadow">
                                <div class="box-input-secondary justify-between">
                                    <div class="box-input-secondary">
                                        <x-ui.icon icon="document" />
                                        <p class="font-medium">
                                            {{ $each?->name }}
                                            <span class="text-xs">
                                                (
                                                @if ($each->isRequired)
                                                    Required
                                                @else
                                                    Standard
                                                @endif
                                                )
                                            </span>
                                        </p>
                                    </div>

                                    <div class="box-input-secondary">
                                        <x-ui.button
                                            icon="edit"
                                            class="button-outlined-primary"
                                            @click="$dispatch('modal-event', {type: 'rsvp-form-builder-edit', id: {{$each->id}}})"
                                        ></x-ui.button>
                                        <x-ui.button
                                            icon="trash"
                                            class="button-outlined-secondary"
                                            wire:click="rsvpFN('form-builder-delete', {{ $each->id }})"
                                        ></x-ui.button>
                                    </div>
                                </div>

                                <div class="box-input-primary">
                                    <p class="label">
                                        {{ $each?->name }}
                                        {{ $each?->isRequired ? '*' : '' }}
                                    </p>

                                    @switch($each->type)
                                        @case('text')
                                            <input
                                                type="text"
                                                class="input"
                                                placeholder="{{ $each?->placeholder }}"
                                            />

                                            @break
                                        @case('textarea')
                                            <textarea
                                                class="input"
                                                placeholder="{{ $each?->placeholder }}"
                                                rows="5"
                                            ></textarea>

                                            @break
                                        @case('select')
                                            <select class="input">
                                                <option value="0">Select</option>

                                                @foreach ($each->rsvpFormBuilderOptions as $eachOption)
                                                    <option value="{{ $eachOption?->id }}">{{ $eachOption?->name }}</option>
                                                @endforeach
                                            </select>

                                            @break
                                        @case('radio')
                                        @case('checkbox')
                                            @foreach ($each->rsvpFormBuilderOptions as $eachOption)
                                                <label class="label">
                                                    <input
                                                        type="{{ $each?->type }}"
                                                        name="{{ $each?->name }}"
                                                        value="{{ $eachOption?->id }}"
                                                    />
                                                    {{ $eachOption?->name }}
                                                </label>
                                            @endforeach

                                            @break
                                    @endswitch
                                </div>
                            </div>
                        @endforeach

                        <p class="text-medium">Food</p>

                        @foreach ($rsvpFormBuilderFoods ?? [] as $each)
                            <div class="box-shadow">
                                <div class="box-input-secondary justify-between">
                                    <div class="box-input-secondary">
                                        <x-ui.icon icon="document" />
                                        <p class="font-medium">
                                            {{ $each?->name }}
                                        </p>
                                    </div>

                                    <div class="box-input-secondary">
                                        <x-ui.button
                                            icon="edit"
                                            class="button-outlined-primary"
                                            @click="$dispatch('modal-event', {type: 'rsvp-form-builder-food-edit', id: {{$each->id}}})"
                                        ></x-ui.button>
                                        <x-ui.button
                                            icon="trash"
                                            class="button-outlined-secondary"
                                            wire:click="rsvpFN('form-builder-food-delete', {{ $each->id }})"
                                        ></x-ui.button>
                                    </div>
                                </div>

                                <div class="box-input-primary">
                                    <p class="">{{ $each?->price ? '$ ' . $each?->price : 'Free' }}</p>

                                    <p class="text-leading">
                                        {{ $each?->description }}
                                    </p>
                                </div>
                            </div>
                        @endforeach
                    </div>
                </div>
            </div>
        </div>

        <div
            class="flex-secondary"
            x-transition
            x-show="rsvpSection === 'group'"
        >
            <div class="box-input-secondary justify-between">
                <p class="text-medium">Manage Groups</p>
                <button
                    class="button-filled-primary flex-0"
                    @click="$dispatch('modal-event', {type: 'rsvp-group', id: {{ $rsvpModule->id }} })"
                >
                    <x-ui.icon icon="plus" />
                    Add Group
                </button>
            </div>

            <div class="flex-secondary grid grid-cols-1 sm:grid-cols-2">
                @foreach ($rsvpGroups as $each)
                    <div class="box-shadow gap-2">
                        <div class="box-input-secondary justify-between">
                            <div class="box-input-secondary">
                                <x-ui.ball :color="$each->color" />
                                <p class="font-medium">{{ $each->name }}</p>
                            </div>
                            <div class="box-input-secondary">
                                <x-ui.button
                                    icon="edit"
                                    class="button-outlined-secondary"
                                    @click="$dispatch('modal-event', {type: 'rsvp-group-edit', id: {{ $each->id }} })"
                                ></x-ui.button>
                                <x-ui.button
                                    icon="trash"
                                    class="button-outlined-secondary"
                                    wire:click="rsvpFN('rsvp-group-delete',{{$each->id}})"
                                ></x-ui.button>
                            </div>
                        </div>

                        <p class="text-leading">
                            {{ $each->description }}
                        </p>

                        <div class="box-input-secondary justify-between">
                            <p class="">Total Invited: 1</p>
                            <p class="">Attending: 1</p>
                        </div>

                        <div class="box-input-primary">
                            <div class="flex justify-between">
                                <p class="">Limit</p>
                                <p class="">{{ $each->capacity }}</p>
                            </div>

                            <x-ui.progress
                                :color="$each->color"
                                class="w-2/6"
                            />
                        </div>
                    </div>
                @endforeach

                <x-ui.button
                    icon="users"
                    class="button-outlined-secondary"
                    @click="$dispatch('modal-event', {type: 'rsvp-group', id: {{ $rsvpModule->id }} })"
                >
                    Add New Group
                </x-ui.button>
            </div>
        </div>

        <div
            class="flex-secondary"
            x-transition
            x-show="rsvpSection === 'guest'"
        >
            <p class="text-medium">Guest List</p>

            <div class="flex-secondary sm:flex-row sm:flex-wrap sm:items-center">
                <div class="button-outlined-primary py-1 pr-1">
                    <x-ui.icon icon="search" />
                    <input
                        type="text"
                        placeholder="Search for geusts"
                        class="w-full truncate py-2 outline-none"
                        wire:model.live.debounce="guestSearch"
                    />
                    <button class="button-filled-primary">Search</button>
                </div>

                <select class="input">
                    <option value="">All Status</option>
                    <option value="">Active</option>
                    <option value="">Pending</option>
                    <option value="">Accepted</option>
                </select>

                <select
                    id="rsvp_group_id"
                    class="input"
                    wire:model.live.debounce="rsvp_group_id"
                >
                    <option value="">All Groups</option>
                    @foreach ($rsvpGroups as $each)
                        <option value="{{ $each->id }}">{{ $each->name }}</option>
                    @endforeach

                    <option value="custom">Custom</option>
                </select>
            </div>

            <x-ui.divider />

            <div class="overflow-x-auto pb-6">
                <div class="flex-secondary grid min-w-max grid-cols-6 items-center">
                    <p class="label">Guest</p>
                    <p class="label">Contact</p>
                    <p class="label">Group</p>
                    <p class="label">Status</p>
                    <p class="label">Plus Ones</p>
                    <p class="label">Action</p>

                    <x-ui.divider />

                    @foreach ($rsvpGuestLists as $each)
                        <div class="box-input-primary">
                            <p class="">{{ $each?->name ?? 'No Name' }}</p>
                            <p class="text-leading text-sm">Dietry: {{ $each?->dietryRestrictions }}</p>
                        </div>

                        <div class="box-input-primary">
                            <p class="">{{ $each?->email ?? 'No Email' }}</p>
                            <p class="text-leading text-sm">{{ $each?->phone ?? 'No Phone' }}</p>
                        </div>

                        <div class="box-input-secondary">
                            @if ($each?->rsvpGroup)
                                <x-ui.ball :color="$each?->rsvpGroup?->color" />
                            @endif

                            <p class="">{{ $each?->rsvpGroup?->name ?? 'No Group' }}</p>
                        </div>

                        <div class="button-outlined-secondary text-xs">Attending</div>

                        <p class="">{{ $each?->plusOnes ?? 0 }}</p>

                        <div class="box-input-secondary">
                            <x-ui.button
                                icon="edit"
                                class="button-outlined-secondary"
                                @click="$dispatch('modal-event', {type: 'rsvp-guest-list-edit', id: {{ $each->id }} })"
                            ></x-ui.button>
                            <x-ui.button
                                icon="mail"
                                class="button-outlined-secondary"
                            ></x-ui.button>
                            <x-ui.button
                                icon="trash"
                                class="button-outlined-secondary"
                                wire:click="rsvpFN('guest-list-delete', {{$each->id}})"
                            ></x-ui.button>
                        </div>
                    @endforeach
                </div>
            </div>
        </div>

        <div
            class="flex-secondary"
            x-transition
            x-show="rsvpSection === 'setting'"
        >
            <p class="text-medium">Settings</p>

            <div
                class="box-shadow"
                x-data="{
                    show: true,
                    toggle() {
                        this.show = ! this.show
                    },
                    init() {
                        if (window.innerWidth < 1024) {
                            this.show = false
                        }
                    },
                }"
            >
                <button
                    class="box-input-secondary justify-between"
                    @click="toggle()"
                >
                    <div class="box-input-secondary">
                        <x-ui.icon icon="clock" />
                        <p class="font-medium">Response Settings</p>
                    </div>

                    <span
                        class="transition"
                        :class="{'rotate-90': show}"
                    >
                        <x-ui.icon icon="arrow-right" />
                    </span>
                </button>

                <form
                    class="flex-secondary grid grid-cols-1 sm:grid-cols-2"
                    x-transition
                    x-show="show"
                    wire:submit="rsvpFN('settings-response')"
                >
                    <div class="box-input-primary">
                        <label
                            for="deadline"
                            class="lanel"
                        >
                            RSVP Deadline
                        </label>
                        <input
                            id="deadline"
                            type="datetime-local"
                            class="input"
                            wire:model="deadline"
                        />
                        @error('deadline')
                            <p class="text-error">{{ $message }}</p>
                        @enderror
                    </div>

                    <div class="box-input-primary">
                        <label
                            for="rsvp_response_option_id"
                            class="label"
                        >
                            Response Options
                        </label>

                        <select
                            id="rsvp_response_option_id"
                            class="input"
                            wire:model="rsvp_response_option_id"
                        >
                            <option value="null">Select</option>
                            @foreach ($rsvpResponseOptions as $each)
                                <option value="{{ $each->id }}">{{ $each->name }}</option>
                            @endforeach

                            <option value="custom">Custom</option>
                        </select>

                        @error('rsvp_response_option_id')
                            <p class="text-error">{{ $message }}</p>
                        @enderror
                    </div>

                    <div class="box-input-primary">
                        <label
                            for="capacity"
                            class="label"
                        >
                            Capacity Limit (Optional)
                        </label>
                        <input
                            id="capacity"
                            type="text"
                            class="input"
                            placeholder="1...999"
                            wire:model="capacity"
                        />

                        @error('capacity')
                            <p class="text-error">{{ $message }}</p>
                        @enderror
                    </div>

                    <div class="box-input-secondary col-span-full">
                        <label
                            for="allowPlusOnes"
                            class="label"
                        >
                            Allow Plus Ones
                        </label>

                        <input
                            id="allowPlusOnes"
                            type="checkbox"
                            class="size-5"
                            wire:model.boolean="allowPlusOnes"
                        />

                        @error('allowPlusOnes')
                            <p class="text-error">{{ $message }}</p>
                        @enderror
                    </div>

                    <div class="box-input-primary">
                        <label
                            for="plusOnesLimit"
                            class="label"
                        >
                            Plus Ones Limit
                        </label>

                        <input
                            id="plusOnesLimit"
                            type="text"
                            class="input"
                            placeholder="1...999"
                            wire:model="plusOnesLimit"
                        />

                        @error('plusOnesLimit')
                            <p class="text-error">{{ $message }}</p>
                        @enderror
                    </div>

                    <div class="box-input-secondary col-span-full">
                        <label
                            for="isWaitlisted"
                            class="label"
                        >
                            Waitlist
                        </label>

                        <input
                            id="isWaitlisted"
                            type="checkbox"
                            class="size-5"
                            wire:model.boolean="isWaitlisted"
                        />

                        @error('isWaitlisted')
                            <p class="text-error">{{ $message }}</p>
                        @enderror
                    </div>

                    <div class="box-input-secondary col-span-full">
                        <label
                            for="collectDietryInformation"
                            class="label"
                        >
                            Collect Dietry Information
                        </label>

                        <input
                            id="collectDietryInformation"
                            type="checkbox"
                            class="size-5"
                            wire:model.boolean="collectDietryInformation"
                        />

                        @error('collectDietryInformation')
                            <p class="text-error">{{ $message }}</p>
                        @enderror
                    </div>

                    <div class="box-input-secondary col-span-full">
                        <label
                            for="enableCustomFields"
                            class="label"
                        >
                            Enable Custom Fields
                        </label>

                        <input
                            id="enableCustomFields"
                            type="checkbox"
                            class="size-5"
                            wire:model.boolean="enableCustomFields"
                        />

                        @error('enableCustomFields')
                            <p class="text-error">{{ $message }}</p>
                        @enderror
                    </div>

                    <x-ui.button
                        icon="plus"
                        class="button-filled-primary col-span-full"
                        type="submut"
                    >
                        Save
                    </x-ui.button>
                </form>
            </div>

            <div
                class="box-shadow"
                x-data="{
                    show: true,
                    toggle() {
                        this.show = ! this.show
                    },
                    init() {
                        if (window.innerWidth < 1024) {
                            this.show = false
                        }
                    },
                }"
            >
                <button
                    class="box-input-secondary justify-between"
                    @click="toggle()"
                >
                    <div class="box-input-secondary">
                        <x-ui.icon icon="shield" />
                        <p class="font-medium">Access Control</p>
                    </div>

                    <span
                        class="transition"
                        :class="{'rotate-90': show}"
                    >
                        <x-ui.icon icon="arrow-right" />
                    </span>
                </button>

                <form
                    class="flex-secondary grid grid-cols-1"
                    x-transition
                    x-show="show"
                    wire:submit="rsvpFN('settings-control')"
                >
                    <div class="box-input-secondary gap-4">
                        <label
                            for="publicRegistration"
                            class="box-input-primary flex-1"
                        >
                            <span class="font-medium">Public Registration</span>
                            <p class="text-leading">Allow anyone with the link to RSVP</p>
                        </label>

                        <input
                            id="publicRegistration"
                            type="checkbox"
                            class="size-5"
                            wire:model.boolean="publicRegistration"
                        />

                        @error('publicRegistration')
                            <p class="text-error">{{ $message }}</p>
                        @enderror
                    </div>
                    <div class="box-input-secondary gap-4">
                        <label
                            for="requireApproval"
                            class="box-input-primary flex-1"
                        >
                            <span class="font-medium">Require Approval</span>
                            <p class="text-leading">Manually approve each RSVP</p>
                        </label>

                        <input
                            id="requireApproval"
                            type="checkbox"
                            class="size-5"
                            wire:model.boolean="requireApproval"
                        />

                        @error('requireApproval')
                            <p class="text-error">{{ $message }}</p>
                        @enderror
                    </div>
                    <div class="box-input-secondary gap-4">
                        <label
                            for="automaticReminders"
                            class="box-input-primary flex-1"
                        >
                            <span class="font-medium">Automatic Reminders</span>
                            <p class="text-leading">Send reminder emails automatically</p>
                        </label>

                        <input
                            id="automaticReminders"
                            type="checkbox"
                            class="size-5"
                            wire:model.boolean="automaticReminders"
                        />

                        @error('automaticReminders')
                            <p class="text-error">{{ $message }}</p>
                        @enderror
                    </div>

                    <x-ui.button
                        icon="plus"
                        class="button-filled-primary col-span-full"
                        type="submut"
                    >
                        Save
                    </x-ui.button>
                </form>
            </div>

            <div
                class="box-shadow"
                x-data="{
                    show: true,
                    toggle() {
                        this.show = ! this.show
                    },
                    init() {
                        if (window.innerWidth < 1024) {
                            this.show = false
                        }
                    },
                }"
            >
                <button
                    class="box-input-secondary justify-between"
                    @click="toggle()"
                >
                    <div class="box-input-secondary">
                        <x-ui.icon icon="gift" />
                        <p class="font-medium">Gift Registry</p>
                    </div>

                    <span
                        class="transition"
                        :class="{'rotate-90': show}"
                    >
                        <x-ui.icon icon="arrow-right" />
                    </span>
                </button>

                <form
                    class="flex-secondary grid grid-cols-1 sm:grid-cols-2"
                    x-transition
                    x-show="show"
                    wire:submit="rsvpFN('settings-gift')"
                >
                    <div class="box-input-primary">
                        <label
                            for="giftRegistryName"
                            class="label"
                        >
                            Registry Name
                        </label>
                        <input
                            id="giftRegistryName"
                            type="text"
                            class="input"
                            placeholder="Wedding Registry"
                            wire:model="giftRegistryName"
                        />
                        @error('giftRegistryName')
                            <p class="text-error">{{ $message }}</p>
                        @enderror
                    </div>

                    <div class="box-input-primary">
                        <label
                            for="rsvp_gift_registry_platform_id"
                            class="label"
                        >
                            Select Platform
                        </label>
                        <select
                            id="rsvp_gift_registry_platform_id"
                            class="input"
                            wire:model="rsvp_gift_registry_platform_id"
                        >
                            <option value="null">Select</option>
                            @foreach ($rsvpGiftRegistryPlatforms as $each)
                                <option value="{{ $each->id }}">{{ $each->name }}</option>
                            @endforeach

                            <option value="custom">Custom</option>
                        </select>
                        @error('rsvp_gift_registry_platform_id')
                            <p class="text-error">{{ $message }}</p>
                        @enderror
                    </div>

                    <div class="box-input-primary">
                        <label
                            for="giftRegistryUrl"
                            class="label"
                        >
                            Registry Url
                        </label>
                        <input
                            id="giftRegistryUrl"
                            type="text"
                            class="input"
                            placeholder="https://..."
                            wire:model="giftRegistryUrl"
                        />
                        @error('giftRegistryUrl')
                            <p class="text-error">{{ $message }}</p>
                        @enderror
                    </div>

                    <div class="box-input-primary col-span-full">
                        <label
                            for="giftRegistryDescription"
                            class="label"
                        >
                            Description (Optional)
                        </label>
                        <textarea
                            id="giftRegistryDescription"
                            class="input h-44 rounded-lg"
                            placeholder="Brief Description of the Registry"
                            wire:model="giftRegistryDescription"
                        ></textarea>

                        @error('giftRegistryDescription')
                            <p class="text-error">{{ $message }}</p>
                        @enderror
                    </div>

                    <x-ui.button
                        icon="plus"
                        class="button-filled-primary col-span-full"
                        type="submit"
                    >
                        Add Registry
                    </x-ui.button>
                </form>
            </div>

            <div
                class="box-shadow"
                x-data="{
                    show: true,
                    toggle() {
                        this.show = ! this.show
                    },
                    init() {
                        if (window.innerWidth < 1024) {
                            this.show = false
                        }
                    },
                }"
            >
                <button
                    class="box-input-secondary justify-between"
                    @click="toggle()"
                >
                    <div class="box-input-secondary">
                        <x-ui.icon icon="chat" />
                        <p class="font-medium">Communication Settings</p>
                    </div>

                    <span
                        class="transition"
                        :class="{'rotate-90': show}"
                    >
                        <x-ui.icon icon="arrow-right" />
                    </span>
                </button>

                <form
                    class="flex-secondary grid grid-cols-1 sm:grid-cols-2"
                    x-transition
                    x-show="show"
                    wire:submit="rsvpFN('settings-communication')"
                >
                    <div class="box-input-primary">
                        <label
                            for="rsvp_communication_invitation_template_id"
                            class="label"
                        >
                            Invitation Template
                        </label>
                        <select
                            id="rsvp_communication_invitation_template_id"
                            class="input"
                            wire:model="rsvp_communication_invitation_template_id"
                        >
                            <option value="null">Select</option>
                            @foreach ($rsvpCommunicationInvitationTemplates as $each)
                                <option value="{{ $each->id }}">{{ $each->name }}</option>
                            @endforeach

                            <option value="custom">Custom</option>
                        </select>

                        @error('rsvp_communication_invitation_template_id')
                            <p class="text-error">{{ $message }}</p>
                        @enderror
                    </div>

                    <div class="box-input-primary">
                        <label
                            for="rsvp_communication_reminder_schedule_id"
                            class="label"
                        >
                            Reminder Schedule
                        </label>

                        <select
                            id="rsvp_communication_reminder_schedule_id"
                            class="input"
                            wire:model="rsvp_communication_reminder_schedule_id"
                        >
                            <option value="null">Select</option>
                            @foreach ($rsvpCommunicationReminderSchedules as $each)
                                <option value="{{ $each->id }}">{{ $each->name }}</option>
                            @endforeach

                            <option value="custom">Custom</option>
                        </select>

                        @error('rsvp_communication_reminder_schedule_id')
                            <p class="text-error">{{ $message }}</p>
                        @enderror
                    </div>

                    <div class="box-input-primary sm:col-span-2">
                        <label
                            for="customMessage"
                            class="label"
                        >
                            Custom Message (Optional)
                        </label>

                        <textarea
                            id="customMessage"
                            class="input h-44 rounded-lg"
                            placeholder="Add personal message to your invitations"
                            wire:model="customMessage"
                        ></textarea>

                        @error('customMessage')
                            <p class="text-error">{{ $message }}</p>
                        @enderror
                    </div>

                    <div class="box-input-secondary col-span-full gap-4">
                        <label
                            for="smsNotification"
                            class="box-input-primary"
                        >
                            <span class="label">SMS Notifications</span>
                            <p class="text-leading">Send reminders via text message</p>
                        </label>

                        <input
                            id="smsNotification"
                            type="checkbox"
                            class="size-5"
                            wire:model.boolean="smsNotification"
                        />

                        @error('smsNotification')
                            <p class="text-error">{{ $message }}</p>
                        @enderror
                    </div>

                    <x-ui.button
                        icon="plus"
                        class="button-filled-primary col-span-full"
                        type="submit"
                    >
                        Save
                    </x-ui.button>
                </form>
            </div>
        </div>
    </div>
</div>
