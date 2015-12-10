@extends('layouts.master')

@section('title')
    All Projects
@stop

@section('content')
<div class="main">
	<div class="menu">
		<ul>	
			 @if(Auth::check())
				<li><a href='/'>Home</a></li>
				<li><a href='{{Request::url()}}/create'>Create project</a></li>
				<li><a href='{{Request::url()}}/logout'>Log out</a></li>
			@else
				<li><a href='/'>Home</a></li>
				<li><a href='/login'>Log in</a></li>
				<li><a href='/register'>Register</a></li>
			@endif
		</ul>
	</div>
	<div class="projects_list">
		<h2>Your Projects</h2>

		@if(sizeof($projects) == 0)
			You have not added any projects.
		<a href="{{Request::url()}}/create" />Add project</a>
		@else
			@foreach($projects as $project)
				<div class="col-xs-6 col-sm-2">
					<h2>{{ $project->name }}</h2>
					<a href='{{Request::url()}}/design/{{$project->project_id}}'>Edit</a> | 
					<a href='{{Request::url()}}/design/delete/{{$project->project_id}}'>Delete</a><br>
					<img class="" src='<?php echo URL::to('/') . '/cust_images/'. md5(\Auth::id()) . '/' . $project->img ?>'>
				</div>
			@endforeach
		@endif
	</div>
	
	
<div class="others_list">
	<div class="row">
		<div class="col-md-12">
			<h2>Create any of these and more...</h2>
		</div>
		<div class="col-md-12">

			<div class="templates-grid">
				<div class="row">
					<div class="col-xs-6 col-sm-2">
						<img src="http://about.gravit.io/images/covers/facebook.png">
						<div class="caption">Social Covers</div>
					</div>
					<div class="col-xs-6 col-sm-2">
						<img src="http://about.gravit.io/images/covers/logo.png">
						<div class="caption">Logo Design</div>
					</div>
					<div class="col-xs-6 col-sm-2">
						<img src="http://about.gravit.io/images/covers/greetings.png">
						<div class="caption">Greeting cards</div>
					</div>
					<div class="col-xs-6 col-sm-2">
						<img src="http://about.gravit.io/images/covers/website.png">
						<div class="caption">Websites</div>
					</div>
					<div class="col-xs-6 col-sm-2">
						<img src="http://about.gravit.io/images/covers/businesscard.png">
						<div class="caption">Business cards</div>
					</div>
					<div class="col-xs-6 col-sm-2">
						<img src="http://about.gravit.io/images/covers/illustration.png">
						<div class="caption">Illustrations</div>
					</div>
				</div>
		</div>
	</div>

</div>	
</div>
@stop