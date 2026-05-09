<?php

namespace Database\Seeders;

use App\Http\Traits\UtilTrait;
use App\Models\Color;
use App\Models\EventCategory;
use App\Models\EventCategoryOption;
use App\Models\Module;
use App\Models\ModuleCategory;
use App\Models\ModuleOption;
use App\Models\VenueType;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    use UtilTrait;
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        //
        $eventCategoryData = [
            [
                'name' => 'Personal & Family',
                'slug' => 'personal-family',
                'eventCategoryChildren' => [
                    [
                        'name' => 'Wedding',
                        'slug' => 'wedding',
                        'description' => 'Celebrate love together',
                        'eventCategoryOptions' => [
                            ['name' => 'Ceremony', 'slug' => 'wedding-ceremony'],
                            ['name' => 'Garden Style', 'slug' => 'wedding-garden'],
                            ['name' => 'Beach Vows', 'slug' => 'wedding-beach'],
                        ],
                    ],
                    [
                        'name' => 'Birthday Party',
                        'slug' => 'birthday-party',
                        'description' => 'Fun birthday vibes',
                        'eventCategoryOptions' => [
                            ['name' => 'Kids Bash', 'slug' => 'birthday-kids'],
                            ['name' => 'Surprise Fun', 'slug' => 'birthday-surprise'],
                            ['name' => 'Milestone Day', 'slug' => 'birthday-milestone'],
                        ],
                    ],
                    [
                        'name' => 'Baby Shower',
                        'slug' => 'baby-shower',
                        'description' => 'Welcoming new life',
                        'eventCategoryOptions' => [
                            ['name' => 'Blue Theme', 'slug' => 'shower-blue'],
                            ['name' => 'Pink Theme', 'slug' => 'shower-pink'],
                            ['name' => 'Neutral Joy', 'slug' => 'shower-neutral'],
                        ],
                    ],
                    [
                        'name' => 'Anniversary',
                        'slug' => 'anniversary',
                        'description' => 'Celebrate lasting love',
                        'eventCategoryOptions' => [
                            ['name' => 'Romantic Night', 'slug' => 'anniversary-romantic'],
                            ['name' => 'Getaway Trip', 'slug' => 'anniversary-trip'],
                            ['name' => 'Grand Bash', 'slug' => 'anniversary-bash'],
                        ],
                    ],
                    [
                        'name' => 'Graduation Party',
                        'slug' => 'graduation-party',
                        'description' => 'Celebrate success together',
                        'eventCategoryOptions' => [
                            ['name' => 'Open Air', 'slug' => 'graduation-openair'],
                            ['name' => 'Dinner Gala', 'slug' => 'graduation-dinner'],
                            ['name' => 'Club Beats', 'slug' => 'graduation-club'],
                        ],
                    ],
                    [
                        'name' => 'Holiday Party',
                        'slug' => 'holiday-party',
                        'description' => 'Festive joyful vibes',
                        'eventCategoryOptions' => [
                            ['name' => 'Christmas Eve', 'slug' => 'holiday-christmas'],
                            ['name' => 'New Year', 'slug' => 'holiday-newyear'],
                            ['name' => 'Eid Fest', 'slug' => 'holiday-eid'],
                        ],
                    ],
                ],
            ],
            [
                'name' => 'Business & Corporate',
                'slug' => 'business-corporate',
                'eventCategoryChildren' => [
                    [
                        'name' => 'Corporate Event',
                        'slug' => 'corporate-event',
                        'description' => 'Professional team gathering',
                        'eventCategoryOptions' => [
                            ['name' => 'Board Meet', 'slug' => 'corporate-board'],
                            ['name' => 'Annual Meet', 'slug' => 'corporate-annual'],
                            ['name' => 'Team Outing', 'slug' => 'corporate-outing'],
                        ],
                    ],
                    [
                        'name' => 'Conference',
                        'slug' => 'conference',
                        'description' => 'Engaging knowledge sessions',
                        'eventCategoryOptions' => [
                            ['name' => 'Tech Talk', 'slug' => 'conference-tech'],
                            ['name' => 'Medical Meet', 'slug' => 'conference-medical'],
                            ['name' => 'Business Forum', 'slug' => 'conference-business'],
                        ],
                    ],
                    [
                        'name' => 'Workshop',
                        'slug' => 'workshop',
                        'description' => 'Interactive learning event',
                        'eventCategoryOptions' => [
                            ['name' => 'Coding Boot', 'slug' => 'workshop-coding'],
                            ['name' => 'Design Lab', 'slug' => 'workshop-design'],
                            ['name' => 'Skill Build', 'slug' => 'workshop-skill'],
                        ],
                    ],
                    [
                        'name' => 'Networking Event',
                        'slug' => 'networking-event',
                        'description' => 'Connect with professionals',
                        'eventCategoryOptions' => [
                            ['name' => 'Startup Mix', 'slug' => 'networking-startup'],
                            ['name' => 'Investor Meet', 'slug' => 'networking-investor'],
                            ['name' => 'Speed Connect', 'slug' => 'networking-speed'],
                        ],
                    ],
                    [
                        'name' => 'Product Launch',
                        'slug' => 'product-launch',
                        'description' => 'Showcase new product',
                        'eventCategoryOptions' => [
                            ['name' => 'Tech Gadget', 'slug' => 'launch-tech'],
                            ['name' => 'Fashion Drop', 'slug' => 'launch-fashion'],
                            ['name' => 'Food Line', 'slug' => 'launch-food'],
                        ],
                    ],
                    [
                        'name' => 'Webinar',
                        'slug' => 'webinar',
                        'description' => 'Virtual learning space',
                        'eventCategoryOptions' => [
                            ['name' => 'Tech Trends', 'slug' => 'webinar-tech'],
                            ['name' => 'Marketing Tips', 'slug' => 'webinar-marketing'],
                            ['name' => 'Career Growth', 'slug' => 'webinar-career'],
                        ],
                    ],
                ],
            ],
            [
                'name' => 'Cultural & Arts',
                'slug' => 'cultural-arts',
                'eventCategoryChildren' => [
                    [
                        'name' => 'Cultural Arts',
                        'slug' => 'cultural-arts-main',
                        'description' => 'Traditional cultural showcase',
                        'eventCategoryOptions' => [
                            ['name' => 'Folk Dance', 'slug' => 'arts-folk'],
                            ['name' => 'Craft Show', 'slug' => 'arts-craft'],
                            ['name' => 'Music Fest', 'slug' => 'arts-music'],
                        ],
                    ],
                    [
                        'name' => 'Art Exhibition',
                        'slug' => 'art-exhibition',
                        'description' => 'Creative artworks display',
                        'eventCategoryOptions' => [
                            ['name' => 'Modern Art', 'slug' => 'exhibit-modern'],
                            ['name' => 'Classic Art', 'slug' => 'exhibit-classic'],
                            ['name' => 'Abstract Show', 'slug' => 'exhibit-abstract'],
                        ],
                    ],
                    [
                        'name' => 'Concert',
                        'slug' => 'concert',
                        'description' => 'Live musical vibes',
                        'eventCategoryOptions' => [
                            ['name' => 'Rock Night', 'slug' => 'concert-rock'],
                            ['name' => 'Pop Stage', 'slug' => 'concert-pop'],
                            ['name' => 'Jazz Evening', 'slug' => 'concert-jazz'],
                        ],
                    ],
                    [
                        'name' => 'Theatre Performance',
                        'slug' => 'theatre-performance',
                        'description' => 'Dramatic live shows',
                        'eventCategoryOptions' => [
                            ['name' => 'Classic Play', 'slug' => 'theatre-classic'],
                            ['name' => 'Modern Act', 'slug' => 'theatre-modern'],
                            ['name' => 'Comedy Show', 'slug' => 'theatre-comedy'],
                        ],
                    ],
                    [
                        'name' => 'Film Screening',
                        'slug' => 'film-screening',
                        'description' => 'Watch classic films',
                        'eventCategoryOptions' => [
                            ['name' => 'Indie Film', 'slug' => 'film-indie'],
                            ['name' => 'Blockbuster', 'slug' => 'film-blockbuster'],
                            ['name' => 'Short Film', 'slug' => 'film-short'],
                        ],
                    ],
                    [
                        'name' => 'Poetry Night',
                        'slug' => 'poetry-night',
                        'description' => 'Words and emotions',
                        'eventCategoryOptions' => [
                            ['name' => 'Open Mic', 'slug' => 'poetry-openmic'],
                            ['name' => 'Classic Verse', 'slug' => 'poetry-classic'],
                            ['name' => 'Modern Poem', 'slug' => 'poetry-modern'],
                        ],
                    ],
                ],
            ],
            [
                'name' => 'Education & Training',
                'slug' => 'education-training',
                'eventCategoryChildren' => [
                    [
                        'name' => 'Seminar',
                        'slug' => 'seminar',
                        'description' => 'Focused knowledge sharing',
                        'eventCategoryOptions' => [
                            ['name' => 'Tech Talk', 'slug' => 'seminar-tech'],
                            ['name' => 'Business Talk', 'slug' => 'seminar-business'],
                            ['name' => 'Health Talk', 'slug' => 'seminar-health'],
                        ],
                    ],
                    [
                        'name' => 'Training Sessions',
                        'slug' => 'training-sessions',
                        'description' => 'Skill growth program',
                        'eventCategoryOptions' => [
                            ['name' => 'Coding 101', 'slug' => 'training-coding'],
                            ['name' => 'Design Basics', 'slug' => 'training-design'],
                            ['name' => 'Finance Basics', 'slug' => 'training-finance'],
                        ],
                    ],
                    [
                        'name' => 'Panel Talk',
                        'slug' => 'panel-talk',
                        'description' => 'Expert group discussion',
                        'eventCategoryOptions' => [
                            ['name' => 'Industry Panel', 'slug' => 'panel-industry'],
                            ['name' => 'Tech Panel', 'slug' => 'panel-tech'],
                            ['name' => 'Health Panel', 'slug' => 'panel-health'],
                        ],
                    ],
                    [
                        'name' => 'Career Fair',
                        'slug' => 'career-fair',
                        'description' => 'Opportunities and jobs',
                        'eventCategoryOptions' => [
                            ['name' => 'Internship Hub', 'slug' => 'career-internship'],
                            ['name' => 'Job Board', 'slug' => 'career-job'],
                            ['name' => 'Networking Zone', 'slug' => 'career-networking'],
                        ],
                    ],
                    [
                        'name' => 'Certification Course',
                        'slug' => 'certification-course',
                        'description' => 'Structured learning path',
                        'eventCategoryOptions' => [
                            ['name' => 'Online Cert', 'slug' => 'certification-online'],
                            ['name' => 'In-Person Cert', 'slug' => 'certification-inperson'],
                            ['name' => 'Hybrid Cert', 'slug' => 'certification-hybrid'],
                        ],
                    ],
                    [
                        'name' => 'Guest Lecture',
                        'slug' => 'guest-lecture',
                        'description' => 'Expert speaker talk',
                        'eventCategoryOptions' => [
                            ['name' => 'Industry Leader', 'slug' => 'lecture-leader'],
                            ['name' => 'Motivational Talk', 'slug' => 'lecture-motivational'],
                            ['name' => 'Tech Guru', 'slug' => 'lecture-tech'],
                        ],
                    ],
                ],
            ],
            [
                'name' => 'Entertainment & Recreation',
                'slug' => 'entertainment-recreation',
                'eventCategoryChildren' => [
                    [
                        'name' => 'Festival',
                        'slug' => 'festival',
                        'description' => 'Cultural lively fun',
                        'eventCategoryOptions' => [
                            ['name' => 'Music Fest', 'slug' => 'festival-music'],
                            ['name' => 'Food Fest', 'slug' => 'festival-food'],
                            ['name' => 'Art Fest', 'slug' => 'festival-art'],
                        ],
                    ],
                    [
                        'name' => 'Sports Event',
                        'slug' => 'sports-event',
                        'description' => 'Competitive exciting games',
                        'eventCategoryOptions' => [
                            ['name' => 'Football Match', 'slug' => 'sports-football'],
                            ['name' => 'Cricket Game', 'slug' => 'sports-cricket'],
                            ['name' => 'Marathon Run', 'slug' => 'sports-marathon'],
                        ],
                    ],
                    [
                        'name' => 'Gaming Event',
                        'slug' => 'gaming-event',
                        'description' => 'Interactive gamer gathering',
                        'eventCategoryOptions' => [
                            ['name' => 'Esports Tourney', 'slug' => 'gaming-esports'],
                            ['name' => 'LAN Party', 'slug' => 'gaming-lan'],
                            ['name' => 'Cosplay Show', 'slug' => 'gaming-cosplay'],
                        ],
                    ],
                    [
                        'name' => 'Comedy Show',
                        'slug' => 'comedy-show',
                        'description' => 'Laughter filled night',
                        'eventCategoryOptions' => [
                            ['name' => 'Stand Up', 'slug' => 'comedy-standup'],
                            ['name' => 'Improv Act', 'slug' => 'comedy-improv'],
                            ['name' => 'Sketch Play', 'slug' => 'comedy-sketch'],
                        ],
                    ],
                    [
                        'name' => 'Dance Night',
                        'slug' => 'dance-night',
                        'description' => 'Energetic dance party',
                        'eventCategoryOptions' => [
                            ['name' => 'Salsa Night', 'slug' => 'dance-salsa'],
                            ['name' => 'HipHop Beats', 'slug' => 'dance-hiphop'],
                            ['name' => 'Bollywood Mix', 'slug' => 'dance-bollywood'],
                        ],
                    ],
                    [
                        'name' => 'Carnival',
                        'slug' => 'carnival',
                        'description' => 'Fun rides games',
                        'eventCategoryOptions' => [
                            ['name' => 'Ferris Wheel', 'slug' => 'carnival-ferris'],
                            ['name' => 'Food Stalls', 'slug' => 'carnival-food'],
                            ['name' => 'Clown Acts', 'slug' => 'carnival-clowns'],
                        ],
                    ],
                ],
            ],
            [
                'name' => 'Community & Social',
                'slug' => 'community-social',
                'eventCategoryChildren' => [
                    [
                        'name' => 'Charity Gala',
                        'slug' => 'charity-gala',
                        'description' => 'Support good cause',
                        'eventCategoryOptions' => [
                            ['name' => 'Dinner Night', 'slug' => 'charity-dinner'],
                            ['name' => 'Auction Drive', 'slug' => 'charity-auction'],
                            ['name' => 'Fundraiser Run', 'slug' => 'charity-run'],
                        ],
                    ],
                    [
                        'name' => 'Community Meeting',
                        'slug' => 'community-meeting',
                        'description' => 'Neighborhood discussions forum',
                        'eventCategoryOptions' => [
                            ['name' => 'Town Hall', 'slug' => 'meeting-townhall'],
                            ['name' => 'Resident Meet', 'slug' => 'meeting-resident'],
                            ['name' => 'Planning Meet', 'slug' => 'meeting-planning'],
                        ],
                    ],
                    [
                        'name' => 'Reunion',
                        'slug' => 'reunion',
                        'description' => 'Reconnect and celebrate',
                        'eventCategoryOptions' => [
                            ['name' => 'School Reunion', 'slug' => 'reunion-school'],
                            ['name' => 'College Reunion', 'slug' => 'reunion-college'],
                            ['name' => 'Family Reunion', 'slug' => 'reunion-family'],
                        ],
                    ],
                    [
                        'name' => 'Parade',
                        'slug' => 'parade',
                        'description' => 'Colorful festive march',
                        'eventCategoryOptions' => [
                            ['name' => 'National Parade', 'slug' => 'parade-national'],
                            ['name' => 'Cultural Parade', 'slug' => 'parade-cultural'],
                            ['name' => 'Holiday Parade', 'slug' => 'parade-holiday'],
                        ],
                    ],
                    [
                        'name' => 'Volunteer Drive',
                        'slug' => 'volunteer-drive',
                        'description' => 'Helping hands unite',
                        'eventCategoryOptions' => [
                            ['name' => 'Food Aid', 'slug' => 'volunteer-food'],
                            ['name' => 'Clothes Aid', 'slug' => 'volunteer-clothes'],
                            ['name' => 'Blood Camp', 'slug' => 'volunteer-blood'],
                        ],
                    ],
                    [
                        'name' => 'Awareness Rally',
                        'slug' => 'awareness-rally',
                        'description' => 'Promote social cause',
                        'eventCategoryOptions' => [
                            ['name' => 'Health Walk', 'slug' => 'rally-health'],
                            ['name' => 'Climate March', 'slug' => 'rally-climate'],
                            ['name' => 'Peace Walk', 'slug' => 'rally-peace'],
                        ],
                    ],
                ],
            ],
        ];
        //
        foreach ($eventCategoryData as $key => $value) {
            $eventCategory = new EventCategory();
            $eventCategory->name = $value['name'];
            $eventCategory->slug = $this->slugifyHelper($value['name']);
            $eventCategory->save();

            foreach ($value['eventCategoryChildren'] as $childValue) {
                $eventCategoryChild = new EventCategory();
                $eventCategoryChild->parent_id = $eventCategory->id;
                $eventCategoryChild->name = $childValue['name'];
                $eventCategoryChild->slug = $this->slugifyHelper($childValue['name']);
                $eventCategoryChild->description = $childValue['description'];
                $eventCategoryChild->save();

                foreach ($childValue['eventCategoryOptions'] as $optionValue) {
                    $eventCategoryOption = new EventCategoryOption();
                    $eventCategoryOption->event_category_id = $eventCategoryChild->id;
                    $eventCategoryOption->name = $optionValue['name'];
                    $eventCategoryOption->slug = $this->slugifyHelper($optionValue['name']);
                    $eventCategoryOption->save();
                }
            }
        }
        return;
        //
        $venueTypeData = ['Physical Location', 'Virtual Event', 'Hybrid (Physical + Vitual)'];
        //
        foreach ($venueTypeData as $key => $value) {
            $venueType = new VenueType();
            $venueType->name = $value;
            $venueType->slug = $this->slugifyHelper($value);
            $venueType->save();
        }
        //
        $moduleCategoryData = [
            [
                'name' => 'Essential Modules',
                'description' => 'Core functionality every event needs',
                'modules' => [
                    [
                        'name' => 'RSVP Management',
                        'description' => 'Guest management and RSVP tracking with groups and analytics',
                        'price' => 0,
                        'billingInterval' => 'month',
                        'moduleOptions' => [
                            'Response tracking',
                            'Dietary preferences',
                            'Plus-one management',
                        ],
                    ],
                    [
                        'name' => 'Schedule & Timeline',
                        'description' => 'Event scheduling and timeline management',
                        'price' => 0,
                        'billingInterval' => 'month',
                        'moduleOptions' => ['Custom timeline', 'Session management', 'Speaker profiles'],
                    ],
                    [
                        'name' => 'Announcements',
                        'description' => 'Event announcements and updates system',
                        'price' => 0,
                        'billingInterval' => 'month',
                        'moduleOptions' => ['Real-time updates', 'Push notifications', 'Priority messaging'],
                    ],
                ],
            ],
            [
                'name' => 'Business Features',
                'description' => 'Professional event management tools',
                'modules' => [
                    [
                        'name' => 'Seating Arrangement',
                        'description' => 'Table planning and seating arrangements with visual editor',
                        'price' => 30,
                        'billingInterval' => 'month',
                        'moduleOptions' => ['Visual seating charts', 'Auto-assignment', 'Guest preferences'],
                    ],
                    [
                        'name' => 'Ticketing System',
                        'description' => 'Ticket sales and check-in system with pricing tiers',
                        'price' => 30,
                        'billingInterval' => 'month',
                        'moduleOptions' => ['Multiple ticket types', 'Payment processing', 'Promo codes'],
                    ],
                    [
                        'name' => 'Budget Planning',
                        'description' => 'Budget planning and expense tracking with vendor integration',
                        'price' => 20,
                        'billingInterval' => 'month',
                        'moduleOptions' => ['Expense tracking', 'Vendor management', 'Budget analytics'],
                    ],
                ],
            ],
            [
                'name' => 'Guest Engagement',
                'description' => 'Interactive features to enhance experience',
                'modules' => [
                    [
                        'name' => 'Media Management',
                        'description' => 'Photo galleries and media management with guest uploads',
                        'price' => 20,
                        'billingInterval' => 'month',
                        'moduleOptions' => ['Shared albums', 'Live photo feed', 'QR code sharing'],
                    ],
                    [
                        'name' => 'Games & Activities',
                        'description' => 'Interactive games and activities for guest engagement',
                        'price' => 15,
                        'billingInterval' => 'month',
                        'moduleOptions' => ['Trivia games', 'Photo contests', 'Leaderboards'],
                    ],
                    [
                        'name' => 'Survey & Feedback',
                        'description' => 'Guest surveys and feedback collection system',
                        'price' => 10,
                        'billingInterval' => 'month',
                        'moduleOptions' => ['Custom surveys', 'Real-time results', 'Analytics'],
                    ],
                ],
            ],
        ];
        //
        foreach ($moduleCategoryData as $key => $value) {
            //
            $moduleCategory = new ModuleCategory();
            $moduleCategory->name = $value['name'];
            $moduleCategory->slug = $this->slugifyHelper($value['name']);
            $moduleCategory->description = $value['description'];
            $moduleCategory->save();
            //
            foreach ($value['modules'] as $subValue) {
                //
                $module = new Module();
                $module->module_category_id = $moduleCategory->id;
                $module->name = $subValue['name'];
                $module->slug = $this->slugifyHelper($subValue['name']);
                $module->description = $subValue['description'];
                $module->price = $subValue['price'];
                $module->billingInterval = $subValue['billingInterval'];
                $module->save();
                //
                foreach ($subValue['moduleOptions'] as $valueOption) {
                    //
                    $moduleOption = new ModuleOption();
                    $moduleOption->module_id = $module->id;
                    $moduleOption->slug = $this->slugifyHelper($valueOption);
                    $moduleOption->name = $valueOption;
                    $moduleOption->save();
                    //
                }
            }
        }
        //
        $colorsData = [
            [
                'name' => 'red',
                'code' => '#FB2C36',
            ],
            [
                'name' => 'orange',
                'code' => '#FF6900',
            ],
            [
                'name' => 'amber',
                'code' => '#FE9A00',
            ],
            [
                'name' => 'yellow',
                'code' => '#F0B100',
            ],
            [
                'name' => 'lime',
                'code' => '#7CCF00',
            ],
            [
                'name' => 'green',
                'code' => '#00C951',
            ],
            [
                'name' => 'emerald',
                'code' => '#00BC7D',
            ],
            [
                'name' => 'teal',
                'code' => '#00BBA7',
            ],
            [
                'name' => 'cyan',
                'code' => '#00B8DB',
            ],
            [
                'name' => 'sky',
                'code' => '#00A6F4',
            ],
            [
                'name' => 'blue',
                'code' => '#2B7FFF',
            ],
            [
                'name' => 'indigo',
                'code' => '#615FFF',
            ],
            [
                'name' => 'violet',
                'code' => '#8E51FF',
            ],
            [
                'name' => 'purple',
                'code' => '#AD46FF',
            ],
            [
                'name' => 'fuchsia',
                'code' => '#E12AFB',
            ],
            [
                'name' => 'pink',
                'code' => '#F6339A',
            ],
            [
                'name' => 'rose',
                'code' => '#FF2056',
            ],
            [
                'name' => 'slate',
                'code' => '#62748E',
            ],
            [
                'name' => 'gray',
                'code' => '#6A7282',
            ],
            [
                'name' => 'zinc',
                'code' => '#71717B',
            ],
            [
                'name' => 'neutral',
                'code' => '#737373',
            ],
            [
                'name' => 'stone',
                'code' => '#79716B',
            ],
        ];
        //
        foreach ($colorsData as $value) {
            //
            $color = new Color();
            $color->slug = $this->slugifyHelper($value['name']);
            $color->name = $value['name'];
            $color->code = $value['code'];
            $color->save();
            //
        }
    }
}
