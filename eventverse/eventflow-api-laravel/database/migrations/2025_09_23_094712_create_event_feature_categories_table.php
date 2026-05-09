<?php

use App\Models\EventFeatureCategory;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('event_feature_categories', function (Blueprint $table) {
            $table->id();
            $table
                ->foreignIdFor(EventFeatureCategory::class, 'parent_id')
                ->nullable()
                ->constrained()
                ->cascadeOnDelete();
            $table->string('slug')->unique()->nullable();
            $table->string('name')->unique()->nullable();
            $table->text('description')->nullable();
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('event_feature_categories');
    }
};
