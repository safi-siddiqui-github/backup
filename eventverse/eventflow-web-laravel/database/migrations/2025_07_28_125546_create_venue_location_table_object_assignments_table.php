<?php

use App\Models\RsvpGuestList;
use App\Models\VenueLocationTableObject;
use App\Models\VenueLocationTableObjectChildren;
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
        Schema::create('venue_location_table_object_assignments', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(RsvpGuestList::class);
            $table->foreignIdFor(VenueLocationTableObject::class)->nullable();
            $table->foreignIdFor(VenueLocationTableObjectChildren::class)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('venue_location_table_object_assignments');
    }
};
