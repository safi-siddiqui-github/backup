<?php

use App\Models\VenueLocationTableCell;
use App\Models\VenueLocationTableObjectCategory;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('venue_location_table_objects', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(VenueLocationTableObjectCategory::class);
            $table->foreignIdFor(VenueLocationTableCell::class);
            $table->string('name')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('venue_location_table_objects');
    }
};
