<?php

use App\Models\TodoProject;
use App\Models\User;
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
        Schema::create('todo_tasks', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(User::class);
            $table->foreignIdFor(TodoProject::class)->nullable();
            $table->string('name');
            $table->text('description')->nullable();
            $table->timestamp('important_at')->nullable();
            $table->timestamp('completed_at')->nullable();
            $table->timestamp('due_date')->nullable();
            $table->softDeletes();
            $table->timestamps();
        });
        
        Schema::create('todo_projects', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(User::class);
            $table->string('name');
            $table->softDeletes();
            $table->timestamps();
        });

        // if (!Schema::hasColumn('users', 'deleted_at')) {
        //     Schema::table('users', function (Blueprint $table) {
        //         $table->softDeletes();
        //     });
        // }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('todo_tasks');
        Schema::dropIfExists('todo_projects');

        // if (Schema::hasColumn('users', 'deleted_at')) {
        //     Schema::table('users', function (Blueprint $table) {
        //         $table->dropSoftDeletes();
        //     });
        // }
    }
};
