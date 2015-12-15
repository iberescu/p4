<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateProjectsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('projects', function (Blueprint $table) {
            $table->increments('id');
			$table->string('name');
			$table->float('width');
			$table->string('project_id');
			$table->float('heigth');
			$table->longText('json');
			$table->text('img');
			$table->timestamps();
            $table->integer('user_id')->unsigned();
			$table->foreign('user_id')->references('id')->on('users');
			$table->index('project_id');
			
        });   
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
		Schema::drop('projects', function (Blueprint $table) {
			$table->dropForeign('projects_user_id_foreign');		
		});
    }
}
