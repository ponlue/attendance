<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAllTablesUpdated extends Migration
{
    public function up()
    {
        Schema::create('user_types', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('code')->unique();
            $table->timestamps();
        });

        Schema::create('groups', function (Blueprint $table) {
            $table->id();
            $table->string('code')->unique();
            $table->string('name');
            $table->timestamps();
        });

        Schema::create('classes', function (Blueprint $table) {
            $table->id();
            $table->string('code')->unique();
            $table->string('name');
            $table->string('group');
            $table->timestamps();
        });

        Schema::create('provinces', function (Blueprint $table) {
            $table->id();
            $table->string('code')->unique();
            $table->string('name');
            $table->timestamps();
        });

        Schema::create('districts', function (Blueprint $table) {
            $table->id();
            $table->string('code')->unique();
            $table->string('name');
            $table->timestamps();
        });

        Schema::create('communes', function (Blueprint $table) {
            $table->id();
            $table->string('code')->unique();
            $table->string('name');
            $table->timestamps();
        });

        Schema::create('villages', function (Blueprint $table) {
            $table->id();
            $table->string('code')->unique();
            $table->string('name');
            $table->timestamps();
        });

        Schema::create('addresses', function (Blueprint $table) {
            $table->id();
            $table->string('code')->unique();
            $table->string('street')->nullable();
            $table->string('district')->nullable();
            $table->foreignId('province_id')->constrained('provinces');
            $table->foreignId('village_id')->constrained('villages');
            $table->foreignId('commune_id')->constrained('communes');
            $table->timestamps();
        });

        Schema::create('subjects', function (Blueprint $table) {
            $table->id();
            $table->string('code')->unique();
            $table->string('name');
            $table->timestamps();
        });

        Schema::create('user_profiles', function (Blueprint $table) {
            $table->id();
            $table->foreignId('usertype_id')->constrained('user_types');
            $table->foreignId('address_id')->constrained('addresses');
            $table->foreignId('class_id')->constrained('classes');
            $table->foreignId('group_id')->constrained('groups');
            $table->foreignId('subject_id')->constrained('subjects');
            $table->string('first_name');
            $table->string('last_name');
            $table->string('gender');
            $table->date('date_of_birth');
            $table->string('phone')->nullable();
            $table->string('code')->unique();
            $table->string('email')->unique();
            $table->string('session')->nullable();
            $table->timestamps();
        });

        Schema::create('logins', function (Blueprint $table) {
            $table->id();
            $table->foreignId('userprofile_id')->constrained('user_profiles');
            $table->string('name')->unique();
            $table->string('password');
            $table->boolean('status')->default(true);
            $table->timestamps();
        });

        Schema::create('generate_qrs', function (Blueprint $table) {
            $table->id();
            $table->string('qr_code')->unique();
            $table->integer('scan_amount')->default(0);
            $table->string('permission')->nullable();
            $table->timestamps();
        });

        Schema::create('attendances', function (Blueprint $table) {
            $table->id();
            $table->foreignId('userprofile_id')->constrained('user_profiles');
            $table->foreignId('qr_id')->constrained('generate_qrs');
            $table->foreignId('class_id')->constrained('classes');
            $table->string('reason')->nullable();
            $table->dateTime('date_time');
            $table->timestamps();
        });

        Schema::create('userprofile_attendance', function (Blueprint $table) {
            $table->id();
            $table->foreignId('userprofile_id')->constrained('user_profiles');
            $table->foreignId('attendance_id')->constrained('attendances');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('userprofile_attendance');
        Schema::dropIfExists('attendances');
        Schema::dropIfExists('generate_qrs');
        Schema::dropIfExists('logins');
        Schema::dropIfExists('user_profiles');
        Schema::dropIfExists('subjects');
        Schema::dropIfExists('addresses');
        Schema::dropIfExists('villages');
        Schema::dropIfExists('communes');
        Schema::dropIfExists('districts');
        Schema::dropIfExists('provinces');
        Schema::dropIfExists('classes');
        Schema::dropIfExists('groups');
        Schema::dropIfExists('user_types');
    }
}
