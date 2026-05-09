<?php

use App\Models\VenueLocationTable;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('venue_location_table_cells', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(VenueLocationTable::class);
            $table->integer('row');
            $table->integer('column');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('venue_location_table_cells');
    }
};
