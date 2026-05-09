<?php

use App\Models\EventFeatureCategory;
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
        Schema::create('event_features', function (Blueprint $table) {
            $table->id();
            $table
                ->foreignIdFor(EventModel::class)
                ->nullable()
                ->constrained()
                ->cascadeOnDelete();
            $table
                ->foreignIdFor(EventFeatureCategory::class)
                ->nullable()
                ->constrained()
                ->cascadeOnDelete();
            $table->string('slug')->unique()->nullable();
            $table->timestamp('deactivated_at')->nullable();
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('event_features');
    }
};
