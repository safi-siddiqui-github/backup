<?php

namespace Database\Seeders;

use App\Models\EventCategory;
use App\Models\EventLocation;
use App\Models\EventLocationType;
use App\Models\EventModule;
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
use App\Models\SeatingModule;
use App\Models\StandardTimezone;
use App\Models\User;
use App\Models\VenueLocation;
use App\Models\VenueLocationTable;
use App\Models\VenueLocationTableCell;
use App\Models\VenueLocationTableObject;
use App\Models\VenueLocationTableObjectCategory;
use App\Models\VenueLocationTableObjectChildren;
use App\Models\VenueSection;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $users = [
            [
                'name' => 'safisiddiqui.work',
                'email' => 'safisiddiqui.work@gmail.com',
                'password' => 'safi',
                'phone' => '0000',
            ],
            [
                'name' => 'judeedwards55',
                'email' => 'judeedwards55@gmail.com',
                'password' => 'jude',
                'phone' => '0000',
            ],
        ];

        foreach ($users as $each) {
            $user = new User();
            $user->email = $each['email'];
            $user->name = $each['name'];
            $user->password = $each['password'];
            $user->phone = $each['phone'];
            $user->save();
        }

        $categories = [
            [
                'name' => 'Personal & Family',
                'sub' => ['Wedding', 'Birthday Party', 'Baby Shower', 'Anniversary', 'Graduation Party', 'Holiday Party'],
            ],
            [
                'name' => 'Business & Corporate',
                'sub' => ['Corporate Event', 'Conference', 'Workshop', 'Networking Event', 'Product Launch', 'Webinar'],
            ],
            [
                'name' => 'Cultural & Arts',
                'sub' => ['Cultural Arts', 'Art Exhibition', 'Concert', 'Theatre Performance'],
            ],
            [
                'name' => 'Education & Training',
                'sub' => ['Seminar', 'Training Sessions'],
            ],
            [
                'name' => 'Entertainment & Recreation',
                'sub' => ['Festival', 'Sports Event', 'Gaming Event'],
            ],
            [
                'name' => 'Community & Social',
                'sub' => ['Charity Gala', 'Community Meeting', 'Reunion'],
            ],
        ];

        foreach ($categories as $each) {
            $category = new EventCategory();
            $category->name = $each['name'];
            $category->minPerson = 25;
            $category->maxPerson = 500;
            $category->minPrice = 5000;
            $category->maxPrice = 25000;
            $category->save();

            foreach ($each['sub'] as $eachSub) {
                $subCategory = new EventCategory();
                $subCategory->parent_id = $category->id;
                $subCategory->name = $eachSub;
                $subCategory->minPerson = 25;
                $subCategory->maxPerson = 500;
                $subCategory->minPrice = 5000;
                $subCategory->maxPrice = 25000;
                $subCategory->save();
            }
        }

        $timezones = [
            'UTC' => 'Coordinated Universal Time',
            'GMT' => 'Greenwich Mean Time',
            'EST' => 'Eastern Standard Time (North America)',
            'EDT' => 'Eastern Daylight Time (North America)',
            'CST' => 'Central Standard Time (North America)',
            'CDT' => 'Central Daylight Time (North America)',
            'MST' => 'Mountain Standard Time (North America)',
            'MDT' => 'Mountain Daylight Time (North America)',
            'PST' => 'Pacific Standard Time (North America)',
            'PDT' => 'Pacific Daylight Time (North America)',
            'IST' => 'India Standard Time',
            'EET' => 'Eastern European Time',
            'EEST' => 'Eastern European Summer Time',
            'WET' => 'Western European Time',
            'WEST' => 'Western European Summer Time',
            'CET' => 'Central European Time',
            'CEST' => 'Central European Summer Time',
            'AST' => 'Atlantic Standard Time',
            'AKST' => 'Alaska Standard Time',
            'HST' => 'Hawaii Standard Time',
            'JST' => 'Japan Standard Time',
            'KST' => 'Korea Standard Time',
            'AEST' => 'Australian Eastern Standard Time',
            'AEDT' => 'Australian Eastern Daylight Time',
            'ACST' => 'Australian Central Standard Time',
            'ACDT' => 'Australian Central Daylight Time',
            'AWST' => 'Australian Western Standard Time',
            'NZST' => 'New Zealand Standard Time',
            'NZDT' => 'New Zealand Daylight Time',
        ];

        foreach ($timezones as $value) {
            $st = new StandardTimezone();
            $st->name = $value;
            $st->save();
        }

        $eventLocationTypes = [
            'physical' => 'In-person at a specific venue',
            'remote' => 'Online/virtual event (Zoom, Meet, etc.)',
            'hybrid' => 'Both in-person and virtual attendance options',
            'tbd' => 'Location to be decided',
            'multiple' => 'Multiple physical locations',
            'on_demand' => 'Pre-recorded, available anytime online',
        ];

        foreach ($eventLocationTypes as $value) {
            $st = new EventLocationType();
            $st->name = $value;
            $st->save();
        }

        $rsvpROs = ['Yes / No', 'Yes / No / Maybe'];
        foreach ($rsvpROs as $value) {
            $rsvpRO = new RsvpResponseOption();
            $rsvpRO->name = $value;
            $rsvpRO->save();
        }

        $rsvpGRPs = ['Amazon', 'Target', 'Walmart', 'Bed Bath & Beyond', 'Williams Sonoma', 'Honeymoon Fund'];
        foreach ($rsvpGRPs as $value) {
            $rsvpGRP = new RsvpGiftRegistryPlatform();
            $rsvpGRP->name = $value;
            $rsvpGRP->save();
        }

        $rsvpCITs = ['Default', 'Formal', 'Causal', 'Modern'];
        foreach ($rsvpCITs as $value) {
            $rsvpCIT = new RsvpCommunicationInvitationTemplate();
            $rsvpCIT->name = $value;
            $rsvpCIT->save();
        }

        $rsvpCRSs = ['Standard (2 weeks, 1 week, 3 days)', 'Frequent (2 weeks, 1 week, 3 days, 1 day)', 'Minimal (1 week, 3 days)'];
        foreach ($rsvpCRSs as $value) {
            $rsvpCRS = new RsvpCommunicationReminderSchedule();
            $rsvpCRS->name = $value;
            $rsvpCRS->save();
        }

        $rsvpFBTs = [
            [
                'name' => 'Full Name',
                'placeholder' => 'Guest Full Name',
                'isRequired' => true,
                'type' => 'text',
                'order' => 1,
            ],
            [
                'name' => 'Email Address',
                'placeholder' => 'Guest Email Address',
                'isRequired' => true,
                'type' => 'text',
                'order' => 2,
            ],
            [
                'name' => 'Phone Number',
                'placeholder' => 'Guest Phone Number',
                'isRequired' => false,
                'type' => 'text',
                'order' => 3,
            ],
            [
                'name' => 'Rsvp Response',
                'placeholder' => 'Yes / No / Maybe',
                'isRequired' => true,
                'type' => 'select',
                'order' => 4,
                'options' => ['Yes / No', 'Yes / No / Maybe'],
            ],
            [
                'name' => 'Plus Ones',
                'placeholder' => 'Additional guests',
                'isRequired' => false,
                'type' => 'radio',
                'order' => 5,
                'options' => ['1 person', '2 person', '3 person', '4 person'],
            ],
            [
                'name' => 'Guest Group',
                'placeholder' => 'Select guest category',
                'isRequired' => false,
                'type' => 'radio',
                'order' => 6,
                'options' => ['Friends', 'Family', 'Work', 'VIP'],
            ],
            [
                'name' => 'Dietry Restrictions',
                'placeholder' => 'Food allergy & preferences',
                'isRequired' => false,
                'type' => 'text',
                'order' => 7,
            ],
            [
                'name' => 'Special Accomodations',
                'placeholder' => 'Accessibility requirements',
                'isRequired' => false,
                'type' => 'checkbox',
                'order' => 8,
                'options' => ['Wheelchair Access', 'Special Meals', 'Sign Language Interpreter', 'Seating Preference'],
            ],
            [
                'name' => 'Song Requests',
                'placeholder' => 'Music Preferences',
                'isRequired' => false,
                'type' => 'text',
                'order' => 9,
            ],
            [
                'name' => 'Message Host',
                'placeholder' => 'Personal note / wishes',
                'isRequired' => false,
                'type' => 'textarea',
                'order' => 10,
            ],
        ];

        foreach ($rsvpFBTs as $each) {
            $rsvpFBT = new RsvpFormBuilderType();
            $rsvpFBT->name = $each['name'];
            $rsvpFBT->placeholder = $each['placeholder'];
            $rsvpFBT->isRequired = $each['isRequired'];
            $rsvpFBT->type = $each['type'];
            $rsvpFBT->order = $each['order'];
            $rsvpFBT->save();

            if (isset($each['options'])) {
                foreach ($each['options'] ?? [] as $eachOption) {
                    $rsvpFMO = new RsvpFormBuilderOption();
                    $rsvpFMO->rsvp_form_builder_type_id = $rsvpFBT->id;
                    $rsvpFMO->name = $eachOption;
                    $rsvpFMO->save();
                }
            }
        }

        $SVLTOCs = ['table', 'chair', 'podium', 'stage', 'exit'];
        foreach ($SVLTOCs as $each) {
            $SVLTOC = new VenueLocationTableObjectCategory();
            $SVLTOC->name = $each;
            $SVLTOC->save();
        }

        for ($i = 1; $i < 3; $i++) {
            //
            $em = new EventModule();
            $em->user_id = $i;
            $em->event_category_id = 1;
            $em->isPublic = true;
            $em->name = "Personal Event - $i";
            $em->description = 'Personal Event Description';
            $em->startDate = now();
            $em->endDate = now()->addDay();
            $em->standard_timezone_id = 1;
            $em->save();
            //
            $el = new EventLocation();
            $el->event_module_id = $em->id;
            $el->event_location_type_id = 1;
            $el->isPrimary = true;
            $el->address = 'Grand Estate Resort, Napa Valley';
            $el->venue = 'Complete venue';
            $el->capacity = 50;
            $el->save();
            //
            $rsvp = new RsvpModule();
            $rsvp->event_module_id = $em->id;
            $rsvp->isActive = true;
            $rsvp->deadline = now()->addDay();
            $rsvp->rsvp_response_option_id = 1;
            $rsvp->capacity = 50;
            $rsvp->allowPlusOnes = true;
            $rsvp->plusOnesLimit = 2;
            $rsvp->isWaitlisted = true;
            $rsvp->collectDietryInformation = true;
            $rsvp->enableCustomFields = true;
            $rsvp->publicRegistration = true;
            $rsvp->requireApproval = true;
            $rsvp->automaticReminders = true;
            $rsvp->rsvp_gift_registry_platform_id = 1;
            $rsvp->giftRegistryName = 'Gift Name';
            $rsvp->giftRegistryUrl = 'https://gift-url.com';
            $rsvp->giftRegistryDescription = 'Gift Registry Description';
            $rsvp->rsvp_communication_invitation_template_id = 1;
            $rsvp->rsvp_communication_reminder_schedule_id = 1;
            $rsvp->customMessage = 'Communication Custom Message';
            $rsvp->smsNotification = true;
            $rsvp->save();
            //
            $rsvpGs = [
                [
                    'name' => 'Family',
                    'description' => 'Close family members',
                    'capacity' => 10,
                    'color' => 'blue',
                ],
            ];
            //
            foreach ($rsvpGs as $each) {
                $rsvpG = new RsvpGroup();
                $rsvpG->rsvp_module_id = $rsvp->id;
                $rsvpG->name = $each['name'];
                $rsvpG->description = $each['description'];
                $rsvpG->capacity = $each['capacity'];
                $rsvpG->color = $each['color'];
                $rsvpG->save();
            }
            //
            $rsvpGLs = [
                [
                    'name' => 'John',
                    'email' => 'john@gmail.com',
                    'phone' => '+1 566 788 900',
                    'plusOnes' => 2,
                    'dietryRestrictions' => 'No restrictions',
                    'notes' => 'No notes',
                ],
            ];

            foreach ($rsvpGLs as $each) {
                $rsvpGL = new RsvpGuestList();
                $rsvpGL->rsvp_module_id = $rsvp->id;
                $rsvpGL->rsvp_group_id = 1;
                $rsvpGL->name = $each['name'];
                $rsvpGL->email = $each['email'];
                $rsvpGL->phone = $each['phone'];
                $rsvpGL->plusOnes = $each['plusOnes'];
                $rsvpGL->dietryRestrictions = $each['dietryRestrictions'];
                $rsvpGL->notes = $each['notes'];
                $rsvpGL->save();
            }

            $rsvpFBTCs = [
                [
                    'name' => 'Color Grade',
                    'placeholder' => 'Enter color grade',
                    'isRequired' => true,
                    'type' => 'text',
                    'order' => 1,
                ],
                [
                    'name' => 'Chair Type',
                    'placeholder' => 'Enter chair type',
                    'isRequired' => true,
                    'type' => 'select',
                    'order' => 2,
                    'options' => ['Fibre', 'Wood', 'Foam'],
                ],
                [
                    'name' => 'Happiness',
                    'placeholder' => 'Enter happiness',
                    'isRequired' => true,
                    'type' => 'radio',
                    'order' => 3,
                    'options' => ['25 percent', '50 percent', '75 percent', '100 percent'],
                ],
                [
                    'name' => 'Work Place',
                    'placeholder' => 'Choose preferences',
                    'isRequired' => true,
                    'type' => 'checkbox',
                    'order' => 4,
                    'options' => ['Ergonomic Chairs', 'Flexible Hours', 'Remote Work'],
                ],
                [
                    'name' => 'Room Message',
                    'placeholder' => 'Enter room message',
                    'isRequired' => true,
                    'type' => 'textarea',
                    'order' => 5,
                ],
            ];

            foreach ($rsvpFBTCs as $each) {
                $rsvpFBTC = new RsvpFormBuilderType();
                $rsvpFBTC->user_id = $i;
                $rsvpFBTC->name = $each['name'];
                $rsvpFBTC->placeholder = $each['placeholder'];
                $rsvpFBTC->isRequired = $each['isRequired'];
                $rsvpFBTC->type = $each['type'];
                $rsvpFBTC->order = $each['order'];
                $rsvpFBTC->save();

                if (isset($each['options'])) {
                    foreach ($each['options'] ?? [] as $eachOption) {
                        $rsvpFMO = new RsvpFormBuilderOption();
                        $rsvpFMO->rsvp_form_builder_type_id = $rsvpFBTC->id;
                        $rsvpFMO->name = $eachOption;
                        $rsvpFMO->save();
                    }
                }
            }

            $rsvpFBs = [
                [
                    'order' => 1,
                    'rsvp_form_builder_type_id' => 1,
                ],
                [
                    'order' => 2,
                    'rsvp_form_builder_type_id' => 5,
                ],
                [
                    'order' => 3,
                    'rsvp_form_builder_type_id' => 8,
                ],
                [
                    'order' => 4,
                    'rsvp_form_builder_type_id' => 10,
                ],
            ];

            foreach ($rsvpFBs as $each) {
                $rsvpFBT = RsvpFormBuilderType::find($each['rsvp_form_builder_type_id'])->load(['rsvpFormBuilderOptions']);

                $rsvpFB = new RsvpFormBuilder();
                $rsvpFB->rsvp_module_id = $rsvp->id;
                $rsvpFB->name = $rsvpFBT->name;
                $rsvpFB->placeholder = $rsvpFBT->placeholder;
                $rsvpFB->isRequired = $rsvpFBT->isRequired;
                $rsvpFB->order = $each['order'];
                $rsvpFB->type = $rsvpFBT->type;
                $rsvpFB->save();

                foreach ($rsvpFBT->rsvpFormBuilderOptions ?? [] as $eachOption) {
                    $rsvpFMO = new RsvpFormBuilderOption();
                    $rsvpFMO->rsvp_form_builder_id = $rsvpFB->id;
                    $rsvpFMO->name = $eachOption->name;
                    $rsvpFMO->save();
                }
            }

            /*
            $rsvpFBFTs = [
                [
                    'name' => 'Stuffed Mushrooms',
                    'description' => 'Baked mushrooms filled with garlic cream cheese and herbs',
                    'price' => '25',
                    'type' => 'appetizer',
                    'order' => 1,
                ],
                [
                    'name' => 'Grilled Chicken with Herb Butter',
                    'description' => 'Served with roasted vegetables and garlic mashed potatoes',
                    'price' => '30',
                    'type' => 'main',
                    'order' => 1,
                ],
                [
                    'name' => 'Chocolate Lava Cake',
                    'description' => 'Warm, rich chocolate cake with a gooey center, served with vanilla ice cream',
                    'price' => '35',
                    'type' => 'desert',
                    'order' => 1,
                ],
                [
                    'name' => 'Mint Lemonade',
                    'description' => 'Freshly squeezed lemonade blended with mint and ice',
                    'price' => '40',
                    'type' => 'beverage',
                    'order' => 1,
                ],
            ];

            foreach ($rsvpFBFTs as $each) {
                $rsvpFBFT = new RsvpFormBuilderFoodType();
                $rsvpFBFT->user_id = $i;
                $rsvpFBFT->name = $each['name'];
                $rsvpFBFT->description = $each['description'];
                $rsvpFBFT->price = $each['price'];
                $rsvpFBFT->type = $each['type'];
                $rsvpFBFT->order = $each['order'];
                $rsvpFBFT->save();
            }

            $rsvpFBFs = [
                [
                    'order' => 1,
                    'rsvp_form_builder_food_type_id' => 1,
                ],
                [
                    'order' => 2,
                    'rsvp_form_builder_food_type_id' => 2,
                ],
                [
                    'order' => 3,
                    'rsvp_form_builder_food_type_id' => 3,
                ],
                [
                    'order' => 4,
                    'rsvp_form_builder_food_type_id' => 4,
                ],
            ];

            foreach ($rsvpFBFs as $each) {
                $rsvpFBFT = RsvpFormBuilderFoodType::find($each['rsvp_form_builder_food_type_id']);

                $rsvpFBF = new RsvpFormBuilderFood();
                $rsvpFBF->rsvp_module_id = $rsvp->id;
                $rsvpFBF->name = $rsvpFBFT->name;
                $rsvpFBF->description = $rsvpFBFT->description;
                $rsvpFBF->price = $rsvpFBFT->price;
                $rsvpFBF->order = $each['order'];
                $rsvpFBF->type = $rsvpFBFT->type;
                $rsvpFBF->save();
            }
            */

            $seating = new SeatingModule();
            $seating->event_module_id = $em->id;
            $seating->save();

            $seatingVLs = ['Main Reception Hall', 'City Centre Hall'];

            foreach ($seatingVLs as $each) {
                $seatingVL = new VenueLocation();
                $seatingVL->user_id = $i;
                $seatingVL->name = $each;
                $seatingVL->save();

                $seatingVLT = new VenueLocationTable();
                $seatingVLT->venue_location_id = $seatingVL->id;
                $seatingVLT->row = 5;
                $seatingVLT->column = 5;
                $seatingVLT->save();

                for ($SVLTR = 1; $SVLTR <= $seatingVLT->row; $SVLTR++) {
                    for ($SVLTC = 1; $SVLTC <= $seatingVLT->column; $SVLTC++) {
                        $seatingVLTC = new VenueLocationTableCell();
                        $seatingVLTC->venue_location_table_id = $seatingVLT->id;
                        $seatingVLTC->row = $SVLTR;
                        $seatingVLTC->column = $SVLTC;
                        $seatingVLTC->save();

                        if ($SVLTR === 1 && $SVLTC === 2) {
                            $seatingVLTO = new VenueLocationTableObject();
                            $seatingVLTO->venue_location_table_cell_id = $seatingVLTC->id;
                            $seatingVLTO->venue_location_table_object_category_id = 4; // stage
                            $seatingVLTO->name = 'Stage';
                            $seatingVLTO->save();
                        }

                        if ($SVLTR === 2 && $SVLTC === 2) {
                            $seatingVLTO = new VenueLocationTableObject();
                            $seatingVLTO->venue_location_table_cell_id = $seatingVLTC->id;
                            $seatingVLTO->venue_location_table_object_category_id = 1; // Table
                            $seatingVLTO->name = 'Family Table';
                            $seatingVLTO->save();

                            for ($vltoc = 1; $vltoc < 9; $vltoc++) {
                                $seatingVLTOC = new VenueLocationTableObjectChildren();
                                $seatingVLTOC->venue_location_table_object_id = $seatingVLTO->id;
                                $seatingVLTOC->venue_location_table_object_category_id = 2; // chair
                                $seatingVLTOC->name = "Chair $vltoc";
                                $seatingVLTOC->save();
                            }
                        }

                        if ($SVLTR === 3 && $SVLTC === 2) {
                            $seatingVLTO = new VenueLocationTableObject();
                            $seatingVLTO->venue_location_table_cell_id = $seatingVLTC->id;
                            $seatingVLTO->venue_location_table_object_category_id = 1; // Table
                            $seatingVLTO->name = 'Friends Table';
                            $seatingVLTO->save();

                            for ($vltoc = 1; $vltoc < 9; $vltoc++) {
                                $seatingVLTOC = new VenueLocationTableObjectChildren();
                                $seatingVLTOC->venue_location_table_object_id = $seatingVLTO->id;
                                $seatingVLTOC->venue_location_table_object_category_id = 2; // chair
                                $seatingVLTOC->name = "Chair $vltoc";
                                $seatingVLTOC->save();
                            }
                        }

                        if ($SVLTR === 5 && $SVLTC === 5) {
                            $seatingVLTO = new VenueLocationTableObject();
                            $seatingVLTO->venue_location_table_cell_id = $seatingVLTC->id;
                            $seatingVLTO->venue_location_table_object_category_id = 5; // Exit
                            $seatingVLTO->name = 'Exit';
                            $seatingVLTO->save();
                        }
                    }
                }

                $seatingVSs = ['First Floor', 'Second Floor'];

                foreach ($seatingVSs as $value) {
                    $seatingVS = new VenueSection();
                    $seatingVS->venue_location_id = $seatingVL->id;
                    $seatingVS->name = $value;
                    $seatingVS->save();

                    $seatingVLT = VenueLocationTable::where('venue_location_id', $seatingVL->id)->first();
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
                }
            }
        }
    }
}
