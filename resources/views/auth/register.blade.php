@extends('layouts.master')

@section('head')
<link rel="stylesheet" href="<?php echo asset('css/login.css')?>" type="text/css"> 
<link rel='stylesheet prefetch' href='http://fonts.googleapis.com/css?family=Open+Sans'>
@stop

@section('content')

 <div class="cont">
		@if(count($errors) > 0)
			<ul class='errors'>
				@foreach ($errors->all() as $error)
					<li><span class='fa fa-exclamation-circle'></span> {{ $error }}</li>
				@endforeach
			</ul>
		@endif	 
  <div class="demo">
    <div class="login">
      <img class="logo-image" src="{{URL::to('/')}}/img/harvard_logo.png" />
	    <form method='POST' action='{{Request::url()}}'>
        {!! csrf_field() !!}
	
      <div class="login__form">
        <div class="login__row name_row">
          <svg class="login__icon name svg-icon" viewBox="0 0 20 20">
            <path d="M0,20 a10,8 0 0,1 20,0z M10,0 a4,4 0 0,1 0,8 a4,4 0 0,1 0,-8" />
          </svg>
          <input type="text" name="name" class="login__input name" placeholder="Name"/>
        </div>	  
        <div class="login__row">
          <svg class="login__icon name svg-icon" viewBox="0 0 20 20">
            <path d="M0,20 a10,8 0 0,1 20,0z M10,0 a4,4 0 0,1 0,8 a4,4 0 0,1 0,-8" />
          </svg>
          <input type="text" name="email" class="login__input name" placeholder="Username"/>
        </div>
        <div class="login__row">
          <svg class="login__icon pass svg-icon" viewBox="0 0 20 20">
            <path d="M0,20 20,20 20,8 0,8z M10,13 10,16z M4,8 a6,8 0 0,1 12,0" />
          </svg>
          <input type="password" name="password" class="login__input pass" placeholder="Password"/>
        </div>
        <div class="login_confirm__row">
          <svg class="login__icon pass svg-icon" viewBox="0 0 20 20">
            <path d="M0,20 20,20 20,8 0,8z M10,13 10,16z M4,8 a6,8 0 0,1 12,0" />
          </svg>
          <input type="password" name="password_confirmation" class="login__input pass_confirm" placeholder="Confirm password"/>
        </div>		
        <button type="submit" class="login__submit">Register</button>
      </div>
	  </form>
    </div>
  </div>
</div>

	<script type="text/javascript">
		var APP_URL = "{{Request::url()}}";
	</script>

@stop