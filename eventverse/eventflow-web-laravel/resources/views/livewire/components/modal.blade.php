<?php

use App\Models\RsvpFormBuilder;
use App\Models\RsvpFormBuilderFood;
use App\Models\RsvpFormBuilderFoodType;
use App\Models\RsvpFormBuilderOption;
use App\Models\RsvpFormBuilderType;
use App\Models\RsvpGroup;
use App\Models\RsvpGuestList;
use App\Models\RsvpModule;
use App\Models\VenueLocation;
use App\Models\VenueLocationTable;
use App\Models\VenueLocationTableCell;
use App\Models\VenueLocationTableObject;
use App\Models\VenueLocationTableObjectCategory;
use App\Models\VenueLocationTableObjectChildren;
use App\Models\VenueSection;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use Livewire\Attributes\Computed;
use Livewire\Attributes\Session;
use Livewire\Volt\Component;

new class extends Component {
    public $id;
    public $user = null;
    public $userName = null;
    public $userImage = null;
    public $userEmail = null;

    public $name;
    public $capacity;
    public $description;
    public $color;

    #[Session]
    public $guestPart;
    public $rsvpGroups;
    public $rsvp_group_id;
    public $email;
    public $phone;
    public $plusOnes;
    public $dietryRestrictions;
    public $notes;
    public $emails;

    public $order;
    public $placeholder;
    public bool $isRequired;
    public $type;
    public $option;
    public $options;
    public $optionsArray;

    public $rsvpModule;

    public $rsvp_module_id;
    public $price;

    public $venue_location_id;
    public $row;
    public $column;

    public $venue_location_table_id;
    public $venue_location_table_object_category_id;
    public $venueLocationTableObjectCategories;
    public $chairs;

    public $venue_location_table_object_children_id;

    #[Computed]
    public function rsvpGroupsFN()
    {
        return RsvpGroup::all();
    }

    #[Computed]
    public function venueLocationTableObjectCategoriesFN()
    {
        return VenueLocationTableObjectCategory::all();
    }

    public function mount()
    {
        $this->user = Auth::user();
        $this->userName = ucfirst($this?->user?->name ?? 'guest');
        $this->userImage = $this?->user?->avatar ?? asset('images/user-placeholder.png');
        $this->userEmail = $this?->user?->email ?? 'Viewing as guest';

        ! $this->guestPart ? ($this->guestPart = 'single') : null;
    }

    public function logout()
    {
        Auth::logout();
        request()
            ->session()
            ->invalidate();
        request()
            ->session()
            ->regenerateToken();
        $this->redirectRoute('login', navigate: true);
    }

    public function modalFN($step, $id = null, $field = null)
    {
        switch ($step) {
            case 'rsvp-group-populate':
                $this->id = $id;
                break;
            //
            case 'rsvp-group-save':
                $this->validate([
                    'name' => ['required', 'string', 'min:3', 'max:100'],
                    'capacity' => ['required', 'integer'],
                    'description' => ['required', 'string', 'min:3', 'max:1000'],
                    'color' => ['required', 'in:red,blue,green,purple,yellow,pink,indigo,orange'],
                ]);

                $rsvpG = new RsvpGroup();
                $rsvpG->rsvp_module_id = $this->id;
                $rsvpG->name = $this->name;
                $rsvpG->description = $this->description;
                $rsvpG->capacity = $this->capacity;
                $rsvpG->color = $this->color;
                $rsvpG->save();

                $this->redirectRoute('dashboard.rsvp-page', ['id' => $this->id], navigate: true);

                break;
            //
            case 'rsvp-group-edit-populate':
                $this->id = $id;

                $rsvpG = RsvpGroup::find($this->id);
                $this->name = $rsvpG->name;
                $this->capacity = $rsvpG->capacity;
                $this->description = $rsvpG->description;
                $this->color = $rsvpG->color;

                break;
            //
            case 'rsvp-group-edit-save':
                $this->validate([
                    'name' => ['required', 'string', 'min:3', 'max:100'],
                    'capacity' => ['required', 'integer'],
                    'description' => ['required', 'string', 'min:3', 'max:1000'],
                    'color' => ['required', 'in:red,blue,green,purple,yellow,pink,indigo,orange'],
                ]);

                $rsvpG = RsvpGroup::find($this->id);
                $rsvpG->name = $this->name;
                $rsvpG->description = $this->description;
                $rsvpG->capacity = $this->capacity;
                $rsvpG->color = $this->color;
                $rsvpG->save();

                $rsvp = RsvpModule::find($rsvpG->rsvp_module_id);

                $this->redirectRoute('dashboard.rsvp-page', ['id' => $rsvp->event_module_id], navigate: true);

                break;
            //
            case 'rsvp-guest-list-populate':
                $this->id = $id;
                $this->rsvpGroups = $this->rsvpGroupsFN();

                break;
            //
            case 'rsvp-guest-list-save':
                $this->validate([
                    'rsvp_group_id' => ['nullable', 'exists:rsvp_groups,id'],
                    'name' => ['nullable', 'required_if:guestPart,single', 'string', 'min:3', 'max:100'],
                    'email' => ['nullable', 'required_if:guestPart,single', 'email'],
                    'phone' => ['nullable', 'required_if:guestPart,single', 'string'],
                    'plusOnes' => ['nullable', 'integer'],
                    'dietryRestrictions' => ['nullable', 'string', 'min:3', 'max:1000'],
                    'notes' => ['nullable', 'string', 'min:3', 'max:1000'],
                    // 'emails' => ['nullable', 'required_if:guestPart,bulk', 'string'],

                    'emails' => [
                        'nullable',
                        'required_if:guestPart,bulk',
                        'string',
                        function ($attribute, $value, $fail) {
                            // Trim and split by comma
                            $emails = array_map('trim', explode(',', $value));

                            // Basic pattern check (no empty emails, no trailing commas)
                            if (empty($emails) || in_array('', $emails, true)) {
                                return $fail("The $attribute must follow the format: email1,email2,email3 (no empty or trailing commas).");
                            }

                            // Validate each email
                            foreach ($emails as $email) {
                                if (! filter_var($email, FILTER_VALIDATE_EMAIL)) {
                                    return $fail("The $attribute contains an invalid email: $email.");
                                }
                            }
                        },
                    ],
                ]);

                if ($this->emails) {
                    foreach (explode(',', $this->emails) ?? [] as $value) {
                        $rsvpGL = new RsvpGuestList();
                        $rsvpGL->rsvp_module_id = $this->id;
                        $rsvpGL->rsvp_group_id = $this->rsvp_group_id;
                        $rsvpGL->name = Str::before($value, '@');
                        $rsvpGL->email = $value;
                        $rsvpGL->save();
                    }
                } else {
                    $rsvpGL = new RsvpGuestList();
                    $rsvpGL->rsvp_module_id = $this->id;
                    $rsvpGL->rsvp_group_id = $this->rsvp_group_id;
                    $rsvpGL->name = $this->name;
                    $rsvpGL->email = $this->email;
                    $rsvpGL->phone = $this->phone;
                    $rsvpGL->notes = $this->notes;
                    $rsvpGL->dietryRestrictions = $this->dietryRestrictions;
                    $rsvpGL->plusOnes = $this->plusOnes;
                    $rsvpGL->save();
                }

                $this->redirectRoute('dashboard.rsvp-page', ['id' => $this->id], navigate: true);

                break;
            //
            case 'rsvp-guest-list-edit-populate':
                $this->id = $id;
                $this->rsvpGroups = $this->rsvpGroupsFN();

                $rsvpGL = RsvpGuestList::find($this->id);
                $this->name = $rsvpGL->name;
                $this->email = $rsvpGL->email;
                $this->phone = $rsvpGL->phone;
                $this->rsvp_group_id = $rsvpGL->rsvp_group_id;
                $this->notes = $rsvpGL->notes;
                $this->dietryRestrictions = $rsvpGL->dietryRestrictions;
                $this->plusOnes = $rsvpGL->plusOnes;

                break;
            //
            case 'rsvp-guest-list-edit-save':
                $this->validate([
                    'rsvp_group_id' => ['nullable', 'exists:rsvp_groups,id'],
                    'name' => ['required', 'string', 'min:3', 'max:100'],
                    'email' => ['required', 'email'],
                    'phone' => ['required', 'string'],
                    'plusOnes' => ['nullable', 'integer'],
                    'dietryRestrictions' => ['nullable', 'string', 'min:3', 'max:1000'],
                    'notes' => ['nullable', 'string', 'min:3', 'max:1000'],
                ]);

                $rsvpGL = RsvpGuestList::find($this->id);
                $rsvpGL->rsvp_group_id = $this->rsvp_group_id;
                $rsvpGL->name = $this->name;
                $rsvpGL->email = $this->email;
                $rsvpGL->phone = $this->phone;
                $rsvpGL->notes = $this->notes;
                $rsvpGL->dietryRestrictions = $this->dietryRestrictions;
                $rsvpGL->plusOnes = $this->plusOnes;
                $rsvpGL->save();

                $this->redirectRoute('dashboard.rsvp-page', ['id' => $rsvpGL->rsvp_module_id], navigate: true);

                break;
            //
            case 'rsvp-form-builder-edit-populate':
                $this->id = $id;

                $rsvpFB = RsvpFormBuilder::find($this->id)->load(['rsvpFormBuilderOptions']);
                $this->name = $rsvpFB->name;
                $this->placeholder = $rsvpFB->placeholder;
                $this->order = $rsvpFB->order;
                $this->isRequired = $rsvpFB->isRequired;
                $this->type = $rsvpFB->type;
                $this->options = $rsvpFB->rsvpFormBuilderOptions;

                break;
            //
            case 'rsvp-form-builder-edit-save':
                $this->validate([
                    'name' => ['required', 'string', 'min:3', 'max:100'],
                    'placeholder' => ['required', 'string', 'min:3', 'max:1000'],
                    'order' => ['required', 'integer', 'min:1'],
                    'isRequired' => ['boolean'],
                    'type' => ['required', 'in:text,textarea,select,radio,checkbox'],
                    'option' => ['nullable', 'string'],
                ]);

                $rsvpFB = RsvpFormBuilder::find($this->id);
                $rsvpFB->name = $this->name;
                $rsvpFB->placeholder = $this->placeholder;
                $rsvpFB->order = $this->order;
                $rsvpFB->isRequired = $this->isRequired;
                $rsvpFB->type = $this->type;
                $rsvpFB->save();

                $this->redirectRoute('dashboard.rsvp-page', ['id' => $rsvpFB->rsvp_module_id], navigate: true);

                break;
            //
            case 'rsvp-form-builder-option-save':
                $this->validate([
                    'option' => ['required', 'string'],
                ]);

                $rsvpFBO = new RsvpFormBuilderOption();
                $rsvpFBO->rsvp_form_builder_id = $this->id;
                $rsvpFBO->name = $this->option;
                $rsvpFBO->save();

                $rsvpFB = RsvpFormBuilder::find($this->id)->load(['rsvpFormBuilderOptions']);
                $this->options = $rsvpFB->rsvpFormBuilderOptions;

                break;
            //
            case 'rsvp-form-builder-option-update':
                if (! $field || $field == '') {
                    $this->addError('option', 'Options are required');
                    return;
                }

                $rsvpFBO = RsvpFormBuilderOption::find($id);
                $rsvpFBO->name = $field;
                $rsvpFBO->save();

                break;
            //
            case 'rsvp-form-builder-option-delete':
                RsvpFormBuilderOption::find($id)->delete();
                $rsvpFBOs = RsvpFormBuilderOption::where('rsvp_form_builder_id', $this->id)->get();
                $this->options = $rsvpFBOs ?? [];

                break;
            //
            case 'rsvp-form-builder-preview-populate':
                $this->id = $id;

                $rsvpModule = RsvpModule::find($this->id)->load([
                    'eventModule',
                    'eventModule.primaryLocation',
                    'rsvpFormBuildersOrder',
                    'rsvpFormBuildersOrder.rsvpFormBuilderOptions',
                    'rsvpFormBuilderFoodsOrder',
                ]);

                $this->rsvpModule = $rsvpModule;

                break;
            //
            case 'rsvp-form-builder-type-populate':
                $this->rsvp_module_id = $id;

                $rsvpFBT = new RsvpFormBuilderType();
                $rsvpFBT->user_id = Auth::id();
                $rsvpFBT->name = 'New Field';
                $rsvpFBT->placeholder = 'New field placeholder';
                $rsvpFBT->isRequired = true;
                $rsvpFBT->type = 'text';
                $rsvpFBT->order = 1;
                $rsvpFBT->save();

                $this->id = $rsvpFBT->id;
                $this->name = $rsvpFBT->name;
                $this->placeholder = $rsvpFBT->placeholder;
                $this->isRequired = $rsvpFBT->isRequired;
                $this->type = $rsvpFBT->type;
                $this->order = $rsvpFBT->order;

                break;
            //
            case 'rsvp-form-builder-type-save':
                $this->validate([
                    'name' => ['required', 'string', 'min:3', 'max:100'],
                    'placeholder' => ['required', 'string', 'min:3', 'max:1000'],
                    'order' => ['required', 'integer', 'min:1'],
                    'isRequired' => ['boolean'],
                    'type' => ['required', 'in:text,textarea,select,radio,checkbox'],
                ]);

                $rsvpFBT = RsvpFormBuilderType::find($this->id);
                $rsvpFBT->name = $this->name;
                $rsvpFBT->placeholder = $this->placeholder;
                $rsvpFBT->isRequired = $this->isRequired;
                $rsvpFBT->type = $this->type;
                $rsvpFBT->order = $this->order;
                $rsvpFBT->save();

                $this->redirectRoute('dashboard.rsvp-page', ['id' => $this->rsvp_module_id], navigate: true);

                break;
            //
            case 'rsvp-form-builder-type-option-save':
                $this->validate([
                    'option' => ['required', 'string'],
                ]);

                $rsvpFBO = new RsvpFormBuilderOption();
                $rsvpFBO->rsvp_form_builder_type_id = $this->id;
                $rsvpFBO->name = $this->option;
                $rsvpFBO->save();

                $rsvpFBT = RsvpFormBuilderType::find($this->id)->load(['rsvpFormBuilderOptions']);
                $this->options = $rsvpFBT->rsvpFormBuilderOptions;

                break;
            //
            case 'rsvp-form-builder-type-option-delete':
                RsvpFormBuilderOption::find($id)->delete();
                $rsvpFBOs = RsvpFormBuilderOption::where('rsvp_form_builder_type_id', $this->id)->get();
                $this->options = $rsvpFBOs ?? [];

                break;
            //
            case 'rsvp-form-builder-type-edit-populate':
                $this->id = $id;
                $this->rsvp_module_id = $field;

                $rsvpFBT = RsvpFormBuilderType::find($this->id);
                $this->name = $rsvpFBT->name;
                $this->placeholder = $rsvpFBT->placeholder;
                $this->isRequired = $rsvpFBT->isRequired;
                $this->type = $rsvpFBT->type;
                $this->order = $rsvpFBT->order;

                break;
            //
            case 'rsvp-form-builder-food-type-populate':
                $this->rsvp_module_id = $id;

                $rsvpFBFT = new RsvpFormBuilderFoodType();
                $rsvpFBFT->user_id = Auth::id();
                $rsvpFBFT->name = 'New Food';
                $rsvpFBFT->description = 'food description';
                $rsvpFBFT->price = null;
                $rsvpFBFT->type = 'appetizer';
                $rsvpFBFT->order = 1;
                $rsvpFBFT->save();

                $this->id = $rsvpFBFT->id;
                $this->name = $rsvpFBFT->name;
                $this->description = $rsvpFBFT->description;
                $this->price = $rsvpFBFT->price;
                $this->type = $rsvpFBFT->type;
                $this->order = $rsvpFBFT->order;

                break;
            //
            case 'rsvp-form-builder-food-type-save':
                $this->validate([
                    'name' => ['required', 'string', 'min:3', 'max:100'],
                    'description' => ['required', 'string', 'min:3', 'max:1000'],
                    'order' => ['required', 'integer', 'min:1'],
                    'price' => ['nullable', 'integer', 'min:1'],
                    'type' => ['required', 'in:appetizer,main,desert,beverage'],
                ]);

                $rsvpFBFT = RsvpFormBuilderFoodType::find($this->id);
                $rsvpFBFT->name = $this->name;
                $rsvpFBFT->description = $this->description;
                $rsvpFBFT->price = $this->price;
                $rsvpFBFT->type = $this->type;
                $rsvpFBFT->order = $this->order;
                $rsvpFBFT->save();

                $this->redirectRoute('dashboard.rsvp-page', ['id' => $this->rsvp_module_id], navigate: true);

                break;
            //
            case 'rsvp-form-builder-food-type-edit-populate':
                $this->id = $id;
                $this->rsvp_module_id = $field;

                $rsvpFBFT = RsvpFormBuilderFoodType::find($this->id);
                $this->name = $rsvpFBFT->name;
                $this->description = $rsvpFBFT->description;
                $this->price = $rsvpFBFT->price;
                $this->type = $rsvpFBFT->type;
                $this->order = $rsvpFBFT->order;

                break;
            //
            case 'rsvp-form-builder-food-edit-populate':
                $this->id = $id;

                // $rsvpFBF = RsvpFormBuilderFood::find($this->id)->load(['rsvpFormBuilderOptions']);
                $rsvpFBF = RsvpFormBuilderFood::find($this->id);
                $this->name = $rsvpFBF->name;
                $this->description = $rsvpFBF->description;
                $this->order = $rsvpFBF->order;
                $this->price = $rsvpFBF->price;
                $this->type = $rsvpFBF->type;
                // $this->options = $rsvpFBF->rsvpFormBuilderOptions;

                break;
            //
            case 'rsvp-form-builder-food-edit-save':
                $this->validate([
                    'name' => ['required', 'string', 'min:3', 'max:100'],
                    'description' => ['required', 'string', 'min:3', 'max:1000'],
                    'order' => ['required', 'integer', 'min:1'],
                    'price' => ['nullable', 'integer', 'min:1'],
                    'type' => ['required', 'in:appetizer,main,desert,beverage'],
                ]);

                $rsvpFBF = RsvpFormBuilderFood::find($this->id);
                $rsvpFBF->name = $this->name;
                $rsvpFBF->description = $this->description;
                $rsvpFBF->order = $this->order;
                $rsvpFBF->price = $this->price;
                $rsvpFBF->type = $this->type;
                $rsvpFBF->save();

                $this->redirectRoute('dashboard.rsvp-page', ['id' => $rsvpFBF->rsvp_module_id], navigate: true);

                break;
            //
            case 'seating-venue-location-populate':
                $this->id = $id;

                break;
            //
            case 'seating-venue-location-save':
                $this->validate([
                    'name' => ['required', 'string', 'min:3', 'max:100'],
                    'row' => ['required', 'integer', 'min:1', 'max:100'],
                    'column' => ['required', 'integer', 'min:1', 'max:100'],
                ]);

                $seatingVL = new VenueLocation();
                $seatingVL->user_id = Auth::id();
                $seatingVL->name = $this->name;
                $seatingVL->save();

                $seatingVLT = new VenueLocationTable();
                $seatingVLT->venue_location_id = $seatingVL->id;
                $seatingVLT->row = $this->row;
                $seatingVLT->column = $this->column;
                $seatingVLT->save();

                for ($SVLTR = 1; $SVLTR <= $seatingVLT->row; $SVLTR++) {
                    for ($SVLTC = 1; $SVLTC <= $seatingVLT->column; $SVLTC++) {
                        $seatingVLTC = new VenueLocationTableCell();
                        $seatingVLTC->venue_location_table_id = $seatingVLT->id;
                        $seatingVLTC->row = $SVLTR;
                        $seatingVLTC->column = $SVLTC;
                        $seatingVLTC->save();
                    }
                }

                $this->redirectRoute('dashboard.seating-page', ['id' => $this->id], navigate: true);

                break;
            //
            case 'seating-venue-section-populate':
                $this->id = $id;
                $this->venue_location_id = $field;

                break;
            //
            case 'seating-venue-section-save':
                $this->validate([
                    'name' => ['required', 'string', 'min:3', 'max:100'],
                ]);

                $seatingVS = new VenueSection();
                $seatingVS->venue_location_id = $this->venue_location_id;
                $seatingVS->name = $this->name;
                $seatingVS->save();

                $seatingVLT = VenueLocationTable::where('venue_location_id', $this->venue_location_id)->first();

                $seatingVST = new VenueLocationTable();
                $seatingVST->venue_section_id = $seatingVS->id;
                $seatingVST->row = $seatingVLT->row;
                $seatingVST->column = $seatingVLT->column;
                $seatingVST->save();

                for ($SVSTR = 1; $SVSTR <= $seatingVST->row; $SVSTR++) {
                    for ($SVSTC = 1; $SVSTC <= $seatingVST->column; $SVSTC++) {
                        $seatingVSTC = new VenueLocationTableCell();
                        $seatingVSTC->venue_location_table_id = $seatingVST->id;
                        $seatingVSTC->row = $SVSTR;
                        $seatingVSTC->column = $SVSTC;
                        $seatingVSTC->save();
                    }
                }

                $this->redirectRoute('dashboard.seating-page', ['id' => $this->id], navigate: true);

                break;
            //
            case 'seating-venue-location-table-object-populate-one':
                $this->venueLocationTableObjectCategories = $this->venueLocationTableObjectCategoriesFN();

                break;
            //
            case 'seating-venue-location-table-object-populate-two':
                $this->id = $id;
                $this->venue_location_id = $field[0];
                $this->venue_location_table_id = $field[1];
                $this->venue_location_table_object_category_id = $field[2];

                break;
            //
            case 'seating-venue-location-table-object-save':
                $seatingVLT = VenueLocationTable::find($this->venue_location_table_id)->load(['venueLocationTableCells']);
                $SVLTR = $seatingVLT->row;
                $SVLTC = $seatingVLT->column;

                $this->validate([
                    'venue_location_table_object_category_id' => ['required', 'exists:venue_location_table_object_categories,id'],
                    'name' => ['required', 'string', 'min:3', 'max:100'],
                    'row' => ['required', 'integer', 'min:1', "max:$SVLTR"],
                    'column' => ['required', 'integer', 'min:1', "max:$SVLTC"],
                    'chairs' => ['nullable', 'integer', 'min:1', 'max:8'],
                ]);

                // $contains = in_array($this->venue_location_table_object_category_id, [1, 2]);

                // if ($contains && ! $this->chairs) {
                //     $this->addError('chairs', 'Chairs are required');
                //     return;
                // }

                $SVLTC = Arr::first($seatingVLT?->venueLocationTableCells, function ($item, int $key) {
                    return $item->row == $this->row && $item->column == $this->column;
                });

                $seatingVLTO = VenueLocationTableObject::where('venue_location_table_cell_id', $SVLTC->id)->first();
                if (! $seatingVLTO) {
                    $seatingVLTO = new VenueLocationTableObject();
                    $seatingVLTO->venue_location_table_cell_id = $SVLTC->id;
                }

                $seatingVLTO->venue_location_table_object_category_id = $this->venue_location_table_object_category_id;
                $seatingVLTO->name = $this->name;
                $seatingVLTO->save();

                if ($this->chairs) {
                    VenueLocationTableObjectChildren::where('venue_location_table_object_id', $seatingVLTO->id)->delete();

                    for ($i = 1; $i <= $this->chairs; $i++) {
                        $seatingVLTOC = new VenueLocationTableObjectChildren();
                        $seatingVLTOC->venue_location_table_object_id = $seatingVLTO->id;
                        $seatingVLTOC->venue_location_table_object_category_id = 2;
                        $seatingVLTOC->name = "Chair $i";
                        $seatingVLTOC->save();
                    }
                }

                $this->redirectRoute('dashboard.seating-page', ['id' => $this->id], navigate: true);

                break;
            //
            case 'seating-venue-location-table-object-assignment':
                $this->id = $id;
                $this->venue_location_table_object_children_id = $field;

                break;

            //
            case 'seating-venue-location-table-object-assignment-save':
                $this->redirectRoute('dashboard.seating-page', ['id' => $this->id], navigate: true);

                break;

            //
            default:
                break;
            //
        }
    }
};

?>

<div
    x-data="{
        showModal: false,
        showType: '',
        updateModal(modal = false, type = '') {
            this.showModal = modal
            this.showType = type

            window.scrollTo({ top: 0 })
        },
        venue_location_table_object_category_id: $wire.entangle(
            'venue_location_table_object_category_id',
        ),
    }"
    @modal-event.window="async (value) => {
    const detail = $event.detail
    const type = detail?.type
    const id = detail?.id
    const rsvp_module_id = detail?.rsvp_module_id
    const venue_location_id = detail?.venue_location_id
    const venue_location_table_object_category_id = detail?.venue_location_table_object_category_id
    const venue_location_table_id = detail?.venue_location_table_id
    const venue_location_table_object_children_id = detail?.venue_location_table_object_children_id

    switch (type) {
        case 'sign-out':
            $wire.logout()
            break;

        case 'sidebar-show':
            updateModal(true, 'sidebar-show')
            break;

        case 'rsvp-group':
            updateModal(true, 'rsvp-group')
            $wire.modalFN('rsvp-group-populate', id)
            break;

        case 'rsvp-group-edit':
            updateModal(true, 'rsvp-group-edit')
            $wire.modalFN('rsvp-group-edit-populate', id)
            break;

        case 'rsvp-guest-list':
            updateModal(true, 'rsvp-guest-list')
            $wire.modalFN('rsvp-guest-list-populate', id)
            break;

        case 'rsvp-guest-list-edit':
            updateModal(true, 'rsvp-guest-list-edit')
            $wire.modalFN('rsvp-guest-list-edit-populate', id)
            break;

        case 'rsvp-form-builder-edit':
            updateModal(true, 'rsvp-form-builder-edit')
            $wire.modalFN('rsvp-form-builder-edit-populate', id)
            break;

        case 'rsvp-form-builder-preview':
            updateModal(true, 'rsvp-form-builder-preview')
            $wire.modalFN('rsvp-form-builder-preview-populate', id)
            break;

        case 'rsvp-form-builder-type':
            updateModal(true, 'rsvp-form-builder-type')
            $wire.modalFN('rsvp-form-builder-type-populate', id)
            break;

        case 'rsvp-form-builder-type-edit':
            updateModal(true, 'rsvp-form-builder-type')
            $wire.modalFN('rsvp-form-builder-type-edit-populate', id, rsvp_module_id)
            break;

        case 'rsvp-form-builder-food-type':
            updateModal(true, 'rsvp-form-builder-food-type')
            $wire.modalFN('rsvp-form-builder-food-type-populate', id)
            break;

        case 'rsvp-form-builder-food-type-edit':
            updateModal(true, 'rsvp-form-builder-food-type')
            $wire.modalFN('rsvp-form-builder-food-type-edit-populate', id, rsvp_module_id)
            break;

        case 'rsvp-form-builder-food-edit':
            updateModal(true, 'rsvp-form-builder-food-edit')
            $wire.modalFN('rsvp-form-builder-food-edit-populate', id)
            break;

        case 'seating-venue-location':
            updateModal(true, 'seating-venue-location')
            $wire.modalFN('seating-venue-location-populate', id)
            break;

        case 'seating-venue-section':
            updateModal(true, 'seating-venue-section')
            $wire.modalFN('seating-venue-section-populate', id, venue_location_id)
            break;

        case 'seating-venue-location-table-object':
            updateModal(true, 'seating-venue-location-table-object')
            await $wire.modalFN('seating-venue-location-table-object-populate-one')
            await $wire.modalFN('seating-venue-location-table-object-populate-two', id, [venue_location_id, venue_location_table_id, venue_location_table_object_category_id])
            break;

        case 'seating-venue-location-table-object-assignment':
            updateModal(true, 'seating-venue-location-table-object-assignment')
            await $wire.modalFN('seating-venue-location-table-object-assignment-populate', id, venue_location_table_object_children_id)
            break;

        default:
            updateModal()
            $wire.$refresh()
            break;
    }

}"
>
    <div
        class="absolute top-0 left-0 z-10 flex h-full w-full flex-col bg-black/10 backdrop-blur"
        x-show="showModal"
        x-transition
    >
        <!-- Side Bar -->
        <div
            class="flex-primary max-w-sm flex-1 bg-gray-50"
            @click.outside="$dispatch('modal-event')"
            x-show="showType === 'sidebar-show'"
            x-transition
        >
            <div class="flex items-center justify-between">
                <x-ui.link
                    :href="route('general.home')"
                    class="text-large text-primary"
                >
                    EventFlow
                </x-ui.link>

                <button @click="$dispatch('modal-event')">
                    <x-ui.icon
                        icon="cross"
                        class="text-primary size-7"
                    />
                </button>
            </div>

            <x-ui.divider />

            <div class="box-shadow items-center">
                <img
                    src="{{ $userImage }}"
                    alt="{{ $userImage }}"
                    class="h-20 w-20 rounded-full object-cover"
                />
                <div class="flex flex-col items-center">
                    <p class="font-medium">{{ $userName }}</p>
                    <p class="">{{ $userEmail }}</p>
                </div>
            </div>

            <div class="box-shadow">
                <x-ui.link
                    :href="route('general.create-event')"
                    class="box-input-secondary"
                >
                    <x-ui.icon icon="plus" />
                    <span class="font-medium">Create Event</span>
                </x-ui.link>
                <x-ui.link
                    :href="route('general.discover-event')"
                    class="box-input-secondary"
                >
                    <x-ui.icon icon="search" />
                    <span class="font-medium">Discover Event</span>
                </x-ui.link>
                <x-ui.link
                    :href="route('general.about')"
                    class="box-input-secondary"
                >
                    <x-ui.icon icon="users" />
                    <span class="font-medium">About Us</span>
                </x-ui.link>
                <x-ui.link
                    :href="route('general.contact')"
                    class="box-input-secondary"
                >
                    <x-ui.icon icon="contact" />
                    <span class="font-medium">Contact Us</span>
                </x-ui.link>
            </div>

            <div class="box-shadow">
                <x-ui.link
                    :href="route('dashboard.home')"
                    class="box-input-secondary"
                >
                    <x-ui.icon icon="dashboard" />
                    <span class="font-medium">Dashboard</span>
                </x-ui.link>
                <x-ui.link
                    :href="route('general.home')"
                    class="box-input-secondary"
                >
                    <x-ui.icon icon="setting" />
                    <span class="font-medium">Settings</span>
                </x-ui.link>
                <x-ui.link
                    :href="route('general.home')"
                    class="box-input-secondary"
                >
                    <x-ui.icon icon="sun" />
                    <span class="font-medium">Light Mode</span>
                </x-ui.link>

                <x-ui.divider />

                @auth
                    <button
                        class="box-input-secondary"
                        wire:click="logout"
                    >
                        <x-ui.icon icon="signout" />
                        <span class="font-medium">Sign Out</span>
                    </button>
                @else
                    <x-ui.link
                        :href="route('login')"
                        class="box-input-secondary"
                    >
                        <x-ui.icon icon="signin" />
                        <span class="font-medium">Sign In</span>
                    </x-ui.link>
                @endauth
            </div>
        </div>

        <div
            class="flex min-h-fit w-full items-center justify-center p-4 md:p-10 lg:p-14"
            x-show="
                [
                    'rsvp-group',
                    'rsvp-group-edit',
                    'rsvp-guest-list',
                    'rsvp-guest-list-edit',
                    'rsvp-form-builder-edit',
                    'rsvp-form-builder-preview',
                    'rsvp-form-builder-type',
                    'rsvp-form-builder-food-type',
                    'rsvp-form-builder-food-edit',
                    'seating-venue-location',
                    'seating-venue-section',
                    'seating-venue-location-table-object',
                    'seating-venue-location-table-object-assignment',
                ].includes(showType)
            "
            x-transition
        >
            <div
                class="max-w-md flex-1"
                @click.outside="$dispatch('modal-event')"
            >
                <!-- Rsvp Group -->

                <form
                    class="box-shadow flex-1"
                    x-show="showType === 'rsvp-group'"
                    wire:submit="modalFN('rsvp-group-save')"
                >
                    <p class="text-medium">Manage Guest Group</p>

                    <div class="box-input-primary">
                        <label class="font-medium">Group Name</label>
                        <input
                            type="text"
                            class="input"
                            placeholder="Enter group name"
                            wire:model="name"
                        />
                        @error('name')
                            <p class="text-error">{{ $message }}</p>
                        @enderror
                    </div>

                    <div class="box-input-primary">
                        <label class="font-medium">Member Limit</label>
                        <input
                            type="text"
                            class="input"
                            placeholder="Enter member limit"
                            wire:model="capacity"
                        />
                        @error('capacity')
                            <p class="text-error">{{ $message }}</p>
                        @enderror
                    </div>

                    <div class="box-input-primary">
                        <label
                            for="description"
                            class="font-medium"
                        >
                            Group Description
                        </label>
                        <textarea
                            class="input h-44 rounded-lg"
                            placeholder="Enter member description"
                            wire:model="description"
                        ></textarea>
                        @error('description')
                            <p class="text-error">{{ $message }}</p>
                        @enderror
                    </div>

                    <div class="box-input-primary">
                        <label
                            for="color"
                            class="font-medium"
                        >
                            Group Color
                        </label>

                        <div
                            class="grid grid-cols-4 gap-2"
                            x-data="{
                                color: $wire.entangle('color'),
                            }"
                        >
                            <label
                                class="block h-10 flex-1 rounded-lg bg-red-500"
                                :class="{
                                    'outline-4': color === 'red'
                                }"
                            >
                                <input
                                    type="radio"
                                    name="color"
                                    class="hidden"
                                    value="red"
                                    wire:model.live="color"
                                />
                            </label>
                            <label
                                class="block h-10 flex-1 rounded-lg bg-blue-500"
                                :class="{
                                    'outline-4': color === 'blue'
                                }"
                            >
                                <input
                                    type="radio"
                                    name="color"
                                    class="hidden"
                                    value="blue"
                                    wire:model.live="color"
                                />
                            </label>
                            <label
                                class="block h-10 flex-1 rounded-lg bg-green-500"
                                :class="{
                                    'outline-4': color === 'green'
                                }"
                            >
                                <input
                                    type="radio"
                                    name="color"
                                    class="hidden"
                                    value="green"
                                    wire:model.live="color"
                                />
                            </label>
                            <label
                                class="block h-10 flex-1 rounded-lg bg-purple-500"
                                :class="{
                                    'outline-4': color === 'purple'
                                }"
                            >
                                <input
                                    type="radio"
                                    name="color"
                                    class="hidden"
                                    value="purple"
                                    wire:model.live="color"
                                />
                            </label>
                            <label
                                class="block h-10 flex-1 rounded-lg bg-yellow-500"
                                :class="{
                                    'outline-4': color === 'yellow'
                                }"
                            >
                                <input
                                    type="radio"
                                    name="color"
                                    class="hidden"
                                    value="yellow"
                                    wire:model.live="color"
                                />
                            </label>
                            <label
                                class="block h-10 flex-1 rounded-lg bg-pink-500"
                                :class="{
                                    'outline-4': color === 'pink'
                                }"
                            >
                                <input
                                    type="radio"
                                    name="color"
                                    class="hidden"
                                    value="pink"
                                    wire:model.live="color"
                                />
                            </label>
                            <label
                                class="block h-10 flex-1 rounded-lg bg-indigo-500"
                                :class="{
                                    'outline-4': color === 'indigo'
                                }"
                            >
                                <input
                                    type="radio"
                                    name="color"
                                    class="hidden"
                                    value="indigo"
                                    wire:model.live="color"
                                />
                            </label>
                            <label
                                class="block h-10 flex-1 rounded-lg bg-orange-500"
                                :class="{
                                    'outline-4': color === 'orange'
                                }"
                            >
                                <input
                                    type="radio"
                                    name="color"
                                    class="hidden"
                                    value="orange"
                                    wire:model.live="color"
                                />
                            </label>
                        </div>

                        @error('color')
                            <p class="text-error">{{ $message }}</p>
                        @enderror
                    </div>

                    <div class="box-input-secondary">
                        <x-ui.button
                            icon="cross"
                            class="button-outlined-secondary"
                            @click="$dispatch('modal-event')"
                        >
                            Cancel
                        </x-ui.button>
                        <x-ui.button
                            icon="plus"
                            class="button-filled-primary"
                            type="submit"
                        >
                            Save
                        </x-ui.button>
                    </div>
                </form>

                <!-- Rsvp Group Edit -->

                <form
                    class="box-shadow flex-1"
                    x-show="showType === 'rsvp-group-edit'"
                    wire:submit="modalFN('rsvp-group-edit-save')"
                >
                    <p class="text-medium">Manage Guest Group</p>

                    <div class="box-input-primary">
                        <label class="font-medium">Group Name</label>
                        <input
                            type="text"
                            class="input"
                            placeholder="Enter group name"
                            wire:model="name"
                        />
                        @error('name')
                            <p class="text-error">{{ $message }}</p>
                        @enderror
                    </div>

                    <div class="box-input-primary">
                        <label class="font-medium">Member Limit</label>
                        <input
                            type="text"
                            class="input"
                            placeholder="Enter member limit"
                            wire:model="capacity"
                        />
                        @error('capacity')
                            <p class="text-error">{{ $message }}</p>
                        @enderror
                    </div>

                    <div class="box-input-primary">
                        <label
                            for="description"
                            class="font-medium"
                        >
                            Group Description
                        </label>
                        <textarea
                            class="input h-44 rounded-lg"
                            placeholder="Enter member description"
                            wire:model="description"
                        ></textarea>
                        @error('description')
                            <p class="text-error">{{ $message }}</p>
                        @enderror
                    </div>

                    <div class="box-input-primary">
                        <label
                            for="color"
                            class="font-medium"
                        >
                            Group Color
                        </label>

                        <div
                            class="grid grid-cols-4 gap-2"
                            x-data="{
                                color: $wire.entangle('color'),
                            }"
                        >
                            <label
                                class="block h-10 flex-1 rounded-lg bg-red-500"
                                :class="{
                                    'outline-4': color === 'red'
                                }"
                            >
                                <input
                                    type="radio"
                                    name="color"
                                    class="hidden"
                                    value="red"
                                    wire:model.live="color"
                                />
                            </label>
                            <label
                                class="block h-10 flex-1 rounded-lg bg-blue-500"
                                :class="{
                                    'outline-4': color === 'blue'
                                }"
                            >
                                <input
                                    type="radio"
                                    name="color"
                                    class="hidden"
                                    value="blue"
                                    wire:model.live="color"
                                />
                            </label>
                            <label
                                class="block h-10 flex-1 rounded-lg bg-green-500"
                                :class="{
                                    'outline-4': color === 'green'
                                }"
                            >
                                <input
                                    type="radio"
                                    name="color"
                                    class="hidden"
                                    value="green"
                                    wire:model.live="color"
                                />
                            </label>
                            <label
                                class="block h-10 flex-1 rounded-lg bg-purple-500"
                                :class="{
                                    'outline-4': color === 'purple'
                                }"
                            >
                                <input
                                    type="radio"
                                    name="color"
                                    class="hidden"
                                    value="purple"
                                    wire:model.live="color"
                                />
                            </label>
                            <label
                                class="block h-10 flex-1 rounded-lg bg-yellow-500"
                                :class="{
                                    'outline-4': color === 'yellow'
                                }"
                            >
                                <input
                                    type="radio"
                                    name="color"
                                    class="hidden"
                                    value="yellow"
                                    wire:model.live="color"
                                />
                            </label>
                            <label
                                class="block h-10 flex-1 rounded-lg bg-pink-500"
                                :class="{
                                    'outline-4': color === 'pink'
                                }"
                            >
                                <input
                                    type="radio"
                                    name="color"
                                    class="hidden"
                                    value="pink"
                                    wire:model.live="color"
                                />
                            </label>
                            <label
                                class="block h-10 flex-1 rounded-lg bg-indigo-500"
                                :class="{
                                    'outline-4': color === 'indigo'
                                }"
                            >
                                <input
                                    type="radio"
                                    name="color"
                                    class="hidden"
                                    value="indigo"
                                    wire:model.live="color"
                                />
                            </label>
                            <label
                                class="block h-10 flex-1 rounded-lg bg-orange-500"
                                :class="{
                                    'outline-4': color === 'orange'
                                }"
                            >
                                <input
                                    type="radio"
                                    name="color"
                                    class="hidden"
                                    value="orange"
                                    wire:model.live="color"
                                />
                            </label>
                        </div>

                        @error('color')
                            <p class="text-error">{{ $message }}</p>
                        @enderror
                    </div>

                    <div class="box-input-secondary">
                        <x-ui.button
                            icon="cross"
                            class="button-outlined-secondary"
                            @click="$dispatch('modal-event')"
                        >
                            Cancel
                        </x-ui.button>
                        <x-ui.button
                            icon="plus"
                            class="button-filled-primary"
                            type="submit"
                        >
                            Save
                        </x-ui.button>
                    </div>
                </form>

                <!-- Rsvp Guest List -->

                <form
                    class="box-shadow flex-1"
                    x-show="showType === 'rsvp-guest-list'"
                    x-data="{
                        guestPart: $wire.entangle('guestPart'),
                    }"
                    wire:submit="modalFN('rsvp-guest-list-save')"
                >
                    <div class="box-input-primary">
                        <p class="text-medium">Add Guest</p>
                        <p class="text-leading">Add a new guest to your event's RSVP list</p>
                    </div>

                    <div class="box-input-secondary">
                        <label :class="guestPart === 'single' ? 'button-filled-primary' : 'button-outlined-primary'">
                            Single Guest
                            <input
                                type="radio"
                                name="guestPart"
                                value="single"
                                wire:model.live="guestPart"
                                class="hidden"
                            />
                        </label>
                        <label :class="guestPart === 'bulk' ? 'button-filled-primary' : 'button-outlined-primary'">
                            Bulk Add
                            <input
                                type="radio"
                                name="guestPart"
                                value="bulk"
                                wire:model.live="guestPart"
                                class="hidden"
                            />
                        </label>
                    </div>

                    <div
                        class="flex-secondary"
                        x-transition
                        x-show="guestPart === 'single'"
                    >
                        <div class="box-input-primary">
                            <label class="label">Full Name</label>
                            <input
                                type="text"
                                class="input"
                                placeholder="Enter fullname"
                                wire:model="name"
                            />
                            @error('name')
                                <p class="text-error">{{ $message }}</p>
                            @enderror
                        </div>

                        <div class="box-input-primary">
                            <label class="label">Email</label>
                            <input
                                type="text"
                                class="input"
                                placeholder="Enter email"
                                wire:model="email"
                            />
                            @error('email')
                                <p class="text-error">{{ $message }}</p>
                            @enderror
                        </div>

                        <div class="box-input-primary">
                            <label class="label">Phone Number</label>
                            <input
                                type="text"
                                class="input"
                                placeholder="Enter phone number"
                                wire:model="phone"
                            />
                            @error('phone')
                                <p class="text-error">{{ $message }}</p>
                            @enderror
                        </div>

                        <div class="box-input-primary">
                            <label class="label">Plus Ones</label>
                            <input
                                type="text"
                                class="input"
                                placeholder="Enter plus ones"
                                wire:model="plusOnes"
                            />
                            @error('plusOnes')
                                <p class="text-error">{{ $message }}</p>
                            @enderror
                        </div>

                        <div class="box-input-primary">
                            <label class="label">Dietry Restrictions</label>
                            <input
                                type="text"
                                class="input"
                                placeholder="Vegetarian, Vegan, Gluten-free"
                                wire:model="dietryRestrictions"
                            />
                            @error('dietryRestrictions')
                                <p class="text-error">{{ $message }}</p>
                            @enderror
                        </div>

                        <div class="box-input-primary">
                            <label class="label">Notes</label>
                            <textarea
                                rows="5"
                                class="input"
                                placeholder="Enter additional notes"
                                wire:model="notes"
                            ></textarea>
                            @error('notes')
                                <p class="text-error">{{ $message }}</p>
                            @enderror
                        </div>
                    </div>

                    <div
                        class="box-input-primary"
                        x-transition
                        x-show="guestPart === 'bulk'"
                    >
                        <label class="label">Email Addresses</label>
                        <textarea
                            rows="5"
                            class="input"
                            placeholder="Enter email addresses"
                            wire:model="emails"
                        ></textarea>
                        @error('emails')
                            <p class="text-error">{{ $message }}</p>
                        @enderror
                    </div>

                    <div class="box-input-primary">
                        <label class="label">Group</label>

                        <div class="box-input-primary">
                            <div
                                class="box-input-secondary"
                                x-data="{
                                    rsvp_group_id: $wire.entangle('rsvp_group_id'),
                                }"
                            >
                                <label
                                    class="button-outlined-secondary"
                                    :class="{
                                            'outline-2': rsvp_group_id == null,
                                        }"
                                    @click="$wire.rsvp_group_id = null"
                                >
                                    <input
                                        type="radio"
                                        name="rsvp_group_id"
                                        class="hidden"
                                    />

                                    No Group
                                </label>

                                @foreach ($rsvpGroups ?? [] as $each)
                                    <label
                                        class="button-outlined-secondary"
                                        :class="{
                                            'outline-2': rsvp_group_id == {{ $each->id }},
                                        }"
                                    >
                                        <input
                                            type="radio"
                                            name="rsvp_group_id"
                                            class="hidden"
                                            value="{{ $each->id }}"
                                            wire:model.live="rsvp_group_id"
                                        />

                                        <x-ui.ball :color="$each->color" />

                                        {{ $each->name }}
                                    </label>
                                @endforeach
                            </div>
                        </div>
                        @error('rsvp_group_id')
                            <p class="text-error">{{ $message }}</p>
                        @enderror
                    </div>

                    <div class="box-input-secondary">
                        <x-ui.button
                            icon="cross"
                            class="button-outlined-secondary"
                            @click="$dispatch('modal-event')"
                        >
                            Cancel
                        </x-ui.button>
                        <x-ui.button
                            icon="plus"
                            class="button-filled-primary"
                            type="submit"
                        >
                            Save
                        </x-ui.button>
                    </div>
                </form>

                <!-- Rsvp Guest List Edit -->

                <form
                    class="box-shadow flex-1"
                    x-show="showType === 'rsvp-guest-list-edit'"
                    wire:submit="modalFN('rsvp-guest-list-edit-save')"
                >
                    <div class="box-input-primary">
                        <p class="text-medium">Update Guest</p>
                        <p class="text-leading">Update guest to your event's RSVP list</p>
                    </div>

                    <div class="box-input-primary">
                        <label class="label">Full Name</label>
                        <input
                            type="text"
                            class="input"
                            placeholder="Enter fullname"
                            wire:model="name"
                        />
                        @error('name')
                            <p class="text-error">{{ $message }}</p>
                        @enderror
                    </div>

                    <div class="box-input-primary">
                        <label class="label">Email</label>
                        <input
                            type="text"
                            class="input"
                            placeholder="Enter email"
                            wire:model="email"
                        />
                        @error('email')
                            <p class="text-error">{{ $message }}</p>
                        @enderror
                    </div>

                    <div class="box-input-primary">
                        <label class="label">Phone Number</label>
                        <input
                            type="text"
                            class="input"
                            placeholder="Enter phone number"
                            wire:model="phone"
                        />
                        @error('phone')
                            <p class="text-error">{{ $message }}</p>
                        @enderror
                    </div>

                    <div class="box-input-primary">
                        <label class="label">Plus Ones</label>
                        <input
                            type="text"
                            class="input"
                            placeholder="Enter plus ones"
                            wire:model="plusOnes"
                        />
                        @error('plusOnes')
                            <p class="text-error">{{ $message }}</p>
                        @enderror
                    </div>

                    <div class="box-input-primary">
                        <label class="label">Dietry Restrictions</label>
                        <input
                            type="text"
                            class="input"
                            placeholder="Vegetarian, Vegan, Gluten-free"
                            wire:model="dietryRestrictions"
                        />
                        @error('dietryRestrictions')
                            <p class="text-error">{{ $message }}</p>
                        @enderror
                    </div>

                    <div class="box-input-primary">
                        <label class="label">Notes</label>
                        <textarea
                            rows="5"
                            class="input"
                            placeholder="Enter additional notes"
                            wire:model="notes"
                        ></textarea>
                        @error('notes')
                            <p class="text-error">{{ $message }}</p>
                        @enderror
                    </div>

                    <div class="box-input-primary">
                        <label class="label">Group</label>

                        <div class="box-input-primary">
                            <div
                                class="box-input-secondary"
                                x-data="{
                                    rsvp_group_id: $wire.entangle('rsvp_group_id'),
                                }"
                            >
                                <label
                                    class="button-outlined-secondary"
                                    :class="{
                                            'outline-2': rsvp_group_id == null,
                                        }"
                                    @click="$wire.rsvp_group_id = null"
                                >
                                    <input
                                        type="radio"
                                        name="rsvp_group_id"
                                        class="hidden"
                                    />

                                    No Group
                                </label>

                                @foreach ($rsvpGroups ?? [] as $each)
                                    <label
                                        class="button-outlined-secondary"
                                        :class="{
                                            'outline-2': rsvp_group_id == {{ $each->id }},
                                        }"
                                    >
                                        <input
                                            type="radio"
                                            name="rsvp_group_id"
                                            class="hidden"
                                            value="{{ $each->id }}"
                                            wire:model.live="rsvp_group_id"
                                        />

                                        <x-ui.ball :color="$each->color" />

                                        {{ $each->name }}
                                    </label>
                                @endforeach
                            </div>
                        </div>
                        @error('rsvp_group_id')
                            <p class="text-error">{{ $message }}</p>
                        @enderror
                    </div>

                    <div class="box-input-secondary">
                        <x-ui.button
                            icon="cross"
                            class="button-outlined-secondary"
                            @click="$dispatch('modal-event')"
                        >
                            Cancel
                        </x-ui.button>
                        <x-ui.button
                            icon="plus"
                            class="button-filled-primary"
                            type="submit"
                        >
                            Save
                        </x-ui.button>
                    </div>
                </form>

                <!-- Rsvp Form Builder Edit -->

                <form
                    class="box-shadow flex-1"
                    x-show="showType === 'rsvp-form-builder-edit'"
                    wire:submit="modalFN('rsvp-form-builder-edit-save')"
                    x-data="{
                        type: $wire.entangle('type'),
                    }"
                >
                    <p class="text-medium">Update Form</p>

                    <div class="box-input-primary">
                        <label class="label">Full Name</label>
                        <input
                            type="text"
                            class="input"
                            placeholder="Enter custom fullname"
                            wire:model="name"
                        />
                        @error('name')
                            <p class="text-error">{{ $message }}</p>
                        @enderror
                    </div>

                    <div class="box-input-primary">
                        <label class="label">Placeholder</label>
                        <input
                            type="text"
                            class="input"
                            placeholder="Enter custom fullname"
                            wire:model="placeholder"
                        />
                        @error('placeholder')
                            <p class="text-error">{{ $message }}</p>
                        @enderror
                    </div>

                    <div class="box-input-primary">
                        <label class="label">
                            <input
                                type="checkbox"
                                wire:model="isRequired"
                            />
                            Is Required
                        </label>

                        @error('isRequired')
                            <p class="text-error">{{ $message }}</p>
                        @enderror
                    </div>

                    <div class="box-input-primary">
                        <label class="label">Order</label>
                        <input
                            type="text"
                            class="input"
                            placeholder="Enter order number"
                            wire:model="order"
                        />
                        @error('order')
                            <p class="text-error">{{ $message }}</p>
                        @enderror
                    </div>

                    <div class="box-input-primary">
                        <label class="label">Type</label>

                        <select
                            class="input"
                            wire:model="type"
                        >
                            <option value="text">Text Input</option>
                            <option value="textarea">Long Input</option>
                            <option value="select">Dropdown</option>
                            <option value="radio">Multiple Choice</option>
                            <option value="checkbox">Checkbox</option>
                        </select>
                        @error('type')
                            <p class="text-error">{{ $message }}</p>
                        @enderror
                    </div>

                    <div
                        class="box-input-primary"
                        x-show="['select', 'radio', 'checkbox'].includes(type)"
                    >
                        <label class="label">Options</label>

                        <div class="box-input-secondary">
                            <input
                                type="text"
                                class="input flex-1"
                                wire:model="option"
                            />

                            <x-ui.button
                                icon="plus"
                                class="button-filled-primary flex-0 px-2"
                                wire:click="modalFN('rsvp-form-builder-option-save')"
                            />
                        </div>

                        @foreach ($options ?? [] as $eachOption)
                            <div
                                class="box-input-secondary"
                                x-data="{
                                    eachOption: {{ $eachOption }},
                                    name: '',
                                }"
                                x-init="
                                    name = eachOption?.name
                                "
                                :key="eachOption.id"
                            >
                                <input
                                    type="text"
                                    class="input flex-1"
                                    x-model="name"
                                />

                                <x-ui.button
                                    icon="edit"
                                    class="button-filled-primary flex-0 px-2"
                                    wire:click="modalFN('rsvp-form-builder-option-update', eachOption.id, name)"
                                />
                                <x-ui.button
                                    icon="trash"
                                    class="button-outlined-secondary flex-0 px-2"
                                    wire:click="modalFN('rsvp-form-builder-option-delete', eachOption.id)"
                                />
                            </div>
                        @endforeach

                        @error('option')
                            <p class="text-error">{{ $message }}</p>
                        @enderror
                    </div>

                    <div class="box-input-secondary">
                        <x-ui.button
                            icon="cross"
                            class="button-outlined-secondary"
                            @click="$dispatch('modal-event')"
                        >
                            Cancel
                        </x-ui.button>
                        <x-ui.button
                            icon="plus"
                            class="button-filled-primary"
                            type="submit"
                        >
                            Save
                        </x-ui.button>
                    </div>
                </form>

                <!-- Rsvp Form Builder Preview -->

                <div
                    class="box-shadow flex-1"
                    x-show="showType === 'rsvp-form-builder-preview'"
                >
                    <div class="box-shadow bg-primary items-center text-center text-white shadow-none">
                        <div class="box-input-primary items-center">
                            <x-ui.icon
                                icon="event"
                                class="size-10"
                            />
                            <p class="text-medium">You're Invited</p>
                            <p class="font-medium">{{ $rsvpModule?->eventModule?->name }}</p>
                        </div>

                        <div class="box-input-primary">
                            <button class="button-outlined-primary">
                                <x-ui.icon icon="clock" />
                                {{ $rsvpModule?->eventModule?->startDate }}
                            </button>
                            <button class="button-outlined-primary">
                                <x-ui.icon icon="location" />
                                {{ $rsvpModule?->eventModule?->primaryLocation?->address }}
                            </button>
                        </div>

                        <p class="tracking-tight">"Join us for our special day filled with love, laughter, and unforgettable memories."</p>
                    </div>

                    <p class="text-medium">Rsvp Form Preview</p>

                    @foreach ($rsvpModule?->rsvpFormBuildersOrder ?? [] as $each)
                        <div class="box-input-primary">
                            <label class="label">{{ $each->name }}</label>

                            @switch($each->type)
                                @case('text')
                                    <input
                                        type="text"
                                        class="input"
                                        placeholder="{{ $each->placeholder }}"
                                    />

                                    @break
                                @case('textarea')
                                    <textarea
                                        class="input"
                                        placeholder="{{ $each->placeholder }}"
                                        rows="5"
                                    ></textarea>

                                    @break
                                @case('select')
                                    <select class="input">
                                        @foreach ($each?->rsvpFormBuilderOptions ?? [] as $eachOption)
                                            <option value="{{ $eachOption->id }}">{{ $eachOption->name }}</option>
                                        @endforeach
                                    </select>

                                    @break
                                @case('radio')
                                @case('checkbox')
                                    @foreach ($each?->rsvpFormBuilderOptions as $eachOption)
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
                    @endforeach

                    <p class="text-medium">Food</p>

                    @foreach ($rsvpModule?->rsvpFormBuilderFoodsOrder ?? [] as $each)
                        <div class="box-shadow">
                            <div class="box-input-secondary">
                                <x-ui.icon icon="document" />
                                <p class="font-medium">
                                    {{ $each?->name }}
                                </p>
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

                <!-- Rsvp Form Builder Type -->

                <form
                    class="box-shadow flex-1"
                    x-show="showType === 'rsvp-form-builder-type'"
                    wire:submit="modalFN('rsvp-form-builder-type-save')"
                    x-data="{
                        type: $wire.entangle('type'),
                    }"
                >
                    <p class="text-medium">Custom Field Type</p>

                    <div class="box-input-primary">
                        <label class="label">Full Name</label>
                        <input
                            type="text"
                            class="input"
                            placeholder="Enter custom fullname"
                            wire:model="name"
                        />
                        @error('name')
                            <p class="text-error">{{ $message }}</p>
                        @enderror
                    </div>

                    <div class="box-input-primary">
                        <label class="label">Placeholder</label>
                        <input
                            type="text"
                            class="input"
                            placeholder="Enter custom fullname"
                            wire:model="placeholder"
                        />
                        @error('placeholder')
                            <p class="text-error">{{ $message }}</p>
                        @enderror
                    </div>

                    <div class="box-input-primary">
                        <label class="label">
                            <input
                                type="checkbox"
                                wire:model.boolean="isRequired"
                            />
                            Is Required
                        </label>

                        @error('isRequired')
                            <p class="text-error">{{ $message }}</p>
                        @enderror
                    </div>

                    <div class="box-input-primary">
                        <label class="label">Order</label>
                        <input
                            type="text"
                            class="input"
                            placeholder="Enter order number"
                            wire:model="order"
                        />
                        @error('order')
                            <p class="text-error">{{ $message }}</p>
                        @enderror
                    </div>

                    <div class="box-input-primary">
                        <label class="label">Type</label>

                        <select
                            class="input"
                            wire:model="type"
                        >
                            <option value="text">Text Input</option>
                            <option value="textarea">Long Input</option>
                            <option value="select">Dropdown</option>
                            <option value="radio">Multiple Choice</option>
                            <option value="checkbox">Checkbox</option>
                        </select>
                        @error('type')
                            <p class="text-error">{{ $message }}</p>
                        @enderror
                    </div>

                    <div
                        class="box-input-primary"
                        x-show="['select', 'radio', 'checkbox'].includes(type)"
                    >
                        <label class="label">Options</label>

                        <div class="box-input-secondary">
                            <input
                                type="text"
                                class="input flex-1"
                                wire:model="option"
                            />

                            <x-ui.button
                                icon="plus"
                                class="button-filled-primary flex-0 px-2"
                                wire:click="modalFN('rsvp-form-builder-type-option-save')"
                            />
                        </div>

                        @foreach ($options ?? [] as $eachOption)
                            <div
                                class="box-input-secondary"
                                x-data="{
                                    eachOption: {{ $eachOption }},
                                    name: '',
                                }"
                                x-init="
                                    name = eachOption?.name
                                "
                                :key="eachOption.id"
                            >
                                <input
                                    type="text"
                                    class="input flex-1"
                                    x-model="name"
                                />

                                <x-ui.button
                                    icon="edit"
                                    class="button-filled-primary flex-0 px-2"
                                    wire:click="modalFN('rsvp-form-builder-option-update', eachOption.id, name)"
                                />
                                <x-ui.button
                                    icon="trash"
                                    class="button-outlined-secondary flex-0 px-2"
                                    wire:click="modalFN('rsvp-form-builder-type-option-delete', eachOption.id)"
                                />
                            </div>
                        @endforeach

                        @error('option')
                            <p class="text-error">{{ $message }}</p>
                        @enderror
                    </div>

                    <div class="box-input-secondary">
                        <x-ui.button
                            icon="cross"
                            class="button-outlined-secondary"
                            @click="$dispatch('modal-event')"
                        >
                            Cancel
                        </x-ui.button>
                        <x-ui.button
                            icon="plus"
                            class="button-filled-primary"
                            type="submit"
                        >
                            Save
                        </x-ui.button>
                    </div>
                </form>

                <!-- Rsvp Form Builder Food Type -->

                <form
                    class="box-shadow flex-1"
                    x-show="showType === 'rsvp-form-builder-food-type'"
                    wire:submit="modalFN('rsvp-form-builder-food-type-save')"
                    x-data="{
                        type: $wire.entangle('type'),
                    }"
                >
                    <p class="text-medium">Custom Field Type</p>

                    <div class="box-input-primary">
                        <label class="label">Full Name</label>
                        <input
                            type="text"
                            class="input"
                            placeholder="Enter custom fullname"
                            wire:model="name"
                        />
                        @error('name')
                            <p class="text-error">{{ $message }}</p>
                        @enderror
                    </div>

                    <div class="box-input-primary">
                        <label class="label">Description</label>
                        <input
                            type="text"
                            class="input"
                            placeholder="Enter descripton"
                            wire:model="description"
                        />
                        @error('description')
                            <p class="text-error">{{ $message }}</p>
                        @enderror
                    </div>

                    <div class="box-input-primary">
                        <label class="label">Price</label>
                        <input
                            type="text"
                            class="input"
                            placeholder="Enter food price"
                            wire:model="price"
                        />
                        @error('price')
                            <p class="text-error">{{ $message }}</p>
                        @enderror
                    </div>

                    <div class="box-input-primary">
                        <label class="label">Order</label>
                        <input
                            type="text"
                            class="input"
                            placeholder="Enter order number"
                            wire:model="order"
                        />
                        @error('order')
                            <p class="text-error">{{ $message }}</p>
                        @enderror
                    </div>

                    <div class="box-input-primary">
                        <label class="label">Type</label>

                        <select
                            class="input"
                            wire:model="type"
                        >
                            <option value="appetizer">Appetizer</option>
                            <option value="main">Main</option>
                            <option value="desert">Desert</option>
                            <option value="beverage">Beverage</option>
                        </select>
                        @error('type')
                            <p class="text-error">{{ $message }}</p>
                        @enderror
                    </div>

                    <div
                        class="box-input-primary"
                        x-show="['select', 'radio', 'checkbox'].includes(type)"
                    >
                        <label class="label">Options</label>

                        <div class="box-input-secondary">
                            <input
                                type="text"
                                class="input flex-1"
                                wire:model="option"
                            />

                            <x-ui.button
                                icon="plus"
                                class="button-filled-primary flex-0 px-2"
                                wire:click="modalFN('rsvp-form-builder-type-option-save')"
                            />
                        </div>

                        @foreach ($options ?? [] as $eachOption)
                            <div
                                class="box-input-secondary"
                                x-data="{
                                    eachOption: {{ $eachOption }},
                                    name: '',
                                }"
                                x-init="
                                    name = eachOption?.name
                                "
                                :key="eachOption.id"
                            >
                                <input
                                    type="text"
                                    class="input flex-1"
                                    x-model="name"
                                />

                                <x-ui.button
                                    icon="edit"
                                    class="button-filled-primary flex-0 px-2"
                                    wire:click="modalFN('rsvp-form-builder-option-update', eachOption.id, name)"
                                />
                                <x-ui.button
                                    icon="trash"
                                    class="button-outlined-secondary flex-0 px-2"
                                    wire:click="modalFN('rsvp-form-builder-type-option-delete', eachOption.id)"
                                />
                            </div>
                        @endforeach

                        @error('option')
                            <p class="text-error">{{ $message }}</p>
                        @enderror
                    </div>

                    <div class="box-input-secondary">
                        <x-ui.button
                            icon="cross"
                            class="button-outlined-secondary"
                            @click="$dispatch('modal-event')"
                        >
                            Cancel
                        </x-ui.button>
                        <x-ui.button
                            icon="plus"
                            class="button-filled-primary"
                            type="submit"
                        >
                            Save
                        </x-ui.button>
                    </div>
                </form>

                <!-- Rsvp Form Builder Food Edit -->

                <form
                    class="box-shadow flex-1"
                    x-show="showType === 'rsvp-form-builder-food-edit'"
                    wire:submit="modalFN('rsvp-form-builder-food-edit-save')"
                    x-data="{
                        type: $wire.entangle('type'),
                    }"
                >
                    <p class="text-medium">Update Field Type</p>

                    <div class="box-input-primary">
                        <label class="label">Full Name</label>
                        <input
                            type="text"
                            class="input"
                            placeholder="Enter custom fullname"
                            wire:model="name"
                        />
                        @error('name')
                            <p class="text-error">{{ $message }}</p>
                        @enderror
                    </div>

                    <div class="box-input-primary">
                        <label class="label">Description</label>
                        <input
                            type="text"
                            class="input"
                            placeholder="Enter descripton"
                            wire:model="description"
                        />
                        @error('description')
                            <p class="text-error">{{ $message }}</p>
                        @enderror
                    </div>

                    <div class="box-input-primary">
                        <label class="label">Price</label>
                        <input
                            type="text"
                            class="input"
                            placeholder="Enter food price"
                            wire:model="price"
                        />
                        @error('price')
                            <p class="text-error">{{ $message }}</p>
                        @enderror
                    </div>

                    <div class="box-input-primary">
                        <label class="label">Order</label>
                        <input
                            type="text"
                            class="input"
                            placeholder="Enter order number"
                            wire:model="order"
                        />
                        @error('order')
                            <p class="text-error">{{ $message }}</p>
                        @enderror
                    </div>

                    <div class="box-input-primary">
                        <label class="label">Type</label>

                        <select
                            class="input"
                            wire:model="type"
                        >
                            <option value="appetizer">Appetizer</option>
                            <option value="main">Main</option>
                            <option value="desert">Desert</option>
                            <option value="beverage">Beverage</option>
                        </select>
                        @error('type')
                            <p class="text-error">{{ $message }}</p>
                        @enderror
                    </div>

                    <div class="box-input-secondary">
                        <x-ui.button
                            icon="cross"
                            class="button-outlined-secondary"
                            @click="$dispatch('modal-event')"
                        >
                            Cancel
                        </x-ui.button>
                        <x-ui.button
                            icon="plus"
                            class="button-filled-primary"
                            type="submit"
                        >
                            Save
                        </x-ui.button>
                    </div>
                </form>

                <!-- Seating Venue Location -->

                <form
                    class="box-shadow flex-1"
                    x-show="showType === 'seating-venue-location'"
                    wire:submit="modalFN('seating-venue-location-save')"
                >
                    <p class="text-medium">Venue Location</p>

                    <div class="box-input-primary">
                        <label class="label">Location</label>
                        <input
                            type="text"
                            class="input"
                            placeholder="Enter your location"
                            wire:model="name"
                        />
                        @error('name')
                            <p class="text-error">{{ $message }}</p>
                        @enderror
                    </div>

                    <div class="box-input-primary">
                        <label class="label">Rows</label>
                        <input
                            type="text"
                            class="input"
                            placeholder="Enter row number"
                            wire:model="row"
                        />
                        @error('row')
                            <p class="text-error">{{ $message }}</p>
                        @enderror
                    </div>

                    <div class="box-input-primary">
                        <label class="label">Columns</label>
                        <input
                            type="text"
                            class="input"
                            placeholder="Enter column number"
                            wire:model="column"
                        />
                        @error('column')
                            <p class="text-error">{{ $message }}</p>
                        @enderror
                    </div>

                    <div class="box-input-secondary">
                        <button
                            class="button-outlined-secondary"
                            @click="$dispatch('modal-event')"
                            type="button"
                        >
                            <x-ui.icon icon="cross" />
                            Cancel
                        </button>
                        <x-ui.button
                            icon="plus"
                            class="button-filled-primary"
                            type="submit"
                        >
                            Save
                        </x-ui.button>
                    </div>
                </form>

                <!-- Seating Venue Section -->

                <form
                    class="box-shadow flex-1"
                    x-show="showType === 'seating-venue-section'"
                    wire:submit="modalFN('seating-venue-section-save')"
                >
                    <p class="text-medium">Venue Section</p>

                    <div class="box-input-primary">
                        <label class="label">Section</label>
                        <input
                            type="text"
                            class="input"
                            placeholder="Enter your section"
                            wire:model="name"
                        />
                        @error('name')
                            <p class="text-error">{{ $message }}</p>
                        @enderror
                    </div>

                    <div class="box-input-secondary">
                        <button
                            class="button-outlined-secondary"
                            @click="$dispatch('modal-event')"
                            type="button"
                        >
                            <x-ui.icon icon="cross" />
                            Cancel
                        </button>
                        <x-ui.button
                            icon="plus"
                            class="button-filled-primary"
                            type="submit"
                        >
                            Save
                        </x-ui.button>
                    </div>
                </form>

                <!-- Seating Venue Location Table Object  -->

                <form
                    class="box-shadow flex-1"
                    x-show="showType === 'seating-venue-location-table-object'"
                    wire:submit="modalFN('seating-venue-location-table-object-save')"
                >
                    <p class="text-medium">Seating Arrangement</p>

                    <div class="box-input-primary">
                        <label class="label">Object</label>

                        <select
                            class="input"
                            wire:model.live="venue_location_table_object_category_id"
                        >
                            <option value="0">Select</option>
                            @foreach ($venueLocationTableObjectCategories ?? [] as $each)
                                <option value="{{ $each->id }}">{{ ucfirst($each->name) }}</option>
                            @endforeach
                        </select>
                        @error('venue_location_table_object_category_id')
                            <p class="text-error">{{ $message }}</p>
                        @enderror
                    </div>

                    <div class="box-input-primary">
                        <label class="label">Name</label>
                        <input
                            type="text"
                            class="input"
                            placeholder="Enter table name"
                            wire:model="name"
                        />
                        @error('name')
                            <p class="text-error">{{ $message }}</p>
                        @enderror
                    </div>

                    <div class="box-input-primary">
                        <label class="label">Row</label>
                        <input
                            type="text"
                            class="input"
                            placeholder="Enter row number"
                            wire:model="row"
                        />
                        @error('row')
                            <p class="text-error">{{ $message }}</p>
                        @enderror
                    </div>

                    <div class="box-input-primary">
                        <label class="label">Column</label>
                        <input
                            type="text"
                            class="input"
                            placeholder="Enter column number"
                            wire:model="column"
                        />
                        @error('column')
                            <p class="text-error">{{ $message }}</p>
                        @enderror
                    </div>

                    <div
                        class="box-input-primary"
                        x-show="[1, 2].includes(Number(venue_location_table_object_category_id))"
                        x-transition
                    >
                        <label class="label">Chairs</label>

                        <input
                            type="text"
                            class="input"
                            placeholder="Enter chair number"
                            wire:model="chairs"
                        />

                        @error('chairs')
                            <p class="text-error">{{ $message }}</p>
                        @enderror
                    </div>

                    <div class="box-input-secondary">
                        <button
                            class="button-outlined-secondary"
                            @click="$dispatch('modal-event')"
                            type="button"
                        >
                            <x-ui.icon icon="cross" />
                            Cancel
                        </button>
                        <x-ui.button
                            icon="plus"
                            class="button-filled-primary"
                            type="submit"
                        >
                            Save
                        </x-ui.button>
                    </div>
                </form>

                <!-- Seating Venue Location Table Object Asignment  -->

                <form
                    class="box-shadow flex-1"
                    x-show="showType === 'seating-venue-location-table-object-assignment'"
                    wire:submit="modalFN('seating-venue-location-table-object-assignment-save')"
                >
                    <p class="text-medium">Guest Assignment</p>

                    <div class="box-input-primary">
                        <label class="label">Guests</label>

                        <div class="button-outlined-primary p-1 pl-2">
                            <x-ui.icon icon="search" />
                            <input
                                type="text"
                                class="flex-1 py-1 outline-none"
                            />
                        </div>

                        @error('venue_location_table_object_category_id')
                            <p class="text-error">{{ $message }}</p>
                        @enderror
                    </div>

                    <div class="box-input-secondary">
                        <button
                            class="button-outlined-secondary"
                            @click="$dispatch('modal-event')"
                            type="button"
                        >
                            <x-ui.icon icon="cross" />
                            Cancel
                        </button>
                        <x-ui.button
                            icon="plus"
                            class="button-filled-primary"
                            type="submit"
                        >
                            Save
                        </x-ui.button>
                    </div>
                </form>

                <!--  -->
            </div>
        </div>

        <!--  -->
    </div>
</div>
