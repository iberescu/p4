<?php
namespace App\Http\Controllers;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Response;
use App\Classes\QqUploadedFileForm;
use App\Classes\DesignerHelpers;

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
		$fonts = array();
		$fontsList = \App\Font::all()->toArray();
		if (is_array($fontsList) && count ($fontsList))
		{
			foreach($fontsList as $key => $value)
			{
				$fonts[] = $value['name'];
			}
		}
		
		return view('design.index')->with('project_id',$id)->with('json',$json)->with('fonts',$fonts)->with('sid',$this->_getUserUploadDirectory());
	}
	public function getDelete($id = null)
	{
		if ($id != null)
		{
			$project = \App\Project::where('project_id','=',$id)->first();
			if ($project)
			{
				$project->delete();
				return back();
			}
		}
		\Session::flash('flash_message','Id is not valid');
		return back();
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
		$json_obj = json_decode($data['content']);
		$project->json = $json_obj[0]->content;
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
	public function postUpload()
	{	
		if(\Request::hasFile('qqfile')){
			return $this->_uploadAction(\Request::all());
		
		}	
		else{
			if(\Request::input('returnThumbs')){
				return $this->_getUserUploadedPhotosAction(\Request::all());
			}
		}
		return Response::json(array(
                                'succes' => false,
		));
	}
	private function _uploadAction($post_data)
	{
		$post_data['html5Editor']=1;
		$tmp = '1111';
        if( isset( $post_data['custom_filename'] ) && strlen( $post_data['custom_filename'] ) > 1 ) {
			$tmp = $post_data['custom_filename'];
		}
		if( isset( $post_data['html5Editor'] ) && $post_data['html5Editor'] ){
			$tmp_folder = $this->_getHtml5Dir(dirname(getcwd()));
			
		}
		
		$sid = '';
        if( isset( $post_data['sid'] ) && strlen( $post_data['sid'] ) > 1 ) {
			$sid = $post_data['sid'] . '/';
		}
		
		$tmp_folder .= $sid;
		if( ! is_dir( $tmp_folder ) ) {
			mkdir( $tmp_folder, 0777, true );
		}
		$createThumbnail = false;
		
        if( isset( $post_data['createThumbnail'] ) && $post_data['createThumbnail'] == 1 ) {
            $createThumbnail = true;
		}
		
		$thumbnail_params = array(
		'destDir'          => $tmp_folder,
		'oName'            => $tmp,
		'tName'            => isset( $post_data['tName'] ) ? $post_data['tName'] : $tmp . '_thumb',
		'width'            => isset( $post_data['width'] ) ? $post_data['width'] : 100,
		'height'           => isset( $post_data['height'] ) ? $post_data['height'] : 'auto',
		'keepAspectRatio'  => true,
		'keepTransparency' => true,
		'keepFrame'        => false,
		);
		
		$createWorkingImage = false;
		if( isset( $post_data['createWorkingImage'] ) && $post_data['createWorkingImage'] == 1 ) {
			$createWorkingImage = true;
		}
		$working_image_params = array(
		'destDir'          => $tmp_folder,
		'oName'            => $tmp,
		'tName'            => $tmp . '_working',
		'quality'          => isset( $post_data['quality'] ) ? $post_data['quality'] : 70,
		'keepAspectRatio'  => true,
		'keepTransparency' => true,
		'keepFrame'        => false,
		);
		
		$file                 = true;
        if( true ) {
			if( isset( $_FILES['qqfile'] ) ) {
                $file = QqUploadedFileForm::save( $tmp_folder . $tmp );
			}
			else {
				$file = false;
			}
		}
		// if we uploaded a file, validate the mime type
        if( $file ) {
            $size                          = getimagesize( $tmp_folder . $tmp );
			$mime                          = $size['mime'];
			$other_infos['mime']           = $mime;
			$other_infos['size']['width']  = $size[0];
			$other_infos['size']['height'] = $size[1];
			
			//TODO maybe move this to a database config?
			$allowedTypes = array(
			'image/svg+xml',
			'image/jpeg',
			'image/tiff',
			'image/png',
			'image/gif',
			'application/pdf',
			);
			if( ! in_array( $mime, $allowedTypes ) ) {
				unlink( $tmp_folder . $tmp );
				$file = false;
			}
			if( $file && $createThumbnail ) {
				try {
					$thumbnail = DesignerHelpers::createImageThumbnail( $thumbnail_params );
				} 
				catch(  Exception $e ) {
					$thumbnail =  $e ;
				}   
			}
			if( $file && $createWorkingImage ) {
				try {
					$workingImage                 = DesignerHelpers::createWorkingImage( $working_image_params );
					$other_infos['working_image'] = $workingImage['result'];
                    } catch( Exception $e ) {
					$workingImage = $e->getMessage();
				} 
			}
			
		}
		return Response::json(array(
			'success'       => $file ? true : false,
			'id'            => 1,
			'path'          => ( isset( $post_data['isUser'] ) && $post_data['isUser'] == '1' ) ? $sid . $tmp : $tmp,
			'name'          => isset( $post_data['name'] ) ? $post_data['name'] : '',
			'thumbnail'     => $createThumbnail ? $thumbnail : '',
			'other_infos'   => $other_infos,
			'post_data'     => $post_data,
			'working_image' => $createWorkingImage ? $workingImage : '',
		));
	}
	private function _getUserUploadedPhotosAction($post_data) {
		
		$returnThumbs = false;
		
		if( isset( $post_data['returnThumbs'] ) && $post_data['returnThumbs'] )
		$returnThumbs = true;
		
		$order = 'DESC';
		
		if( isset( $post_data['order'] ) )
		$order = $post_data['order'];
		
		$sid = '';
		if( isset( $post_data['sid'] ) && strlen( $post_data['sid'] ) > 1 )
		$sid = $post_data['sid'];
		else
		$sid = $this->_getUserUploadDirectory();
		
		$count       = (int)$post_data['count'];
		$returnFiles = array();
		
		if( isset( $post_data['html5Editor'] ) && $post_data['html5Editor'] )
		$baseDir = $this->_getHtml5Dir(dirname(getcwd()));
		else
		$baseDir = $this->_getHtml5Dir(dirname(getcwd()));
		
		$subfolder   = strlen( $sid ) > 0 ? $baseDir . $sid . '/' : $baseDir;
		$returnFiles = array();
		$folderImages = glob($baseDir.$sid.'/*');
		foreach($folderImages as $file) {
			if( strpos( $file, '_working' ) ) {
				$urlexplode = explode("/", $file);
				$item	     = array();		
				$item['image'] = str_replace("_working" ,"", $urlexplode[count($urlexplode)-1]);
				$item['id']    = rand(1,1000);
				$imageHandler = new \Imagick($file);
				$item['other_infos']['type']			= 'imageBarUpload';
				$item['other_infos']['mime']			= $imageHandler->getImageFormat();
				$item['other_infos']['size']['width']   = $imageHandler->getImageWidth();
                $item['other_infos']['size']['height']  = $imageHandler->getImageHeight();
                $item['other_infos']['working_image']   = $urlexplode[count($urlexplode)-1];
				$item['thumbnail']						= str_replace("_working" ,"_thumb",$urlexplode[count($urlexplode)-1] );
				array_push($returnFiles,$item);
			}
		}
		return Response::json( array(
			'sid'   => 'test',
			'count' => count($returnFiles),
			'files' => $returnFiles
		));
	}
	private function _getHtml5Dir($dir){
		return public_path().'/uploads/html5_files/';
	}	
	private function _getHtml5Url($url){
		return URL::to('/').'/uploads/html5_files/';
	}	
	private function _getUserUploadDirectory(){
	        $key      = 'mySq47234#@dfasd';
        	$sid      = \Auth::id();
       		$sid = md5( $sid . $key );
        	return $sid;	
	}	
}
