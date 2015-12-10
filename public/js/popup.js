// JavaScript Document
var objectsDropDownList = "draggableObjects";
var themesDropDownList = "draggableThemesMaps";
function formatTextFieldChange () {
    var object = canvas.getActiveObject();

    if ( object.type == "text" ) {
        object.setText( document.getElementById( 'formatTextField' ).value );
        canvas.renderAll();
    }
}
function deleteCanvasObject () {
    animateDelete();
}
// SLIDER FOR OPACITY, RADIUS AND SPACING EVENTS
$( function() {
    $( "#slider" ).slider( {
        slide : sliderMoved,
        stop  : function(e){
            update_iframe();
        }
    } );
} );
$( function() {
    $( "#slider_radius" ).slider( {
        slide : sliderRadiusMoved,
        min   : 10,
        max   : 200,
        stop  : function( e ) {
            update_iframe();
        }
    } );
} );
$( function() {
    $( "#slider_spacing" ).slider( {
        slide : sliderSpacingMoved,
        min   : 0,
        max   : 30,
        stop  : function( e ) {
            update_iframe();
        }
    } );
} );
$( function() {
    $( "#sliderDrawingWidth" ).slider( {
        min   : 1,
        max   : 100,
        stop  : sliderDrawingWidth
    } );
} );
$( function() {
    $( "#sliderBorderWidth" ).slider( {
        min  : 1,
        max  : 30,
        stop : function( e ) {
        }
    } );
} );
function sliderDrawingWidth () {
    if ( _isFreeDrawing ) {
        var val = $( "#sliderDrawingWidth" ).slider( "value" );
        canvas.freeDrawingBrush.width = parseInt( val, 10 ) || 1;
    }
}
function sliderSpacingMoved () {
    var val = $( "#slider_spacing" ).slider( "value" );
    if ( canvas.getActiveObject() ) {
        var undoArray = [
            {
                objectId : canvas.getActiveObject().objectID,
                oldStage : {
                    spacing : canvas.getActiveObject().spacing
                },
                newStage : {
                    spacing : val
                }
            }
        ];
        pushUndoData( undoArray );
        canvas.getActiveObject().spacing = val;
    }
    canvas.renderAll();
}
function sliderRadiusMoved () {
    var val = $( "#slider_radius" ).slider( "value" );
    if ( canvas.getActiveObject() ) {
        var undoArray = [
            {
                objectId : canvas.getActiveObject().objectID,
                oldStage : {
                    radius : canvas.getActiveObject().radius
                },
                newStage : {
                    radius : val
                }
            }
        ];
        pushUndoData( undoArray );
        canvas.getActiveObject().radius = val;
    }
    canvas.renderAll();
}
function sliderMoved () {
    var val = $( "#slider" ).slider( "value" );
    if ( canvas.getActiveGroup() ) {
        var undoArray = [];
        for ( var index in canvas.getActiveGroup().getObjects() ) {
            var obj = canvas.getActiveGroup().getObjects()[index];
            undoArray.push( {
                objectId : obj.objectID,
                oldStage : {
                    opacity : obj.opacity
                },
                newStage : {
                    opacity : val / 100
                }
            } );
        }
        pushUndoData( undoArray );
        canvas.getActiveGroup().setOpacity( val / 100 );
    }
    if ( canvas.getActiveObject() ) {
        var undoArray = [
            {
                objectId : canvas.getActiveObject().objectID,
                oldStage : {
                    opacity : canvas.getActiveObject().opacity
                },
                newStage : {
                    opacity : val / 100
                }
            }
        ];
        pushUndoData( undoArray );
        canvas.getActiveObject().setOpacity( val / 100 );
    }

    canvas.renderAll();
}

$( document ).on( "click", "#fontList li", function() {
    if ( canvas.getActiveObject() ) {
        var object = canvas.getActiveObject();

        if ( object.type == "text" || object.type == "i-text" || object.type == "textbox") {
            var fontFamily = $( this ).children( 'a.fontOption' ).attr( 'data-value' );
            var undoArray = [
                {
                    objectId : canvas.getActiveObject().objectID,
                    oldStage : {
                        fontFamily : canvas.getActiveObject().fontFamily
                    },
                    newStage : {
                        fontFamily : fontFamily
                    }
                }
            ];
            pushUndoData( undoArray );
            canvas.getActiveObject().set( 'fontFamily', "'" + fontFamily + "'" );
            $( '#font' ).html( fontFamily );
            $( '#fontList li' ).each( function() {
                $( this ).removeClass( 'selected' );
            } )
            $( this ).addClass( 'selected' );
            canvas.renderAll();
        }
    }
    if ( canvas.getActiveGroup() ) {
        var fontFamily = $( this ).children( 'a.fontOption' ).attr( 'data-value' );
        var undoData = [];
        canvas.getActiveGroup().getObjects().forEach( function( object, index ) {
            if ( ['text', 'textbox','i-text'].indexOf( object.type ) ) {
                undoData.push( {
                    objectId : object.objectID,
                    oldStage : {
                        fontFamily : object.fontFamily
                    },
                    newStage : {
                        fontFamily : fontFamily
                    }
                } );
                object.set( 'fontFamily', "'" + fontFamily + "'" );
            }
            if ( index == canvas.getActiveGroup().getObjects().length - 1 ) {
                pushUndoData( undoData );
                canvas.renderAll();
            }
        } );
    }
    update_iframe();
} );

$( document ).on( "click", "#fontSizeList li", function() {
    if ( canvas.getActiveObject() ) {
        var object = canvas.getActiveObject();

        if ( object.type == "text" || object.type == "i-text" || object.type == "textbox" ) {
            if ( $( this ).children( 'a.fontSizeOption' ).length > 0 ) {
                var fontSize = $( this ).children( 'a.fontSizeOption' ).attr( 'data-value' );
                var undoArray = [
                    {
                        objectId : canvas.getActiveObject().objectID,
                        oldStage : {
                            fontSize   : canvas.getActiveObject().fontSize,
                            textScales : canvas.getActiveObject().textScales
                        },
                        newStage : {
                            fontSize   : fontSize,
                            textScales : [1, 1]
                        }
                    }
                ];
                pushUndoData( undoArray );
                canvas.getActiveObject().set( 'fontSize', parseInt( fontSize ) );
                canvas.getActiveObject().set( 'textScales', [1, 1] );
                $( '#fontSize' ).html( parseInt( fontSize ) );
                $( '#fontSizeList li' ).each( function() {
                    $( this ).removeClass( 'selected' );
                } )
                $( this ).addClass( 'selected' );
                canvas.renderAll();
            }
        }
    }
    if ( canvas.getActiveGroup() ) {
        var fontSize = $( this ).children( 'a.fontSizeOption' ).attr( 'data-value' );
        var undoData = [];
        canvas.getActiveGroup().getObjects().forEach( function( object, index ) {
            if ( ['text', 'i-text','textbox'].indexOf( object.type ) >= 0 ) {
                undoData.push( {
                    objectId : object.objectID,
                    oldStage : {
                        fontSize   : object.fontSize,
                        textScales : object.textScales
                    },
                    newStage : {
                        fontSize   : parseInt( fontSize ),
                        textScales : [1, 1]
                    }
                } );
                object.set( 'fontSize', parseInt( fontSize ) );
                object.set( 'textScales', [1, 1] );
            }
            if ( index == canvas.getActiveGroup().getObjects().length - 1 ) {
                pushUndoData( undoData );
                canvas.renderAll();
            }
            $( '#fontSizeList li' ).each( function() {
                $( this ).removeClass( 'selected' );
            } );
            $( '#fontSize' ).html( parseInt( fontSize ) );
        } );
        canvas.renderAll();
    }
} );

$( document ).on( "click", "#alignList li", function() {
    if ( canvas.getActiveObject() ) {
        var object = canvas.getActiveObject();

        if ( object.type == "text" || object.type == "i-text" || object.type == "textbox") {
            var textAlign = $( this ).children( 'a.alignOption' ).attr( 'data-value' );
            var undoArray = [
                {
                    objectId : canvas.getActiveObject().objectID,
                    oldStage : {
                        textAlign : canvas.getActiveObject().textAlign
                    },
                    newStage : {
                        textAlign : textAlign
                    }
                }
            ];
            pushUndoData( undoArray );
            if ( ['left', 'center', 'right'].indexOf( textAlign ) >= 0 ) {
                setTextBoxAlign( textAlign );
                $( '#textAlign' ).html( '<i class="fa fa-align-' + textAlign + '"></i>' );
            }
            canvas.renderAll();
        }
    }
    if ( canvas.getActiveGroup() ) {
        var textAlign = $( this ).children( 'a.alignOption' ).attr( 'data-value' );
        var undoData = [];
        canvas.getActiveGroup().getObjects().forEach( function( object, index ) {
            if ( ['text', 'i-text','textbox'].indexOf( object.type ) >= 0 && [
                                                                        'left',
                                                                        'center',
                                                                        'right'
                                                                    ].indexOf( textAlign ) >= 0 ) {
                undoData.push( {
                    objectId : object.objectID,
                    oldStage : {
                        textAlign : object.textAlign,
                        fromText  : object.fromText
                    },
                    newStage : {
                        textAlign : textAlign,
                        fromText  : false
                    }
                } );
                object.textAlign = textAlign;
                object.fromText = false;
                $( '#textAlign' ).html( '<i class="fa fa-align-' + textAlign + '"></i>' );
            }
            if ( index == canvas.getActiveGroup().getObjects().length - 1 ) {
                pushUndoData( undoData );
                canvas.renderAll();
            }
        } )
    }
} );

// Objects
function ddObjectsSelection ( objValue ) {
    //$( "#objectsPicker" ).change(function() {
    $( '#animateObjects' ).animate( {
        left : '0'
    }, 0, function() {
    } );

    $( '#objectsMenu' ).html( "<b>choose category</b><div style=\"color:#93EEFD;\"><b/>" + returnObjectArrayName( objValue ) + "&nbsp;&raquo;</b></div>" );

    var hideObjectsArray = returnObjectArray( objectsDropDownList );
    //var showObjectsArray = returnObjectArray(this.value);
    var showObjectsArray = returnObjectArray( objValue );
    for ( i = 0; i < hideObjectsArray.length; i ++ ) {
        var elementId = objectsDropDownList + i;
        var elementToHide = document.getElementById( elementId );
        elementToHide.style.display = "none";
    }

    for ( i = 0; i < showObjectsArray.length; i ++ ) {
        //var elementId = this.value + i;
        var elementId = objValue + i;
        var elementToShow = document.getElementById( elementId );
        elementToShow.style.display = "inline";
    }

    scrollPageObjects = 1;
    scrollPageObjectsPages = Math.ceil( showObjectsArray.length / 15 );

    var scrollerId = document.getElementById( "objectPageScroller" );
    scrollerId.innerHTML = "page slide<br />" + scrollPageObjects + " of " + scrollPageObjectsPages;

    //objectsDropDownList = this.value;
    objectsDropDownList = objValue;

    var leftScroller = document.getElementById( "btnScrollPanelLeftObjects" );
    leftScroller.style.opacity = "0.3";

    if ( scrollPageObjectsPages == 1 ) {
        var rightScroller = document.getElementById( "btnScrollPanelRightObjects" );
        rightScroller.style.opacity = "0.3";
    }
    else {
        var rightScroller = document.getElementById( "btnScrollPanelRightObjects" );
        rightScroller.style.opacity = "1.0";
    }

    //});
}
// Objects
$( function() {
    $( "#objectsPicker" ).change( function() {

        $( '#animateObjects' ).animate( {
            left : '0'
        }, 0, function() {
        } );

        var hideObjectsArray = returnObjectArray( objectsDropDownList );
        var showObjectsArray = returnObjectArray( this.value );
        for ( i = 0; i < hideObjectsArray.length; i ++ ) {
            var elementId = objectsDropDownList + i;
            var elementToHide = document.getElementById( elementId );
            elementToHide.style.display = "none";
        }

        for ( i = 0; i < showObjectsArray.length; i ++ ) {
            var elementId = this.value + i;
            var elementToShow = document.getElementById( elementId );
            elementToShow.style.display = "inline";
        }

        scrollPageObjects = 1;
        scrollPageObjectsPages = Math.ceil( showObjectsArray.length / 15 );

        var scrollerId = document.getElementById( "objectPageScroller" );
        scrollerId.innerHTML = scrollPageObjects + " of " + scrollPageObjectsPages;

        objectsDropDownList = this.value;

        var leftScroller = document.getElementById( "btnScrollPanelLeftObjects" );
        leftScroller.style.opacity = "0.3";

        if ( scrollPageObjectsPages == 1 ) {
            var rightScroller = document.getElementById( "btnScrollPanelRightObjects" );
            rightScroller.style.opacity = "0.3";
        }
        else {
            var rightScroller = document.getElementById( "btnScrollPanelRightObjects" );
            rightScroller.style.opacity = "1.0";
        }

    } );
} );
// COLOR PICKERS
$( function() {
    $( "#colorPicker" ).click( function() {
        if ( isColorPickerOpen ) {
            $( ".colorpickermenu" ).css( "display", "none" );
            isColorPickerOpen = false;
                }
                else {
            if ( isColorPickerBorderOpen ) {
                $( ".colorpickermenu_border" ).css( "display", "none" );
                isColorPickerBorderOpen = false;
            }
            $( ".colorpickermenu" ).css( "display", "block" );
            isColorPickerOpen = true;
                }

    } );
} );
$( function() {
    $( "#colorPickerBorder" ).click( function() {
        if ( isColorPickerBorderOpen ) {
            $( ".colorpickermenu_border" ).css( "display", "none" );
            isColorPickerBorderOpen = false;
        }
        else {
            if ( isColorPickerOpen ) {
                $( ".colorpickermenu" ).css( "display", "none" );
                isColorPickerOpen = false;
            }
            $( ".colorpickermenu_border" ).css( "display", "block" );
            isColorPickerBorderOpen = true;
        }

    } );
} );
// BOLD / ITALISIZED / UNDERLINED
$( function() {

    $( "#bold" ).change( function() {
        var value = '';
        var undoObj = {
            objectId : canvas.getActiveObject().objectID,
            oldStage : {
                fontWeight : canvas.getActiveObject().fontWeight
            }
        };
        if ( this.checked ) {
            canvas.getActiveObject().set( 'fontWeight', 'bold' );
            value = 'bold';
            var textBold = document.getElementById( "textLabelBold" );
            textBold.style.backgroundImage = "url("+"public/img/btn_bold_on.png)";
        }
        else {
            canvas.getActiveObject().set( 'fontWeight', '' );
            var textBold = document.getElementById( "textLabelBold" );
            textBold.style.backgroundImage = "url("+"public/img/btn_bold.png)";
        }
        undoObj.newStage = {
            fontWeight : value
        }
        pushUndoData( [undoObj] );
        canvas.renderAll();
        update_iframe();
    } );

    $( "#italisized" ).change( function() {
        var value = 'normal';
        var undoObj = {
            objectId : canvas.getActiveObject().objectID,
            oldStage : {
                fontStyle : canvas.getActiveObject().fontStyle
            }
        };
        if ( this.checked ) {
            value = 'italic';
            canvas.getActiveObject().set( 'fontStyle', 'italic' );
            var textItalic = document.getElementById( "textLabelItalisized" );
            textItalic.style.backgroundImage = "url("+"public/img/btn_italic_on.png)";
        }
        else {
            canvas.getActiveObject().set( 'fontStyle', 'normal' );
            var textItalic = document.getElementById( "textLabelItalisized" );
            textItalic.style.backgroundImage = "url("+"public/img/btn_italic.png)";
        }
        undoObj.newStage = {
            fontStyle : value
        }
        pushUndoData( [undoObj] );
        canvas.renderAll();
        update_iframe();
    } );

    $( "#underlined" ).change( function() {
        var value = 'none';
        var undoObj = {
            objectId : canvas.getActiveObject().objectID,
            oldStage : {
                textDecoration : canvas.getActiveObject().textDecoration
            }
        };
        if ( this.checked ) {
            value = 'underline';
            canvas.getActiveObject().set( 'textDecoration', 'underline' );
            var textUnderline = document.getElementById( "textLabelUnderlined" );
            textUnderline.style.backgroundImage = "url("+"public/img/btn_underline_on.png)";
        }
        else {
            canvas.getActiveObject().set( 'textDecoration', 'none' );
            var textUnderline = document.getElementById( "textLabelUnderlined" );
            textUnderline.style.backgroundImage = "url("+"public/img/btn_underline.png)";
        }
        undoObj.newStage = {
            textDecoration : value
        }
        pushUndoData( [undoObj] );
        canvas.renderAll();
        update_iframe();
    } );
    $( "#shadow" ).change( function() {
        var value = 'rgba(0,0,0,0.5)';
        var undoObj = {
            objectId : canvas.getActiveObject().objectID,
            oldStage : {
                shadow : canvas.getActiveObject().shadow
            }
        };
        if ( this.checked ) {
            value = 'rgba(0,0,0,0.5) 5px 5px 5px';
            canvas.getActiveObject().set( 'shadow', 'rgba(0,0,0,0.5) 5px 5px 5px' );
            var textShadow = document.getElementById( "textLabelShadow" );
            textShadow.style.backgroundImage = "url("+"public/img/btn_shadow_on.png)";
        }
        else {

            canvas.getActiveObject().set( 'shadow', null );
            var textShadow = document.getElementById( "textLabelShadow" );
            textShadow.style.backgroundImage = "url("+"public/img/btn_shadow.png)";

        }
        undoObj.newStage = {
            shadow : value
        }
        pushUndoData( [undoObj] );
        canvas.renderAll();
        update_iframe();
    } );
    $( "#reverse" ).change( function() {
        var value = false;
        var undoObj = {
            objectId : canvas.getActiveObject().objectID,
            oldStage : {
                textDecoration : canvas.getActiveObject().reverse
            }
        };
       if ( typeof canvas.getActiveObject().reverse === 'undefined' || ! canvas.getActiveObject().reverse ) {
            value = true;
            canvas.getActiveObject().set( 'reverse', true );
            var textReverse = document.getElementById( "textLabelReverse" );
            textReverse.style.backgroundColor = "#46484D";
        }
        else {
            canvas.getActiveObject().set( 'reverse', false );
            var textReverse = document.getElementById( "textLabelReverse" );
            textReverse.style.backgroundColor = "unset";
        }
        undoObj.newStage = {
            reverse : value
        }
        pushUndoData( [undoObj] );
        canvas.renderAll();
        update_iframe();
    } );
    $( "#check" ).button();
    $( "#formatText" ).buttonset();
    $( "#formatFont" ).buttonset();
    //setHelpers
    $( "#helperDesignerEdit" ).change( function() {
        var value = false;
        var undoObj = {
            objectId : canvas.getActiveObject().objectID,
            oldStage : {
                setHelper : typeof canvas.getActiveObject().setHelper === 'undefined' ? null : canvas.getActiveObject().setHelper
            }
        };
        if ( typeof canvas.getActiveObject().setHelper === 'undefined' || ! canvas.getActiveObject().setHelper ) {
            value = true;
            canvas.getActiveObject().setHelperDesign( true );
            
            canvas.getActiveObject().bringToFront();
            var objHelper = document.getElementById( "helperDesignerEditLabel" );
            objHelper.style.backgroundColor = "#46484D";
        }
        else {
            canvas.getActiveObject().setHelperDesign( false );
            var objHelper = document.getElementById( "helperDesignerEditLabel" );
            objHelper.style.backgroundColor = "unset";
        }
        undoObj.newStage = {
            setHelper : value
        }
        pushUndoData( [undoObj] );
        canvas.renderAll();
    } );
} );

/**
 * Function to load objects list via category and page
 * @param category
 * @param page
 */

function getShapes ( page ) {
    var data={};
    data.data=[];

    for ( i = 0; i < shapesGlobal.length; i ++ ) {
        data.data.push( {
            id: shapesGlobal[i]['id'],
            "url"        : mediaUrl+'personalization/html5_files/shapes/'+shapesGlobal[i]['file_name'],
            "sourceurl"  : mediaUrl+'personalization/html5_files/shapes/',
            "name"       : shapesGlobal[i]['file_name'],
            "path"       : mediaUrl+'personalization/html5_files/shapes/'+shapesGlobal[i]['file_name']
        })
    }
    data.total=data.data.length;
    JSON.stringify(data);


    scrollPageShapesPages = Math.ceil( data.total / 15 );
    if ( data.total < 15 ) {
            $('#btnScrollShapesLeft' ).css('opacity',0);
            $('#btnScrollShapesRight' ).css('opacity',0);
    }
    $( '#animateShapes' ).html( '' );
    var d=" <div class='jcarousel_shapes_slider'><ul class='jcarousel_shapes'></ul></div>";
    $( '#animateShapes' ).append( d );
    for ( var i = 0; i <= data.data.length; i ++ ) {
        if ( i == data.data.length ) {
        }
        else {
            var a = '<li id=\"draggableShapes' + i + '"';
            a += ' style=\"float:left;list-style: none; cursor:pointer;list-style:none; margin-left:4px; width:40px;height:40px; margin-right:5px; margin-top:7px; z-index:15;\" data-type=\"shape\" data-location=\"' + data.data[i].sourceurl + '\" data-name=\"';
            a += data.data[i].name + '\">';

            a += '		<img class="lazy" src="' + data.data[i].url + '"  data-href="' + data.data[i].url;
            a += '" alt="map" height="40" width="40" />';
            a += '	</li>';
            $( '.jcarousel_shapes' ).append( a );

            $( "#draggableShapes" + i ).draggable( {
                containment    : 'body',
                appendTo       : 'body',
                revert         : 'invalid',
                revertDuration : 500,
                helper         : 'clone',
                start          : function() {
                }
            } );
        }
    }
    $(function() {
        $('.jcarousel_shapes_slider').jcarousel({
             wrap: 'circular'
        });
        $('#btnScrollShapesLeft').click(function() {
            $('.jcarousel_shapes_slider').jcarousel('scroll', '-=2');
        });

        $('#btnScrollShapesRight').click(function() {
            $('.jcarousel_shapes_slider').jcarousel('scroll', '+=2');
        });
    });
}

function getBackgrounds ( page ) {
    var data={};
    data.data=[];

    for ( i = 0; i < backgroundsGlobal.length; i ++ ) {
        data.data.push( {
            id: backgroundsGlobal[i]['id'],
            displayUrl : mediaUrl+'personalization/html5_files/backgrounds/'+backgroundsGlobal[i]['file_name']
        })
    }
    data.total=data.data.length;
    JSON.stringify(data);
    scrollPageTexturePages = Math.ceil( data.total / 15 );
    if ( data.total < 15 ) {
            $('#btnScrollTexturesLeft' ).css('opacity',0);
            $('#btnScrollTexturesRight' ).css('opacity',0);
    }
    $( '#animateTextures' ).html( '' );
    var d='<div class="jcarousel_backgrounds"><ul class="jcarousel_back"></ul></div>';
     $( '#animateTextures' ).append( d );
    for ( var i = 0; i <= data.data.length; i ++ ) {
        if ( i == data.data.length ) {

        }
        else {
            var a = '<li id=\"draggableTexture' + i + '"';
            a += ' style=\"float:left; cursor:pointer; margin-left:4px; list-style:none; margin-right:5px; margin-top:7px; z-index:15;\" data-type=\"texture\" data-id=\"' + data.data[i].id + '\">';

            a += '		<img class="lazy" src="' + data.data[i].displayUrl + '" alt="map" height="40" width="40" />';
            a += '	</li>';
            $( '.jcarousel_back' ).append( a );

            $( "#draggableTexture" + i ).draggable( {
                containment    : 'body',
                appendTo       : 'body',
                revert         : 'invalid',
                revertDuration : 500,
                distance       : 40,
                helper         : 'clone',
                start          : function() {
                }
            } );
        }
    }
    $(function() {
        $('.jcarousel_backgrounds').jcarousel({
             wrap: 'circular'
        });
        $('#btnScrollTexturesLeft').click(function() {
            $('.jcarousel_backgrounds').jcarousel('scroll', '-=3');
        });

        $('#btnScrollTexturesRight').click(function() {
            $('.jcarousel_backgrounds').jcarousel('scroll', '+=3');
        });
    });

}

function getThemes ( category ) {
    var data={};
    data.data=[];

    for ( i = 0; i < themesGlobal.length; i ++ ) {
        data.data.push( {
            "pKey": themesGlobal[i]['id'],
            "texture"        : mediaUrl+'personalization/html5_files/themes_picpreview/'+themesGlobal[i]['preview_image'],
            "texture_mode"       : "0",
            "path"       : mediaUrl+'personalization/html5_files/shapes/'+themesGlobal[i]['preview_image']
        })
    }
    data.total=data.data.length;
    JSON.stringify(data);
     if ( data.total < 7 ) {
            $('#btnScrollPanelLeftThemes' ).css('opacity',0);
            $('#btnScrollPanelRightThemes' ).css('opacity',0);
    }
    $( '#animateBackgrounds' ).html( '' );
    var d= "<div class='jcarousel_themes'><ul class='jcarousel_ul_theme'></ul></div>";
    $( '#animateBackgrounds' ).append( d );

    for ( var i = 0; i < data.data.length; i ++ ) {
        var theme = data.data[i];
        var vheme = '<li  id=\"draggableThemesMapsPro';
        vheme += theme.pKey;
        vheme += '\"';
        vheme += ' style=\"float:left; margin-left:4px; cursor:pointer; margin-right:5px; margin-top:4px; z-index:15; display: inline-table;\" data-type=\"background\" data-location=\"';
        vheme += theme.pKey + '\" data-name=\"';
        vheme += "text";
        vheme += '\">';
        vheme += '		<img class="lazy theme-img" src="'+mediaUrl+'personalization/html5_files/themes_picpreview/'+themesGlobal[i]['preview_image'] + '"  data-href="' +mediaUrl+'personalization/html5_files/themes_picpreview/'+themesGlobal[i]['preview_image'] + '"';
        vheme += '		" alt="map" height="132" />';
        vheme += '	</li>';
        $( '.jcarousel_ul_theme' ).append( vheme );



        $( "#draggableThemesMapsPro" + theme.pKey ).draggable( {
            containment    : 'body',
            appendTo       : 'body',
            revert         : 'invalid',
            revertDuration : 500,
            distance       : 40,
            helper         : 'clone'
        } );
    }
    $(function() {
        $('.jcarousel_themes').jcarousel({
             wrap: 'circular'
        });
        $('#btnScrollPanelLeftThemes').click(function() {
            $('.jcarousel_themes').jcarousel('scroll', '-=2');
        });

        $('#btnScrollPanelRightThemes').click(function() {
            $('.jcarousel_themes').jcarousel('scroll', '+=2');
        });
    });
}

$( document ).ready( function() {
    data = [
        {
            "fontId"     : "1",
            "userFontId" : 0,
            "fontName"   : "CABNDWebBold",
            "fontFamily" : "CABNDWebBold",
            "fontFace"   : "@font-face {font-family: \"CA BND Web\";src: url("+"svgedit/easel/fonts/619412972CABNDWebBold.eot\"),url("+"svgedit/easel/fonts/1972855008CABNDWebBold.ttf\");}"
        },
        {
            "fontId"     : "2",
            "userFontId" : 0,
            "fontName"   : "Comic_Sans_MS",
            "fontFamily" : "Comic_Sans_MS",
            "fontFace"   : "@font-face {font-family: \"Comic Sans MS\";src: url("+"svgedit/easel/fonts/1708027813comicsans.eot\"),url("+"svgedit/easel/fonts/871658124comicsans.ttf\");}"
        },
        {
            "fontId"     : "3",
            "userFontId" : 0,
            "fontName"   : "Courier_New",
            "fontFamily" : "Courier_New",
            "fontFace"   : "@font-face {font-family: \"Courier New\";src: url("+"svgedit/easel/fonts/1842004861courier.eot\"),url("+"svgedit/easel/fonts/1083700845courier.ttf\");}"
        },
        {
            "fontId"     : "4",
            "userFontId" : 0,
            "fontName"   : "DejaVu_Serif_400",
            "fontFamily" : "DejaVu_Serif_400",
            "fontFace"   : "@font-face {font-family: \"DejaVu Serif\";src: url("+"svgedit/easel/fonts/1119578789DejaVuSerif.eot\"),url("+"svgedit/easel/fonts/119468622DejaVuSerif.ttf\");}"
        },
        {
            "fontId"     : "5",
            "userFontId" : 0,
            "fontName"   : "Delicious_500",
            "fontFamily" : "Delicious_500",
            "fontFace"   : "@font-face {font-family: \"Delicious\";src: url("+"svgedit/easel/fonts/1508108284Delicious-Roman.eot\"),url("+"svgedit/easel/fonts/2075527980Delicious-Roman.ttf\");}"
        },
        {
            "fontId"     : "6",
            "userFontId" : 0,
            "fontName"   : "Encient_German_Gothic_400",
            "fontFamily" : "Encient_German_Gothic_400",
            "fontFace"   : "@font-face {font-family: \"Encient German Gothic\";src: url("+"svgedit/easel/fonts/1557806786Germgoth.eot\"),url("+"svgedit/easel/fonts/561762549Germgoth.ttf\");}"
        },
        {
            "fontId"     : "7",
            "userFontId" : 0,
            "fontName"   : "geneva",
            "fontFamily" : "geneva",
            "fontFace"   : "@font-face {font-family: \"Geneva\";src: url(\"\"),url("+"svgedit/easel/fonts/1397215156geneva.ttf\");}"
        },
        {
            "fontId"     : "8",
            "userFontId" : 0,
            "fontName"   : "georgia",
            "fontFamily" : "georgia",
            "fontFace"   : "@font-face {font-family: \"Georgia\";src: url("+"svgedit/easel/fonts/1726825114georgia.eot\"),url("+"svgedit/easel/fonts/170830097georgia.ttf\");}"
        },
        {
            "fontId"     : "9",
            "userFontId" : 0,
            "fontName"   : "helvetica",
            "fontFamily" : "helvetica",
            "fontFace"   : "@font-face {font-family: \"Helvetica\";src: url("+"svgedit/easel/fonts/38839511helvetica-regular.ttf\"),url("+"svgedit/easel/fonts/1211740567helvetica-regular.eot\"),url("+"svgedit/easel/fonts/1254986539helvetica-regular.woff\");}"
        },
        {
            "fontId"     : "10",
            "userFontId" : 0,
            "fontName"   : "impact",
            "fontFamily" : "impact",
            "fontFace"   : "@font-face {font-family: \"Impact\";src: url("+"svgedit/easel/fonts/159369807impact.eot\"),url("+"svgedit/easel/fonts/14689243impact.ttf\");}"
        },
        {
            "fontId"     : "11",
            "userFontId" : 0,
            "fontName"   : "Lucida_Grande",
            "fontFamily" : "Lucida_Grande",
            "fontFace"   : "@font-face {font-family: \"Lucida Sans Typewriter\";src: url("+"svgedit/easel/fonts/1862898839lucida.eot\"),url("+"svgedit/easel/fonts/2043789087lucida.ttf\");}"
        },
        {
            "fontId"     : "12",
            "userFontId" : 0,
            "fontName"   : "monaco",
            "fontFamily" : "monaco",
            "fontFace"   : "@font-face {font-family: \"Monaco\";src: url(\"\"),url("+"svgedit/easel/fonts/762289539monaco.ttf\");}"
        },
        {
            "fontId"     : "13",
            "userFontId" : 0,
            "fontName"   : "Myriad_Pro",
            "fontFamily" : "Myriad_Pro",
            "fontFace"   : "@font-face {font-family: \"Myriad Pro\";src: url("+"svgedit/easel/fonts/464156448MYRIADPROREGULAR.woff\"),url("+"svgedit/easel/fonts/1286498878MYRIADPROREGULAR.ttf\"),url("+"svgedit/easel/fonts/603852711MYRIADPROREGULAR.eot\");}"
        },
        {
            "fontId"     : "14",
            "userFontId" : 0,
            "fontName"   : "Modernist_One_400",
            "fontFamily" : "Modernist_One_400",
            "fontFace"   : "@font-face {font-family: \"Modernist One\";src: url("+"svgedit/easel/fonts/843152904modernist-one.eot\"),url("+"svgedit/easel/fonts/1222731110modernist-one.ttf\");}"
        },
        {
            "fontId"     : "15",
            "userFontId" : 0,
            "fontName"   : "OdessaScript_500",
            "fontFamily" : "OdessaScript_500",
            "fontFace"   : "@font-face {font-family: \"OdessaScript_500\";src: url("+"svgedit/easel/fonts/1976924425OdessaScript.eot\"),url("+"svgedit/easel/fonts/456521508OdessaScript.ttf\"),url("+"svgedit/easel/fonts/1125426038OdessaScript.otf\");}"
        },
        {
            "fontId"     : "16",
            "userFontId" : 0,
            "fontName"   : "Quake_Cyr",
            "fontFamily" : "Quake_Cyr",
            "fontFace"   : "@font-face {font-family: \"Quake Cyr\";src: url("+"svgedit/easel/fonts/1575186590quake.eot\"),url("+"svgedit/easel/fonts/1879624283quake.ttf\");}"
        },
        {
            "fontId"     : "17",
            "userFontId" : 0,
            "fontName"   : "Tallys_400",
            "fontFamily" : "Tallys_400",
            "fontFace"   : "@font-face {font-family: \"Tallys\";src: url("+"svgedit/easel/fonts/367347799Tallys_15.eot\"),url("+"svgedit/easel/fonts/2013990181Tallys_15.otf\"),url("+"svgedit/easel/fonts/451217850Tallys_15.ttf\");}"
        },
        {
            "fontId"     : "18",
            "userFontId" : 0,
            "fontName"   : "Times_New_Roman",
            "fontFamily" : "Times_New_Roman",
            "fontFace"   : "@font-face {font-family: \"Times_New_Roman\";src: url("+"svgedit/easel/fonts/Time_New_Roman.eot\"),url("+"svgedit/easel/fonts/Time_New_Roman.otf\"),url("+"svgedit/easel/fonts/Time_New_Roman.ttf\");}"
       },
        {
            "fontId"     : "19",
            "userFontId" : 0,
            "fontName"   : "Verdana",
            "fontFamily" : "Verdana",
            "fontFace"   : "@font-face {font-family: \"Verdana\";src: url("+"svgedit/easel/fonts/1508995785verdana.eot\"),url("+"svgedit/easel/fonts/43576302verdana.ttf\");}"
        },
        {
            "fontId"     : "23",
            "userFontId" : 0,
            "fontName"   : "Bitter",
            "fontFamily" : "Bitter",
            "fontFace"   : "@font-face {font-family: \"Bitter\";src: url("+"svgedit/easel/fonts/Bitter.otf\"),url("+"svgedit/easel/fonts/Bitter.eot\"),url("+"svgedit/easel/fonts/Bitter.ttf\");}"
        },
        {
            "fontId"     : "24",
            "userFontId" : 0,
            "fontName"   : "Cabin",
            "fontFamily" : "Cabin",
            "fontFace"   : "@font-face {font-family: \"Cabin\";src: url("+"svgedit/easel/fonts/1932437059Cabin-Regular.otf\"),url("+"svgedit/easel/fonts/1340659186Cabin-Regular.eot\"),url("+"svgedit/easel/fonts/1577550430Cabin-Regular.ttf\");}"
        },
        {
            "fontId"     : "28",
            "userFontId" : 0,
            "fontName"   : "Lato",
            "fontFamily" : "Lato",
            "fontFace"   : "@font-face {font-family: \"Lato\";src: url("+"svgedit/easel/fonts/1251824977Lato-Regular.eot\"),url("+"svgedit/easel/fonts/1552406902Lato-Regular.otf\"),url("+"svgedit/easel/fonts/333181407Lato-Regular.ttf\");}"
        },
        {
            "fontId"     : "32",
            "userFontId" : 0,
            "fontName"   : "PlayfairDisplay",
            "fontFamily" : "PlayfairDisplay",
            "fontFace"   : "@font-face {font-family: \"PlayfairDisplay\";src: url("+"svgedit/easel/fonts/1242953001PlayfairDisplay-Regular.eot\"),url("+"svgedit/easel/fonts/72211122PlayfairDisplay-Regular.ttf\"),url("+"svgedit/easel/fonts/639253987PlayfairDisplay-Regular.otf\");}"
        },
        {
            "fontId"     : "33",
            "userFontId" : 0,
            "fontName"   : "PtSans",
            "fontFamily" : "PtSans",
            "fontFace"   : "@font-face {font-family: \"PtSans\";src: url("+"svgedit/easel/fonts/PT_Sans.otf\"),url("+"svgedit/easel/fonts/PT_Sans.eot\"),url("+"svgedit/easel/fonts/PT_Sans.ttf\");}"
        }
    ];
    var fontFace = '';
    var fonts = '';
    for ( var i in data ) {
        fontFace += data[i].fontFace;
        fonts += '<li><span class="select-box"></span><a class="fontOption" tabindex="-1" href="#" style="font-family: \'' + data[i].fontFamily
                         + '" data-value="' + data[i].fontFamily
                         + '" data-fontId="' + data[i].fontId
                         + '" data-userFontId="' + data[i].userFontId
                         + '">' + data[i].fontFamily
                + '</a></li>';
    }
    
    getThemes( 0 );
    getBackgrounds( 1 );
    getShapes( 1 );


    $( '#fontSizeList' ).find( 'input#fontSizeInput' ).click( function( e ) {
        e.stopPropagation();
    } );

    $( '#btnFontSize' ).click( function() {
        var object = canvas.getActiveObject();
        if ( object.type == "text" || object.type == "i-text" || object.type == "textbox" ) {
            var fontSizeValue = $( '#fontSizeInput' ).val();
            var undoArray = [
                {
                    objectId : canvas.getActiveObject().objectID,
                    oldStage : {
                        fontSize : canvas.getActiveObject().fontSize,
                        scaleX   : canvas.getActiveObject().scaleX,
                        scaleY   : canvas.getActiveObject().scaleY
                    },
                    newStage : {
                        fontSize : fontSizeValue,
                        scaleX   : 1,
                        scaleY   : 1
                    }
                }
            ];
            pushUndoData( undoArray );
            canvas.getActiveObject().set( 'fontSize', parseInt( fontSizeValue ) );
            canvas.getActiveObject().scale( 1 );
            $( '#fontSize' ).html( fontSizeValue );
            $( '#fontSizeList li' ).each( function() {
                $( this ).removeClass( 'selected' );
            } )
            canvas.renderAll();
        }
    } );






















} );

