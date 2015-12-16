<?php 
namespace App\Classes;

class DesignerHelpers {
	
	 static function createImageThumbnail( $params ) {
		$success = false;
		$result  = null;
		//print_r($params);die();
		try {
			if( ! isset( $params['destDir'] ) )
			throw new Exception( 'Destination dir is missing!' );
			$destDir = $params['destDir'];
			if( ! isset( $params['oName'] ) )
			throw new Exception( 'Filename is missing!' );
			$oName = $params['oName'];
			if( ! file_exists( $destDir . $oName ) )
			throw new Exception( 'Image is missing' );
			
			$tName = $oName . '_thumb';
			if( isset( $params['tName'] ) )
			$tName = $params['tName'];
			
			$width = 100;
			if( isset( $params['width'] ) ) {
				$width = $params['width'];
				if( $params['width'] == 'auto' )
				$width = null;
			}
			
			$height = 100;
			if( isset( $params['height'] ) ) {
				$height = $params['height'];
				if( $height == 'auto' )
				$height = null;
			}
			
			$imageObj = new \Imagick( $destDir . $oName );
			$imageObj->resizeImage( $width, $height, \imagick::FILTER_LANCZOS, 1, false );
		   
			$resp   = $imageObj->writeImage( $destDir . $tName );
			$result = $tName;
			if( ! file_exists( $destDir . $tName ) )
			throw new Exception( 'Cannot create thumbnail' );
			$success = true;
			} catch( Exception $e ) {
			$result = $e->getMessage() ;
			} catch( Exception $e ) {
			$result =  $e->getMessage() ;
			}
		
		return array(
		'success' => $success,
		'result'  => $result
		);
	}
	
	 static function createWorkingImage( $params ) {
		$success = false;
		$result  = null;
		try {
			if( ! isset( $params['destDir'] ) )
				throw new Exception( 'Destination dir is missing!' );
			$destDir = $params['destDir'];
			if( ! isset( $params['oName'] ) )
				throw new Exception( 'Filename is missing!' );
			$oName = $params['oName'];
			if( ! file_exists( $destDir . $oName ) )
				throw new Exception( 'Image is missing' );
			if( ! isset( $params['tName'] ) ) {
				$tName = $oName . '_working';
			}
			else {
				$tName = $params['tName'];
			}
			if( isset( $params['wName'] ) )
				$tName = $params['wName'];
			$quality = 80;
			if( isset( $params['quality'] ) ) {
				$quality = $params['quality'];
			}
			$productEditor = false;
			if( isset( $params['productEditor'] ) ) {
				$productEditor = $params['productEditor'];
			}
			$width  = 0;
			$height = 0;
			if( isset( $params['width'] ) )
				$width = $params['width'];
			if( isset( $params['height'] ) )
				$height = $params['height'];
			$imageObj        = new \Imagick( $destDir . $oName );
			$original_width  = $imageObj->getImageWidth();
			$original_height = $imageObj->getImageHeight();
		   
			if( $productEditor ) {
				if( isset( $width ) && $width != 0 && $width > $height ) {
					$imageObj->resizeImage( $width, $height, \imagick::FILTER_LANCZOS, 1, true  );
				}
				elseif( isset( $height ) && $height != 0 ) {
					$imageObj->resizeImage( $width, $height,\imagick::FILTER_LANCZOS, 1, true );
				}
			}
			else {
				if( $imageObj->getImageWidth() > $imageObj->getImageHeight() && $imageObj->getImageWidth() > 1400 ) {
					$imageObj->resizeImage( 1400, 1400,\imagick::FILTER_LANCZOS, 1, true );
				}
				else if( $imageObj->getImageHeight() > 1400 ) {
					$imageObj->resizeImage( 1400, 1400,\imagick::FILTER_LANCZOS, 1, true );
				}
			}
			$imageObj->setCompressionQuality( $quality );
			$resp = $imageObj->writeImage( $destDir . $tName );
			if( $productEditor ) {
				$result['image']        = $tName;
				$result['actualWidth']  = $imageObj->getImageWidth();
				$result['actualHeight'] = $imageObj->getImageHeight();
				$result['ratioWidth']   = $original_width / $imageObj->getImageWidth();
				$result['ratioHeight']  = $original_height / $imageObj->getImageHeight();
			}
			else {
				$result = $tName;
			}
			if( ! file_exists( $destDir . $tName ) )
				throw new Exception( 'Cannot create working image' );
			$success = true;
		} catch( Exception $e ) {
			$result = $e->getMessage();
		} catch( Exception $e ) {
			$result = $e->getMessage();
		}
		return array(
			'success' => $success,
			'result'  => $result
		);
	}
	
}
?>			
