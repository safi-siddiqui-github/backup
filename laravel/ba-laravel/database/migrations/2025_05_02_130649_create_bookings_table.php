<?php

use App\Models\Timeslot;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('bookings', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('email');
            $table->text('description');
            $table->timestamp('date');
            $table->foreignIdFor(Timeslot::class);
            $table->foreignIdFor(Timeslot::class, 'timeslot_two_id')->nullable();
            $table->foreignIdFor(Timeslot::class, 'timeslot_three_id')->nullable();
            $table->boolean('isPending')->default(true);
            $table->boolean('isApproved')->default(false);
            $table->boolean('isRejected')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bookings');
    }
};
