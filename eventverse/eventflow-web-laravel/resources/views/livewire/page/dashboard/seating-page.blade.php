<?php

use App\Models\SeatingModule;
use App\Models\VenueLocation;
use App\Models\VenueLocationTable;
use App\Models\VenueSection;
use App\Traits\UtilTrait;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Auth;
use Illuminate\View\View;
use Livewire\Attributes\Computed;
use Livewire\Attributes\Layout;
use Livewire\Attributes\Session;
use Livewire\Attributes\Title;
use Livewire\Volt\Component;

new #[Title('Seating Page')] #[Layout('livewire.layout.dashboard')] class extends Component {
    use UtilTrait;

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

    #[Session]
    public $venue_location_id;
    #[Session]
    public $venue_section_id;

    public $venue_location_table_id;

    public $seatingModule;
    #[Computed]
    public function seatingModuleFN()
    {
        return SeatingModule::where('event_module_id', $this->id)->first();
    }

    public $venueLocations;
    #[Computed]
    public function venueLocationsFN()
    {
        return VenueLocation::where('user_id', Auth::id())->get();
    }

    public $venueLocation;
    #[Computed]
    public function venueLocationFN()
    {
        return VenueLocation::find($this->venue_location_id)?->load([
            'venueLocationTable',
            'venueLocationTable.venueLocationTableCells',
            'venueLocationTable.venueLocationTableCells.venueLocationTableObject',
            'venueLocationTable.venueLocationTableCells.venueLocationTableObject.venueLocationTableObjectCategory',
            'venueLocationTable.venueLocationTableCells.venueLocationTableObject.venueLocationTableObjectChildren',
            'venueLocationTable.venueLocationTableCells.venueLocationTableObject.venueLocationTableObjectChildren.venueLocationTableObjectCategory',
        ]);
    }

    public $venueSection;
    #[Computed]
    public function venueSectionFN()
    {
        return VenueSection::find($this->venue_section_id)?->load([
            'venueLocationTable',
            'venueLocationTable.venueLocationTableCells',
            'venueLocationTable.venueLocationTableCells.venueLocationTableObject',
            'venueLocationTable.venueLocationTableCells.venueLocationTableObject.venueLocationTableObjectCategory',
            'venueLocationTable.venueLocationTableCells.venueLocationTableObject.venueLocationTableObjectChildren',
            'venueLocationTable.venueLocationTableCells.venueLocationTableObject.venueLocationTableObjectChildren.venueLocationTableObjectCategory',
        ]);
    }

    public $venueSections;
    #[Computed]
    public function venueSectionsFN()
    {
        return VenueSection::where('venue_location_id', $this->venue_location_id)->get();
    }

    public function venueLocationIdUpdated()
    {
        $this->venue_section_id = '';
        $this->venueSections = $this->venueSectionsFN();
        $this->venueLocation = $this->venueLocationFN();
        $this->seatingTables = $this->seatingTablesFN();
    }

    public function venueSectionIdUpdated()
    {
        $this->venueSection = $this->venueSectionFN();
        $this->seatingTables = $this->seatingTablesFN();
    }

    public $seatingTables;

    public function seatingTablesFN()
    {
        // if ($this->venue_section_id === '') {
        //     dump('here');
        // }

        $VLT = null;
        $VLTC = null;
        if ($this->venue_section_id != '') {
            $VLT = $this->venueSection?->venueLocationTable;
            $VLTC = $this->venueSection?->venueLocationTable?->venueLocationTableCells;
        } elseif ($this->venue_location_id != '') {
            $VLT = $this->venueLocation?->venueLocationTable;
            $VLTC = $this->venueLocation?->venueLocationTable?->venueLocationTableCells;
        }

        $this->venue_location_table_id = $VLT?->id;

        $VLTCG = $VLTC?->groupBy('row');
        return $VLTCG?->toArray();

        /*
            $row = $VLT?->row;
            $column = $VLT?->column;
            $a = [];
            for ($i = 1; $i <= $row; $i++) {
                for ($j = 1; $j <= $column; $j++) {
                    $a[] = [
                        'row' => $i,
                        'column' => $j,
                        'vltc' => $VLTCG[$i][$j - 1],
                        'vltco' => $VLTCG[$i][$j - 1],
                    ];
                }
            }
            $a = collect($a)->groupBy('row');
            return $a;
        */
    }

    public function mount()
    {
        $this->seatingModule = $this->seatingModuleFN();
        $this->venueLocations = $this->venueLocationsFN();
        $this->venueLocation = $this->venueLocationFN();
        $this->venueSections = $this->venueSectionsFN();
        $this->venueSection = $this->venueSectionFN();
        $this->seatingTables = $this->seatingTablesFN();
    }
};

?>

<div
    class="flex-secondary"
    x-data="{
        id: $wire.entangle('id'),
        venue_location_id: $wire.entangle('venue_location_id'),
        venue_section_id: $wire.entangle('venue_section_id'),
        venue_location_table_id: $wire.entangle('venue_location_table_id'),
    }"
    x-init="
        $watch('venue_location_id', (value) => {
            $wire.venueLocationIdUpdated()
        })
        $watch('venue_section_id', (value) => {
            $wire.venueSectionIdUpdated()
            if(value == '') {
                $wire.venueLocationIdUpdated()

            }
        })
    "
>
    <div class="box-input-primary flex-1">
        <p class="text-large">Enhanced Seating Arrangements</p>
        <p class="text-leading">Multi-venue, multi-section seating planning</p>
    </div>

    <div class="box-input-secondary">
        <div
            class="box-input-primary relative"
            x-data="{
                show: false,
                toggle() {
                    this.show = ! this.show
                },
            }"
            @click.outside="show = false"
        >
            <button
                class="button-outlined-primary"
                @click="toggle()"
            >
                <x-ui.icon icon="location" />

                @if ($venue_location_id)
                    @foreach ($venueLocations ?? [] as $each)
                        @if ($each->id == $venue_location_id)
                            {{ $each->name }}
                        @endif
                    @endforeach
                @else
                    Select Location
                @endif

                <x-ui.icon
                    icon="chevron"
                    class="transition"
                    x-bind:class="{'rotate-90': show}"
                />
            </button>

            <div
                class="box-shadow-two absolute top-11 left-0 w-full min-w-64 gap-2 px-1 py-2"
                x-show="show"
                x-transition
            >
                <label
                    class="@if($venue_location_id === '') button-outlined-primary @else button-outlined-secondary @endif justify-start border-none"
                >
                    <x-ui.icon icon="location" />
                    Select
                    <input
                        type="radio"
                        class="hidden"
                        name="venueLocations"
                        value=""
                        wire:model.live="venue_location_id"
                    />
                </label>
                @foreach ($venueLocations ?? [] as $each)
                    <label
                        class="@if($each->id == $venue_location_id) button-outlined-primary @else button-outlined-secondary @endif justify-start border-none"
                    >
                        <x-ui.icon icon="location" />
                        {{ $each->name }}
                        <input
                            type="radio"
                            class="hidden"
                            name="venueLocations"
                            value="{{ $each->id }}"
                            wire:model.live="venue_location_id"
                        />
                    </label>
                @endforeach

                <x-ui.divider />

                <button
                    class="button-outlined-secondary justify-start border-none"
                    @click="$dispatch('modal-event', {type: 'seating-venue-location', id })"
                >
                    <x-ui.icon icon="plus" />
                    Add Location
                </button>
            </div>
        </div>

        <div
            class="box-input-primary relative"
            x-data="{
                show: false,
                toggle() {
                    if (venue_location_id) {
                        this.show = ! this.show
                    }
                },
            }"
            @click.outside="show = false"
        >
            <button
                :class="{
                    'button-outlined-primary': venue_location_id,
                    'button-outlined-secondary': !venue_location_id,
                }"
                @click="toggle()"
            >
                <x-ui.icon icon="building" />

                @if ($venue_section_id)
                    @foreach ($venueSections ?? [] as $each)
                        @if ($each->id == $venue_section_id)
                            {{ $each->name }}
                        @endif
                    @endforeach
                @else
                    Select Section
                @endif

                <x-ui.icon
                    icon="chevron"
                    class="transition"
                    x-bind:class="{'rotate-90': show}"
                />
            </button>

            <div
                class="box-shadow-two absolute top-11 left-0 w-full min-w-64 gap-2 px-1 py-2"
                x-show="show"
                x-transition
            >
                <label
                    class="@if($venue_section_id === '') button-outlined-primary @else button-outlined-secondary @endif justify-start border-none"
                >
                    <x-ui.icon icon="building" />
                    Select
                    <input
                        type="radio"
                        class="hidden"
                        name="venueSections"
                        value=""
                        wire:model.live="venue_section_id"
                    />
                </label>

                @foreach ($venueSections ?? [] as $each)
                    <label
                        class="@if($each->id == $venue_section_id) button-outlined-primary @else button-outlined-secondary @endif justify-start border-none"
                    >
                        <x-ui.icon icon="building" />
                        {{ $each->name }}
                        <input
                            type="radio"
                            class="hidden"
                            name="venueSections"
                            value="{{ $each->id }}"
                            wire:model.live="venue_section_id"
                        />
                    </label>
                @endforeach

                <x-ui.divider />

                <button
                    class="button-outlined-secondary justify-start border-none"
                    @click="$dispatch('modal-event', {type: 'seating-venue-section', id, venue_location_id })"
                >
                    <x-ui.icon icon="plus" />
                    Add Section
                </button>
            </div>
        </div>
    </div>

    <div class="box-input-primary">
        <p class="text-medium">Seating Representation</p>

        <div
            class="box-input-secondary w-fit text-sm"
            x-show="venue_location_id"
            x-transition
        >
            <button
                icon="plus"
                class="button-filled-primary"
                @click="$dispatch('modal-event', {type: 'seating-venue-location-table-object', id, venue_location_id, venue_location_table_id, venue_location_table_object_category_id: 1 })"
            >
                <x-ui.icon icon="table-two" />
                Add Table
            </button>
            <button
                icon="plus"
                class="button-outlined-primary"
                @click="$dispatch('modal-event', {type: 'seating-venue-location-table-object', id, venue_location_id, venue_location_table_id, venue_location_table_object_category_id: 2 })"
            >
                <x-ui.icon icon="chair" />
                Add Chair
            </button>
            <button
                icon="plus"
                class="button-outlined-primary"
                @click="$dispatch('modal-event', {type: 'seating-venue-location-table-object', id, venue_location_id, venue_location_table_id })"
            >
                <x-ui.icon icon="setting" />
                Add Object
            </button>
        </div>
    </div>

    <div class="border-primary flex max-h-[720px] min-h-96 flex-col overflow-auto rounded p-4">
        <div class="box-input-primary min-w-max">
            @foreach ($seatingTables ?? [] as $eachRow)
                <div class="box-input-secondary">
                    @foreach ($eachRow as $each)
                        <div
                            class="border-secondary flex min-h-40 min-w-40 flex-1 flex-col items-center justify-center gap-1 border-dashed hover:bg-gray-100"
                        >
                            @if (isset($each['venue_location_table_object']) && isset($each['venue_location_table_object']['venue_location_table_object_category']))
                                {{ $each['venue_location_table_object']['name'] }}

                                @switch($each['venue_location_table_object']['venue_location_table_object_category']['name'])
                                    @case('table')
                                        <x-ui.icon icon="table-two" />

                                        @break
                                    @case('chair')
                                        <x-ui.icon icon="chair" />

                                        @break
                                    @case('podium')
                                        <x-ui.icon icon="podium" />

                                        @break
                                    @case('stage')
                                        <x-ui.icon icon="stage" />

                                        @break
                                    @case('exit')
                                        <x-ui.icon icon="exit" />

                                        @break
                                    @default
                                        <x-ui.icon icon="setting" />

                                        @break
                                @endswitch

                                <div class="grid grid-cols-4 gap-1">
                                    @foreach ($each['venue_location_table_object']['venue_location_table_object_children'] ?? [] as $EVLTOC)
                                        <button
                                            class="button-outlined-secondary p-1"
                                            @click="$dispatch('modal-event', {type: 'seating-venue-location-table-object-assignment', id, venue_location_table_object_children_id: {{ $EVLTOC['id'] }} })"
                                        >
                                            @switch($EVLTOC['venue_location_table_object_category']['name'])
                                                @case('table')
                                                    <x-ui.icon icon="table-two" />

                                                    @break
                                                @case('chair')
                                                    <x-ui.icon icon="chair" />

                                                    @break
                                                @case('podium')
                                                    <x-ui.icon icon="podium" />

                                                    @break
                                                @case('stage')
                                                    <x-ui.icon icon="stage" />

                                                    @break
                                                @case('exit')
                                                    <x-ui.icon icon="exit" />

                                                    @break
                                                @default
                                                    <x-ui.icon icon="setting" />

                                                    @break
                                            @endswitch
                                        </button>
                                    @endforeach
                                </div>
                            @else
                                <p class="">{{ $each['row'] }} X {{ $each['column'] }}</p>
                            @endif
                        </div>
                    @endforeach
                </div>
            @endforeach
        </div>
    </div>
</div>
