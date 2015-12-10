// JavaScript Document
var undoCheck = 0;
var undoArry = [];
var redoArry = [];
var tempJSON;
// ADD EVENT LISTENER FOR DOUBLE CLICK
fabric.util.addListener( fabric.document, 'dblclick', dblClickHandler );

fabric.Object.prototype.originX = fabric.Object.prototype.originY = 'center';

function initCanvas () {
    var canvasElement = $( document.createElement( 'canvas' ) );
    canvasElement.attr( {
        id : 'c'
    } );
    $( "#droppable" ).append( canvasElement );

    canvas = new fabric.Canvas( 'c' );
    canvas.backgroundColor = 'rgba(255,255,255,1.0)';

    canvas.setWidth( 730 );
    canvas.setHeight( 801 );
    canvas.allowTouchScrolling=true;
    canvas.renderAll();
    canvas.controlsAboveOverlay = true;
    canvas.preserveObjectStacking = true;
    var canvasElement2 = $( document.createElement( 'canvas' ) );
    canvasElement2.attr( {
        id : 'c1'
    } );
    $( "#tempCanvas" ).append( canvasElement2 );
    tempCanvas = new fabric.Canvas( 'c1' );
    tempCanvas.setWidth( 730 );
    tempCanvas.setHeight( 801 );
    tempCanvas.renderAll();
    observe( 'object:selected' );
    observe( 'selection:cleared' );
    var currentStage = [];
    $( '.upper-canvas' ).bind( 'contextmenu', function( e ) {
        return false;
    } );
    canvas.on( 'object:moving', function( e ) {
        $( '#contextMenuCanvasRightClick' ).remove();
    } );
    canvas.on( 'selection:cleared', function( e ) {
        $( '#contextMenuCanvasRightClick' ).remove();
    } );
    canvas.on( 'before:selection:cleared', function( ev ) {
        if ( selectedRightClickObjectPosition!=-1 ) {
            var obj = canvas.getActiveObject();
            fabric.util.removeFromArray( canvas.getObjects(), obj  );
            canvas.getObjects().splice( selectedRightClickObjectPosition, 0, obj );
            selectedRightClickObjectPosition = -1;
            canvas.renderAll();
        }
    } );
    canvas.on( 'path:created', function( object ) {
        if ( canvas.isDrawingMode ) {
            pushUndoData( [
                {
                    objectId : object.path.objectID,
                    added    : object.path
                }
            ] );
        }
    } );
    canvas.on( 'before:mouse:down', function( e ) {
        if ( e.e.buttons == 2 ) return;
        if ( _isFreeDrawing && ($( '#freeDrawingSquares' ).attr( 'data-active' ) == "true" || $( '#freeDrawingCircles' ).attr( 'data-active' ) == "true") ) {
            canvas.isDrawingMode = false;
            canvas.selection = false;
            canvas.forEachObject( function( o ) {
                o.selectable = false;
            } );
        }
    } );
    canvas.on( 'mouse:down', function( e ) {
        /*draw rectangle*/
        if ( _isFreeDrawing && $( '#freeDrawingSquares' ).attr( 'data-active' ) == "true" ) {
            _isDrawingRectangle = true;
            var pointer = canvas.getPointer( e.e );
            origX = pointer.x;
            origY = pointer.y;
            _drawingRect = new fabric.Rect( {
                left        : origX,
                top         : origY,
                originX     : 'left',
                originY     : 'top',
                width       : 0,
                height      : 0,
                angle       : 0,
                fill        : $( '#colorPicker' ).css( "background-color" ),
                stroke      : $( '#colorPickerBorder' ).css( "background-color" ),
                strokeWidth : $( '#sliderBorderWidth' ).slider( 'value' )
            } );
            canvas.add( _drawingRect );
        }
        /*end*/
        /*draw circle*/
        if ( _isFreeDrawing && $( '#freeDrawingCircles' ).attr( 'data-active' ) == "true" ) {
            _isDrawingCircle = true;
            var pointer = canvas.getPointer( e.e );
            origX = pointer.x;
            origY = pointer.y;
            _drawingCircle = new fabric.Circle( {
                left        : origX,
                top         : origY,
                originX     : 'center',
                originY     : 'center',
                radius      : 0,
                fill        : $( '#colorPicker' ).css( "background-color" ),
                stroke      : $( '#colorPickerBorder' ).css( "background-color" ),
                strokeWidth : $( '#sliderBorderWidth' ).slider( 'value' )
            } );
            canvas.add( _drawingCircle );
        }
        /*end*/
        var activeObject = e.target;
        if ( activeObject ) {
            if ( typeof(activeObject.objects) == 'undefined' ) {
                currentStage = [
                    {
                        objectId : activeObject.objectID,
                        oldStage : {
                            left          : activeObject.left,
                            top           : activeObject.top,
                            width         : activeObject.width,
                            height        : activeObject.height,
                            angle         : activeObject.angle,
                            currentHeight : activeObject.currentHeight,
                            currentWidth  : activeObject.currentWidth,
                            scaleX        : activeObject.scaleX,
                            scaleY        : activeObject.scaleY
                        }
                    }
                ];
            }
            else {
                currentStage = [];
                for ( var index in activeObject.objects ) {
                    if ( activeObject.objects[index] ) {
                        currentStage.push( {
                            objectId : activeObject.objects[index].objectID,
                            oldStage : {
                                left          : activeObject.objects[index].left + activeObject.left,
                                top           : activeObject.objects[index].top + activeObject.top,
                                width         : activeObject.objects[index].width,
                                height        : activeObject.objects[index].height,
                                angle         : activeObject.objects[index].angle,
                                currentHeight : activeObject.objects[index].currentHeight,
                                currentWidth  : activeObject.objects[index].currentWidth,
                                scaleX        : activeObject.objects[index].scaleX,
                                scaleY        : activeObject.objects[index].scaleY
                            }
                        } );
                    }
                }
            }
        }
    } );
    canvas.on( 'mouse:move', function( e ) {
        if ( _isDrawingRectangle ) {
            var pointer = canvas.getPointer( e.e );

            if ( origX > pointer.x ) {
                _drawingRect.set( { left : Math.abs( pointer.x ) } );
            }
            if ( origY > pointer.y ) {
                _drawingRect.set( { top : Math.abs( pointer.y ) } );
            }
            _drawingRect.set( { width : Math.abs( origX - pointer.x ) } );
            _drawingRect.set( { height : Math.abs( origY - pointer.y ) } );
            canvas.renderAll();
        }
        if ( _isDrawingCircle ) {
            var pointer = canvas.getPointer( e.e );
            _drawingCircle.set( { radius : Math.abs( origX - pointer.x ) } );
            canvas.renderAll();
        }
    } );
    canvas.on( 'mouse:up', function( e ) {
        if ( _isDrawingRectangle ) {
            canvas.selection = true;
            _drawingRect.setCoords();
            canvas.renderAll();
            canvas.isDrawingMode = true;
            _isDrawingRectangle = false;
            pushUndoData( [
                {
                    objectId : _drawingRect.objectID,
                    added    : _drawingRect
                }
            ] );
            canvas.forEachObject( function( o ) {
                o.selectable = true;
            } );
        }
        if ( _isDrawingCircle ) {
            canvas.selection = true;
            _drawingCircle.setCoords();
            canvas.renderAll();
            canvas.isDrawingMode = true;
            _isDrawingCircle = false;
            pushUndoData( [
                {
                    objectId : _drawingCircle.objectID,
                    added    : _drawingCircle
                }
            ] );
            canvas.forEachObject( function( o ) {
                o.selectable = true;
            } );
        }
      
        var activeObject = e.target;
        if ( activeObject ) {
            if ( typeof(activeObject.objects) == 'undefined' ) {
                var momentStage = {
                    objectId : activeObject.objectID,
                    newStage : {
                        left          : activeObject.left,
                        top           : activeObject.top,
                        width         : activeObject.width,
                        height        : activeObject.height,
                        angle         : activeObject.angle,
                        currentHeight : activeObject.currentHeight,
                        currentWidth  : activeObject.currentWidth,
                        scaleX        : activeObject.scaleX,
                        scaleY        : activeObject.scaleY
                    }
                };
                currentStage.forEach( function( objStage ) {
                    if ( momentStage.objectId == objStage.objectId ) {
                        if ( JSON.stringify( momentStage.newStage ) != JSON.stringify( objStage.oldStage ) ) {
                            var undoData = objStage;
                            undoData.newStage = momentStage.newStage;
                            pushUndoData( [undoData] );
                        }
                    }
                } );
            }
            else {
                var changeArray = [];
                for ( var index in activeObject.objects ) {
                    if ( activeObject.objects[index] ) {
                        var momentStage = {
                            objectId : activeObject.objects[index].objectID,
                            newStage : {
                                left          : activeObject.objects[index].left + activeObject.left,
                                top           : activeObject.objects[index].top + activeObject.top,
                                width         : activeObject.objects[index].width,
                                height        : activeObject.objects[index].height,
                                angle         : activeObject.objects[index].angle,
                                currentHeight : activeObject.objects[index].currentHeight,
                                currentWidth  : activeObject.objects[index].currentWidth,
                                scaleX        : activeObject.objects[index].scaleX,
                                scaleY        : activeObject.objects[index].scaleY
                            }
                        };
                        currentStage.forEach( function( objStage ) {
                            if ( momentStage.objectId == objStage.objectId ) {
                                if ( JSON.stringify( momentStage.newStage ) != JSON.stringify( objStage.oldStage ) ) {
                                    var undoData = objStage;
                                    undoData.newStage = momentStage.newStage;
                                    changeArray.push( undoData );
                                }
                            }
                        } );
                    }
                    if ( index == activeObject.objects.length - 1 ) {
                        if ( changeArray.length ) {
                            pushUndoData( changeArray );
                        }
                    }
                }
            }
        }

        objects = canvas.getHelpers( true );
        objects.forEach( function( obj, key ) {
            if ( typeof obj.setHelper !== 'undefined' && obj.setHelper == true ) {
                obj.bringToFront();
            }
        } );
        canvas.renderAll();
    } );
    canvas.on( 'mouse:up', function( e ) {
            update_iframe();
        } );
    canvas.on( "object:added", function( e ) {
        if(typeof  e.target.isSnapLine !=='undefined' &&  e.target.isSnapLine==true){
            return;
        }
        observeHelpers(e);
    } );
}

function dblClickHandler () {
    var object = canvas ? canvas.getActiveObject() : null;

    if ( object && (object.type == "text" || object.type == "i-text") ) {

        var canvasLeft = $( "#" + dropElementId ).offset().left,
                canvasTop = $( "#" + dropElementId ).offset().top;


        var left = object.get( 'left' );
        var top = object.get( 'top' );
        var scaleY = object.get( 'scaleY' );
        var scaleX = object.get( 'scaleX' );

        var width = object.get( 'width' );
        var height = object.get( 'height' );

        width = width * scaleX;
        height = height * scaleY;

        var trueLeft = left - (width / 2);
        var trueTop = top - (height / 2);

        var canvasWrapperLeft = $( document ).scrollLeft();
        var canvasWrapperTop = $( document ).scrollTop();

        var txtField = document.getElementById( "textFieldInput" );
        if ( txtField ) {
            txtField.value = object.text;

            $( txtField ).show();
            txtField.focus();


            txtField.style.width = width + "px";
            txtField.style.height = height + "px";

            txtField.style.left = trueLeft + canvasLeft - canvasWrapperLeft + "px";

            var topOffset = 80 - height;
            txtField.style.top = trueTop + canvasTop - canvasWrapperTop + "px";
        }


    }
}

function observe ( eventName ) {

    canvas.observe( 'mouse:down', function( e ) {
        /*if (e.target == null) {*/
       
        if ( e.target == null ) {
            if ( typeof(_currentEditPanel) == 'undefined' ) {
                _currentEditPanel = 0;
            }
            if ( _currentEditPanel == 0 ) {
                return;
            }
            else if ( _currentEditPanel == 1 ) {
                if ( _isFreeDrawing != true || (typeof e.e.target.className !== 'undefined' && e.e.target.className.replace( " ", "" ) != 'upper-canvas' ) ) {
                    setAllButtonsNotActive();
                    if ( ! lockFade ) {
                        lockFade = true;
                        fade( "editCell", 2 );
                        _currentEditPanel = 0;
                    }
                }
            }
            else if ( _currentEditPanel == 2 ) {
                setAllButtonsNotActive();
                if ( ! lockFade ) {
                    lockFade = true;
                    fade( "editCell", 2 );
                    _currentEditPanel = 0;
                }
            }
            else if ( _currentEditPanel == 3 ) {
                setAllButtonsNotActive();
                if ( ! lockFade ) {
                    lockFade = true;
                    _currentEditPanel = 1;
                    setTimeout( "clickTwicePrecaustion()", 50 );
                }
            }

            if ( _currentEditPanel != 0 ) {
                setButtonActive();
            }

        }
    } );

    canvas.observe( 'object:modified', function( e ) {

        objectModify = true;

        if ( e.target.type != "group" ) {
            if ( canvas.getActiveGroup() ) {
                if ( _currentEditPanel != 0 ) {
                    closeEditCell();
                }
            }
        }
    } );



    canvas.observe( 'object:removed', function( e ) {
        objectModify = true;
    } );

    canvas.observe( 'object:selected', function( e ) {
        setTimeout( function() {
            var activeObject = e.target;

            if ( _currentEditPanel == 0 ) {
                if ( ! lockFade ) {
                    lockFade = true;
                    fade( "editCell", - 2 );
                }
                _currentOpenPanel = null;
            }

            runEffectEditShow();

            if ( activeObject.type != "group" ) {
                presetSelectedObjects( e );
            }
            else {
                $( "#formatText" ).hide();
                var fontFamily = document.getElementById( "fontFamily" );
                fontFamily.style.display = "none";
                if ( canvas.getActiveObject() ) {
                    $( '#groupEdit' ).css( 'display', 'inline' );
                    $( '#groupButton' ).css( 'display', 'none' );
                    $( '#unGroupButton' ).css( 'display', 'inline' );

                }
                if ( canvas.getActiveGroup() ) {
                    $( '#groupEdit' ).css( 'display', 'inline' );
                    $( '#groupButton' ).css( 'display', 'inline' );
                    $( '#unGroupButton' ).css( 'display', 'none' );
                    $( '#editCellRight' ).css( 'display', 'none' );

                }
            }
            if ( canvas.getActiveObject() && typeof canvas.getActiveObject().curvedText !== 'undefined' && canvas.getActiveObject().curvedText ) {
                $( "#editCellRight" ).css( 'display', 'inline-block' );
            }
            else {
                $( "#editCellRight" ).css( 'display', 'none' );
            }
        }, 80 );

    } );

    canvas.observe( 'before:selection:cleared', function( e ) {

        var activeObject = e.target;
        if ( activeObject.type == "text" || activeObject.type == "i-text" ) {
            var txtField = document.getElementById( "textFieldInput" );
            //txtField.style.display = "none";
            $( txtField ).fadeOut( 500 );
        }
    } );

    canvas.observe( 'selection:cleared', function( e ) {

        if ( typeof(_currentEditPanel) != 'undefined' && _currentEditPanel != 0 ) {
            closeEditCell();
        }

        $( '#curvedTextEdit' ).hide();
    } );

    canvas.on( 'text:editing:entered', editCurvedText );


    canvas.on( 'object:removed', function( e ) {
        deleteObjectObserve( e );
    } )

    canvas.on( 'selection:cleared', function( e ) {
        $( '#contextMenuCanvasRightClick' ).remove();
    } );
}

function editCurvedText () {
    var object = canvas ? canvas.getActiveObject() : null;
    if ( typeof object.curvedText !== 'undefined' && object.curvedText ) {
        $( '#curvedTextEdit' ).hide();
        $( '#curvedTextEdit' ).css( {
            left    : parseInt( canvas._offset.left + object.left / 2 ) + "px",
            top     : object.top / 2 + object.getHeight() / 2 + "px",
            display : 'block'
        } );
        if ( object.text ) {
            $( '#curvedTextInput' ).val( object.text );
        }
        else {
            $( '#curvedTextInput' ).val( '' );
        }
    }
}
$( '#applyCurvedText' ).on( 'click', function() {
    var object = canvas.getActiveObject();
    object.text = $( '#curvedTextInput' ).val();
    canvas.renderAll();
    $( '#curvedTextEdit' ).hide();
} );

function presetSelectedObjects ( e ) {
    $( '#groupEdit' ).css( 'display', 'none' );
    // SET LOCK AND UNLOCK
    var element = document.getElementById( 'lockObj' );
    var object = canvas.getActiveObject();
    if ( typeof object !=='undefined'  && object.lockRotation ) {
       if(element!==null)
           element.src = "public/img/btn_lock_on.png";
    }
    else {
       if(element!==null)
           element.src = "public/img/btn_lock.png";
    }

    //setHelpers
    var helpers = object.get( 'setHelper' );
    if ( typeof helpers === 'undefined' || helpers == false ) {
        $( '#helperDesignerEditLabel' ).css( 'backgroundColor', 'unset' );
    }
    else {
        $( '#helperDesignerEditLabel' ).css( 'backgroundColor', '#46484D' );
    }
    // SET OPACITY
    var opacity = object.get( 'opacity' );
    $( "#slider" ).slider( "value", opacity * 100 );

    //SET RADIUS
    var radius = object.get( 'radius' );
    $( "#slider_radius" ).slider( "value", radius );
    //SET SPACING
    var spacing = object.get( 'spacing' );
    $( "#slider_spacing" ).slider( "value", spacing );
    //SET SPACING
    var reverse = object.get( 'reverse' );
    if ( reverse ) {
        $( '#textLabelReverse' ).css( 'background-color', '#46484D' );
    }
    else {
        $( '#textLabelReverse' ).css( 'background-color', 'unset' );
    }

    // COLOR
    if ( object.type != "image" && object.type != "chart" && object.type != "vector" && object.type != "path-group" ) {
        //$("#formatColor").show();
        var colorIndex = object.get( 'fill' );
        $( '#colorPicker' ).css( 'backgroundColor', colorIndex );
        var headerFontPicker = document.getElementById( "headerFontPicker" );
        headerFontPicker.style.display = "inline";
    }
    else if ( object.type == "path-group" ) {
        if ( object.isSameColor() ) {
            var colorIndex = object.get( 'fill' );
            if ( colorIndex == '' )
                colorIndex = "#000000";
            $( '#colorPicker' ).css( 'backgroundColor', colorIndex );
            var headerFontPicker = document.getElementById( "headerFontPicker" );
            headerFontPicker.style.display = "inline";
        }
        else {
            var headerFontPicker = document.getElementById( "headerFontPicker" );
            headerFontPicker.style.display = "none";
        }
    }
    else {
        var headerFontPicker = document.getElementById( "headerFontPicker" );
        headerFontPicker.style.display = "none";
    }

    // B/U/I/S
    if ( object.type == "text" || object.type == "i-text" || object.type == "textbox" ) {
        if ( object.curvedText ) {
            $( '#editCellRight' ).css( 'display', "inline-block" );
            $( '#textLabelUnderlined' ).hide();
        }
        else {
            $( '#textLabelUnderlined' ).css( 'display', "inline-block" );
            $( '#editCellRight' ).css( 'display', "none" );
        }
        $( "#formatText" ).show();
        var bold = object.get( 'fontWeight' );
        if ( bold == "bold" ) {
            $( '#bold' ).attr( 'checked', true );
            var textFormat = document.getElementById( "textLabelBold" );
            textFormat.style.backgroundImage = "url("+ "public/img/btn_bold_on.png)";
        }
        else {

            $( '#bold' ).attr( 'checked', false );
            var textFormat = document.getElementById( "textLabelBold" );
            textFormat.style.backgroundImage = "url(" + "public/img/btn_bold.png)";
        }
        var underline = object.get( 'textDecoration' );
        if ( underline == "underline" ) {
            $( '#underlined' ).attr( 'checked', true );
            var textFormat = document.getElementById( "textLabelUnderlined" );
            textFormat.style.backgroundImage = "url(" +  "public/img/btn_underline_on.png)";
        }
        else {
            $( '#underlined' ).attr( 'checked', false );
            var textFormat = document.getElementById( "textLabelUnderlined" );
            textFormat.style.backgroundImage = "url(" + "public/img/btn_underline.png)";
        }
        var italic = object.get( 'fontStyle' );
        if ( italic == "italic" ) {
            $( '#italisized' ).attr( 'checked', true );
            var textFormat = document.getElementById( "textLabelItalisized" );
            textFormat.style.backgroundImage = "url(" + "public/img/btn_italic_on.png)";
        }
        else {
            $( '#italisized' ).attr( 'checked', false );
            var textFormat = document.getElementById( "textLabelItalisized" );
            textFormat.style.backgroundImage = "url(" + "public/img/btn_italic.png)";
        }
        var shadow = object.get( 'shadow' );
        if ( shadow && shadow.toString() == "5px 5px 5px rgba(0,0,0,0.5)" ) {

            $( '#shadow' ).attr( 'checked', true );
            var textFormat = document.getElementById( "textLabelShadow" );
            textFormat.style.backgroundImage = "url(" +  "public/img/btn_shadow_on.png)";

        }
        else {
            $( '#shadow' ).attr( 'checked', false );
            var textFormat = document.getElementById( "textLabelShadow" );
            textFormat.style.backgroundImage = "url(" + "public/img/btn_shadow.png)";
        }
        $( "#formatText" ).buttonset( "refresh" );

        // FONT
        var fontFamily = document.getElementById( "fontFamily" );
        if ( fontFamily ) {
            fontFamily.style.display = "inline";
        }

        var fontFamily = object.get( 'fontFamily' );

        $( '#font' ).html( fontFamily.replace( /["']/g, '' ) );
        $( '#fontList li' ).each( function() {
            $( this ).removeClass( 'selected' );
        } )
        $( '#fontList' ).find( '[data-value="' + fontFamily.replace( /["']/g, '' ) + '"]' ).parent().addClass( 'selected' );

        var fontFamilySize = document.getElementById( "fSize" );
        if ( fontFamilySize ) {
            fontFamilySize.style.display = "inline";
        }

        var textAlign = document.getElementById( 'alignment' );
        if ( textAlign ) {
            textAlign.style.display = "inline";
        }
        var objFamilySize = object.get( 'fontSize' );
        $( '#fontSize' ).html( objFamilySize );
        $( '#fontSizeList li' ).each( function() {
            $( this ).removeClass( 'selected' );
        } );
        $( '#fontSizeList' ).find( '[data-value="' + objFamilySize + '"]' ).parent().addClass( 'selected' );

    }
    else {
        $( "#formatText" ).hide();
        $( '#editCellRight' ).css( 'display', "none" );
        var fontFamily = document.getElementById( "fontFamily" );
        fontFamily.style.display = "none";

        var fontFamilySize = document.getElementById( "fSize" );
        fontFamilySize.style.display = "none";

        var textAlign = document.getElementById( 'alignment' );
        if ( textAlign ) {
            textAlign.style.display = "none";
        }
    }

}

function addElementToCanvas ( event, ui ) {
    return function(event, ui ) {
        var dataType = ui.draggable.attr( "data-type" );
        if ( dataType == "shape" ) {
            drawVector(event, ui );
        }
        else if ( dataType == "vector" ) {
            drawVector(event, ui );
        }
        else if ( dataType == "text" ) {
            drawText( event, ui );
        }
        else if ( dataType == "texture" ) {
            drawBackground(ui );
        }
    }( event, ui );
}

function deleteObjectFromCanvas () {
    if ( _currentEditPanel == 0 ) {
        return;
    }
    else if ( _currentEditPanel == 1 ) {
        setAllButtonsNotActive();

        if ( ! lockFade ) {
            lockFade = true;
            fade( "editCell", 2 );
            _currentEditPanel = 0;
        }
    }
    else if ( _currentEditPanel == 2 ) {
        setAllButtonsNotActive();

        if ( ! lockFade ) {
            lockFade = true;
            fade( "editCell", 2 );
            _currentEditPanel = 0;
        }
    }
    else if ( _currentEditPanel == 3 ) {
        setAllButtonsNotActive();

        if ( ! lockFade ) {
            lockFade = true;
            fade( "editCell", 2 );
            _currentEditPanel = 0;
        }
        /*if (!lockFade) {
         lockFade = true;
         _currentEditPanel = 1;
         //setTimeout("clickTwicePrecaustion()", 50);
         }*/
    }

    if ( _currentEditPanel != 0 ) {
        setButtonActive();
    }
}

function animateDelete () {
    $( "#popupWin" ).fadeOut( 'fast' );
    deleteObjectFromCanvas();

    if ( canvas ) {
        if ( canvas.getActiveGroup() ) {
            canvas.off( 'object:removed' );
            var groupObjects = canvas.getActiveGroup().getObjects();
            canvas.discardActiveGroup();
            groupObjects.forEach( function( a ) {
                if ( a.lockRotation != true ) {
                    canvas.remove( a );
                    /*sendWSDelete(a);*/
                }
            }, this );
            var removedObjs = [];
            for ( var index in groupObjects ) {
                if ( groupObjects[index].lockRotation != true ) {
                    removedObjs.push( {
                        objectId : groupObjects[index].objectID,
                        removed  : groupObjects[index]
                    } );
                }
                if ( groupObjects.length - 1 == index ) {
                    pushUndoData( removedObjs );
                }
            }
            canvas.renderAll();
            canvas.on( 'object:removed', function( e ) {
                deleteObjectObserve( e );
            } );
            update_iframe();
        }
        else {
            if ( canvas.getActiveObject() ) {
                var target = canvas.getActiveObject();
                if ( target.lockRotation != true ) {
                    canvas.remove( target );
                    pushUndoData( [
                        {
                            objectId : target.objectID,
                            removed  : target
                        }
                    ] );
                    /*sendWSDelete(target);*/
                }
            }
        }
    }
}

function changeImage ( aImage, aSrc ) {
    var theImage = document.getElementById( aImage );
    theImage.src = aSrc;
}

function bringToFront () {
    var aImg = document.getElementById( "bringToFrontId" );
    aImg.src = window.jsUrl + "public/img/btn_layer_up_all_on.png";

    setTimeout( "changeImage('bringToFrontId',window.jsUrl+'public/img/btn_layer_up_all.png');", 200 );

    canvas.bringToFront( canvas.getActiveObject() );
    objects = canvas.getHelpers( true );
    objects.forEach( function( obj, key ) {
        if ( typeof obj.setHelper !== 'undefined' && obj.setHelper == true ) {
            obj.bringToFront();
        }
    } );
}

function sendToBack () {
    var aImg = document.getElementById( "sendToBackId" );
    aImg.src = window.jsUrl + "public/img/btn_layer_down_all_on.png";

    setTimeout( "changeImage('sendToBackId',window.jsUrl+'public/img/btn_layer_down_all.png');", 200 );

    if ( canvas.getActiveObject() ) {
        canvas.sendToBack( canvas.getActiveObject() );
    }
    //canvas.bringForward(canvas.getActiveObject());
    //window.setTimeout("pushUndoSingle();", 1);
}

function bringForward () {
    var aImg = document.getElementById( "bringForwardId" );
    aImg.src = window.jsUrl + "public/img/btn_layer_up_all_on.png";

    setTimeout( "changeImage('bringForwardId',window.jsUrl+'public/img/btn_layer_up.png');", 200 );
    if ( canvas.getActiveObject() ) {
        pushUndoData( [
            {
                objectId     : canvas.getActiveObject().objectID,
                bringForward : true
            }
        ] );
        canvas.bringForward( canvas.getActiveObject() );
        objects = canvas.getHelpers( true );
        objects.forEach( function( obj, key ) {
            if ( typeof obj.setHelper !== 'undefined' && obj.setHelper == true ) {
                obj.bringToFront();
            }
        } );
    }
}

function sendBackward () {
    var aImg = document.getElementById( "sendBackwardId" );
    aImg.src = window.jsUrl + "public/img/btn_layer_down_on.png";

    setTimeout( "changeImage('sendBackwardId',window.jsUrl+'public/img/btn_layer_down.png');", 200 );
    if ( canvas.getActiveObject() ) {
        pushUndoData( [
            {
                objectId      : canvas.getActiveObject().objectID,
                sendBackwards : true
            }
        ] );
        canvas.sendBackwards( canvas.getActiveObject() );
    }
}


function freeDrawing () {
    var cell = document.getElementById( "editCell" );
    if ( _isFreeDrawing ) {
        canvas.isDrawingMode = false;
        canvas.renderAll();
        _isFreeDrawing = false;
        fade( 'editCell', 2 );
        $( '#effectFreeDrawing' ).hide();
        $( '#headerFontPicker' ).hide();
        $( '#btnFreeDrawing' ).css( 'color', _notActiveColor );
        setTimeout( function() {
            $( '#editCellMiddle' ).show();
            $( '#editCellRight' ).show();
            $( '#groupEdit' ).show();
            $( '.edit_delete_group' ).show();
            $( '.openeditor_delete_option' ).show();
        }, 500 );
    }
    else {
        canvas.isDrawingMode = true;
        canvas.deactivateAll();
        canvas.renderAll();
        $( _currentOpenPanel ).hide();
        _currentOpenPanel = "#effectEdit";
        _currentEditPanel = 1;
        $( '#effectEdit' ).show();
        $( '#effectFreeDrawing' ).show();
        $( '#headerFontPicker' ).show();
        $( '#editCellMiddle' ).hide();
        $( '#editCellRight' ).hide();
        $( '#groupEdit' ).hide();
        $( '.edit_delete_group' ).hide();
        $( '.openeditor_delete_option' ).hide();
        $( '.designer_tab' ).hide();
        setAllButtonsNotActive();
        cell.style.height = "55px";
        [10, 100, 200, 500, 1000, 2000, 3000].forEach( function( time ) {
            setTimeout( function() {
                var newWidth = $( '#effectFreeDrawing' ).width();
                scrollPageThemesPages = (Math.floor( newWidth / 742 ) + 1);
            }, time );
        } );
        $( '#btnFreeDrawing' ).css( 'color', _activeColor );
        if ( $( '#colorPicker' ).css( 'backgroundColor' ) == 'rgba(0, 0, 0, 0)' )
            $( '#colorPicker' ).css( 'background-color', '#000000' )
        $( '#headerFontPicker' ).show();
        _isFreeDrawing = true;
    }
}

$( '.free_drawing_content ' ).on( 'click', function() {
    if ( ! _isFreeDrawing ) return;
    $( '.free_drawing_content' ).css( "background-color", "transparent" );
    $( this ).css( "background-color", "#46484D" );
    $( '.free_drawing_content' ).attr( "data-active", "false" );
    $( this ).attr( "data-active", "true" );
    var type = $( this ).attr( 'data-type' );
    if ( type == 'square-form' || type == 'circle-form' ) {
        $( '#openeditorLineWidthSlider' ).hide();
        $( '.openeditor_slider_squares' ).show();
    }
    else {
        $( '#openeditorLineWidthSlider' ).show();
        $( '.openeditor_slider_squares' ).hide();
    }
    if ( type == 'circle' ) {
        var circlePatternBrush = new fabric.CircleBrush( canvas );
        circlePatternBrush.getPatternSrc = function() {
            var patternCanvas = fabric.document.createElement( 'canvas' );
            var ctx = patternCanvas.getContext( '2d' );
            ctx.fillStyle = $( '#colorPicker' ).css( "background-color" );
            return patternCanvas;
        };
        canvas.freeDrawingBrush = circlePatternBrush;
        canvas.freeDrawingBrush.width = parseInt( $( "#sliderDrawingWidth" ).slider( "value" ) );
        canvas.freeDrawingBrush.color = $( '#colorPicker' ).css( "background-color" );
    }
    if ( type == 'pencil' ) {
        var pencilPatternBrush = new fabric.PencilBrush( canvas );
        pencilPatternBrush.getPatternSrc = function() {
            var patternCanvas = fabric.document.createElement( 'canvas' );
            var ctx = patternCanvas.getContext( '2d' );
            ctx.fillStyle = $( '#colorPicker' ).css( "background-color" );
            return patternCanvas;
        };
        canvas.freeDrawingBrush = pencilPatternBrush;
        canvas.freeDrawingBrush.width = parseInt( $( "#sliderDrawingWidth" ).slider( "value" ) );
        canvas.freeDrawingBrush.color = $( '#colorPicker' ).css( "background-color" );
    }
    if ( type == 'vline' ) {
        var vLinePatternBrush = new fabric.PatternBrush( canvas );
        vLinePatternBrush.getPatternSrc = function() {
            var patternCanvas = fabric.document.createElement( 'canvas' );
            patternCanvas.width = patternCanvas.height = 10;
            var ctx = patternCanvas.getContext( '2d' );
            ctx.strokeStyle = this.color;
            ctx.lineWidth = 5;
            ctx.beginPath();
            ctx.moveTo( 0, 5 );
            ctx.lineTo( 10, 5 );
            ctx.closePath();
            ctx.stroke();
            return patternCanvas;
        };
        canvas.freeDrawingBrush = vLinePatternBrush;
        canvas.freeDrawingBrush.width = parseInt( $( "#sliderDrawingWidth" ).slider( "value" ) );
        canvas.freeDrawingBrush.color = $( '#colorPicker' ).css( "background-color" );
    }
    if ( type == 'hline' ) {
        var hLinePatternBrush = new fabric.PatternBrush( canvas );
        hLinePatternBrush.getPatternSrc = function() {
            var patternCanvas = fabric.document.createElement( 'canvas' );
            patternCanvas.width = patternCanvas.height = 10;
            var ctx = patternCanvas.getContext( '2d' );
            ctx.strokeStyle = this.color;
            ctx.lineWidth = 5;
            ctx.beginPath();
            ctx.moveTo( 5, 0 );
            ctx.lineTo( 5, 10 );
            ctx.closePath();
            ctx.stroke();
            return patternCanvas;
        };
        canvas.freeDrawingBrush = hLinePatternBrush;
        canvas.freeDrawingBrush.width = parseInt( $( "#sliderDrawingWidth" ).slider( "value" ) );
        canvas.freeDrawingBrush.color = $( '#colorPicker' ).css( "background-color" );
    }
} );

function lockObject () {
    var target = canvas.getActiveObject();

    if ( target ) {
        var element = document.getElementById( 'lockObj' );

        if ( typeof(target.lockRotation) != 'undefined' && target.lockRotation == true ) {
            target.lockRotation = target.lockUniScaling = target.lockMovementX = target.lockMovementY = target.lockScalingX = target.lockScalingY = false;
            element.src = window.jsUrl + "public/img/btn_lock.png";
        }
        else {
            target.lockRotation = target.lockUniScaling = target.lockMovementX = target.lockMovementY = target.lockScalingX = target.lockScalingY = true;
            element.src = window.jsUrl + "public/img/btn_lock_on.png";
        }
        canvas.renderAll();
    }

    //window.setTimeout("UndoSingle();", 1);
}

var index = '';

function pushUndoData ( data ) {
    undoArry.push( data );
    redoArry = [];
    $( '#btnRedo' ).css( 'opacity', 0.3 );
    $( '#btnUndo' ).css( 'opacity', 1 );
}

function popUndoData () {
    var data = undoArry.pop();
    redoArry.push( data );
    return data;
}

function popRedoData () {
    var data = redoArry.pop();
    undoArry.push( data );
    return data;
}

function clearUndoData () {
    undoArry = [];
    redoArry = [];
    $( '#btnRedo' ).css( 'opacity', 0.3 );
    $( '#btnUndo' ).css( 'opacity', 0.3 );
}

function undo () {
    var jsonArray = popUndoData();
    if ( jsonArray ) {
        canvas.deactivateAll();
        jsonArray.forEach( function( json ) {
            if ( typeof(json.removed) !== 'undefined' ) {
                canvas.add( json.removed );
            }
            if ( typeof(json.added) !== 'undefined' ) {
                canvas.getObjects().forEach( function( object ) {
                    if ( object && json.objectId == object.objectID ) {
                        canvas.remove( object );
                    }
                } );
            }
            if ( typeof(json.oldStage) !== 'undefined' ) {
                canvas.getObjects().forEach( function( object ) {
                    if ( object && json.objectId == object.objectID ) {
                        for ( var key in json.oldStage ) {
                            object.set( key, json.oldStage[key] );
                            object.setCoords();
                        }

                    }
                } );
            }
            if ( typeof(json.bringForward) !== 'undefined' ) {
                if ( typeof json.type !== 'undefined' && json.type == 'group' ) {
                    var canvas_objects = canvas.getObjects();
                    canvas_objects.forEach( function( obj ) {
                        if ( obj && json.ids.indexOf( obj.objectID ) > - 1 ) {
                            canvas.sendBackwards( obj );
                            obj.setCoords();
                        }
                    } );
                }
                else {
                canvas.getObjects().forEach( function( obj ) {
                    if ( obj && obj.objectID == json.objectId ) {
                        canvas.sendBackwards( obj );
                            obj.setCoords();
                    }
                } );
                }
            }
            if ( typeof(json.sendBackwards) !== 'undefined' ) {
                if ( typeof json.type !== 'undefined' && json.type == 'group' ) {
                    var canvas_objects = canvas.getObjects();
                    canvas_objects.forEach( function( obj ) {
                        if ( obj && json.ids.indexOf( obj.objectID ) > - 1 ) {
                            canvas.bringForward( obj );
                            obj.setCoords();
                        }
                    } );
                }
                else {
                canvas.getObjects().forEach( function( obj ) {
                    if ( obj && obj.objectID == json.objectId ) {
                        canvas.bringForward( obj );
                            obj.setCoords();
                    }
                    } );
                }
            }
            if ( typeof json.filterId !== 'undefined' && json.type == 'added' ) {
                canvas.getObjectByID( json.objectId )[0].filters[parseInt( json.filterId )] = null;
                canvas.getObjectByID( json.objectId )[0].applyFilters( function() {
                    canvas.renderAll();
                } );
            }
            if ( typeof json.filterId !== 'undefined' && json.type == 'removed' ) {
                canvas.getObjectByID( json.objectId )[0].filters[parseInt( json.filterId )] = json.filter;
                canvas.getObjectByID( json.objectId )[0].applyFilters( function() {
                    canvas.renderAll();
                } );
            }
            if ( typeof  json.backgroundImage !== 'undefined' && json.backgroundImage ) {
                var url = (json.oldStageBackground.backgroundSrc === null) ? null : json.oldStageBackground.backgroundSrc;
                if ( url ) {
                    canvas.setBackgroundImage( url, function() {
                        updateSizeAndPositionBackground();
                        canvas.renderAll();
                    } );
                }
                else {
                    canvas.backgroundImage = '';
                    canvas.renderAll();
                }
            }
        } );
        canvas.renderAll();
    }

    if ( undoArry.length <= 0 ) {
        var btnUndo = document.getElementById( 'btnUndo' );
        btnUndo.style.opacity = 0.4;
    }
    var btnRedo = document.getElementById( 'btnRedo' );
    btnRedo.style.opacity = 1;
    update_iframe();
}

function redo () {
    var jsonArray = popRedoData();
    if ( jsonArray ) {
        canvas.deactivateAll();
        jsonArray.forEach( function( json ) {
            if ( typeof(json.removed) !== 'undefined' ) {
                canvas.getObjects().forEach( function( object ) {
                    if ( object && json.objectId == object.objectID ) {
                        canvas.remove( object );
                    }
                } );
            }
            if ( typeof(json.added) !== 'undefined' ) {
                canvas.add( json.added );
            }
            if ( typeof(json.newStage) !== 'undefined' ) {
                canvas.getObjects().forEach( function( object ) {
                    if ( object && json.objectId == object.objectID ) {
                        for ( var key in json.newStage ) {
                            object.set( key, json.newStage[key] );
                        }
                        object.setCoords();
                    }
                } );
            }
            if ( typeof(json.bringForward) !== 'undefined' ) {
                if ( typeof json.type !== 'undefined' && json.type == 'group' ) {
                    var canvas_objects = canvas.getObjects();
                    canvas_objects.forEach( function( obj ) {
                        if ( obj && json.ids.indexOf( obj.objectID ) > - 1 ) {
                            canvas.bringForward( obj );
                            obj.setCoords();
                    }
                } );
            }
                else {
                canvas.getObjects().forEach( function( obj ) {
                    if ( obj && obj.objectID == json.objectId ) {
                        canvas.bringForward( obj );
                    }
                } );
                }
            }
            if ( typeof(json.sendBackwards) !== 'undefined' ) {
                if ( typeof json.type !== 'undefined' && json.type == 'group' ) {
                    var canvas_objects = canvas.getObjects();
                    canvas_objects.forEach( function( obj ) {
                        if ( obj && json.ids.indexOf( obj.objectID ) > - 1 ) {
                            canvas.sendBackwards( obj );
                            obj.setCoords();
                        }
                    } );
                }
                else {
                canvas.getObjects().forEach( function( obj ) {
                    if ( obj && obj.objectID == json.objectId ) {
                        canvas.sendBackwards( obj );
                    }
                    } );
                }
            }
            if ( typeof json.filterId !== 'undefined' && json.type == 'removed' ) {
                canvas.getObjectByID( json.objectId )[0].filters[parseInt( json.filterId )] = null;
                canvas.getObjectByID( json.objectId )[0].applyFilters( function() {
                    canvas.renderAll();
                } );
            }
            if ( typeof json.filterId !== 'undefined' && json.type == 'added' ) {
                canvas.getObjectByID( json.objectId )[0].filters[parseInt( json.filterId )] = json.filter;
                canvas.getObjectByID( json.objectId )[0].applyFilters( function() {
            canvas.renderAll();
        } );
    }
            if ( typeof  json.backgroundImage !== 'undefined' && json.backgroundImage ) {
                var url = (json.newStageBackground.backgroundSrc === null) ? null : json.newStageBackground.backgroundSrc;
                if ( url ) {
                    canvas.setBackgroundImage( url, function() {
                        updateSizeAndPositionBackground();
                        canvas.renderAll();
                        update_iframe();
                    } );
                }
                else {
                    canvas.backgroundImage = '';
                    canvas.renderAll();
                    update_iframe();
                }
            }
            canvas.renderAll();
        } );
    }
    if ( redoArry.length <= 0 ) {
        var btnRedo = document.getElementById( 'btnRedo' );
        btnRedo.style.opacity = 0.4;
    }
    var btnUndo = document.getElementById( 'btnUndo' );
    btnUndo.style.opacity = 1;
    update_iframe();
}

//replaced with module
function initAligningGuidelines ( canvas ) {

    canvas.observe( 'object:moving', function( e ) {
        return;
        if ( snapToObject ) {
            //object have center origin;
            //exemple:when object.getLeft the result is distante between margin left of canvas and the center of the object;
            var obj = e.target;
            obj.setCoords(); //Sets corner position coordinates based on current angle, width and height
            canvas.forEachObject( function( targ ) {
                activeObject = canvas.getActiveObject();
                if ( targ === activeObject ) return;
                if (targ.objectID ==100003 ||  targ.objectID ==100002 || targ.objectID ==100001  || targ.objectID ==100000  ) return;
                if ( typeof(targ.name) !== 'undefined' ) return;
                if ( activeObject == null ) return;
                if ( Math.abs( (activeObject.getLeft() + activeObject.getWidth() / 2) - (targ.getLeft() - targ.getWidth() / 2) ) < edgedetection ) {
                    activeObject.setLeft( targ.getLeft() - activeObject.getWidth() / 2 - targ.getWidth() / 2 );
                    if ( ! canvas.getObjectsName( 'snapObjectLeft' ).length ) {
                        leftline = new fabric.Line( [
                            targ.getLeft() - targ.getWidth() / 2, 0,
                            targ.getLeft() - targ.getWidth() / 2, canvas.getHeight()
                        ], {name        : "snapObjectLeft",
                            fill        : '#0f9edb',
                            stroke      : '#0f9edb',
                            strokeWidth : 1,
                            hasControls : false,
                            visible     : true } );
                        targ.setSnapedLeft( true );
                        canvas.add( leftline );
                    }
                }
                else {
                    if ( targ.get( 'snapLeft' ) ) {
                        canvas.remove( leftline );
                        targ.setSnapedLeft( false );
                    }
                }
                if ( Math.abs( (activeObject.getLeft() - activeObject.getWidth() / 2) - (targ.getLeft() - targ.getWidth() / 2) ) < edgedetection ) {
                    activeObject.setLeft( targ.getLeft() + activeObject.getWidth() / 2 - targ.getWidth() / 2 );
                    if ( ! canvas.getObjectsName( 'snapObjectLeftInside' ).length ) {
                        leftlineInside = new fabric.Line( [
                            targ.getLeft() - targ.getWidth() / 2, 0,
                            targ.getLeft() - targ.getWidth() / 2, canvas.getHeight()
                        ], {name        : "snapObjectLeftInside",
                            fill        : '#0f9edb',
                            stroke      : '#0f9edb',
                            strokeWidth : 2,
                            hasControls : false,
                            visible     : true } );
                        targ.setSnapedLeftInside( true );
                        canvas.add( leftlineInside );
                    }
                }
                else {
                    if ( targ.get( 'snapLeftInside' ) ) {
                        canvas.remove( leftlineInside );
                        targ.setSnapedLeftInside( false );
                    }
                }
                if ( Math.abs( (activeObject.getLeft() - activeObject.getWidth() / 2) - (targ.getLeft() + targ.getWidth() / 2) ) < edgedetection ) {
                    activeObject.setLeft( targ.getLeft() + targ.getWidth() / 2 + activeObject.getWidth() / 2 );
                    if ( ! canvas.getObjectsName( 'snapObjectRight' ).length ) {
                        rightline = new fabric.Line( [
                            targ.getLeft() + targ.getWidth() / 2, 0,
                            targ.getLeft() + targ.getWidth() / 2, canvas.getHeight()
                        ], {name        : "snapObjectRight",
                            fill        : '#0f9edb',
                            stroke      : '#0f9edb',
                            strokeWidth : 2,
                            hasControls : false, } );
                        targ.setSnapedRight( true );
                        canvas.add( rightline );
                    }
                }
                else {
                    if ( targ.get( 'snapRight' ) ) {
                        canvas.remove( rightline );
                        targ.setSnapedRight( false );
                    }
                }
                //inside right
                if ( Math.abs( (activeObject.getLeft() + activeObject.getWidth() / 2) - (targ.getLeft() + targ.getWidth() / 2) ) < edgedetection ) {
                    activeObject.setLeft( targ.getLeft() + targ.getWidth() / 2 - activeObject.getWidth() / 2 );
                    if ( ! canvas.getObjectsName( 'snapObjectRightInside' ).length ) {
                        rightlineInside = new fabric.Line( [
                            targ.getLeft() + targ.getWidth() / 2, 0,
                            targ.getLeft() + targ.getWidth() / 2, canvas.getHeight()
                        ], {name        : "snapObjectRightInside",
                            fill        : '#0f9edb',
                            stroke      : '#0f9edb',
                            strokeWidth : 2,
                            hasControls : false, } );
                        targ.setSnapedRightInside( true );
                        canvas.add( rightlineInside );
                    }
                }
                else {
                    if ( targ.get( 'snapRightInside' ) ) {
                        canvas.remove( rightlineInside );
                        targ.setSnapedRightInside( false );
                    }
                }
                if ( Math.abs( (activeObject.getTop() + activeObject.getHeight() / 2) - targ.getTop() + targ.getHeight() / 2 ) < edgedetection ) {
                    activeObject.setTop( targ.getTop() - targ.getHeight() / 2 - activeObject.getHeight() / 2 );
                    if ( ! canvas.getObjectsName( 'snapObjectTop' ).length ) {
                        topline = new fabric.Line( [
                            0, targ.getTop() - targ.getHeight() / 2,
                            canvas.getWidth(), targ.getTop() - targ.getHeight() / 2
                        ], {name        : "snapObjectTop",
                            fill        : '#0f9edb',
                            stroke      : '#0f9edb',
                            strokeWidth : 2,
                            hasControls : false, } );
                        targ.setSnapedTop( true );
                        canvas.add( topline );
                    }
                }
                else {
                    if ( targ.get( 'snapTop' ) ) {
                        canvas.remove( topline );
                        targ.setSnapedTop( false );
                    }
                }
                if ( Math.abs( (activeObject.getTop() - activeObject.getHeight() / 2) - targ.getTop() + targ.getHeight() / 2 ) < edgedetection ) {
                    activeObject.setTop( targ.getTop() - targ.getHeight() / 2 + activeObject.getHeight() / 2 );
                    if ( ! canvas.getObjectsName( 'snapObjectTopInside' ).length ) {
                        toplineInside = new fabric.Line( [
                            0, targ.getTop() - targ.getHeight() / 2,
                            canvas.getWidth(), targ.getTop() - targ.getHeight() / 2
                        ], {name        : "snapObjectTopInside",
                            fill        : '#0f9edb',
                            stroke      : '#0f9edb',
                            strokeWidth : 2,
                            hasControls : false, } );
                        targ.setSnapedTopInside( true );
                        canvas.add( toplineInside );
                    }
                }
                else {
                    if ( targ.get( 'snapTopInside' ) ) {
                        canvas.remove( toplineInside );
                        targ.setSnapedTopInside( false );
                    }
                }
                if ( Math.abs( (targ.getTop() + targ.getHeight() / 2) - (activeObject.getTop() - activeObject.getHeight() / 2) ) < edgedetection ) {
                    activeObject.setTop( targ.getTop() + targ.getHeight() / 2 + activeObject.getHeight() / 2 );
                    if ( ! canvas.getObjectsName( 'snapObjectBottom' ).length ) {
                        bottomline = new fabric.Line( [
                            0, targ.getTop() + targ.getHeight() / 2,
                            canvas.getWidth(), targ.getTop() + targ.getHeight() / 2
                        ], {name        : "snapObjectBottom",
                            fill        : '#0f9edb',
                            stroke      : '#0f9edb',
                            strokeWidth : 2,
                            hasControls : false, } );
                        targ.setSnapedBottom( true );
                        canvas.add( bottomline );
                    }
                }
                else {
                    if ( targ.get( 'snapBottom' ) ) {
                        canvas.remove( bottomline );
                        targ.setSnapedBottom( false );
                    }
                }
                if ( Math.abs( (targ.getTop() + targ.getHeight() / 2) - (activeObject.getTop() + activeObject.getHeight() / 2) ) < edgedetection ) {
                    activeObject.setTop( targ.getTop() + targ.getHeight() / 2 - activeObject.getHeight() / 2 );
                    if ( ! canvas.getObjectsName( 'snapObjectBottomInside' ).length ) {
                        bottomlineInside = new fabric.Line( [
                            0, targ.getTop() + targ.getHeight() / 2,
                            canvas.getWidth(), targ.getTop() + targ.getHeight() / 2
                        ], {name        : "snapObjectBottomInside",
                            fill        : '#0f9edb',
                            stroke      : '#0f9edb',
                            strokeWidth : 2,
                            hasControls : false, } );
                        targ.setSnapedBottomInside( true );
                        canvas.add( bottomlineInside );
                    }
                }
                else {
                    if ( targ.get( 'snapBottomInside' ) ) {
                        canvas.remove( bottomlineInside );
                        targ.setSnapedBottomInside( false );
                    }
                }
            } );
        }
    } );
};

function deleteObjectObserve ( e ) {
    if ( $.openeditorSnaptoObject.verifyObject( e.target ) )
        update_iframe();
}