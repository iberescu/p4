	var _currentOpenPanel = null;
	var _currentEditPanel = 0;
	var _jsObject;
	var _isGrid = false;
	var _isFreeDrawing=false;
    var _notActiveColor="#5C5C5C";
    var _drawingRect;
    var _isDrawingRectangle=false;
    var _drawingCircle;
    var _isDrawingCircle=false;
	var _activeColor="#27B7F5";
	var shiftKeyPressed=false;
    var  propertiesToIncludeCanvas =['width', 'height','lockMovementX', 'lockMovementY', 'lockRotation','hasControls','selectable', 'lockScalingX', 'lockScalingY', 'lockUniScaling','setHelper','setBlocker','designerOptions','cropObjectData'];
    var  pageImageCachePreview={};
	var lockFade = false;
    var leftline=null;
    var leftlineInside=null;
    var worker;
    var rightline=null;
    var rightlineInside=null;
    var topline=null;
    var toplineInside=null;
    var bottomline=null;
    var bottomlineInside=null;
    var canvas_svg_array=[];
    var edgedetection = 10; //pixels to snap
    var isColorPickerOpen=false;
    var isColorPickerBorderOpen=false;
    var selectedRightClickObjectPosition=-1;
	// 0=portrait 1=landscape 2=mobile
	var textureMode = 0;
	var textureName = "texture12Landscape.jpg";
	// GLOBAL 2D CANVAS
	var canvas;
	var canvasScale = 1.0;
	// FULL HEIGHT OF PAGE;
	var _pageHeight = "1000px";
	// WIDTH OF SIDE PANEL WITH VECTOR IMAGES TO DRAG
	var _panelWidth = "100%";
	var _panelHeight = "100%";
    var inchToPixels=0.010416667;
    var pixelToInch=96;
	// **********************************************
	// OBJECTS
	var textList = new Array("title",'header','body','curve','textbox');
    var themePageContent=new Array();
    var textureModeLeft = 0;
    var canvasOffsetHeight = 0,
    textureModeTop = 0,
    textureModeWidth = 0,
    textureModeHeight = 0,
    customScale = 1,
    customScaleX = 1,
    customScaleY = 1,
    oldVersionCanvasWidth = 1240,
    oldVersionCanvasHeight = 880,
    dropElementId = 'c',
    groupCanvas = '',
    lastCustomScaleY = 0,
    tempCanvas,
    loading=false,
    temptextureMode= 0,
    objectModify = false,
    pkey= 0,
    nameCanvasToDelete2 = '',
    isCustomerVisual = 0,
    isLoadTemp = 0;
    var event;