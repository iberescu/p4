@extends('layouts.master')

@section('title')
    All Projects
@stop

@section('head')
    <link href="<?php echo asset('css/main.css')?>" type='text/css' rel='stylesheet'>
@stop

@section('content')
<div class="container">
	<div class="menu">
		<ul>	
			 @if(Auth::check())
				<li><a href='{{Request::url()}}/create'>Create project</a></li>
				<li><a href='{{Request::url()}}/logout'>Log out</a></li>
			@else
				<li><a href='/login'>Log in</a></li>
				<li><a href='/register'>Register</a></li>
			@endif
		</ul>
	</div>
			<header>
				<h1> Your projects list 
				@if(sizeof($projects) == 0)
				<span> You don't have any project. Click below to create a project</span>	
				@else
				<span> Click on one of the projects below to edit</span>
				@endif				
			</h1>

			</header>		
	<div class="grid3d vertical" id="grid3d">
		<div class="grid-wrap">
			<div class="grid">
				@if(sizeof($projects) == 0)
						<figure><a href='{{Request::url()}}/create'><img src="img/placeholder.png" alt="more soon"/></a></figure>
				@else
					@foreach($projects as $project)
						<figure>
						<a class="delete_project" href='{{Request::url()}}/design/delete/{{$project->project_id}}'>Delete</a>
						<a href='{{Request::url()}}/design/{{$project->project_id}}'><img src="<?php echo URL::to('/') . '/cust_images/'. md5(\Auth::id()) . '/' . $project->img ?>" alt="{{ $project->name }}"/></a></figure>
					@endforeach
				@endif				
			</div>
		</div><!-- /grid-wrap -->
	</div>	
	
</div>
@stop