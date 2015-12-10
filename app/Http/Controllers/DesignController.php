<?php
namespace App\Http\Controllers;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Response;
class DesignController extends Controller {
    /**
    * Responds to requests to GET /
    */
    public function getCreate() {
       $id = md5(\Auth::id() . session_id() . time());
	   
	   return redirect()->to('/design/'.$id);
    }
	public function getDesign($id = null)
	{
		$project = \App\Project::where('project_id','=',$id)->first();
		$json = '';
		if ($project)
		{
			$json = $project->json;
		}
		return view('design.index')->with('project_id',$id)->with('json',$json);
	}
	public function postSave()
	{
		$data = \Request::all();
		//check if project doesn't already exist
		$project = \App\Project::where('project_id','=',$data['project_id'])->first();
		
		if ($project)
		{
			if ($project->user_id != \Auth::id())
			{
				//hacking atempt
				exit;
			}
		}
		else
		{
			$project = new \App\Project();			
		}
		
		$project->name = $data['project_name'];
		$project->width = 100;
		$project->heigth = 100;
		$project->project_id = $data['project_id'];
		$project->json = $data['content'];
		$project->img = $data['project_id'].'.jpg';
		$imgSource = str_replace(' ', '+',str_replace('data:image/jpeg;base64,', '',$data['img']));
		$imgSource = base64_decode($imgSource);
		
		if (!file_exists(public_path() . '/cust_images/'. md5(\Auth::id()) . '/'))
		{
			@mkdir(public_path() . '/cust_images/'. md5(\Auth::id()) . '/',0777);
		}
		file_put_contents(public_path() . '/cust_images/'. md5(\Auth::id()) . '/' . $data['project_id'].'.jpg',$imgSource);
		
		$project->user_id = \Auth::id();
		
		if ($project->save())
		{
			return Response::json(array(
				'succes' => 'Saved',
				'error' => '',
			));	
		}
	}	
}