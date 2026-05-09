<?php

use App\Models\RsvpGroup;
use App\Models\RsvpModule;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('rsvp_guest_lists', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(RsvpModule::class);
            $table->foreignIdFor(RsvpGroup::class)->nullable();
            $table->string('name')->nullable();
            $table->string('email')->nullable();
            $table->string('phone')->nullable();
            $table->integer('plusOnes')->nullable();
            $table->text('dietryRestrictions')->nullable();
            $table->text('notes')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('rsvp_guest_lists');
    }
};
