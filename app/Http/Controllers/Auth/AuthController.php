<?php

namespace App\Http\Controllers\Auth;

use App\User;
use Validator;
use App\Http\Controllers\Controller;
use Illuminate\Foundation\Auth\ThrottlesLogins;
use Illuminate\Foundation\Auth\AuthenticatesAndRegistersUsers;
use Illuminate\Http\Request;
use Response;

class AuthController extends Controller
{
    /*
    |--------------------------------------------------------------------------
    | Registration & Login Controller
    |--------------------------------------------------------------------------
    |
    | This controller handles the registration of new users, as well as the
    | authentication of existing users. By default, this controller uses
    | a simple trait to add these behaviors. Why don't you explore it?
    |
    */

    use AuthenticatesAndRegistersUsers, ThrottlesLogins;

	# Where should the user be redirected to if their login succeeds?
	protected $redirectPath = '/';

	# Where should the user be redirected to if their login fails?
	protected $loginPath = '/login';

	# Where should the user be redirected to after logging out?
	protected $redirectAfterLogout = '/';

    /**
     * Create a new authentication controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('guest', ['except' => 'getLogout']);
    }

    /**
     * Get a validator for an incoming registration request.
     *
     * @param  array  $data
     * @return \Illuminate\Contracts\Validation\Validator
     */
    protected function validator(array $data)
    {
        return Validator::make($data, [
            'name' => 'required|max:255',
            'email' => 'required|email|max:255|unique:users',
            'password' => 'required|confirmed|min:6',
        ]);
    }

    /**
     * Create a new user instance after a valid registration.
     *
     * @param  array  $data
     * @return User
     */
    protected function create(array $data)
    {
        return User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => bcrypt($data['password']),
        ]);
    }
	
	/**
	 * Log the user out of the application.
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function getLogout()
	{
		\Auth::logout();
		\Session::flash('flash_message','You have been logged out.');
		return redirect(property_exists($this, 'redirectAfterLogout') ? $this->redirectAfterLogout : '/');
	}	
	
	/**
	 * Handle an ajax login request to the application
	 * 
	 * @param \Illuminate\Http\Request $request
	 * @param \Illuminate\Http\Response
	 */ 
	public function postLogin(Request $request)
	{
		$rules = [
			'email' => 'required|email', 'password' => 'required',
		];
		$validator = Validator::make($request->all(), $rules);
		
		// Validate the input and return correct response
		if ($validator->fails())
		{
			$errors = $validator->getMessageBag()->toArray();
			$msg = '';
			if (isset($errors['email'])) $msg .= implode(',',$errors['email']);
			if (isset($errors['password'])) $msg .= implode(',',$errors['password']);
			
			return Response::json(array(
				'success' => false,
				'error' => $msg,
			));
		}
		
		$credentials = $request->only('email', 'password');

		if (auth()->attempt($credentials))
		{
			return Response::json(array(
				'success' => true
			));
		}
		else
		{
			return Response::json(array(
				'success' => false,
				'error' => $this->getFailedLoginMessage()
			));
			
		}


	}	
	
}
