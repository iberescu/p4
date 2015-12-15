<!DOCTYPE html>
<?php $mediaUrl = URL::to('/').'/';
      $baseUrl  = URL::to('/').'/';
?>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
        <title>Designer Editor</title>
        <script type="text/javascript">
            var screen_width = window.innerWidth;
            var iframe_update = true;
            var isFrontEndUser=true;
			var baseUrl = '<?php echo URL::to('/').'/' ?>'
			var project_id = '<?php echo $project_id; ?>';
            var defaultThemeId = '';
            var defaultBackgroundName = '';
            var themesGlobal = JSON.parse('[{"id":"1","name":"theme1","preview_image":"preview.png"}]');
            var previewType = '';
            var mediaUrl = '<?php echo URL::to('/') ?>/designer/';
            var rd_texture = '';
            var shapesGlobal = JSON.parse('[{"id":"20","name":"shape1","file_name":"shape1.svg","activate":"1"},{"id":"21","name":"shape2","file_name":"shape2.svg","activate":"1"},{"id":"22","name":"shape3","file_name":"shape3.svg","activate":"1"},{"id":"23","name":"shape4","file_name":"shape4.svg","activate":"1"}]');
            var backgroundsGlobal = JSON.parse('[{"id":"23","name":"back3","file_name":"texture10.jpg","activate":"1"}]');
            var allowZoomInZoomOut =  true,
                allowGrid          =  true,
                allowSnap          =  true,
                allowUndoRedo      =  true,
                allowFreeDrawing   =  true,
                allowUploadImage   =  true,
                allowText          =  true,
                allowShapes        =  true,
                allowSaveLoad      =  true,
                allowBackgrounds   =  true,
                allowThemes        =  true,
                allowPosition      =  true,
                allowImageQuality  =  true,
                allowFilters       =  true,
                allowClone         =  true,
                allowOpacity       =  true,
                allowDelete        =  true,
                allowRotate        =  true,
                allowScale         =  true,
                allowMouseZoom     =  true,
                allowTitleText     =  true,
                allowHeaderText    =  true,
                allowBodyText      =  true,
                allowTextBox       =  true,
                allowCurveText     =  true,
                allowCurveReverse  =  true,
                allowCurveRadius   =  true,
                allowCurveSpacing  =  true,
                allowBoldText      =  true,
                allowItalicText    =  true,
                allowUnderlineText =  true,
                allowShadowText    =  true,
                allowFontSize      =  true,
                allowFonts         =  true,
                allowGroup         =  true,
                allowAlignment     =  true,
                allowedAlignement  =  [],
                allowBrushes       =  true,
                allowCropImage     =  true,
                allowedBrushes     =  [];
            var facebookAppId      =  12345678;
            var uploadPhotoDirName = 'test';
            var uploadedDirPath    = 'test';
            var ispEnableEdit      =  true;
            var page_slider = 1;
            var gridGroup = null;
            var preloadLogo = "<?php echo $mediaUrl ?>/designer/personalization/html5_files/preload_logo/logo.png"
			<?php if (strlen($json)): ?>
			var designLoad = '<?php echo $json; ?>';
			<?php endif; ?>
        </script>

        <link rel="stylesheet" href="<?php echo $mediaUrl ?>/css/personalization_openeditor.css">
        <link rel="stylesheet" href="<?php echo $mediaUrl ?>/css/svgedit_design.css">
        <link rel="stylesheet" href="<?php echo $mediaUrl ?>/css/floatingcss_v2.css">
        <link rel="stylesheet" href="<?php echo $mediaUrl ?>/css/popup_v5.min.css">
        <link rel="stylesheet" href="<?php echo $mediaUrl ?>/css/bootstrap.min.designer.css">
        <link rel="stylesheet" href="<?php echo $mediaUrl ?>/css/font_v3.min.css">
        <link rel="stylesheet" href="<?php echo $mediaUrl ?>/css/pace.css">
        <link rel="stylesheet" href="<?php echo $mediaUrl ?>/css/style_v12.css">
        <link rel="stylesheet" href="<?php echo $mediaUrl ?>/css/chromoselector.css">
        <link rel="stylesheet" href="<?php echo $mediaUrl ?>/css/cropper.css">
        <link rel="stylesheet" href="<?php echo $mediaUrl ?>/css/jquery.mCustomScrollbar.css">
        <link rel="stylesheet" href="<?php echo $mediaUrl ?>/css/jquery.fancybox.css">
        <link rel="stylesheet" href="<?php echo $mediaUrl ?>/css/jcf.css">
        <style type="text/css">
            <?php
		foreach($fonts as $font ){
			$filename_path  = getcwd(). '/public/fonts/' . $font;
			$filename       = $baseUrl. '/public/fonts/' . $font;
			$src            = '';
			if( file_exists($filename_path . '.eot') )
				$src        .= "url('" . $filename . ".eot?#iefix')  format('embedded-opentype'),";
			if( file_exists($filename_path . '.ttf') )
				$src        .= "url('" . $filename . ".ttf') format('truetype'),";
			if( file_exists($filename_path . '.woff2') )
				$src        .= "url('" . $filename . ".woff2') format('woff2'),";
			if( file_exists($filename_path . '.woff') ){
				$src        .= "url('" . $filename . ".woff') format('woff'),";
			}
			if( file_exists($filename_path . '.svg') )
				$src        .= "url('" . $filename . ".svg') format('svg'),";
			if ( strlen($src) > 0  ) {?>
            @font-face {
                font-family: "<?php echo $font ?>";
            <?php if( $isIE && file_exists($filename_path . '.eot') ){ ?>
                src: url("<?php echo $filename ?>.eot");
            <?php }
	?>
                src: <?php echo trim($src, ',') ?>;
            }
            <?php
			}
		}
	?>
        </style>
        <script src="<?php echo $mediaUrl ?>/js/lib/pace.min.js"></script>
    </head>
    <body id="body">
		<?php echo csrf_field(); ?>
        <div id="fancyboxUploadImage">
           <!-- <div class="titlecontent">
                <div class="icon_content">
                    <div class="fancytitle localUploadBtn">
                        <label class="fa fa-cloud-upload fa-2x"></label>
                    </div>
                </div>
                <div class="icon_content">
                    <div class="fancytitle facebookBtn">
                        <label class="fa fa-facebook fa-2x"></label>
                    </div>
                </div>
                <div class="icon_content">
                    <div class="fancytitle instagramBtn">
                        <label class="fa fa-instagram fa-2x"></label>
                    </div>
                </div>
                <div class="icon_content">
                    <div class="fancytitle">
                        <label class="fa fa-camera fa-2x"></label>
                    </div>
                </div>
				
            </div>-->
            <div class="facebookPickerBody facebookContainer">
                <div class="pickerTitle">
                    <span class="img elem_image-editor-foto-gallery-icon fa fa-picture-o fa-2x"></span>
                    <label>Facebook Albums</label>
                </div>
                <div class="pickerNav">
                    <span id="backToFacebookAlbums" class="img elem_up_arrow"></span>
                </div>
                <div class="imageGalleryBorder">
                    <div class="imageGallery">
                        <div class="connectBtn">Connect to Facebook</div>
                    </div>
                </div>
            </div>
            <div class="instagramPickerBody instagramContainer">
                <div class="pickerTitle">
                    <span class="img elem_image-editor-foto-gallery-icon fa fa-picture-o fa-2x"></span>
                    <label>Instagram Photos</label>
                </div>
                <div class="imageGalleryBorder">
                    <div class="imageGallery">
                        <div class="connectBtn">Connect to Instagram</div>
                    </div>
                </div>
            </div>
            <div class="pickerBody myphotosContainer">
                <div class="pickerTitle">
                    <span class="img elem_image-editor-foto-gallery-icon fa fa-picture-o fa-2x"></span>
                    <label>Upload Image</label>
                </div>
                <div class="imageGalleryBorder">
                    <div class="imageGallery">
                    </div>
                    <input id = "svgedit_upload" class="files-upload-input" type="file" style="display:none;" multiple>
                    <label for="svgedit_upload" class="connectBtn">Upload Image</label>
                </div>
            </div>
            <!-- templates -->
            <div id="facebookAlbumGalleryTemplate" style="display: none">
                <div class="imageContainer">
                    <span class="albumName">Leere Album</span>
                    <u></u>
                    <b></b>
                </div>
            </div>
            <div id="socialImageGalleryImageTemplate" style="display: none">
                <div class="imageContainer hasPhoto">
                    <label></label>
                    <span class="addToGallery">
                        <i class="fa fa-cloud-upload"></i>
                        Add To Gallery
                    </span>
                    <u></u>
                    <b></b>
                </div>
            </div>
            <div id="imageGalleryImageTemplate" style="display: none">
                <div class="imageContainer hasPhoto">
                    <span class="removeImage">
                        <span class="fa fa-trash-o"></span>
                         Delete Image
                    </span>
                    <u></u>
                    <b></b>
                </div>
            </div>
            <div id="loading-mask-images" style="display:none">
                <p class="loader" id="loading_mask_loader-images">
                    <img src="<?php echo $mediaUrl ?>/img/ajax-loader-tr.gif" alt="Loading...">
                    <br />
                    Please wait...
                </p>
            </div>
        </div>
        <div id="fancyboxImageCrop">
            <div class="workingImageArea">
            </div>
            <div class="workingOptions">
                <div class="menuCropOptions">
                    <label class="horizontalFlip">
                        <span class="action_btn">
                            Flip X
                        </span>
                    </label>
                    <label class="vertivalFlip">
                        <span class="action_btn">
                            Flip Y
                        </span>
                    </label>
                    <label class="restoreCrop">
                        <span class="action_btn">
                            Reset
                        </span>
                    </label>
                </div>
                <div class="menuCropCenterOptions">
                    <label class="analyse_pic">
                            Auto Crop
                    </label>
                    <div class="analyse_buttons">
                         <label class="choser_analyse choser_analyse_off ">
                                <span class="action_btn fa fa-times fa-2x"></span>
                         </label>
                         <label class="choser_analyse choser_analyse_on">
                                <span class="action_btn fa fa-check fa-2x"></span>
                         </label>
                    </div>
                </div>
                <div class="menuCropActions">
                    <label class="save_crop">
                        <span class="action_btn save_crop">Save</span>
                    </label>
                </div>
            </div>
        </div>
        <div class="dropZoneMask">
        </div>
        <div class="dropZoneIconMask">
        </div>
        <div id="loadingGif">
            <img id="loadingGif1" src="<?php echo $mediaUrl ?>/img/spinner.gif">
        </div>
        <div id="loading-mask" style="display:none">
            <p class="loader" id="loading_mask_loader">
                <img src="<?php echo $mediaUrl ?>/img/ajax-loader-tr.gif" alt="Loading...">
                <br/>Please wait...
            </p>
        </div>
        <div id="show_preview" style="display: none;">
             <div class="preview_image_show">
                <div id="message_error" style="color:#D60000; text-align: center;">
                    <p><b>An error has occurred!</b></p>
                </div>

                <input type="checkbox" id="checked_download" name="vehicle" style="display: inline;">
                <b>I have double-checked my data!</b></br>

                <a href="" style="font-size: 14px;">Download PDF</a>
            </div>
            <div id="select_page_preview">
            </div>
            <img id="image_preview" src="">
        </div>

        <!-- CREATING CANVAS HERE -->
        <div id="droppable" class="ui-droppable" style="height:900px;">
            <ddiv id="tempCanvas">
            </ddiv>
            <div id="loadingGifCanvas" style="display:none;margin-top:200px;">
                <img id="loadingGifCanvas" src="<?php echo $mediaUrl ?>/img/spinner.gif">
            </div>
            <!--
            <div id="dragZoomContainer">
                <div id="#horizontalContainer">
                    <div class="horizontalScroller">
                    </div>
                </div>
                <div id="#verticalContainer">
                    <div class="verticalScroller">
                    </div>
                </div>
            </div>
            -->
        </div>
        <div id="curvedTextEdit" class="hyperlink">
            Text
            <input type="text" id="curvedTextInput">
            <button id="applyCurvedText" class="btn">Apply</button>
        </div>
        <div class="top_menu">
            <div id="menuBar">
                <div class="menu_bar_container">
                    <button id="btnBackgroundsClick" onClick="runEffectBackgroundsShow()" class="fa fa-cogs fa-2x svgedit_top_button openeditor_themes_container"></button>
                    <button id="btnTextureClick" onClick="runEffectTextureShow()" class="fa fa-picture-o fa-2x svgedit_top_button openeditor_backgrounds_container"></button>
                    <button id="btnShapeClick" onClick="runEffectShapeShow()" class="fa fa-puzzle-piece fa-2x svgedit_top_button openeditor_shapes_container"></button>
                    <button id="btnTextClick" onClick="runEffectTextShow()" class="fa fa-font fa-2x svgedit_top_button openeditor_text_container"></button>
                    <button id="btnCustomClick" onClick="runEffectCustomUpload()" class="fa fa-upload fa-2x svgedit_top_button openeditor_uploadimage_container"></button>
                    <button id="btnSaveClick" class="fa fa-floppy-o fa-2x svgedit_top_button"></button>
                </div>
                <div class="top_zoomin_zoomout openeditor_zoom_container">
                    <button id="btnZoomIn"  class="svgedit_zoom_in fa fa-plus fa-1x"></button>
                    <button id="btnZoomOut" class="svgedit_zoom_in fa fa-minus fa-1x"></button>
                    <div id="lblZoom">
                        zoom
                    </div>
                </div>
                <div class="top_zoomin_zoomout openeditor_undoredo_container">
                    <div class="top_grid_content">
                        <div>
                            undo
                        </div>
                        <button id="btnUndo" onClick="undo()" class="fa fa-undo undo_redo_button";></button>
                    </div>
                    <div class="top_grid_content">
                        <div>
                           redo
                        </div>
                        <button id="btnRedo" onClick="redo()" class="fa fa-repeat undo_redo_button";></button>
                    </div>
                </div>
                <div class="editor_features_top">
                    <div class="top_zoomin_zoomout openeditor_freedrawing_container">
                        <div class="top_grid_content">
                            <div>
                                drawing
                            </div>
                            <button id="btnFreeDrawing" onClick="freeDrawing()" class="fa fa-pencil undo_redo_button";></button>
                        </div>
                    </div>
                    <div class="top_grid top_zoomin_zoomout openeditor_grid_container">
                        <div class="top_grid_content">
                            <div id="lblGrid">
                                grid
                            </div>
                            <button id="btnToggleGrid" class="fa fa-table fa-1x svgedit_grid"></button>
                        </div>
                    </div>
                    <div class="top_grid top_zoomin_zoomout openeditor_snap_container">
                        <div  class="top_grid_content">
                            <div>
                                snap
                            </div>
                            <button id="btnToggleSnap"  class="fa fa-arrows fa-1x svgedit_snap"></button>
                        </div>
                    </div>
                </div>
                <div id='select_page_design'>
                    <div class="current_element">
                        <span class="page_num">Page 1</span>
                        <span style="display:none;"class="arrow-down fa fa-2x fa-caret-down"></span>
                    </div>
                    <ul class="list_page_design">
                    </ul>
                </div>
                <div class="add_new_page_design">
                    <label class="add_page_to_project"><span>Add Page</span></label>
                </div>
                <button id="present" class="btn-present preview_svg">Download</button>
                <button id="back" class="btn_back_product">Back</button>
            </div>
            <div id="editCell">
                <div id="effectEdit">
                    <div class="edit_delete_group openeditor_delete_container">
                        <img src="<?php echo $mediaUrl ?>/img/btn_trash.png" title="delete item from canvas" style="height:36px; width:39px;" onClick="deleteCanvasObject()">
                        <img id="centerDivider" src="<?php echo $mediaUrl ?>/img/divider_new.png" style="height:41px; width:4px; background-repeat:no-repeat;opacity:0;">
                    </div>
                    <div class="openeditor_delete_option openeditor_clone_container">
                        <div class="format_text_messange_center">
                            clone
                        </div>
                        <button id="cloneButton" class="clone_content fa fa-files-o fa-2x"></button>
                    </div>
                    <div id="groupEdit"  class="openeditor_group_container" style="float:left; display:inline; margin-left:15px">
                        <div style="font-size:10px; color:#CCC;clear:right;" align="left">
                            group
                        </div>
                        <img id="groupButton" src="<?php echo $mediaUrl ?>/img/group.png" title="group objects" style="height:30px; width:33px; float: left;" onClick="groupObjects()">
                        <img id="unGroupButton" src="<?php echo $mediaUrl ?>/img/ungroup.png"  title="ungroup object" style="height:30px; width:33px; float: left;" onClick="unGroupObjects()">
                    </div>
                    <div id="effectFreeDrawing" style="display:none;">
                        <div class="openeditor_brushes_container">
                            <div class="openeditor_free_drawing_option pencil">
                                <div>
                                    pencil
                                </div>
                                <button id="freeDrawingPencil" class="free_drawing_content fa fa-pencil fa-2x" data-type="pencil"></button>
                            </div>
                            <div class="openeditor_free_drawing_option cbrush">
                                <div>
                                    circle brush
                                </div>
                                <button id="freeDrawingCircle" class="free_drawing_content fa fa-paint-brush fa-2x" data-type="circle"></button>
                            </div>
                            <div class="openeditor_free_drawing_option vbrush">
                                <div>
                                    vline brush
                                </div>
                                <button id="freeDrawingVline" class="free_drawing_content fa fa-paint-brush fa-2x" data-type="vline"></button>
                            </div>
                            <div class="openeditor_free_drawing_option hbrush">
                                <div>
                                  hline brush
                                </div>
                                <button id="freeDrawingHline" class="free_drawing_content fa fa-paint-brush fa-2x" data-type="hline"></button>
                            </div>
                            <div class="openeditor_free_drawing_option square">
                                <div>
                                   square
                                </div>
                                <button id="freeDrawingSquares" class="free_drawing_content fa fa-square-o fa-2x" data-type="square-form"></button>
                            </div>
                            <div class="openeditor_free_drawing_option circle">
                                <div>
                                   circle
                                </div>
                                <button id="freeDrawingCircles" class="free_drawing_content fa fa-circle-o fa-2x" data-type="circle-form"></button>
                            </div>
                        </div>
                        <div  class='openeditor_sliders_free_drawing' id="openeditorLineWidthSlider">
                            <div class='openeditor_sliders_divider'>
                                <img src="<?php echo $mediaUrl ?>/img/divider_new.png">
                            </div>
                            <div class='openeditor_sliders_drawing_text'>
                                line width
                                <div id="sliderDrawingWidth" style="width:100px; margin-top:10px;">
                                </div>
                            </div>
                        </div>
                        <div class='openeditor_sliders_free_drawing openeditor_slider_squares' id="openeditorBorderSlider" style="display:none">
                            <div class='openeditor_sliders_divider'>
                                <img src="<?php echo $mediaUrl ?>/img/divider_new.png">
                            </div>
                            <div class='openeditor_sliders_drawing_text'>
                                border width
                                <div id="sliderBorderWidth" style="width:100px; margin-top:10px;">
                                </div>
                            </div>
                        </div>
                        <div class="openeditor_picker_border openeditor_slider_squares" style="display:none">
                            color border
                            <div style="margin-top:2px;">
                                <div id="colorPickerBorder" style="margin-left: 15px;" class="hoverBox"></div>
                                <div id="colorPickerContentBorder" class="colorpickermenu_border">
                                    <p class="info_message">To delete drag color to the bottom</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="headerFontPicker">
                        <div>
                            color
                            <div class="content_picker">
                                <div id="colorPicker" class="hoverBoxPicker" name="colorPicker"></div>
                                <div id="colorPickerContent" class="colorpickermenu">
                                    <p class="info_message">To delete drag color to the bottom</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="editCellMiddle">
                        <div id="formatText">
                            <div class="divider_bar">
                                 <img src="<?php echo $mediaUrl ?>/img/divider_new.png">
                            </div>
                            <div class='content_format_text'>
                                <div class="format_text_messange">
                                    text
                                </div>
                                <input type="checkbox" id="bold"/>
                                <label class="openeditor_bold_container"      id="textLabelBold" title="bold" for="bold" style="background-image:url(<?php echo $mediaUrl ?>/img/btn_bold.png);"></label>
                                <input type="checkbox" id="italisized"/>
                                <label class="openeditor_italic_container"    id="textLabelItalisized" title="italic" for="italisized" style="background-image:url(<?php echo $mediaUrl ?>/img/btn_italic.png);"></label>
                                <input type="checkbox" id="underlined"/>
                                <label class="openeditor_shadow_container"    id="textLabelUnderlined" title="underline" for="underlined" style="background-image:url(<?php echo $mediaUrl ?>/img/btn_underline.png);"></label>
                                <input type="checkbox" id="shadow"/>
                                <label class="openeditor_underline_container" id="textLabelShadow" for="shadow" title="shadow" style="background-image:url(<?php echo $mediaUrl ?>/img/btn_shadow.png);"></label>
                            </div>
                            <div class="divider_bar">
                                  <img src="<?php echo $mediaUrl ?>/img/divider_new.png">
                            </div>
                        </div>
                        <div class="content_format_text openeditor_position_container">
                            <div class="format_text_messange">
                               position
                            </div>
                            <label id="bringForwardId" title="bring forward"  class="postion_options fa fa fa-angle-up fa-2x"></label>
                            <label id="sendBackwardId" title="bring backward"  class="postion_options fa fa fa-angle-down fa-2x"></label>
                            <label id="bringToFrontId" title="bring to front"  class="postion_options fa fa-angle-double-up fa-2x"></label>
                            <label id="sendToBackId" title="bring to back"  class="postion_options fa fa-angle-double-down fa-2x"></label>
                        </div>
                        <div class="content_format_text openeditor_opacity_container">
                            <div style="width:130px;" class="format_text_messange">
                                opacity
                                <div id="slider">
                                </div>
                            </div>
                        </div>
                        <div id="alignment" class="content_format_text openeditor_alignment_container">
                            <div class="alignment_options">
                                align
                                <div style="margin-top:0px;">
                                    <div class="dropdown">
                                        <a class="dropdown-toggle" id="textAlign" role="input" data-toggle="dropdown" data-target="#">
                                            <i class="fa fa-align-left"></i>
                                        </a>
                                        <ul class="dropdown-menu" id="alignList" role="menu" aria-labelledby="dLabel">
                                            <li class="left">   <a class="alignOption" tabindex="-1" href="#" data-value="left"><i class="fa fa-align-left"></i>Left</a></li>
                                            <li class="center"> <a class="alignOption" tabindex="-1" href="#" data-value="center"><i class="fa fa-align-center"></i>Center</a></li>
                                            <li class="right">  <a class="alignOption" tabindex="-1" href="#" data-value="right"><i class="fa fa-align-right"></i>Right</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <?php if ( $fonts ): ?>
                            <div id="fontFamily" class="openeditor_fonts_container">
                                <div class="fontFamily_sub" align="left">
                                    font
                                    <div style="margin-top:0px;">

                                        <div class="dropdown">
                                            <a class="dropdown-toggle" id="font" role="input" data-toggle="dropdown" data-target="#">
                                            </a>
                                            <ul class="dropdown-menu" id="fontList" role="menu" aria-labelledby="dLabel">
                                                <?php
                                                    foreach ( $fonts as $font ) {
                                                        ?>
                                                        <li>
                                                            <span class="select-box"></span>
                                                            <a class="fontOption" data-value="<?php echo $font ?>" tabindex="-1" href="#" style="font-family:'<?php echo $font; ?>'"><?php echo $font; ?></a>
                                                        </li>
                                                    <?php
                                                    }
                                                ?>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        <?php endif; ?>
                        <div id="fSize" class="openeditor_fontsize_container">
                            <div>
                                size
                                <div style="margin-top:0px;">
                                    <div class="dropdown">
                                        <a class="dropdown-toggle" id="fontSize" role="input" data-toggle="dropdown" data-target="#">
                                        </a>
                                        <ul class="dropdown-menu" id="fontSizeList" role="menu" aria-labelledby="dLabel">
                                            <li>
                                                <input type="text" style="width: 50px" onkeypress="return event.charCode >= 48 && event.charCode <= 57" id="fontSizeInput"/>
                                                <a class="btn" id="btnFontSize" style="padding: 0 5px">
                                                    <i class="fa fa-check"></i>
                                                </a>
                                            </li>
                                            <li><span class="select-box"></span><a class="fontSizeOption" tabindex="-1" href="#" data-value="6">6</a></li>
                                            <li><span class="select-box"></span><a class="fontSizeOption" tabindex="-1" href="#" data-value="8">8</a></li>
                                            <li><span class="select-box"></span><a class="fontSizeOption" tabindex="-1" href="#" data-value="9">9</a></li>
                                            <li><span class="select-box"></span><a class="fontSizeOption" tabindex="-1" href="#" data-value="10">10</a></li>
                                            <li><span class="select-box"></span><a class="fontSizeOption" tabindex="-1" href="#" data-value="12">12</a></li>
                                            <li><span class="select-box"></span><a class="fontSizeOption" tabindex="-1" href="#" data-value="14">14</a></li>
                                            <li><span class="select-box"></span><a class="fontSizeOption" tabindex="-1" href="#" data-value="18">18</a></li>
                                            <li><span class="select-box"></span><a class="fontSizeOption" tabindex="-1" href="#" data-value="20">20</a></li>
                                            <li><span class="select-box"></span><a class="fontSizeOption" tabindex="-1" href="#" data-value="24">24</a></li>
                                            <li><span class="select-box"></span><a class="fontSizeOption" tabindex="-1" href="#" data-value="28">28</a></li>
                                            <li><span class="select-box"></span><a class="fontSizeOption" tabindex="-1" href="#" data-value="36">36</a></li>
                                            <li><span class="select-box"></span><a class="fontSizeOption" tabindex="-1" href="#" data-value="42">42</a></li>
                                            <li><span class="select-box"></span><a class="fontSizeOption" tabindex="-1" href="#" data-value="48">48</a></li>
                                            <li><span class="select-box"></span><a class="fontSizeOption" tabindex="-1" href="#" data-value="54">54</a></li>
                                            <li><span class="select-box"></span><a class="fontSizeOption" tabindex="-1" href="#" data-value="62">62</a></li>
                                            <li><span class="select-box"></span><a class="fontSizeOption" tabindex="-1" href="#" data-value="68">68</a></li>
                                            <li><span class="select-box"></span><a class="fontSizeOption" tabindex="-1" href="#" data-value="72">72</a></li>
                                            <li><span class="select-box"></span><a class="fontSizeOption" tabindex="-1" href="#" data-value="112">112</a></li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id="imageQuality" class="openeditor_quality_container">
                            <div class="divider_bar">
                                <img src="<?php echo $mediaUrl ?>/img/divider_new.png">
                            </div>
                            <div class="image_quality_container">
                                quality
                                <span class="icon"></span>
                            </div>
                        </div>
                        <div id="imageCrop" class="openeditor_crop_container">
                            <div id="imageCropHandler" class="image_crop_container" href="#fancyboxImageCrop">
                                crop
                                <span class=" fa fa-crop fa-2x"></span>
                            </div>
                        </div>
                        <div id="imageFilters" class="openeditor_filters_container">
                            <div class="divider_bar">
                                <img src="<?php echo $mediaUrl ?>/img/divider_new.png">
                            </div>
                            <div class="filter_name">
                                <div class="format_text_messange">
                                    grayscale
                                </div>
                                <button  data-filter='0' class="filters_options fa fa-square-o fa-2x"></button>
                            </div>
                            <div class="filter_name">
                                <div class="format_text_messange">
                                    sepia2
                                </div>
                                <button  data-filter='1' class="filters_options fa fa-square-o fa-2x"></button>
                            </div>
                            <div class="filter_name">
                                <div class="format_text_messange">
                                    sepia
                                </div>
                                <button  data-filter='2' class="filters_options fa fa-square-o fa-2x"></button>
                            </div>
                            <div class="filter_name">
                                <div class="format_text_messange">
                                   invert
                                </div>
                                <button  data-filter='3' class="filters_options fa fa-square-o fa-2x"></button>
                            </div>
                            <div class="filter_name">
                                <div class="format_text_messange">
                                   emboss
                                </div>
                                <button  data-filter='4' class="filters_options fa fa-square-o fa-2x"></button>
                            </div>
                            <div class="filter_name">
                                <div class="format_text_messange">
                                    sharpen
                                </div>
                                <button  data-filter='5' class="filters_options fa fa-square-o fa-2x"></button>
                            </div>
                            <div class="filter_name">
                                <div class="format_text_messange">
                                    blur
                                </div>
                                <button  data-filter='6' class="filters_options fa fa-square-o fa-2x"></button>
                            </div>
                        </div>
                            <!--curved text options-->
                        <div id="editCellRight">
                            <div id="formatTextCurved">
                                <div class="divider_bar">
                                    <img src="<?php echo $mediaUrl ?>/img/divider_new.png">
                                </div>
                                <div class="reverse_curve_text openeditor_reverse_container" style="">
                                    <div class="format_text_messange">
                                        reverse
                                    </div>
                                    <input type="checkbox" id="reverse"/>
                                    <label id="textLabelReverse" for="reverse" class="fa fa-level-up fa-2x"></label>
                                </div>
                                <div class="slider_container openeditor_radius_container">
                                    <span>radius</span>
                                    <div id="slider_radius"></div>
                                </div>
                                <div class="slider_container openeditor_spacing_container">
                                    <span>spacing</span>
                                    <div id="slider_spacing"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- backgrounds section -->
                <div id="effectBackgrounds">
                    <div>
                        <ul id="ddmenubackground">

                            <li style="height:130px; font-family: Lato, sans-serif; background-color:transparent; font-size:12px;color:white"><p id="themesMenu" style="width:auto;"><b>drag a theme into your Canvas</b><span style="color:#93eefd;">&nbsp;&raquo;</span></p>

                            </li>
                        </ul>
                    </div>
                    <button id="btnScrollPanelLeftThemes" style="float:left; background-image:url(<?php echo $mediaUrl ?>/img/arrowLeft.png); height:30px; width:30px; margin-left:-50px; margin-right:5px; margin-top:50px; background-color: transparent; background-repeat:no-repeat;"></button>
                    <div style="float:left; margin-left:-13px; width:670px; overflow:hidden">
                        <div id="animateBackgrounds" style="float:left; width:670px; position:relative;">
                        </div>
                    </div>
                    <button id="btnScrollPanelRightThemes" style="float:left; background-image:url(<?php echo $mediaUrl ?>/img/arrowRight.png); height:30px; width:30px; margin-left:6px; margin-right:10px; margin-top:50px; background-color: transparent; background-repeat:no-repeat;"></button>
                </div>
                <!-- text section -->
                <div id="effectText">
                    <div>
                        <ul id="ddmenubackground">

                            <li style="height:130px; font-family: Lato, sans-serif; background-color:transparent; font-size:12px;color:white"><p id="themesMenu" style="width:auto;"><b>drag text into your Canvas</b><span style="color:#93eefd;">&nbsp;&raquo;</span></p>

                            </li>
                        </ul>
                    </div><div style="float:left; width:738px; overflow:hidden">
                        <div id="animateText">
                            <div id="draggableText0" data-type="text" data-location="images/text" data-name="title" class="ui-draggable openeditor_title_container">
                                <img src="<?php echo $mediaUrl ?>/img/title.png" alt="map" height="50" width="50">
                            </div>
                            <div id="draggableText1" data-type="text" data-location="images/text" data-name="header" class="ui-draggable openeditor_header_container">
                                <img src="<?php echo $mediaUrl ?>/img/header2.png" alt="map" height="50" width="50">
                            </div>
                            <div id="draggableText2" data-type="text" data-location="images/text" data-name="body" class="ui-draggable openeditor_body_container">
                                <img src="<?php echo $mediaUrl ?>/img/body.png" alt="map" height="50" width="50">
                            </div>
                            <div id="draggableText3" data-type="text" data-location="images/text" data-name="curve" class="ui-draggable openeditor_curve_container">
                                <img src="<?php echo $mediaUrl ?>/img/curve.png" alt="map" height="50" width="50">
                            </div>
                            <div id="draggableText4" data-type="text" data-location="images/text" data-name="textbox" class="ui-draggable openeditor_textbox_container">
                                <img src="<?php echo $mediaUrl ?>/img/textbox.png" alt="map" height="50" width="50">
                            </div>
                        </div>
                    </div>
                </div>
                <!-- textures section -->
                <div id="effectTexture">
                    <div>
                        <ul id="ddmenubackground">

                            <li style="height:130px; font-family: Lato, sans-serif; background-color:transparent; font-size:12px;color:white"><p id="themesMenu" style="width:auto;"><b>drag a texture into your Canvas</b><span style="color:#93eefd;">&nbsp;&raquo;</span></p>

                            </li>
                        </ul>
                    </div>
                    <button id="btnScrollTexturesLeft" style="float:left; background-image:url(<?php echo $mediaUrl ?>/img/arrowLeft.png); height:30px; width:30px; margin-left:-45px; margin-right:17px; margin-top:12px; background-color: transparent; background-repeat:no-repeat;"></button>
                    <div style="float:left; width:738px; overflow:hidden">
                        <div id="animateTextures" style="float:left; width:750px; position:relative;">
                        </div>
                    </div>
                    <button id="btnScrollTexturesRight" style="float:left; background-image:url(<?php echo $mediaUrl ?>/img/arrowRight.png); height:30px; width:30px; margin-left:14px; margin-right:10px; margin-top:12px; background-color: transparent; background-repeat:no-repeat;"></button>
                </div>
                <!-- shapes section -->
                <div id="effectShape">
                    <div>
                        <ul id="ddmenubackground">

                            <li style="height:130px; font-family: Lato, sans-serif; background-color:transparent; font-size:12px;color:white "><p id="themesMenu" style="width:auto;"><b>drag a shape into your Canvas</b><span style="color:#93eefd;">&nbsp;&raquo;</span></p>

                            </li>
                        </ul>
                    </div>
                    <button id="btnScrollShapesLeft" style="float:left; background-image:url(<?php echo $mediaUrl ?>/img/arrowLeft.png); height:30px; width:30px; margin-left:-45px; margin-right:17px; margin-top:12px; background-color: transparent; background-repeat:no-repeat;"></button>
                    <div style="float:left; width:738px; overflow:hidden">
                        <div id="animateShapes" style="float:left;width:750px; position:relative;">
                        </div>
                    </div>
                    <button id='btnScrollShapesRight' style='float:left; background-image:url(<?php echo $mediaUrl ?>/img/arrowRight.png); height:30px; width:30px; margin-left:22px; margin-right:10px; margin-top:12px; background-color: transparent; background-repeat:no-repeat;'></button>
                </div>
                <!-- upload section-->
                <div id="effectUploader">
                    <div style="float:left;">
                        <div class="clearfix bottom-thumbnails">
                            <input id="svgedit_upload" class="files-upload-input" style="visibility: hidden;" type="file" multiple/>
                            <div class="thumbnails" style="  margin-top: -30px;">
                                <div class="jcarousel-skin-pages clearfix">
                                    <div class="jcarousel-container-vertical images-carousel">
                                        <label href="#fancyboxUploadImage" class="f-images_prev svgedit_upload_picture jcarousel-nav jcarousel-add-vertical fa fa-plus fa-2x"></label>
                                        <button id="prev_button_upload" style=" background-image:url(<?php echo $mediaUrl ?>/img/arrowLeft.png);"></button>
                                        <div class="f-images jcarousel jcarousel-clip jcarousel-clip-vertical">
                                            <ul class="f-thm_images jcarousel-list jcarousel-list-vertical ul_svg_edit" style="left: 0px; top: 0px; overflow:hidden; width:200000px; display:table;">

                                                <li class="jcarousel-item jcarousel-item-vertical f-placeholder svgedit_carousel">
                                                    <div class="placeholder add" style="width:100%;height:100%;"></div>
                                                </li>
                                                <li class="jcarousel-item jcarousel-item-vertical f-placeholder svgedit_carousel">
                                                    <div class="placeholder add" style="width:100%;height:100%;"></div>
                                                </li>
                                                <li class="jcarousel-item jcarousel-item-vertical f-placeholder svgedit_carousel">
                                                    <div class="placeholder add" style="width:100%;height:100%;"></div>
                                                </li>
                                                <li class="jcarousel-item jcarousel-item-vertical f-placeholder svgedit_carousel">
                                                    <div class="placeholder add" style="width:100%;height:100%;"></div>
                                                </li>
                                                <li class="jcarousel-item jcarousel-item-vertical f-placeholder svgedit_carousel">
                                                    <div class="placeholder add" style="width:100%;height:100%;"></div>
                                                </li>
                                                <li class="jcarousel-item jcarousel-item-vertical f-placeholder svgedit_carousel">
                                                    <div class="placeholder add" style="width:100%;height:100%;"></div>
                                                </li>
                                                <li class="jcarousel-item jcarousel-item-vertical f-placeholder svgedit_carousel">
                                                    <div class="placeholder add" style="width:100%;height:100%;"></div>
                                                </li>
                                                <li class="jcarousel-item jcarousel-item-vertical f-placeholder svgedit_carousel">
                                                    <div class="placeholder add" style="width:100%;height:100%;"></div>
                                                </li>
                                            </ul>
                                        </div>

                                        <button id="next_button_upload" style="background-image:url(<?php echo $mediaUrl ?>/img/arrowRight.png); "></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- upload save-->
                <div id="effectSave">
                    <div class="save_div_side">
                        <div style="float:left;margin-left:30px;">
                            <div style="margin-top:40px;">
                                <p style="color:#ffffff; width:150px;"><b> Project Name:</b></p>
                                <input type="text" id="project_name">
                            </div>
                           <!-- <div>
                                <p style="color:#ffffff;width:150px"><b> Project Description:</b></p>
                                <input type="text" id="project_description">
                            </div>-->
                        </div>
                        <button id="save_button_design">Save</button>
                        <p style="color:#ffffff;width:150px;float:left;margin-left:20px;margin-top:35px;" id="save_message"></p>
                    </div>
                    <div class="load_div_side" style="display:none;">
                        <div style="float:left;margin-left:30px;margin-top:35px;">
                            <p style="color:#ffffff;width:150px;margin-top:3px;"><b> Select a project</b></p>
                            <select id="select_theme">

                            </select>
                        </div>
                        <button id="load_button_design" class="">Load</button>
                        <p style="color:#ffffff;width:150px;float:left;margin-left:20px;margin-top:35px;" id="save_message_load"></p>
                    </div>
                </div>
            </div>
        </div>
        <nav id="leftSideMenu" class="left_side_menu">
            <span class="fa fa-angle-double-right fa-3x revision_history_desingn">
            </span>
            <div class="revision_history_content">
                <h5 class="title">Revision History</h5>
                <ul class="revision_history_list">
                </ul>
            </div>
        </nav>
        <script src="<?php echo $mediaUrl ?>/js/lib/fabric.1.4.5.39.js" crossorigin=""></script>
        <script src="<?php echo $mediaUrl ?>/js/lib/jquery-1.7.2.min.js" crossorigin=""></script>
        <script src="<?php echo $mediaUrl ?>/js/lib/jquery.ui.core.min.js"></script>
        <script src="<?php echo $mediaUrl ?>/js/lib/jquery.ui.widget.min.js"></script>
        <script src="<?php echo $mediaUrl ?>/js/lib/jquery.ui.mouse.min.js"></script>
        <script src="<?php echo $mediaUrl ?>/js/lib/jquery.ui.dialog.min.js"></script>
        <script src="<?php echo $mediaUrl ?>/js/lib/jquery.ui.draggable.min.js"></script>
        <script src="<?php echo $mediaUrl ?>/js/lib/jquery.ui.droppable.min.js"></script>
        <script src="<?php echo $mediaUrl ?>/js/lib/jquery.ui.effect.min.js"></script>
        <script src="<?php echo $mediaUrl ?>/js/lib/jquery.mousewheel.min.js"></script>
        <script src="<?php echo $mediaUrl ?>/js/lib/jquery.ui.effect-slide.min.js"></script>
        <script src="<?php echo $mediaUrl ?>/js/lib/jquery.ui.slider.min.js"></script>
        <script src="<?php echo $mediaUrl ?>/js/lib/jquery.ui.resizable.js"></script>
        <script src="<?php echo $mediaUrl ?>/js/lib/jquery.ui.button.min.js"></script>
        <script src="<?php echo $mediaUrl ?>/js/lib/jquery.ui.position.min.js"></script>
        <script src="<?php echo $mediaUrl ?>/js/lib/chromoselector.min.js"></script>
        <script src="<?php echo $mediaUrl ?>/js/lib/jquery.easing.1.3.js"></script>
        <script src="<?php echo $mediaUrl ?>/js/lib/fancybox/jquery.fancybox.pack.js"></script>
        <script src="<?php echo $mediaUrl ?>/js/lib/cropperjs/cropper.js"></script>
        <script src="<?php echo $mediaUrl ?>/js/lib/smartcrop/smartcrop.js"></script>
        <script src="<?php echo $mediaUrl ?>/js/popup.js" crossorigin=""></script>
        <script src="<?php echo $mediaUrl ?>/js/globals.js"></script>
        <script src="<?php echo $mediaUrl ?>/js/includeAnimations.js"></script>
        <script src="<?php echo $mediaUrl ?>/js/draggables.js"></script>
        <script src="<?php echo $mediaUrl ?>/js/mainmenu.js"></script>
        <script src="<?php echo $mediaUrl ?>/js/eventListeners.js"></script>
        <script src="<?php echo $mediaUrl ?>/js/lib/bootstrap.min.js"></script>
        <script src="<?php echo $mediaUrl ?>/js/addElementsToCanvas.js"> </script>
        <script src="<?php echo $mediaUrl ?>/js/updateFabricJSON.js"> </script>
        <script src="<?php echo $mediaUrl ?>/js/drawShapes.js"> </script>
        <script src="<?php echo $mediaUrl ?>/js/lib/jcarousel.v0.3.3.js"></script>
        <script src="<?php echo $mediaUrl ?>/js/lib/jquery.mCustomScrollbar.js"></script>
        <script src="<?php echo $mediaUrl ?>/js/lib/imagesloaded.pkgd.min.js"></script>
        <script src="<?php echo $mediaUrl ?>/js/lib/jqache-0.1.1.js"></script>
        <script src="<?php echo $mediaUrl ?>/js/lib/jcf.js"></script>
        <script src="<?php echo $mediaUrl ?>/js/lib/jcf.scrollable.js"></script>
        <script src="<?php echo $mediaUrl ?>/js/lib/jquery.popupWindow.js"></script>
    </body>
    <script src="<?php echo $mediaUrl ?>/js/personalization_ready.js"></script>
    <script src="<?php echo $mediaUrl ?>/js/personalization_upload.js"></script>
    <script src="<?php echo $mediaUrl ?>/js/svgedit_functions.js"></script>
    <script src="<?php echo $mediaUrl ?>/js/lib/jquery.ui.touch-punch.min.js"></script>
    <!--<script src=".js/personalization_editor.js"></script>-->
    <script> var width_canvas = window.innerWidth - $( '.frame_preview' ).width();</script>
    <script>
        if ( screen_width > 1460 && previewType == 'tdpreview' )
            $( '.ui-droppable' ).css( 'width', '60%' );
        else
            $( '.ui-droppable' ).css( 'width', '100%' );
    </script>
</html>