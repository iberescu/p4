function updatePath ( json, scale ) {
    var objJSON = JSON.parse( json ),
            objects = objJSON.objects;

    for ( var i in objects ) {
        var obj = objects[i];
        if ( typeof obj.objectID !== 'undefinded' && (obj.objectID == 100000 || obj.objectID == 100001 || obj.objectID == 100002|| obj.objectID == 100003) ){
            obj.opacity = '0';
        }
        if ( obj ) {

            obj.left *= scale;
            obj.top *= scale;
            obj.scaleX *= scale;
            obj.scaleY *= scale;
        }

    }



    return JSON.stringify( objJSON );





}

function fixFont ( obj ) {

    if ( obj.fontFamily.toLowerCase() === 'impact' ) {
        /*obj.fontSize = parseInt(obj.fontSize) + 1;*/
        obj.top += (obj.fontSize * obj.scaleY / 5);

        if ( obj.text.toLowerCase() === 'oil' ) {
            obj.left -= (obj.fontSize * obj.scaleX / 4.5);
        }
        else {
            obj.left -= (obj.fontSize * obj.scaleX / 6);
        }
    }
    else if ( obj.fontFamily.toLowerCase() === 'modernist_one_400' ) {

        /*if(obj.fontWeight === 100) {
         obj.fontSize = parseInt(obj.fontSize) + 1;
         }*/
        obj.left -= (obj.fontSize * obj.scaleX / 4);

        obj.top += (obj.fontSize * obj.scaleY / 8.5);

    }
    else if ( obj.fontFamily.toLowerCase() === 'helvetica' ) {
        obj.top += (obj.fontSize * obj.scaleY / 9);
        obj.left -= (obj.fontSize * obj.scaleX / 5.2);
        /*obj.fontSize = parseInt(obj.fontSize) + 0.4;*/
        if ( obj.text.toLowerCase() === '20 million' ) {
            obj.left -= 6;
            //obj.left -=  (obj.fontSize * obj.scaleX /1.5);
            obj.top += 1;
            obj.fontWeight = "bold";
        }
    }
    else if ( obj.fontFamily.toLowerCase() === 'comic_sans_ms' ) {
        obj.top += (obj.fontSize * obj.scaleY / 4);
        obj.left -= (obj.fontSize * obj.scaleX / 3);
    }
    else if ( obj.fontFamily.toLowerCase() === 'encient_german_gothic_400' ) {
        //obj.top -=  (obj.fontSize * obj.scaleY / 4);
        obj.left -= (obj.fontSize * obj.scaleX / 3);
        //obj.fontSize = parseInt(obj.fontSize) + 1;
    }
    else if ( obj.fontFamily.toLowerCase() === 'geneva' ) {
        obj.top += (obj.fontSize * obj.scaleY / 5);
        obj.left -= (obj.fontSize * obj.scaleX / 5.5);
        //obj.lineHeight = 1.1;
    }
    else if ( obj.fontFamily.toLowerCase() === 'verdana' ) {
        obj.top += (obj.fontSize * obj.scaleY / 5);
        obj.left -= (obj.fontSize * obj.scaleX / 5.5);
    }
    else if ( obj.fontFamily.toLowerCase() === 'myriad_pro' ) {
        //obj.top +=  (obj.fontSize * obj.scaleY / 15);
        obj.left -= (obj.fontSize * obj.scaleX / 6);
        /*
         Note by Tai
         obj.fontSize = parseInt(obj.fontSize) + 1.5;*/
    }
    else if ( obj.fontFamily.toLowerCase() === 'monaco' ) {
        obj.top += (obj.fontSize * obj.scaleY / 6);
        /*obj.left -=  (obj.fontSize * obj.scaleX / 10);*/
    }
    else if ( obj.fontFamily.toLowerCase() === 'dejavu_serif_400' ) {
        obj.top += (obj.fontSize * obj.scaleY / 6);
        obj.left -= (obj.fontSize * obj.scaleX / 3);
    }
    else {
        obj.left -= (obj.fontSize * obj.scaleX / 5.2);
        obj.top += (obj.fontSize * obj.scaleX / 10);
    }
}

function degreesToRadian ( degrees ) {
    return degrees * Math.PI / 180;
}

function getMidlePoint ( width, height, angle, left, top ) {

    var cx = width / 2,
            cy = height / 2,
            sin = Math.sin( degreesToRadian( angle ) ),
            cos = Math.cos( degreesToRadian( angle ) ),
            rx = cx * cos - cy * sin,
            ry = cx * sin + cy * cos;


    return {
        midX : rx + left,
        midY : ry + top
    }

}

function setTempCanvasDim () {
    tempCanvas.setWidth( Math.round( canvas.getWidth()));
    tempCanvas.setHeight(Math.round( canvas.getHeight()));
    if ( tempCanvas.backgroundImage ) {
        tempCanvas.backgroundImage.set( {
            left    : textureModeLeft,
            top     : canvasOffsetHeight,
            width   : Math.floor( tempCanvas.getWidth()-2*textureModeLeft ),
            height  : Math.floor( tempCanvas.getHeight()-2*canvasOffsetHeight ),
            originX : 'left',
            originY : 'top'
        } );
    }
    tempCanvas.renderAll();
}














