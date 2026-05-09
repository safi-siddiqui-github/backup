<?php

use App\Models\EventCategory;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('event_categories', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(EventCategory::class, 'parent_id')->nullable();
            $table->string('name');
            $table->integer('minPerson')->default(0);
            $table->integer('maxPerson')->default(0);
            $table->integer('minPrice')->default(0);
            $table->integer('maxPrice')->default(0);
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('event_categories');
    }
};
