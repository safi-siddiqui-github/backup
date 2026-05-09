<?php

use App\Models\EventLocationType;
use App\Models\EventModule;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('event_locations', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(EventModule::class);
            $table->foreignIdFor(EventLocationType::class)->nullable();
            $table->boolean('isPrimary')->default(false);
            $table->string('address')->nullable();
            $table->string('venue')->nullable();
            $table->integer('capacity')->nullable();
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('event_locations');
    }
};
