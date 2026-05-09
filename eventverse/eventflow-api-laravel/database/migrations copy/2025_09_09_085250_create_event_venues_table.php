<?php

use App\Models\EventModule;
use App\Models\VenueType;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('event_venues', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(EventModule::class);
            $table->foreignIdFor(VenueType::class);
            $table->string('name')->nullable();
            $table->string('slug')->unique();
            $table->integer('capacity')->nullable();
            $table->text('features')->nullable();
            $table->text('physical_address')->nullable();
            $table->text('virtual_link')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('event_venues');
    }
};
