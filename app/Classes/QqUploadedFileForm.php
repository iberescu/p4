<?php 
namespace App\Classes;

/**
 * Handle file uploads via regular form post (uses the $_FILES array)
 */
class QqUploadedFileForm {
    

    /**
     * Save the file to the specified path
     * @return boolean TRUE on success
     */
    static function save($path) {
    	
		if(exif_imagetype($_FILES['qqfile']['tmp_name']) == IMAGETYPE_JPEG){
			
            $exif = exif_read_data($_FILES['qqfile']['tmp_name']);
            $ort = isset($exif['Orientation']) ? $exif['Orientation'] : null ;
            $mustRotate = 0;
            $angle = 0;
			
            switch($ort)
            {
                case 3: // 180 rotate left
                    $angle = 180;
                    $mustRotate = 1;
                    break;
                case 6: // 90 rotate right
                    $angle = 90;
                    $mustRotate = 1;
                    break;
                case 8:    // 90 rotate left
                    $angle = -90;
                    $mustRotate = 1;
                    break;
            }
            if ($mustRotate){
                $imagick = new Imagick();
                $imagick->readImage(realpath($_FILES['qqfile']['tmp_name']));
                $imagick->rotateimage(new ImagickPixel(), $angle);
                $imagick->stripImage();
                $imagick->setImageFormat ("jpeg");
                if (!$imagick->writeImage($path)) {
                   return false;
                }
            } else {
				
                if (!move_uploaded_file($_FILES['qqfile']['tmp_name'], $path))
                    return false;
            }
        } else {
			
    		if (!move_uploaded_file($_FILES['qqfile']['tmp_name'], $path)) {
            	return false;
    		}
        }
        return true;
    }

    static function getName() {
        return $_FILES['qqfile']['name'];
    }

    static function getSize() {
        return $_FILES['qqfile']['size'];
    }

}

?>