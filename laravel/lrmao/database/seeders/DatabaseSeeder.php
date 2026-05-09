<?php

namespace Database\Seeders;

use App\Models\Conversation;
use App\Models\Group;
use App\Models\Message;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'Admin User',
            'email' => 'admin@example.com',
            'password' => 'admin',
            'is_admin' => true,
        ]);

        User::factory()->create([
            'name' => 'John User',
            'email' => 'john@example.com',
            'password' => 'john',
        ]);

        User::factory(10)->create();

        for ($i = 0; $i < 5; $i++) {
            $group = Group::factory()->create([
                'owner_id' => 1,
            ]);

            $users = User::inRandomOrder()->limit(mt_rand(2, 5))->pluck('id');
            $group->users()->attach(array_unique([1, ...$users]));
        }

        Message::factory(1000)->create();
        $messages = Message::whereNull('group_id')->orderBy('created_at')->get();

        $conversations = $messages
            ->groupBy(function ($message) {
                return collect([$message->sender_id, $message->reciever_id])
                    ->sort()
                    ->implode('_');
            })
            ->map(function ($groupedMessages) {
                return [
                    'user_id1' => $groupedMessages->first()->sender_id,
                    'user_id2' => $groupedMessages->first()->reciever_id,
                    'last_message_id' => $groupedMessages->last()->id,
                    'created_at' => now(),
                    'updated_at' => now(),
                ];
            })
            ->values();

        Conversation::insertOrIgnore($conversations->toArray());
    }
}
