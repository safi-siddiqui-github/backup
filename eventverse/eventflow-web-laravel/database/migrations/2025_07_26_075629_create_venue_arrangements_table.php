<?php

use App\Models\VenueSection;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('venue_arrangements', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(VenueSection::class);
            $table->string('name');
            $table->text('descripyion');
            $table->time('startTime', precision: 0);
            $table->time('endTime', precision: 0);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('venue_arrangements');
    }
};
