<?php

use App\Models\EventCategory;
use App\Models\StandardTimezone;
use App\Models\User;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('event_modules', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(User::class);
            $table->foreignIdFor(EventCategory::class)->nullable();
            $table->boolean('isPublic')->default(true);
            $table->string('name')->nullable();
            $table->text('description')->nullable();
            $table->timestamp('startDate')->nullable();
            $table->timestamp('endDate')->nullable();
            $table->foreignIdFor(StandardTimezone::class)->nullable();
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('event_modules');
    }
};
