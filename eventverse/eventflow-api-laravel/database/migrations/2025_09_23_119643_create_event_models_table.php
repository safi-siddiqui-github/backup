<?php

use App\Models\EventCategory;
use App\Models\EventLaunchStrategy;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('event_models', function (Blueprint $table) {
            $table->id();
            $table
                ->foreignIdFor(EventCategory::class)
                ->nullable()
                ->constrained()
                ->cascadeOnDelete();
            $table
                ->foreignIdFor(EventLaunchStrategy::class)
                ->nullable()
                ->constrained()
                ->cascadeOnDelete();
            $table->string('slug')->unique()->nullable();
            $table->text('name')->nullable();
            $table->boolean('is_private')->nullable();
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('event_models');
    }
};
