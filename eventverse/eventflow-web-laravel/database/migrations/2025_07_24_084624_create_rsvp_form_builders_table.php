<?php

use App\Models\RsvpFormBuilderType;
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
        Schema::create('rsvp_form_builders', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(RsvpModule::class);
            $table->string('name');
            $table->string('placeholder');
            $table->integer('order');
            $table->boolean('isRequired');
            $table->enum('type', ['text', 'textarea', 'select', 'radio', 'checkbox']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('rsvp_form_builders');
    }
};
