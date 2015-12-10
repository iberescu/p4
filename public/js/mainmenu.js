function loadBackground () {

    if ( typeof(textureName) !== 'undefined' && ! canvas.backgroundImage ) {
        var url = mediaUrl + "personalization/html5_files/backgrounds/" + textureName;
        canvas.setBackgroundImage( url, function() {
            updateSizeAndPositionBackground();
            canvas.renderAll();
            objectModify = false;
        } );
    }


}

function addHelpers () {
    var rect0 = new fabric.Rect( {
        width          : 10000+textureModeLeft,
        height         : 10000,
        top            : -5000,
        left           : -10000,
        originX        : 'left',
        originY        : 'top',
        fill           : '#ffffff',
        draggable      : false,
        lockMovementX  : false,
        lockMovementY  : false,
        lockUniScaling : true,
        lockRotation   : true,
        setHelper      : true,
        selectable     : false
    } );
    rect0.set( 'objectID', 100000 );
    var rect1 = new fabric.Rect( {
        width          : 10000,
        height         : 10000,
        top            : -5000,
        left           : canvas.getWidth() - textureModeLeft,
        originX        : 'left',
        originY        : 'top',
        fill           : '#ffffff',
        draggable      : false,
        lockMovementX  : false,
        lockMovementY  : false,
        lockUniScaling : true,
        lockRotation   : true,
        setHelper      : true,
        selectable     : false
    } );
    rect1.set( 'objectID', 100001 );
    var rect2 = new fabric.Rect( {
        width          : 10000,
        height         : canvasOffsetHeight+10000,
        top            : canvas.getHeight() - canvasOffsetHeight,
        left           : -5000,
        originX        : 'left',
        originY        : 'top',
        fill           : '#ffffff',
        draggable      : false,
        lockMovementX  : false,
        lockMovementY  : false,
        lockUniScaling : true,
        lockRotation   : true,
        setHelper      : true,
        selectable     : false
    } );
    rect2.set( 'objectID', 100002 );
    var rect3 = new fabric.Rect( {
        width          : 5000,
        height         : 5000+canvasOffsetHeight,
        top            : -5000,
        left           : 0,
        originX        : 'left',
        originY        : 'top',
        fill           : '#ffffff',
        draggable      : false,
        lockMovementX  : false,
        lockMovementY  : false,
        lockUniScaling : true,
        lockRotation   : true,
        setHelper      : true,
        selectable     : false
    } );
    rect3.set( 'objectID', 100003 );
    canvas.add( rect0 );
    canvas.add( rect1 );
    canvas.add( rect2 );
    canvas.add( rect3 );
}

function deleteOffsetHelpers () {
    if ( canvas.getObjectByID( 100000 ).length > 0 )
        canvas.getObjectByID( 100000 )[0].remove();
    if ( canvas.getObjectByID( 100001 ).length > 0 )
        canvas.getObjectByID( 100001 )[0].remove();
    if ( canvas.getObjectByID( 100002 ).length > 0 )
        canvas.getObjectByID( 100002 )[0].remove();
    if ( canvas.getObjectByID( 100003 ).length > 0 )
        canvas.getObjectByID( 100003 )[0].remove();
}

function loadCanvas ( type ) {
    if ( _jsObject ) {
        if ( type == "svg" ) {
            canvas.off("object:added");
            var lblZoom = document.getElementById( "lblZoom" );
            lblZoom.innerHTML = "zoom  @ 100%";
            fabric.loadSVGFromString( _jsObject, function( objects, options ) {
                objects.forEach(function(obj,key){
                    obj.left+= textureModeLeft;
                    obj.top += canvasOffsetHeight;
                    obj.setCoords();
                    if(typeof (obj.setBlocker) !=='undefined' && obj.setBlocker==true && isFrontEndUser){
                         obj.lockRotation = obj.lockUniScaling = obj.lockMovementX = obj.lockMovementY = obj.lockScalingX = obj.lockScalingY = true;
                    }
                });
                canvas.add.apply( canvas, objects );
                canvas.renderAll();

                loadBackground();
                canvas.setOverlayImage( null );
                canvas.renderAll();
                clearUndoData();
                addHelpers();
                if(typeof calculateInitialZoom  !=='undefined')
                     calculateInitialZoom(canvas.getWidth(),function(){
                          update_iframe();
                });
            } );
        }
        else if ( type == "json" ) {
            var lblZoom = document.getElementById( "lblZoom" );
            lblZoom.innerHTML = "zoom  @ 100%";
            canvas.loadFromJSON( _jsObject, function() {
                var middleElem=canvas.getObjects('rect').pop();
                canvas.getObjects().forEach( function( object, index ) {
                    //if(object.getPointByOrigin("center","center" ).x > middleElem.getPointByOrigin("center","center" ).x){
                      //  object.left+=thickness;
                    //}
                    if ( typeof object.objectID === 'undefined' || object.objectID == '' )
                        object.objectID = index;
                    if ( typeof isFrontEndUser !== 'undefined' && isFrontEndUser && object.setHelper !== 'undefined' && object.setHelper == true ) {
                        object.selectable = false;
                        object.hasControls = false;
                    }
                    if(typeof (object.setBlocker) !=='undefined' && object.setBlocker==true && isFrontEndUser){
                         object.lockRotation = object.lockUniScaling = object.lockMovementX = object.lockMovementY = object.lockScalingX = object.lockScalingY = true;
                    }
                } );
                loadBackground();
                canvas.setOverlayImage( null );
                canvas.renderAll();
                clearUndoData();
                addHelpers();
                if(typeof calculateInitialZoom  !=='undefined')
                     calculateInitialZoom(canvas.getWidth(),function(){
                         update_iframe();
                     });
            } );
        }
    }
    else {
        canvas.backgroundImage = "";
        canvas.renderAll();
        if(typeof calculateInitialZoom  !=='undefined')
                     calculateInitialZoom(canvas.getWidth());
         addHelpers();
    }


}

function runZoomIn () {

    isRender = true;
    var newWidth = Math.round( textureModeWidth * (canvasScale + 0.1) ) ;
    var newHeight = Math.round( textureModeHeight * (canvasScale + 0.1) );
    if ( canvasScale > 8.2 || newWidth > $( '#droppable' ).width() || newHeight > $( '#droppable' ).height() ) {
        return;
    }

    canvasScale = canvasScale + 0.1;

    updateCanvasSize( Math.round( textureModeWidth * canvasScale * customScaleX ), Math.round( textureModeHeight * canvasScale * customScaleY ), true );

    updateSizeAndPositionBackground();


    var obj = canvas.getObjects();
    for ( var i in obj ) {
        if ( obj[i] ) {
            if ( typeof obj[i].objectID !== 'undefined' && (obj[i].objectID == 100000 || obj[i].objectID == 100001 || obj[i].objectID == 100002 || obj[i].objectID == 100003) ) {
                if ( obj[i].objectID == 100002 ) {
                    obj[i].top = canvas.getHeight() - canvasOffsetHeight;
                }
                if ( obj[i].objectID == 100001 ) {
                    obj[i].left = canvas.getWidth() - textureModeLeft;
                }
            }
            else {
                var scaleX = obj[i].get( 'scaleX' );
                var scaleY = obj[i].get( 'scaleY' );
                var left = obj[i].get( 'left' );
                var top = obj[i].get( 'top' );

                var tempScaleX = scaleX * (canvasScale / (canvasScale - 0.1));
                var tempScaleY = scaleY * (canvasScale / (canvasScale - 0.1));
                var tempLeft = left * (canvasScale / (canvasScale - 0.1));
                tempLeft =tempLeft - textureModeLeft/(canvasScale- 0.1)*0.1  ;
                var tempTop = top * (canvasScale / (canvasScale - 0.1));
                tempTop = tempTop - canvasOffsetHeight / (canvasScale - 0.1) * 0.1;
                obj[i].set( 'scaleX', tempScaleX );
                obj[i].set( 'scaleY', tempScaleY );
                obj[i].set( 'left', tempLeft );
                obj[i].set( 'top', tempTop );
                obj[i].setCoords();
            }
        }
    }
    canvas.renderAll();
    update_iframe();
}

function getCanvasForPreview () {
    if ( canvasScale != 1 ) {
        var resize_scale = 1 - canvasScale;
        canvasScale = 1;
        updateCanvasSize( Math.round( textureModeWidth * 1 * customScaleX ), Math.round( textureModeHeight * 1 * customScaleY ), true );
        if ( canvas.backgroundImage ) {
            canvas.backgroundImage.set( {
                left    : Math.floor( textureModeLeft * 1 ),
                top     : canvasOffsetHeight,
                width   : Math.floor( textureModeWidth * customScaleX * 1 ),
                height  : Math.floor( textureModeHeight * customScaleY * 1 ),
                originX : 'left',
                originY : 'top'
            } );
        }
        canvas.fire( "after:render", [2] );
        var obj = canvas.getObjects();
        for ( var i in obj ) {
            if ( typeof obj[i].objectID !== 'undefined' && (obj[i].objectID == 100000 || obj[i].objectID == 100001 || obj[i].objectID == 100002 || obj[i].objectID == 100003 ) ) {
                if ( obj[i].objectID == 100002 ) {
                    obj[i].top = canvas.getHeight() - canvasOffsetHeight;
                }
                if ( obj[i].objectID == 100001 ) {
                    obj[i].left = canvas.getWidth() - textureModeLeft;
                }
            }
            else {
                var scaleX = obj[i].get( 'scaleX' );
                var scaleY = obj[i].get( 'scaleY' );
                var left = obj[i].get( 'left' );
                var top = obj[i].get( 'top' );
                var tempScaleX = scaleX * (canvasScale / (canvasScale - resize_scale));
                var tempScaleY = scaleY * (canvasScale / (canvasScale - resize_scale));
                var tempLeft = left * (canvasScale / (canvasScale - resize_scale));
                tempLeft =tempLeft - textureModeLeft/(canvasScale- resize_scale)*resize_scale  ;
                var tempTop = top * (canvasScale / (canvasScale - resize_scale));
                tempTop = tempTop - canvasOffsetHeight / (canvasScale - resize_scale) * resize_scale;
                obj[i].set( 'scaleX', tempScaleX );
                obj[i].set( 'scaleY', tempScaleY );
                obj[i].set( 'left', tempLeft );
                obj[i].set( 'top', tempTop );
                obj[i].setCoords();
            }
        }
        canvas.renderAll();
        //lblZoom.innerHTML = "zoom  @  " + Math.round( canvasScale * 100 ) + "%";
    }
}

function runZoomOut () {
    var newWidth=textureModeWidth * canvasScale-0.1;
    if(previewType!='tdpreview' && canvasScale>0.2){
    }
    else if ( canvasScale < 0.1 || newWidth < 600 ) {
        return;
    }

    canvasScale = canvasScale - 0.1;

    updateCanvasSize( Math.round( textureModeWidth * canvasScale * customScaleX ), Math.round( textureModeHeight * canvasScale * customScaleY ), true );
    updateSizeAndPositionBackground();
    var obj = canvas.getObjects();
    for ( var i in obj ) {
        if ( obj[i] ) {
            if ( typeof obj[i].objectID !== 'undefined' && (obj[i].objectID == 100000 || obj[i].objectID == 100001 || obj[i].objectID == 100002 || obj[i].objectID == 100003 ) ) {
                if ( obj[i].objectID == 100002 ) {
                    obj[i].top = canvas.getHeight() - canvasOffsetHeight;
                }
                if ( obj[i].objectID == 100001 ) {
                    obj[i].left = canvas.getWidth() - textureModeLeft;
                }
            }
            else {
                var scaleX = obj[i].get( 'scaleX' );
                var scaleY = obj[i].get( 'scaleY' );
                var left = obj[i].get( 'left' );
                var top = obj[i].get( 'top' );
                var tempScaleX = scaleX * (canvasScale / (canvasScale + 0.1));
                var tempScaleY = scaleY * (canvasScale / (canvasScale + 0.1));
                var tempLeft = left * (canvasScale / (canvasScale + 0.1));
                tempLeft =tempLeft + textureModeLeft/(canvasScale + 0.1)*0.1  ;
                var tempTop = top * (canvasScale / (canvasScale + 0.1));
                tempTop = tempTop + canvasOffsetHeight / (canvasScale + 0.1) * 0.1;
                obj[i].set( 'scaleX', tempScaleX );
                obj[i].set( 'scaleY', tempScaleY );
                obj[i].set( 'left', tempLeft );
                obj[i].set( 'top', tempTop );
                obj[i].setCoords();
            }
        }
    }
    canvas.renderAll();
    update_iframe();
}

function toggleGrid () {


    if ( _isGrid ) {
        $( '.upper-canvas' ).css( 'background-image', 'none' );
        $( '#btnToggleGrid' ).css( 'color', "#5C5C5C" );
        //remove gridGroup
        canvas.remove( gridGroup );
        _isGrid = false;
    }
    else {
        $( '#btnToggleGrid' ).css( 'color', "#27B7F5" );

        var grid = 30;
        gridGroup = new fabric.Group();
        for ( var i = 0; i < (canvas.width / grid); i ++ ) {
            if ( (i * grid) % 150 != 0 )
                gridGroup.add( new fabric.Line( [i * grid, 0, i * grid, canvas.height * 2], { strokeDashArray : [
                    4, 1
                ], opacity                                                                                    : "0.6", stroke : '#B0B0B0', selectable : false } ) );
            else
                gridGroup.add( new fabric.Line( [
                    i * grid, 0, i * grid, canvas.height * 2
                ], { strokeWidth : '0.7', stroke : 'black', selectable : false } ) );
        }
        for ( var i = 0; i < (canvas.width / grid); i ++ ) {
            if ( (i * grid) % 150 != 0 )
                gridGroup.add( new fabric.Line( [0, i * grid, canvas.width, i * grid], { strokeDashArray : [
                    4, 1
                ], stroke                                                                                : '#B0B0B0', opacity : "0.6", selectable : false } ) )
            else
                gridGroup.add( new fabric.Line( [
                    0, i * grid, canvas.width * 2, i * grid
                ], {strokeWidth : '0.7', stroke : '#black', selectable : false } ) )
        }
        canvas.add( gridGroup );
        _isGrid = true;
    }

}

function groupObjects () {
    if ( canvas.getActiveGroup() ) {
        var objects = canvas.getActiveGroup().getObjects();
        var groupObjects = [];
        var undoData = [];

        var clonedOb = function( o, objectID, setHelper, callback ) {
            o.objectID = objectID;
            if ( typeof setHelper !== 'undefined' )
                o.setHelper = setHelper;
            groupObjects.push( o );
            callback();
        }

        var left = canvas.getActiveGroup().left;
        var top = canvas.getActiveGroup().top;
        var width = canvas.getActiveGroup().width;
        var height = canvas.getActiveGroup().height;

        var addObjectToGroup = function( index, objects ) {
            if ( index < objects.length ) {
                var o = objects[index];
                if ( ['text', 'i-text', 'textbox', 'polygon','line', 'rect', 'circle', 'ellipse'].indexOf( o.type ) >= 0 ) {
                    clonedOb( o.clone(), o.objectID, o.setHelper, function() {
                        addObjectToGroup( index + 1, objects );
                    } );
                }
                else {
                    o.clone( function( clone ) {
                        clone.objectID = o.objectID;
                        clone.setHelper = o.setHelper;
                        groupObjects.push( clone );
                        addObjectToGroup( index + 1, objects );
                    } );
                }
            }
            else {
                canvas.getActiveGroup().getObjects().forEach( function( object, index ) {
                    undoData.push( {
                        objectId : object.objectID,
                        removed  : object
                    } );
                    canvas.remove( object );
                    if ( canvas.getActiveGroup() != null && index == canvas.getActiveGroup().getObjects().length - 1 ) {
                        var group = new fabric.Group( groupObjects, {
                            left    : left,
                            top     : top,
                            width   : width,
                            height  : height,
                            originX : 'center',
                            originY : 'center'
                        } );
                        group.objectID = Math.floor( Math.random() * 10000 );
                        undoData.push( {
                            objectId : group.objectID,
                            added    : group
                        } );
                        group.opacity=0;
                        canvas.add( group );
                        pushUndoData( undoData );
                        canvas.discardActiveGroup();
                        $( '#groupEdit' ).css( 'display', 'none' );
                        setTimeout((function(objectID){
                            return function(){
                                if(canvas.getObjectByID(objectID ).length){
                                    canvas.getObjectByID(objectID)[0].opacity=1;
                                    canvas.renderAll();
                                    update_iframe();
                                }
                            }
                        })(group.objectID),10);
                    }
                } );
            }
        }

        addObjectToGroup( 0, objects );
    }
}

function unGroupObjects () {
    if ( canvas.getActiveObject() && canvas.getActiveObject().type == "group" ) {
        var undoData = [];
        var clonedOb = function( o, objectID, setHelper ) {
            o.objectID = objectID;
            if ( typeof setHelper !== 'undefined' )
                o.setHelper = setHelper;
            o.set( {
                left : o.left + canvas.getActiveObject().left,
                top  : o.top + canvas.getActiveObject().top
            } );
            canvas.add( o );
            undoData.push( {
                objectId : o.objectID,
                added    : o
            } );
        }
        var objects = canvas.getActiveObject().getObjects();
        var left = canvas.getActiveObject().left;
        var top = canvas.getActiveObject().top;

        for ( var i in objects ) {
            var o = objects[i];
            if ( ['text', 'i-text', 'textbox', 'line', 'polygon', 'rect', 'circle', 'ellipse'].indexOf( o.type ) >= 0 ) {
                clonedOb( o.clone(), o.objectID, o.setHelper );
            }
            else {
                o.clone( function( clone ) {
                    var oldOpacity = o.opacity;
                    clone.objectID = Math.floor( Math.random() * 10000);
                    clone.setHelper = o.setHelper;
                    clone.set( {
                        left : clone.left + left,
                        top  : clone.top + top
                    } );
                    undoData.push( {
                        objectId : clone.objectID,
                        added    : clone
                    } );
                    clone.opacity = 0;
                    canvas.add( clone );
                    setTimeout((function(objectID,oldOpacity){
                        return function(){
                            if(canvas.getObjectByID(objectID ).length){
                                canvas.getObjectByID(objectID )[0].opacity = oldOpacity;
                                canvas.renderAll();
                                update_iframe();
                            }
                        }
                    })( clone.objectID,oldOpacity),10);
                } );
            }
            if ( i == objects.length - 1 ) {
                undoData.push( {
                    objectId : canvas.getActiveObject().objectID,
                    removed  : canvas.getActiveObject()
                } );
                pushUndoData( undoData );
                canvas.remove( canvas.getActiveObject() );
            }
        }
        canvas.renderAll();
        canvas.discardActiveObject();
        $( '#groupEdit' ).css( 'display', 'none' );
    }
}

function setTextBoxAlign ( align ) {
    if ( canvas.getActiveObject() && (canvas.getActiveObject().type == "i-text" || canvas.getActiveObject().type == "textbox")) {
        pushUndoData( [
            {
                objectId : canvas.getActiveObject().objectID,
                oldStage : {
                    textAlign : canvas.getActiveObject().textAlign,
                    fromText  : canvas.getActiveObject().fromText
                },
                newStage : {
                    textAlign : align,
                    fromText  : false
                }
            }
        ] );
        canvas.getActiveObject().textAlign = align;
        canvas.getActiveObject().fromText = false;
        canvas.renderAll();
    }
}

function setVerticalAlign ( vAlign ) {
    if ( canvas.getActiveObject() && (canvas.getActiveObject().type == "i-text" || canvas.getActiveObject().type == "textbox") ) {
        canvas.getActiveObject().vAlign = vAlign;
        canvas.renderAll();
    }
}

function observeHelpers(e) {
    objects = canvas.getHelpers( true );
    objects.forEach( function( obj, key ) {
        if ( typeof obj.setHelper !== 'undefined' && obj.setHelper == true ) {
            if(typeof obj.bringToFront() === 'function')
                obj.bringToFront();
        }
    } );
    canvas.renderAll();

}
