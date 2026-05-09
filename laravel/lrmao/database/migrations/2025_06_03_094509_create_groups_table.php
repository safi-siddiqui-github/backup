<?php

use App\Models\Group;
use App\Models\Message;
use App\Models\User;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('groups', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->text('description');
            $table->foreignIdFor(User::class, 'owner_id')->onDelete('cascade');
            $table->foreignIdFor(Message::class, 'last_message_id')->nullable();
            $table->timestamps();
        });
        Schema::create('group_users', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(Group::class)->onDelete('cascade');
            $table->foreignIdFor(User::class)->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('groups');
        Schema::dropIfExists('group_users');
    }
};
