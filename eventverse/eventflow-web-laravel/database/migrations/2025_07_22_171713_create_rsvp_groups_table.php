<?php

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
        Schema::create('rsvp_groups', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(RsvpModule::class);
            $table->string('name');
            $table->enum('color', ['red', 'blue', 'green', 'purple', 'yellow', 'pink', 'indigo', 'orange']);
            $table->text('description')->nullable();
            $table->integer('capacity')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('rsvp_groups');
    }
};
