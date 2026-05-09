<?php

use App\Models\EventModel;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('event_special_guests', function (Blueprint $table) {
            $table->id();
            $table
                ->foreignIdFor(EventModel::class)
                ->nullable()
                ->constrained()
                ->cascadeOnDelete();
            $table->string('slug')->unique()->nullable();
            $table->string('name')->nullable();
            $table->string('role')->nullable();
            $table->string('description')->nullable();
            $table->string('linkedin_url')->nullable();
            $table->string('twitter_url')->nullable();
            $table->string('website')->nullable();
            $table->json('achievements')->nullable();
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('event_special_guests');
    }
};
