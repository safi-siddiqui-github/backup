<?php

use App\Models\EventColor;
use App\Models\EventGuestGroup;
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
        Schema::create('event_guests', function (Blueprint $table) {
            $table->id();
            $table
                ->foreignIdFor(EventModel::class)
                ->nullable()
                ->constrained()
                ->cascadeOnDelete();
            $table
                ->foreignIdFor(EventGuestGroup::class)
                ->nullable()
                ->constrained()
                ->cascadeOnDelete();
            $table->string('slug')->unique()->nullable();
            $table->string('name')->nullable();
            $table->string('phone')->nullable();
            $table->string('email')->nullable();
            $table->string('plus_one')->nullable();
            $table->text('dietary_restriction')->nullable();
            $table->text('note')->nullable();
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('event_guests');
    }
};
