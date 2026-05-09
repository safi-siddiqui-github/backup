<?php

use App\Models\EventModule;
use App\Models\RsvpCommunicationInvitationTemplate;
use App\Models\RsvpCommunicationReminderSchedule;
use App\Models\RsvpGiftRegistryPlatform;
use App\Models\RsvpResponseOption;
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
        Schema::create('rsvp_modules', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(EventModule::class)->unique();
            $table->boolean('isActive')->default(true);
            $table->timestamp('deadline')->nullable();
            $table->foreignIdFor(RsvpResponseOption::class)->nullable();
            $table->integer('capacity')->nullable();
            $table->boolean('allowPlusOnes')->default(false);
            $table->integer('plusOnesLimit')->nullable();
            $table->boolean('isWaitlisted')->default(false);
            $table->boolean('collectDietryInformation')->default(false);
            $table->boolean('enableCustomFields')->default(false);
            $table->boolean('publicRegistration')->default(false);
            $table->boolean('requireApproval')->default(false);
            $table->boolean('automaticReminders')->default(false);
            $table->foreignIdFor(RsvpGiftRegistryPlatform::class)->nullable();
            $table->string('giftRegistryName')->nullable();
            $table->string('giftRegistryUrl')->nullable();
            $table->text('giftRegistryDescription')->nullable();
            $table->foreignIdFor(RsvpCommunicationInvitationTemplate::class)->nullable();
            $table->foreignIdFor(RsvpCommunicationReminderSchedule::class)->nullable();
            $table->text('customMessage')->nullable();
            $table->boolean('smsNotification')->default(false);
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('rsvp_modules');
    }
};
