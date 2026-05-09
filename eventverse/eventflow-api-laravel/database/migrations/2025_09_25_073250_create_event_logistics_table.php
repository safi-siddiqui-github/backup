<?php

use App\Models\EventAgeRestrictionType;
use App\Models\EventModel;
use App\Models\EventParkingCostInterval;
use App\Models\EventParkingType;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('event_logistics', function (Blueprint $table) {
            $table->id();
            $table
                ->foreignIdFor(EventModel::class)
                ->nullable()
                ->constrained()
                ->cascadeOnDelete();
            $table
                ->foreignIdFor(EventAgeRestrictionType::class)
                ->nullable()
                ->constrained()
                ->cascadeOnDelete();
            $table
                ->foreignIdFor(EventParkingType::class)
                ->nullable()
                ->constrained()
                ->cascadeOnDelete();
            $table
                ->foreignIdFor(EventParkingCostInterval::class)
                ->nullable()
                ->constrained()
                ->cascadeOnDelete();
            //
            $table->string('slug')->unique()->nullable();
            //
            $table->boolean('has_age_restriction')->nullable();
            $table->integer('minimum_age')->nullable();
            $table->integer('maximum_age')->nullable();
            $table->boolean('is_guardian_required_for_minors')->nullable();
            $table->text('age_restriction_note')->nullable();
            //
            $table->boolean('has_check_in_instructions')->nullable();
            $table->string('start_time')->nullable();
            $table->boolean('is_early_check_in_allowed')->nullable();
            $table->boolean('is_late_check_in_allowed')->nullable();
            $table->text('check_in_instructions')->nullable();
            //
            $table->boolean('has_parking_information')->nullable();
            $table->integer('parking_cost')->nullable();
            $table->boolean('has_parking_validation')->nullable();
            $table->boolean('has_parking_reservation')->nullable();
            $table->text('parking_details')->nullable();
            $table->string('map_link')->nullable();
            $table->text('alternative_transportation')->nullable();
            //
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('event_logistics');
    }
};
