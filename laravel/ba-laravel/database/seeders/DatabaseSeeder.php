<?php

namespace Database\Seeders;

use App\Models\Booking;
use App\Models\Timeslot;
use App\Models\User;
use Carbon\Carbon;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */

    public function run(): void
    {
        $user = new User();
        $user->username = 'safi-siddiqui.work';
        $user->email = 'safisiddiqui.work@gmail.com';
        $user->password = 'safisiddiqui.work';
        $user->save();

        $ordinal = function ($number) {
            $suffixes = ['th', 'st', 'nd', 'rd', 'th', 'th', 'th', 'th', 'th', 'th'];
            if ($number % 100 >= 11 && $number % 100 <= 13) {
                $suffix = 'th';
            } else {
                $suffix = $suffixes[$number % 10];
            }
            return $number . $suffix;
        };

        $timeslotIds = [];
        for ($i = 0; $i < 24; $i++) {
            $start = Carbon::createFromTime($i, 0);
            $end = Carbon::createFromTime($i + 1, 0);

            $timeslot = new Timeslot();
            $timeslot->name = $ordinal($i + 1) . ' Timeslot';
            $timeslot->start = $start->format('H:i');
            $timeslot->stop = $end->format('H:i');
            $timeslot->save();

            $timeslotIds[] = $timeslot->id;
        }

        $eventNames = [
            'Olympics',
            'World Cup',
            'Super Bowl',
            'Wimbledon',
            'Tour de France',
            'Grammys',
            'Oscars',
            'Comic-Con',
            'Coachella',
            'Glastonbury',
            'NBA Finals',
        ];

        $eventEmails = [
            'olympics@example.com',
            'worldcup@example.com',
            'superbowl@example.com',
            'wimbledon@example.com',
            'tourdefrance@example.com',
            'grammys@example.com',
            'oscars@example.com',
            'comiccon@example.com',
            'coachella@example.com',
            'glastonbury@example.com',
            'nbafinals@example.com',
        ];

        $bookings = [];

        // 5 events with 3 timeslots each (15 slots)
        for ($i = 0; $i < 5; $i++) {
            $bookings[] = [
                'name' => $eventNames[$i],
                'email' => $eventEmails[$i],
                'description' => 'Booking for ' . $eventNames[$i],
                'isPending' => $i === 0, // Only 1 pending
                'isApproved' => $i !== 0,
                'isRejected' => false,
                'timeslot_id' => array_shift($timeslotIds),
                'timeslot_two_id' => array_shift($timeslotIds),
                'timeslot_three_id' => array_shift($timeslotIds),
            ];
        }

        // 3 events with 2 timeslots each (6 slots)
        for ($i = 0; $i < 3; $i++) {
            $bookings[] = [
                'name' => $eventNames[$i + 5],
                'email' => $eventEmails[$i + 5],
                'description' => 'Booking for ' . $eventNames[$i + 5],
                'isPending' => false,
                'isApproved' => $i < 2,
                'isRejected' => $i === 2,
                'timeslot_id' => array_shift($timeslotIds),
                'timeslot_two_id' => array_shift($timeslotIds),
                'timeslot_three_id' => null,
            ];
        }

        // // 3 events with 1 timeslot each (3 slots)
        // for ($i = 0; $i < 3; $i++) {
        //     $bookings[] = [
        //         'name' => $eventNames[$i + 8],
        //         'email' => $eventEmails[$i + 8],
        //         'description' => 'Booking for ' . $eventNames[$i + 8],
        //         'isPending' => false,
        //         'isApproved' => $i === 0,
        //         'isRejected' => $i > 0,
        //         'timeslot_id' => array_shift($timeslotIds),
        //         'timeslot_two_id' => null,
        //         'timeslot_three_id' => null,
        //     ];
        // }

        // Save to database
        foreach ($bookings as $each) {
            $booking = new Booking();
            $booking->name = $each['name'];
            $booking->description = $each['description'];
            $booking->email = $each['email'];
            $booking->isPending = $each['isPending'];
            $booking->isApproved = $each['isApproved'];
            $booking->isRejected = $each['isRejected'];
            $booking->timeslot_id = $each['timeslot_id'];
            $booking->timeslot_two_id = $each['timeslot_two_id'];
            $booking->timeslot_three_id = $each['timeslot_three_id'];
            $booking->date = now()->format('Y-m-d');
            $booking->save();
        }
    }
}
