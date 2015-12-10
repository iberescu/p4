function search ( nameKey, myArray ) {
    for ( var i = 0; i < myArray.length; i ++ ) {
        if ( myArray[i].id === nameKey ) {
            return myArray[i];
        }
    }
}

function drawBackground ( ui ) {
    var undoData = [];
    var dataId = ui.draggable.attr( "data-id" );
    var data1 = search( dataId, backgroundsGlobal );
    var data = {
        id            : data1.id,
        "portraitUrl" : mediaUrl + 'personalization/html5_files/backgrounds/' + data1.file_name
    };
    var url = null;
    textureName = dataId;
    if ( textureMode == 0 ) {
        url = data.portraitUrl;
        textureMode = 0;
    }
    undoData.push( {
        oldStageBackground:{
        	backgroundSrc    : (typeof  canvas.backgroundImage !== 'undefined' && typeof  canvas.backgroundImage.getSrc === 'function') ? canvas.backgroundImage.getSrc() : null
        },
        newStageBackground:{
            backgroundSrc    : url
        },
        backgroundImage  : true
    } );
    pushUndoData( undoData );
    if ( temptextureMode == textureMode ) {
        canvas.setBackgroundImage( url, function() {
            updateSizeAndPositionBackground();
            canvas.renderAll();
            update_iframe();
        } );
    }
}

function loadFromSVG ( url, left, top ) {
    var lf = left;
    var tp = top;
    fabric.loadSVGFromURL( url, function( objects, options ) {
        var loadedObject;

        if ( objects.length > 1 ) {

            loadedObject = new fabric.PathGroup( objects, options );
            var objPaths = loadedObject.paths;
            for ( var j in objPaths ) {
                objPaths[j].set( {
                    originX : 'center',
                    originY : 'center'
                } );
                if ( objPaths[j].type == 'line' ) {
                    objPaths[j].set( {
                        'left' : objPaths[j].left + objPaths[j].width / 2,
                        'top'  : objPaths[j].top + objPaths[j].height / 2
                    } );
                }
            }

        }
        else {
            loadedObject = objects[0];
        }

        loadedObject.set( {
            left    : lf,
            top     : tp,
            originX : 'center',
            originY : 'center',
            angle   : 0,
            opacity : 0
        } );
        if ( loadedObject.width >= textureModeWidth * customScaleX || loadedObject.height >= textureModeHeight * customScaleY ) {
            var objScaleX = (textureModeWidth * customScaleX) / loadedObject.width;
            var objScaleY = (textureModeHeight * customScaleY) / loadedObject.height;
            if ( objScaleX >= objScaleY ) {
                loadedObject.set( {
                    scaleX : objScaleY,
                    scaleY : objScaleY
                } );
            }
            else {
                loadedObject.set( {
                    scaleX : objScaleX,
                    scaleY : objScaleX
                } );
            }
        }
        if ( loadedObject.width < 350 && loadedObject.height < 350 )
            loadedObject.set( {
                scaleX : 5,
                scaleY : 5
            } );
        loadedObject.hasRotatingPoint = true;
        loadedObject.objectID = Math.floor( Math.random() * 10000 );
        //console.log( loadedObject );
        canvas.add( loadedObject );
        canvas.calcOffset();
        canvas.renderAll();
        pushUndoData( [
            {
                objectId : loadedObject.objectID,
                added    : loadedObject
            }
        ] );
        animateDragAndDrop( loadedObject );
    } );
}

function drawVector ( event, ui ) {
    var currentPos      = canvas.getPointer(event )
    var draggableId = ui.draggable.attr( "data-name" );
    var draggableUrl = ui.draggable.attr( "data-location" );
    var url = draggableUrl + draggableId;
    loadFromSVG( url, currentPos.x, currentPos.y );
    canvas.loadFromJSON( '' );
}

function drawText ( event, ui ) {

    var draggableId = ui.draggable.attr( "data-name" ),
    currentPos      = canvas.getPointer(event ),text;
    if ( draggableId == "title" ) {
        text = new fabric.IText( "Double click to change text", {
            fontSize   : 28,
            textAlign  : 'left',
            vAlign     : 'top',
            fill       : '#000000',
            width      : 300,
            height     : 150,
            originX    : "center",
            originY    : "center",
            fontFamily : 'Times New Roman',
            left       : parseInt( currentPos.x ),
            top        : parseInt( currentPos.y ),
            opacity    : 1
        } );
    }
    else if ( draggableId == "header" ) {
        text = new fabric.IText( "Double click to change text", {
            fontSize   : 20,
            textAlign  : 'left',
            vAlign     : 'top',
            fill       : '#000000',
            width      : 250,
            height     : 100,
            originX    : "center",
            originY    : "center",
            fontFamily : 'Times New Roman',
            left       : parseInt( currentPos.x ),
            top        : parseInt( currentPos.y ),
            opacity    : 1
        } );
    }
    else if ( draggableId == "body" ) {
        text = new fabric.IText( "Double click to change text", {
            fontSize   : 18,
            textAlign  : 'left',
            vAlign     : 'top',
            fill       : '#000000',
            width      : 200,
            height     : 100,
            originX    : "center",
            originY    : "center",
            fontFamily : 'Times New Roman',
            left       : parseInt( currentPos.x ),
            top        : parseInt( currentPos.y ),
            opacity    : 1
        } );
    }
    else if ( draggableId == "textbox" ) {
        text = new fabric.Textbox( "Double click to change text", {
            width      : 200,
            height     : 200,
            left       : parseInt( currentPos.x ),
            top        : parseInt( currentPos.y ),
            fontSize   : 17,
            textAlign  : 'left',
            originX    : "center",
            originY    : "center",
            fontFamily : 'Times New Roman',
            fill       : '#000000',
            opacity    : 1
        } );
    }
    else {
        text = new fabric.IText( "Double click to change text", {
            fontSize   : 18,
            curvedText : true,
            radius     : 100,
            spacing    : 3,
            reverse    : false,
            textAlign  : 'left',
            vAlign     : 'top',
            fill       : '#000000',
            width      : 200,
            height     : 100,
            originX    : "center",
            originY    : "center",
            fontFamily : 'Times New Roman',
            left       : parseInt( currentPos.x ),
            top        : parseInt( currentPos.y ),
            opacity    : 1
        } );
    }
    text.objectID = Math.floor( Math.random() * 10000 );
    canvas.add( text );
    pushUndoData( [
        {
            objectId : text.objectID,
            added    : text
        }
    ] );
    animateDragAndDrop( text );
}

function animateDragAndDrop ( object ) {
    fabric.util.animate( {

        startValue : 0.2,
        endValue   : 1,

        duration : 800,

        onChange   : function( value ) {
            object.set( 'opacity', value );
            canvas.renderAll();
            $( '#slider' ).slider( 'value', value * 100 );
        },
        onComplete : function( value ) {
            update_iframe();
        }
    } );
}

function updateSizeAndPositionBackground () {
    if ( canvas.backgroundImage ) {
        canvas.backgroundImage.set( {
            left    : textureModeLeft,
            top     : canvasOffsetHeight,
            width   : Math.floor( textureModeWidth  * canvasScale ),
            height  : Math.floor( textureModeHeight * canvasScale ),
            originX : 'left',
            originY : 'top'
        } );
    }
    canvas.fire( "after:render", [2] );
    update_iframe();

}