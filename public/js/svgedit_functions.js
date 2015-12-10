//openEditor MainPlugin
$( function() {
    $.openeditorDefaults.init();
    $.openeditorAllowedFunctions.init();
    $.openeditorImageQuality.init( {} );
    $.openeditorImageFilters.init( {} );
    $.openeditorPositionBlock.init( {} );
    $.openeditorColorPickerMenu.init();
    $.openeditorColorPickerMenuBorder.init();
    $.openeditorSnaptoObject.init();
    $.openeditorX3DomCompatibility.init();
    $.openeditorTDpreview.init();
    $.openeditorBasicFunctionality.init();
    $.openeditorUploadSection.init();
    $.openeditorCropImage.init();
    $.openeditorImagePicker.init();
} );
//openEditor Defaults
! (function( $ ) {
    var ODEF = $.openeditorDefaults = {};
    $.extend( ODEF, {
        defaults : {
            activeColorElement    : '#27B7F5',
            notActiveColorElement : '#5C5C5C',
            notVisibleElement     : 'openeditor_disabled',
        },
        init     : function() {
        }
    } )
})( window.jQuery );
//openEditor AllowedOptions
! (function( $ ) {
    var OAF = $.openeditorAllowedFunctions = {};
    $.extend( OAF, {
        defaults    : {
            //allowed Options
            freedrawingHandler    : Boolean( allowFreeDrawing ),
            uploadImageHandler    : Boolean( allowUploadImage ),
            textHandler           : Boolean( allowText ),
            shapesHandler         : Boolean( allowShapes ),
            backgroundsHandler    : Boolean( allowBackgrounds ),
            themesHandler         : Boolean( allowThemes ),
            opacityHandler        : Boolean( allowOpacity ),
            deleteHandler         : Boolean( allowDelete ),
            saveLoadHandler       : Boolean( allowSaveLoad ),
            //texthandlers
            titleTextHandler      : Boolean( allowTitleText ),
            headerTextHandler     : Boolean( allowHeaderText ),
            bodyTextHandler       : Boolean( allowBodyText ),
            textBoxHandler        : Boolean( allowTextBox ),
            curveTextHandler      : Boolean( allowCurveText ),
            curveReverseHandler   : Boolean( allowCurveReverse ),
            curveRadiusHandler    : Boolean( allowCurveRadius ),
            curveSpacingHandler   : Boolean( allowCurveSpacing ),
            boldTextHandler       : Boolean( allowBoldText ),
            italicTextHandler     : Boolean( allowItalicText ),
            underlineTextHandler  : Boolean( allowUnderlineText ),
            shadowTextHandler     : Boolean( allowShadowText ),
            fontSizeHandler       : Boolean( allowFontSize ),
            allowFontsHandler     : Boolean( allowFonts ),
            allowGroupHandler     : Boolean( allowGroup ),
            allowRotateHandler    : Boolean( allowRotate ),
            allowScaleHandler     : Boolean( allowScale ),
            allowAlignmentHandler : Boolean( allowAlignment ),
            allowedAlignment      : allowedAlignement,
            allowBrushesHandler   : Boolean( allowBrushes ),
            allowedBrushes        : allowedBrushes,
            allowCropImageHandler : allowCropImage,
            //end
            //containers
            freedrawingContainer  : '.openeditor_freedrawing_container',
            uploadImageContainer  : '.openeditor_uploadimage_container',
            textContainer         : '.openeditor_text_container',
            shapesContainer       : '.openeditor_shapes_container',
            backgroundsContainer  : '.openeditor_backgrounds_container',
            themesContainer       : '.openeditor_themes_container',
            opacityContainer      : '.openeditor_opacity_container',
            deleteContainer       : '.openeditor_delete_container',
            //textContainers
            titleTextContainer    : '.openeditor_title_container',
            headerTextContainer   : '.openeditor_header_container',
            bodyTextContainer     : '.openeditor_body_container',
            saveLoadContainer     : ".openeditor_saveload_container",
            textBoxContainer      : '.openeditor_textbox_container',
            curveTextContainer    : '.openeditor_curve_container',
            curveReverseContainer : '.openeditor_reverse_container',
            curveRadiusContainer  : '.openeditor_radius_container',
            curveSpacingContainer : '.openeditor_spacing_container',
            boldContainer         : '.openeditor_bold_container',
            italicContainer       : '.openeditor_italic_container',
            shadowContainer       : '.openeditor_shadow_container',
            underlineContainer    : '.openeditor_underline_container',
            fontSizeContainer     : '.openeditor_fontsize_container',
            fontsContainer        : '.openeditor_fonts_container',
            groupContainer        : '.openeditor_group_container',
            alignmentContainer    : '.openeditor_alignment_container',
            brushesContainer      : '.openeditor_brushes_container',
            cropContainer         : '.openeditor_crop_container'
            //end
        },
        observe     : function( options ) {
            var o = OAF.getDefaults( options );
            canvas.on( 'object:selected', (function( o ) {
                return function( e ) {
                    if ( ! o.allowRotateHandler ) {
                        if ( e.target ) {
                            e.target.setControlsVisibility( {mtr : false} );
                        }
                    }
                    if ( ! o.allowScaleHandler ) {
                        if ( e.target ) {
                            e.target.setControlsVisibility( {
                                bl : false,
                                br : false,
                                mb : false,
                                ml : false,
                                mr : false,
                                mt : false,
                                tl : false,
                                tr : false
                            } );
                        }
                    }
                }
            })( o ) );
            canvas.on( 'selection:created', (function( o ) {
                return function( e ) {
                    if ( ! o.allowRotateHandler ) {
                        if ( e.target ) {
                            e.target.setControlsVisibility( {mtr : false} );
                        }
                    }
                    if ( ! o.allowScaleHandler ) {
                        if ( e.target ) {
                            e.target.setControlsVisibility( {
                                bl : false,
                                br : false,
                                mb : false,
                                ml : false,
                                mr : false,
                                mt : false,
                                tl : false,
                                tr : false
                            } );
                        }
                    }
                }
            })( o ) );
        },
        getDefaults : function( options ) {
            return $.extend( OAF.defaults, options );
        },
        init        : function( options ) {
            var o = OAF.getDefaults( options );
            OAF.observe( o );
            if ( ! o.freedrawingHandler ) {
                $( o.freedrawingContainer ).addClass( $.openeditorDefaults.defaults.notVisibleElement );
            }
            if ( ! o.uploadImageHandler ) {
                $( o.uploadImageContainer ).addClass( $.openeditorDefaults.defaults.notVisibleElement );
            }
            if ( ! o.textHandler ) {
                $( o.textContainer ).addClass( $.openeditorDefaults.defaults.notVisibleElement );
            }
            if ( ! o.shapesHandler ) {
                $( o.shapesContainer ).addClass( $.openeditorDefaults.defaults.notVisibleElement );
            }
            if ( ! o.backgroundsHandler ) {
                $( o.backgroundsContainer ).addClass( $.openeditorDefaults.defaults.notVisibleElement );
            }
            if ( ! o.themesHandler ) {
                $( o.themesContainer ).addClass( $.openeditorDefaults.defaults.notVisibleElement );
            }
            if ( ! o.opacityHandler ) {
                $( o.opacityContainer ).addClass( $.openeditorDefaults.defaults.notVisibleElement );
            }
            if ( ! o.deleteHandler ) {
                $( o.deleteContainer ).addClass( $.openeditorDefaults.defaults.notVisibleElement );
            }
            if ( ! o.titleTextHandler ) {
                $( o.titleTextContainer ).addClass( $.openeditorDefaults.defaults.notVisibleElement );
            }
            if ( ! o.headerTextHandler ) {
                $( o.headerTextContainer ).addClass( $.openeditorDefaults.defaults.notVisibleElement );
            }
            if ( ! o.bodyTextHandler ) {
                $( o.bodyTextContainer ).addClass( $.openeditorDefaults.defaults.notVisibleElement );
            }
            if ( ! o.curveTextHandler ) {
                $( o.curveTextContainer ).addClass( $.openeditorDefaults.defaults.notVisibleElement );
            }
            if ( ! o.textBoxHandler ) {
                $( o.textBoxContainer ).addClass( $.openeditorDefaults.defaults.notVisibleElement );
            }
            if ( ! o.curveReverseHandler ) {
                $( o.curveReverseContainer ).addClass( $.openeditorDefaults.defaults.notVisibleElement );
            }
            if ( ! o.curveRadiusHandler ) {
                $( o.curveRadiusContainer ).addClass( $.openeditorDefaults.defaults.notVisibleElement );
            }
            if ( ! o.curveSpacingHandler ) {
                $( o.curveSpacingContainer ).addClass( $.openeditorDefaults.defaults.notVisibleElement );
            }
            if ( ! o.boldTextHandler ) {
                $( o.boldContainer ).addClass( $.openeditorDefaults.defaults.notVisibleElement );
            }
            if ( ! o.italicTextHandler ) {
                $( o.italicContainer ).addClass( $.openeditorDefaults.defaults.notVisibleElement );
            }
            if ( ! o.underlineTextHandler ) {
                $( o.underlineContainer ).addClass( $.openeditorDefaults.defaults.notVisibleElement );
            }
            if ( ! o.shadowTextHandler ) {
                $( o.shadowContainer ).addClass( $.openeditorDefaults.defaults.notVisibleElement );
            }
            if ( ! o.shadowTextHandler && ! o.underlineTextHandler && ! o.italicTextHandler && ! o.boldTextHandler ) {
                $( '#formatText' ).addClass( $.openeditorDefaults.defaults.notVisibleElement );
            }
            if ( ! o.fontSizeHandler ) {
                $( o.fontSizeContainer ).addClass( $.openeditorDefaults.defaults.notVisibleElement );
            }
            if ( ! o.allowFontsHandler ) {
                $( o.fontsContainer ).addClass( $.openeditorDefaults.defaults.notVisibleElement );
            }
            if ( ! o.saveLoadHandler ) {
                $( o.saveLoadContainer ).addClass( $.openeditorDefaults.defaults.notVisibleElement );
            }
            if ( ! o.allowGroupHandler ) {
                $( o.groupContainer ).addClass( $.openeditorDefaults.defaults.notVisibleElement );
            }
            if ( ! o.allowAlignmentHandler ) {
                $( o.alignmentContainer ).addClass( $.openeditorDefaults.defaults.notVisibleElement );
            }
            else {
                o.allowedAlignment.forEach( function( obj, key ) {
                    $( o.alignmentContainer + " ." + obj ).show();
                } );
            }
            if ( ! o.allowBrushesHandler ) {
                $( o.brushesContainer ).addClass( $.openeditorDefaults.defaults.notVisibleElement );
            }
            else {
                o.allowedBrushes.forEach( function( obj, key ) {
                    $( o.brushesContainer + " ." + obj ).show();
                } );
            }
            if(!o.allowCropImageHandler){
                 $( o.cropContainer ).addClass( $.openeditorDefaults.defaults.notVisibleElement );
            }

        }
    } )
})( window.jQuery );
//openEditor BasicFeatures
! (function( $ ) {
    var OBF = $.openeditorBasicFunctionality = {};
    $.extend( OBF, {
        defaults        : {
            cloneButtonId         : "#cloneButton",
            btnToggleGrid         :'#btnToggleGrid',
            loadingMaskId         : '#loading-mask',
            activeClass           : 'active',
            zoomInId              : '#btnZoomIn',
            zoomOutId             : '#btnZoomOut',
            lblZoomId             : '#lblZoom',
            triggerAddPageClass   : '.add_page_to_project',
            showLoadingIndex      : 50,
            isGrid                : false,
            gridButonId           : '#btnToggleGrid',
            gridGroupId           : 123456,
            canvasContainer       :'#droppable .canvas-container',
            //allowed Options
            zoomHandler           : Boolean( allowZoomInZoomOut ),
            gridHandler           : Boolean( allowGrid ),
            undoredoHandler       : Boolean( allowUndoRedo ),
            cloneHandler          : Boolean( allowClone ),
            allowMouseZoomHandler : Boolean( allowMouseZoom ),
            //containers
            zoomContainer         : '.openeditor_zoom_container',
            gridContainer         : '.openeditor_grid_container',
            undoredoContainer     : '.openeditor_undoredo_container',
            cloneContainer        : '.openeditor_clone_container'
        },
        getDefaults     : function( options ) {
            return $.extend( OBF.defaults, options );
        },
        addHook         : function( key, fn ) {
            openeditorPluggable.PluginHooks.add( key, fn, OBF );
        },
        addHookOnce     : function( key, fn ) {
            openeditorPluggable.PluginHooks.once( key, fn, OBF );
        },
        removeHook      : function( key, fn ) {
            openeditorPluggable.PluginHooks.remove( key, fn, OBF );
        },
        runHooks        : function( key, p1, p2, p3, p4, p5, p6 ) {
            return openeditorPluggable.PluginHooks.run( OBF, key, p1, p2, p3, p4, p5, p6 );
        },
        connectHooks    : function() {
        },
        addPage         : function(options){
            var o                    = OBF.getDefaults(options ),
                project_length       = themePageContent.length;
            newPageConfiguration     = {
                content     : "",
                height      : themePageContent[0].height,
                width       : themePageContent[0].width,
                page_number : 0,
                visited     :true,
                content_type:'json',
                theme_id    : themePageContent[project_length-1].theme_id,
                made_by     : 'customer'
            }
            canvas.remove( gridGroup );
            _isGrid = false;
            deleteOffsetHelpers();
            $( o.btnToggleGrid).css( 'color', $.openeditorDefaults.defaults.notActiveColorElement );
            var oldDataLocation = $( '.select_page_number_active' ).attr( 'data-location' );
            getCanvasForPreview();
            canvas.viewportTransform = [1, 0, 0, 1, 0, 0];
            canvas.renderAll();
            themePageContent[oldDataLocation].content_type = 'json'
            themePageContent[oldDataLocation].content = JSON.stringify( canvas.toJSON( propertiesToIncludeCanvas ) );
            themePageContent[oldDataLocation].content_preview = canvas.toSVG( {viewBox : {
                x      : textureModeLeft,
                y      : canvasOffsetHeight,
                width  : canvas.getWidth() - 2 * textureModeLeft,
                height : canvas.getHeight() - 2 * canvasOffsetHeight
            } });
            themePageContent[oldDataLocation].visited = true;

            themePageContent.splice(oldDataLocation,0,newPageConfiguration);
            $.each(themePageContent,function(key,obj){
                obj['page_number']=(key+1);
            });
            $( '.list_page_design' ).append( "<li><button class='select_page_number' data-location='" + project_length + "'>Page " + (project_length+1) + "</button></li>" );
            canvas.clear();
            setCanvasDimensions( themePageContent[oldDataLocation].width, themePageContent[oldDataLocation].height );
            setTextureMode( themePageContent[oldDataLocation].width, themePageContent[oldDataLocation].height );
            selectThemeReply( themePageContent[oldDataLocation].content, themePageContent[oldDataLocation].content_type );
        },
        cloneObjects    : function() {
            var o = OBF.getDefaults();
            if ( canvas.getActiveGroup() ) {
                var groupObjects = canvas.getActiveGroup().getObjects();
                var group = canvas.getActiveGroup();
                var undoData = [];
                if ( groupObjects.length > o.showLoadingIndex ) {
                    $( o.loadingMaskId ).show();
                }
                setTimeout( (function( groupObjects, group, undoData, o ) {
                    return function() {
                        groupObjects.forEach( function( a, index ) {
                            if ( [
                                     'text', 'i-text', 'textbox', 'polygon', 'line', 'rect', 'circle', 'ellipse'
                                 ].indexOf( a.type ) >= 0 ) {
                                var object = a.clone();
                                object.objectID = Math.floor( Math.random() * 10000 );
                                object.setCoords();
                                object.left = a.left + group.left + 100;
                                object.top = a.top + group.top;
                                canvas.add( object );
                                undoData.push( {
                                    objectId : object.objectID,
                                    added    : object
                                } );
                            }
                            else {
                                a.clone( (function( undoData ) {
                                    return function( clone ) {
                                        var clonedObj = clone;
                                        clonedObj.left = a.left + ((a.type == 'image') ? 0 : group.left) + 100;
                                        clonedObj.top = a.top + ((a.type == 'image') ? 0 : group.top);
                                        clonedObj.setCoords();
                                        clonedObj.objectID = Math.floor( Math.random() * 10000 );
                                        undoData.push( {
                                            objectId : clonedObj.objectID,
                                            added    : clonedObj
                                        } );
                                        if ( clonedObj.type == 'image' && clonedObj.filters.length ) {
                                            var oldOpacity = clonedObj.opacity;
                                            clonedObj.opacity = 0;
                                            handler = true;
                                        }
                                        else {
                                            handler = false;
                                        }
                                        canvas.add( clonedObj );
                                        setTimeout( (function( oldOpacity, objectID, type, handler ) {
                                            return function() {
                                                if ( type == 'image' ) {
                                                    if ( canvas.getObjectByID( objectID ) && handler ) {
                                                        typeof canvas.getObjectByID( objectID )[0] !== 'undefined' ? canvas.getObjectByID( objectID )[0].opacity = oldOpacity : null;
                                                        canvas.renderAll();
                                                        OBF.runHooks( 'updateIframe' );
                                                    }
                                                }
                                            }
                                        })( oldOpacity, clone.objectID, clonedObj.type, handler ), 100 );
                                    }
                                })( undoData ) );
                            }
                            if ( index == groupObjects.length - 1 ) {
                                pushUndoData( undoData );
                                OBF.runHooks( 'updateIframe' );
                            }
                        }, this );
                        $( o.loadingMaskId ).hide();
                        canvas.renderAll();
                        group.setObjectsCoords();
                        canvas.discardActiveGroup();
                    }
                })( groupObjects, group, undoData, o ), 10 );
            }
            else {
                if ( canvas.getActiveObject() ) {
                    var obj = canvas.getActiveObject();
                    if ( fabric.util.getKlass( obj.type ).async ) {
                        obj.clone( function( clone ) {
                            clone.set( {left : clone.left + 100} );
                            clone.objectID = Math.floor( Math.random() * 10000 );
                            pushUndoData( [
                                {
                                    objectId : clone.objectID,
                                    added    : clone
                                }
                            ] );
                            if ( clone.type == 'image' && clone.filters.length ) {
                                var oldOpacity = obj.opacity;
                                handler = true;
                                clone.opacity = 0;
                            }
                            else {
                                handler = false;
                            }
                            if(obj.type=='image' && typeof obj.designerOptions !=='undefined' ){
                                clone.designerOptions=obj.designerOptions;
                            }
                            if(obj.type=='image' && typeof obj.cropObjectData !=='undefined' ){
                                clone.cropObjectData  = obj.cropObjectData;
                            }
                            canvas.add( clone );
                            setTimeout( (function( clone, oldOpacity, objectID, handler ) {
                                return function() {
                                    if ( canvas.getObjectByID( objectID ) && handler ) {
                                        typeof canvas.getObjectByID( objectID )[0] !== 'undefined' ? canvas.getObjectByID( objectID )[0].opacity = oldOpacity : null;
                                        canvas.renderAll();
                                        OBF.runHooks( 'updateIframe' );
                                    }
                                }
                            })( clone, oldOpacity, clone.objectID, handler ), 100 );
                        } );
                    }
                    else {
                        var clone = obj.clone();
                        clone.set( {left : clone.left + 100} );
                        clone.objectID = Math.floor( Math.random() * 10000 );
                        pushUndoData( [
                            {
                                objectId : clone.objectID,
                                added    : clone
                            }
                        ] );
                        if ( clone.type == 'image' && clone.filters.length ) {
                            var oldOpacity = clone.opacity;
                            clone.opacity = 0;
                            handler = true;
                        }
                        else {
                            handler = false;
                        }
                        canvas.add( clone );
                        setTimeout( (function( clone, oldOpacity, objectID, handler ) {
                            return function() {
                                if ( canvas.getObjectByID( objectID ) && handler ) {
                                    typeof canvas.getObjectByID( objectID )[0] !== 'undefined' ? canvas.getObjectByID( objectID )[0].opacity = oldOpacity : null;
                                    canvas.renderAll();
                                }
                            }
                        })( clone, oldOpacity, clone.objectID, handler ), 100 );
                    }
                    OBF.runHooks( 'updateIframe' );
                }
            }

        },
        grupObjects     : function() {
            var o = OBF.getDefaults();
            if ( canvas.getActiveGroup() ) {
                var objects = canvas.getActiveGroup().getObjects();
                var groupObjects = [];
                var undoData = [];
            }
        },
        zoomIn          : function() {
            var o = OBF.getDefaults();
            var newZoom = canvas.getZoom() + (1 / 25 );
            canvas.zoomToPoint( { x : canvas.getCenter().left, y : canvas.getCenter().top }, newZoom );
            $( o.lblZoomId ).html( 'zoom @ ' + parseInt( newZoom * 100 ) + '%' );
            $( o.canvasContainer).mCustomScrollbar("update");
            return false;
        },
        zoomOut         : function() {
            var o = OBF.getDefaults();
            var newZoom = canvas.getZoom() + (- 1 / 25 );
            if ( newZoom < 0.1 ) return;
            canvas.zoomToPoint( { x : canvas.getCenter().left, y : canvas.getCenter().top }, newZoom );
            $( o.lblZoomId ).html( 'zoom @ ' + parseInt( newZoom * 100 ) + '%' );
            $( o.canvasContainer).mCustomScrollbar("update");
            return false;
        },
        scrollViewPort  : function(options){
            var o = OBF.getDefaults(options);
            $( o.canvasContainer ).has('canvas#c' ).mCustomScrollbar({
                axis          : "yx", // vertical and horizontal scrollbar
                mouseWheel    :{
                  enable : false
                }
            });
        },
        toggleGrid      : function( options ) {
            var grid = 30;
            var o = OBF.getDefaults( options );
            if ( o.isGrid ) {
                canvas.remove( canvas.getObjectByID( o.gridGroupId ).pop() );
                canvas.renderAll();
                o.isGrid = false;
                $( o.gridButonId ).css( 'color', $.openeditorDefaults.defaults.notActiveColorElement );
            }
            else {
                gridGroup = new fabric.Group();
                gridGroup.objectID = o.gridGroupId;
                for ( var i = 0; i < (canvas.width / grid); i ++ ) {
                    if ( (i * grid) % 150 != 0 )
                        gridGroup.add( new fabric.Line( [i * grid, 0, i * grid, canvas.height * 2], { strokeDashArray :
                                [
                                    4, 1
                                ], opacity                                                                            : "0.6", stroke : '#B0B0B0', selectable : false } ) );
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
                canvas.renderAll();
                o.isGrid = true;
                $( o.gridButonId ).css( 'color', $.openeditorDefaults.defaults.activeColorElement );
            }
        },
        observe         : function( options ) {
            var o = OBF.getDefaults();

            $( canvas.getElement().parentNode ).on( 'mousewheel', (function( o ) {
                return  function( e ) {
                    if ( o.allowMouseZoomHandler ) {
                        var newZoom = canvas.getZoom() + e.deltaY / 25;
                        if ( newZoom < 0.1 ) return;
                        canvas.zoomToPoint( { x : canvas.getCenter().left, y : canvas.getCenter().top }, newZoom );
                        $( o.lblZoomId ).html( 'zoom @ ' + parseInt( newZoom * 100 ) + '%' );
                        $( o.canvasContainer).mCustomScrollbar("update");
                        return false;
                    }
                }
            })( o ) );
            canvas.on('mouse:move',(function(o){
                return function(e){
                    if( e.e.altKey){
                        var units = 10;
                        var delta = new fabric.Point(e.e.movementX, e.e.movementY);
                        canvas.relativePan(delta);
                    }
                }
            })(o));

            $( o.triggerAddPageClass ).off('click' ).on('click',(function(o){
                return function(){
                    OBF.addPage(o);
                }
            })(o));
        },
        allowedFeatures : function( options ) {
            var o = OBF.getDefaults( options );
            if ( ! o.zoomHandler )
                $( o.zoomContainer ).addClass( $.openeditorDefaults.defaults.notVisibleElement );
            if ( ! o.gridHandler )
                $( o.gridContainer ).addClass( $.openeditorDefaults.defaults.notVisibleElement );
            if ( ! o.undoredoHandler )
                $( o.undoredoContainer ).addClass( $.openeditorDefaults.defaults.notVisibleElement );
            if ( ! o.cloneHandler )
                $( o.cloneContainer ).addClass( $.openeditorDefaults.defaults.notVisibleElement );
        },
        init            : function( options ) {
            var o = OBF.getDefaults( options );
            OBF.observe();
            OBF.scrollViewPort(o);
            OBF.allowedFeatures( options );
            //clone + ctrl v
            $( o.cloneButtonId ).off( 'click' ).on( 'click', function() {
                $( this ).addClass( o.activeClass );
                var that = this;
                setTimeout( (function( that ) {
                    return function() {
                        $( that ).removeClass( 'active' );
                    }
                })( that ), 100 )
                OBF.cloneObjects();
            } );
            $( document ).keydown( function( evt ) {
                var code = evt.keyCode;
                switch ( code ) {
                    case 86:
                        if ( evt.ctrlKey || evt.metaKey ) {
                            if ( o.cloneHandler )
                                OBF.cloneObjects();
                        }
                        break;
                }
            } );
            $( o.zoomInId ).off( 'click' ).on( 'click', function() {
                OBF.zoomIn();
            } );
            $( o.zoomOutId ).off( 'click' ).on( 'click', function() {
                OBF.zoomOut();
            } );
            $( o.gridButonId ).off( 'click' ).on( 'click', function() {
                OBF.toggleGrid( o );
            } )
        }
    } )
})( window.jQuery );
//openEditor ColorPickerMenu
! (function( $ ) {
    var CPM = $.openeditorColorPickerMenu = {};
    $.extend( CPM, {
        defaults                 : {
            previewAreaId         : '#colorPicker',
            contentId             : '#colorPickerContent',
            contentColorsId       : '#colorPickerContentColors',
            currentColorEditId    : "#currentColorEditId",
            newItemId             : '#colorPickerNewItem',
            deleteItemId          : '#colorPickerDeleteItem',
            contentColorsTemplate : '<div style="display:inline-block"></div>',
            itemTemplate          : '<div class="color_picker_item"></div>',
            newItemTemplate       : '<div class="color_picker_item"></div>',
            deleteItemTemplate    : '<div style="text-align:center;color:#5c5c5c;display:none;height:auto;" ><span class="fa fa-trash-o fa-4x"></span></div>'
        },
        getDefaults              : function( options ) {
            return $.extend( CPM.defaults, options );
        },
        addHook                  : function( key, fn ) {
            openeditorPluggable.PluginHooks.add( key, fn, CPM );
        },
        addHookOnce              : function( key, fn ) {
            openeditorPluggable.PluginHooks.once( key, fn, CPM );
        },
        removeHook               : function( key, fn ) {
            openeditorPluggable.PluginHooks.remove( key, fn, CPM );
        },
        runHooks                 : function( key, p1, p2, p3, p4, p5, p6 ) {
            return openeditorPluggable.PluginHooks.run( CPM, key, p1, p2, p3, p4, p5, p6 );
        },
        connectHooks             : function() {
            //  $.openeditorObjectActions.addHook( 'onObjectAdded', OD.onOpenToolbarHookCallback );
        },
        _getSelf                 : function( obj, options ) {
            var self = $( obj );
            if ( ! self.length ) {
                self = $( options.contentId );
            }
            if ( self.length )
                return self;
            return $.error(
                    'Invalid Color Picker'
            );
        },
        onSelectColor            : function( event ) {
            if ( $( event.toElement ).is( '.ui-draggable-dragging' ) ) {
                return;
            }
            var color;
            if ( typeof event.data.color.getRgbString !== 'function' ) {
                color = event.data.color;
            }
            else {
                color = event.data.color.getRgbString();
            }
            var options = CPM.getDefaults();
            $( options.previewAreaId ).css( 'background-color', color );
            if ( canvas.getActiveGroup() ) {
                var undoArray = [];
                for ( var index in canvas.getActiveGroup().getObjects() ) {
                    var obj = canvas.getActiveGroup().getObjects()[index];
                    undoArray.push( {
                        objectId : obj.objectID,
                        oldStage : {
                            stroke : obj.stroke,
                            fill   : obj.fill
                        },
                        newStage : {
                            stroke : color,
                            fill   : color
                        }
                    } );
                }
                pushUndoData( undoArray );
                canvas.getActiveGroup().getObjects().forEach( function( obj ) {
                    if ( obj.type == "i-text" || obj.type == "text" || obj.type == 'textbox' ) {
                        obj.fill = color;
                    }
                    else if ( obj.type == "path" ) {
                        obj.set( 'stroke', color );
                        obj.set( 'fill', color );
                    }
                    else {
                        obj.set( 'fill', color );
                    }
                } );
            }
            else {
                if ( canvas.getActiveObject() ) {
                    var object = canvas.getActiveObject();
                    var undoArray = [
                        {
                            objectId : object.objectID,
                            oldStage : {
                                stroke : object.stroke,
                                fill   : object.fill
                            },
                            newStage : {
                                stroke : color,
                                fill   : color
                            }
                        }
                    ];
                    pushUndoData( undoArray );
                    if ( object.type == "i-text" || object.type == "text" || object.type == 'textbox' ) {
                        canvas.getActiveObject().fill = color;
                    }
                    else if ( object.type == "path" ) {
                        canvas.getActiveObject().set( 'stroke', color );
                        canvas.getActiveObject().set( 'fill', color );
                    }
                    else {
                        canvas.getActiveObject().set( 'fill', color );
                    }
                }
                else {
                    if ( _isFreeDrawing ) {
                        canvas.freeDrawingBrush.color = color;
                    }
                }
            }
            canvas.renderAll();
            CPM.runHooks( 'updateIframe' );
        },
        updatePreviewColorPicker : function( e ) {
            var options = CPM.getDefaults();
            var color = $( this.options.currentColorEditId ).chromoselector( 'getColor' );
            var print_color = CPM.cmykToRGBbackHex( color.getCmyk() );
            $( this.options.currentColorEditId ).css( {
                'background-color' : color.getHexString()
            } );
            $( '.ui-cs-preview-widget canvas' )[0].getContext( "2d" ).fillStyle = print_color;
            color = color.getHexString();
            $( options.previewAreaId ).css( 'background-color', color );
            if ( canvas.getActiveGroup() ) {
                var undoArray = [];
                for ( var index in canvas.getActiveGroup().getObjects() ) {
                    var obj = canvas.getActiveGroup().getObjects()[index];
                    undoArray.push( {
                        objectId : obj.objectID,
                        oldStage : {
                            stroke : obj.stroke,
                            fill   : obj.fill
                        },
                        newStage : {
                            stroke : color,
                            fill   : color
                        }
                    } );
                }
                pushUndoData( undoArray );
                canvas.getActiveGroup().getObjects().forEach( function( obj ) {
                    if ( obj.type == "i-text" || obj.type == "text" || obj.type == 'textbox' ) {
                        obj.fill = color;
                    }
                    else if ( obj.type == "path" ) {
                        obj.set( 'stroke', color );
                        obj.set( 'fill', color );
                    }
                    else {
                        obj.set( 'fill', color );
                    }
                } );
            }
            else {
                if ( canvas.getActiveObject() ) {
                    var object = canvas.getActiveObject();
                    var undoArray = [
                        {
                            objectId : object.objectID,
                            oldStage : {
                                stroke : object.stroke,
                                fill   : object.fill
                            },
                            newStage : {
                                stroke : color,
                                fill   : color
                            }
                        }
                    ];
                    pushUndoData( undoArray );
                    if ( object.type == "i-text" || object.type == "text" || object.type == 'textbox' ) {
                        canvas.getActiveObject().fill = color;
                    }
                    else if ( object.type == "path" ) {
                        canvas.getActiveObject().set( 'stroke', color );
                        canvas.getActiveObject().set( 'fill', color );
                    }
                    else {
                        canvas.getActiveObject().set( 'fill', color );
                    }
                }
                else if ( _isFreeDrawing ) {
                    canvas.freeDrawingBrush.color = color;
                }
            }
            canvas.renderAll();
            CPM.runHooks( 'updateIframe' );
        },
        hexToCMYK                : function( hex ) {
            var computedC = 0;
            var computedM = 0;
            var computedY = 0;
            var computedK = 0;
            hex = (hex.charAt( 0 ) == "#") ? hex.substring( 1, 7 ) : hex;
            if ( hex.length != 6 ) {
                return;
            }
            if ( /[0-9a-f]{6}/i.test( hex ) != true ) {
                return;
            }
            var r = parseInt( hex.substring( 0, 2 ), 16 );
            var g = parseInt( hex.substring( 2, 4 ), 16 );
            var b = parseInt( hex.substring( 4, 6 ), 16 );
            // BLACK
            if ( r == 0 && g == 0 && b == 0 ) {
                computedK = 1;
                return [0, 0, 0, 1];
            }
            computedC = 1 - (r / 255);
            computedM = 1 - (g / 255);
            computedY = 1 - (b / 255);
            var minCMY = Math.min( computedC, Math.min( computedM, computedY ) );
            computedC = (computedC - minCMY) / (1 - minCMY);
            computedM = (computedM - minCMY) / (1 - minCMY);
            computedY = (computedY - minCMY) / (1 - minCMY);
            computedK = minCMY;
            return [computedC, computedM, computedY, computedK];
        },
        cmykToRGBbackHex         : function( cmyk ) {
            var r = 255 * (1 - cmyk.c) * (1 - cmyk.k);
            var g = 255 * (1 - cmyk.m) * (1 - cmyk.k);
            var b = 255 * (1 - cmyk.k) * (1 - cmyk.k);
            var rgb = b | (g << 8) | (r << 16);
            return '#' + (0x1000000 + rgb).toString( 16 ).slice( 1 )
        },
        closeColorPicker         : function() {
            var options = CPM.getDefaults();
            $( options.currentColorEditId ).chromoselector( 'hide' );
        },
        setColorCMYK             : function( options ) {
            var options = CPM.getDefaults();
            var c = $( '#inputC' ).val();
            var m = $( '#inputM' ).val();
            var y = $( '#inputY' ).val();
            var k = $( '#inputK' ).val();
            $( options.currentColorEditId ).chromoselector( 'setColor', CPM.cmykToRGB( c, m, y, k ) );
            CPM.updatePreviewColorPicker();
        },
        setColorRGB              : function( options ) {
            var options = CPM.getDefaults();
            var r = $( '#inputR' ).val();
            var g = $( '#inputG' ).val();
            var b = $( '#inputB' ).val();
            $( options.currentColorEditId ).chromoselector( "setColor", 'rgb(' + r + ',' + g + ',' + b + ')' );
            CPM.updatePreviewColorPicker();
        },
        openColorPicker          : function() {
            var options = CPM.getDefaults();
            var template = $( options.itemTemplate );
            $( options.currentColorEditId ).chromoselector( 'destroy' );
            //make old color draggble;
            $( options.currentColorEditId ).draggable( {
                revert : true,
                start  : function() {
                    $( options.deleteItemId ).slideDown( 'slow' );
                },
                stop   : function() {
                    $( options.deleteItemId ).slideUp( "slow" );
                }
            } );
            $( options.currentColorEditId ).removeAttr( 'id' );
            template.attr( 'id', options.currentColorEditId.replace( "#", "" ) );
            template.insertBefore( $( options.newItemId ) );
            $( options.currentColorEditId ).chromoselector( {
                preview   : true,
                width     : 150,
                effect    : 'fade',
                resizable : false,
                panel     : true,
                autoshow  : true,
                show      : function( e ) {
                    if ( $( options.currentColorEditId ).css( 'background-color' ) != 'rgba(0, 0, 0, 0)' ) {
                        $( options.currentColorEditId ).chromoselector( 'setColor', $( options.currentColorEditId ).css( 'background-color' ) );
                        CPM.updatePreviewColorPicker( e );
                    }
                },
                color2str : function( color ) {
                    return "";
                },
                create    : function() {
                    $( '.ui-cs-widget' ).on( 'mouseup', function( e ) {
                        CPM.updatePreviewColorPicker( e );
                    } )
                    $( ".ui-cs-panel" ).find( "select" ).remove();
                    $( ".ui-cs-panel" ).find( "canvas" ).remove();
                    var templateClose;
                    templateClose = $( '<button id="closeColorPicker" style="float:left;margin-top: 12px;background-color:unset;margin-bottom: 80px;margin-left: 10px;" >Close</button>' );
                    $( templateClose ).insertBefore( '.ui-cs-preview-container' );
                    $( ".ui-panel-labels" ).html( "<div style='padding-bottom:5px; padding-top:10px;'>Manual Colors</div>" +
                                                  "<div class='clearfix' style='width: 80px; padding-bottom:7px;'>" +
                                                  "<span style='float:left; width:30px;'>C</span><input  id='inputC' type='text' style='float:left;width:35px;height:18px;' value='' />" +
                                                  "</div>" +
                                                  "<div class='clearfix' style='width: 80px;padding-bottom:7px;'>" +
                                                  "<span style='float:left; width:30px;'>M</span><input  id='inputM' type='text' style='float:left;width:35px;height:18px;' value='' />" +
                                                  "</div>" +
                                                  "<div class='clearfix' style='width: 80px; padding-bottom:7px;'>" +
                                                  "<span style='float:left; width:30px;'>Y</span><input id='inputY' type='text' style='float:left;width:35px;height:18px;' value='' />" +
                                                  "</div>" +
                                                  "<div class='clearfix' style='width: 80px; padding-bottom:7px;'>" +
                                                  "<span style='float:left; width:30px;'>K</span><input  id='inputK' type='text' style='float:left;width:35px;height:18px;' value='' />" +
                                                  "</div>" +
                                                  "<div style='width:100%;' class='clearfix'><a style='float:right; margin-right:14px;' class='btn btn-chromoselector' id='btnCMYK'>OK</a></div>" +
                                                  "<div class='clearfix' style='width: 80px; padding-bottom:7px;'>" +
                                                  "<span style='float:left; width:30px;'>R</span><input  id='inputR' type='text' style='float:left;width:35px;height:18px;' value='' />" +
                                                  "</div>" +
                                                  "<div class='clearfix' style='width: 80px; padding-bottom:7px;'>" +
                                                  "<span style='float:left; width:30px;'>G</span><input  id='inputG' type='text' style='float:left;width:35px;height:18px;' value='' />" +
                                                  "</div>" +
                                                  "<div class='clearfix' style='width: 80px; padding-bottom:7px;'>" +
                                                  "<span style='float:left; width:30px;'>B</span><input  id='inputB' type='text' style='float:left;width:35px;height:18px;' value='' />" +
                                                  "</div>" +
                                                  "<div style='width:100%;' class='clearfix'><a style='float:right; margin-right:14px;' class='btn btn-chromoselector' id='btnRGB'>OK</a></div>" ).css( {"color" : "#000 !important", "width" : "90px"} );
                }
            } )
            $( options.currentColorEditId ).chromoselector( 'show' );
            if ( $( options.currentColorEditId ).length ) {
                $( options.currentColorEditId ).bind( "click", {color : $( options.currentColorEditId ).chromoselector( 'getColor' )}, CPM.onSelectColor );
            }
            $( '#btnCMYK' ).click( CPM.setColorCMYK );
            $( '#btnRGB' ).click( CPM.setColorRGB );
            $( '#closeColorPicker' ).click( CPM.closeColorPicker );
        },
        addNewColorBotton        : function( options ) {
            var template;
            template = $( options.itemTemplate );
            template.attr( 'id', options.newItemId.replace( "#", "" ) );
            template.append( '<span class="fa fa-plus fa-2x" style="margin-top:6px" ></span>' );
            $( options.contentColorsId ).append( template );
            template.on( 'click', CPM.openColorPicker );
        },
        addColorBox              : function( obj, colorsArray, options ) {
            var arrayItem;
            var template, templateDelete;
            if ( colorsArray.constructor === Array ) {
                var colorsTemplate = $( options.contentColorsTemplate );
                colorsTemplate.attr( 'id', options.contentColorsId.replace( '#', "" ) )
                $( options.contentId ).append( colorsTemplate );
                for ( i = 0; i < colorsArray.length; i ++ ) {
                    arrayItem = colorsArray[i];
                    template = $( options.itemTemplate );
                    template.css( "background-color", arrayItem );
                    template.bind( "click", {color : arrayItem}, CPM.onSelectColor );
                    template.draggable( {
                        revert : true,
                        start  : function() {
                            $( options.deleteItemId ).slideDown( 'slow' );
                        },
                        stop   : function() {
                            $( options.deleteItemId ).slideUp( "slow" );
                        }
                    } );
                    $( options.contentColorsId ).append( template );
                }
                CPM.addNewColorBotton( options );
                templateDelete = $( options.deleteItemTemplate );
                templateDelete.attr( 'id', options.deleteItemId.replace( "#", "" ) );
                $( options.contentId ).append( templateDelete );
                templateDelete.droppable( {
                    accept : '.color_picker_item',
                    drop   : function( event, ui ) {
                        ui.helper.remove();
                        $( options.deleteItemId ).slideUp( "slow" );
                    }
                } );
            }
        },
        init                     : function( obj, options ) {
            var o = CPM.getDefaults( options );
            this.options = CPM.getDefaults( options );
            var self = CPM._getSelf( obj, o );
            CPM.addColorBox( obj, ['black', 'red', 'white', 'grey', 'green'], o );

        }
    } );
})( window.jQuery );
//openEditor ColorPickerMenuDrawing
! (function( $ ) {
    var CPMB = $.openeditorColorPickerMenuBorder = {};
    $.extend( CPMB, {
        defaults     : {
            previewAreaId         : '#colorPickerBorder',
            contentId             : '#colorPickerContentBorder',
            contentColorsId       : '#colorPickerContentColorsBorder',
            currentColorEditId    : "#currentColorEditIdBorder",
            newItemId             : '#colorPickerNewItemBorder',
            deleteItemId          : '#colorPickerDeleteItemBorder',
            contentColorsTemplate : '<div style="display:inline-block"></div>',
            itemTemplate          : '<div class="color_picker_item"></div>',
            newItemTemplate       : '<div class="color_picker_item"></div>',
            deleteItemTemplate    : '<div style="text-align:center;color:#5c5c5c;display:none;height:auto;" ><span class="fa fa-trash-o fa-4x"></span></div>'
        },
        getDefaults  : function( options ) {
            return $.extend( CPMB.defaults, options );
        },
        addHook      : function( key, fn ) {
            openeditorPluggable.PluginHooks.add( key, fn, CPMB );
        },
        addHookOnce  : function( key, fn ) {
            openeditorPluggable.PluginHooks.once( key, fn, CPMB );
        },
        removeHook   : function( key, fn ) {
            openeditorPluggable.PluginHooks.remove( key, fn, CPMB );
        },
        runHooks     : function( key, p1, p2, p3, p4, p5, p6 ) {
            return openeditorPluggable.PluginHooks.run( CPMB, key, p1, p2, p3, p4, p5, p6 );
        },
        connectHooks : function() {
            //  $.openeditorObjectActions.addHook( 'onObjectAdded', OD.onOpenToolbarHookCallback );
        },

        _getSelf                 : function( obj, options ) {
            var self = $( obj );
            if ( ! self.length ) {
                self = $( options.contentId );
            }
            if ( self.length )
                return self;
            return $.error(
                    'Invalid Color Picker'
            );
        },
        onSelectColor            : function( event, isColorFromNewElement ) {
            if ( $( event.toElement ).is( '.ui-draggable-dragging' ) ) {
                return;
            }
            var options = CPMB.getDefaults();
            color = typeof isColorFromNewElement !== 'undefined' ? isColorFromNewElement : event.data.color;
            $( options.previewAreaId ).css( 'background-color', color );
        },
        updatePreviewColorPicker : function( e ) {
            var options = CPMB.getDefaults();
            var color = $( this ).chromoselector( 'getColor' );
            $( this ).css( {
                'background-color' : color.getHexString()
            } );
            color = color.getHexString();
            $( options.previewAreaId ).css( 'background-color', color );
            if ( canvas.getActiveGroup() ) {
                var undoArray = [];
                for ( var index in canvas.getActiveGroup().getObjects() ) {
                    var obj = canvas.getActiveGroup().getObjects()[index];
                    undoArray.push( {
                        objectId : obj.objectID,
                        oldStage : {
                            stroke : obj.stroke,
                            fill   : obj.fill
                        },
                        newStage : {
                            stroke : color,
                            fill   : color
                        }
                    } );
                }
                pushUndoData( undoArray );
                canvas.getActiveGroup().getObjects().forEach( function( obj ) {
                    if ( obj.type == "i-text" || obj.type == "text" || obj.type == 'textbox' ) {
                        obj.fill = color;
                    }
                    else if ( obj.type == "path" ) {
                        obj.set( 'stroke', color );
                        obj.set( 'fill', color );
                    }
                    else {
                        obj.set( 'fill', color );
                    }
                } );
            }
            else {
                if ( canvas.getActiveObject() ) {
                    var object = canvas.getActiveObject();
                    var undoArray = [
                        {
                            objectId : object.objectID,
                            oldStage : {
                                stroke : object.stroke,
                                fill   : object.fill
                            },
                            newStage : {
                                stroke : color,
                                fill   : color
                            }
                        }
                    ];
                    pushUndoData( undoArray );
                    if ( object.type == "i-text" || object.type == "text" || object.type == 'textbox' ) {
                        canvas.getActiveObject().fill = color;
                    }
                    else if ( object.type == "path" ) {
                        canvas.getActiveObject().set( 'stroke', color );
                        canvas.getActiveObject().set( 'fill', color );
                    }
                    else {
                        canvas.getActiveObject().set( 'fill', color );
                    }
                }
                else if ( _isFreeDrawing ) {
                    canvas.freeDrawingBrush.color = color;
                }
            }
            canvas.renderAll();
            CPMB.runHooks( 'updateIframe' );
        },
        hexToCMYK                : function( hex ) {
            var computedC = 0;
            var computedM = 0;
            var computedY = 0;
            var computedK = 0;
            hex = (hex.charAt( 0 ) == "#") ? hex.substring( 1, 7 ) : hex;
            if ( hex.length != 6 ) {
                return;
            }
            if ( /[0-9a-f]{6}/i.test( hex ) != true ) {
                return;
            }
            var r = parseInt( hex.substring( 0, 2 ), 16 );
            var g = parseInt( hex.substring( 2, 4 ), 16 );
            var b = parseInt( hex.substring( 4, 6 ), 16 );
            // BLACK
            if ( r == 0 && g == 0 && b == 0 ) {
                computedK = 1;
                return [0, 0, 0, 1];
            }
            computedC = 1 - (r / 255);
            computedM = 1 - (g / 255);
            computedY = 1 - (b / 255);
            var minCMY = Math.min( computedC, Math.min( computedM, computedY ) );
            computedC = (computedC - minCMY) / (1 - minCMY);
            computedM = (computedM - minCMY) / (1 - minCMY);
            computedY = (computedY - minCMY) / (1 - minCMY);
            computedK = minCMY;
            return [computedC, computedM, computedY, computedK];
        },
        cmykToRGB                : function( c, m, y, k ) {
            function padZero ( str ) {
                return "000000".substr( str.length ) + str
            }

            var cyan = (c * 255 * (1 - k)) << 16;
            var magenta = (m * 255 * (1 - k)) << 8;
            var yellow = (y * 255 * (1 - k)) >> 0;
            var black = 255 * (1 - k);
            var white = black | black << 8 | black << 16;
            var color = white - (cyan | magenta | yellow );
            return ("#" + padZero( color.toString( 16 ) ));
        },
        closeColorPicker         : function() {
            var options = CPMB.getDefaults();
            $( options.currentColorEditId ).chromoselector( 'hide' );
        },
        setColorCMYK             : function( options ) {
            var options = CPMB.getDefaults();
            var c = $( '#inputC' ).val();
            var m = $( '#inputM' ).val();
            var y = $( '#inputY' ).val();
            var k = $( '#inputK' ).val();
            $( options.currentColorEditId ).chromoselector( 'setColor', CPMB.cmykToRGB( c, m, y, k ) );
        },
        setColorRGB              : function( options ) {
            var options = CPMB.getDefaults();
            var r = $( '#inputR' ).val();
            var g = $( '#inputG' ).val();
            var b = $( '#inputB' ).val();
            $( options.currentColorEditId ).chromoselector( "setColor", 'rgb(' + r + ',' + g + ',' + b + ')' );
        },
        openColorPicker          : function() {
            var options = CPMB.getDefaults();
            var template = $( options.itemTemplate );
            if ( $( options.currentColorEditId ).length )
                $( options.currentColorEditId ).bind( "click", {color : $( options.currentColorEditId ).chromoselector( 'getColor' )}, CPMB.onSelectColor );
            $( options.currentColorEditId ).chromoselector( 'destroy' );
            //make old color draggble;
            $( options.currentColorEditId ).draggable( {
                revert : true,
                start  : function() {
                    $( options.deleteItemId ).slideDown( 'slow' );
                },
                stop   : function() {
                    $( options.deleteItemId ).slideUp( "slow" );
                }
            } );
            $( options.currentColorEditId ).removeAttr( 'id' );
            template.attr( 'id', options.currentColorEditId.replace( "#", "" ) );
            template.insertBefore( $( options.newItemId ) );
            $( options.currentColorEditId ).chromoselector( {
                preview   : true,
                width     : 150,
                effect    : 'fade',
                resizable : false,
                panel     : true,
                autoshow  : true,
                update    : CPMB.updatePreviewColorPicker,
                color2str : function( color ) {
                    return "";
                },
                create    : function() {
                    $( ".ui-cs-panel" ).find( "select" ).remove();
                    $( ".ui-cs-panel" ).find( "canvas" ).remove();
                    var templateClose;
                    templateClose = $( '<button id="closeColorPicker" style="float:left;margin-top: 12px;background-color:unset;margin-bottom: 80px;margin-left: 10px;" >Close</button>' );
                    $( templateClose ).insertBefore( '.ui-cs-preview-container' );
                    $( ".ui-panel-labels" ).html( "<div style='padding-bottom:5px; padding-top:10px;'>Manual Colors</div>" +
                                                  "<div class='clearfix' style='width: 80px; padding-bottom:7px;'>" +
                                                  "<span style='float:left; width:30px;'>C</span><input  id='inputC' type='text' style='float:left;width:35px;height:18px;' value='' />" +
                                                  "</div>" +
                                                  "<div class='clearfix' style='width: 80px;padding-bottom:7px;'>" +
                                                  "<span style='float:left; width:30px;'>M</span><input  id='inputM' type='text' style='float:left;width:35px;height:18px;' value='' />" +
                                                  "</div>" +
                                                  "<div class='clearfix' style='width: 80px; padding-bottom:7px;'>" +
                                                  "<span style='float:left; width:30px;'>Y</span><input id='inputY' type='text' style='float:left;width:35px;height:18px;' value='' />" +
                                                  "</div>" +
                                                  "<div class='clearfix' style='width: 80px; padding-bottom:7px;'>" +
                                                  "<span style='float:left; width:30px;'>K</span><input  id='inputK' type='text' style='float:left;width:35px;height:18px;' value='' />" +
                                                  "</div>" +
                                                  "<div style='width:100%;' class='clearfix'><a style='float:right; margin-right:14px;' class='btn btn-chromoselector' id='btnCMYK'>OK</a></div>" +
                                                  "<div class='clearfix' style='width: 80px; padding-bottom:7px;'>" +
                                                  "<span style='float:left; width:30px;'>R</span><input  id='inputR' type='text' style='float:left;width:35px;height:18px;' value='' />" +
                                                  "</div>" +
                                                  "<div class='clearfix' style='width: 80px; padding-bottom:7px;'>" +
                                                  "<span style='float:left; width:30px;'>G</span><input  id='inputG' type='text' style='float:left;width:35px;height:18px;' value='' />" +
                                                  "</div>" +
                                                  "<div class='clearfix' style='width: 80px; padding-bottom:7px;'>" +
                                                  "<span style='float:left; width:30px;'>B</span><input  id='inputB' type='text' style='float:left;width:35px;height:18px;' value='' />" +
                                                  "</div>" +
                                                  "<div style='width:100%;' class='clearfix'><a style='float:right; margin-right:14px;' class='btn btn-chromoselector' id='btnRGB'>OK</a></div>" ).css( {"color" : "#000 !important", "width" : "90px"} );
                }
            } );
            $( options.currentColorEditId ).chromoselector( 'show' );
            $( '#btnCMYK' ).click( CPMB.setColorCMYK );
            $( '#btnRGB' ).click( CPMB.setColorRGB );
            $( '#closeColorPicker' ).click( CPMB.closeColorPicker );
        },
        addNewColorBotton        : function( options ) {
            var template;
            template = $( options.itemTemplate );
            template.attr( 'id', options.newItemId.replace( "#", "" ) );
            template.append( '<span class="fa fa-plus fa-2x" style="margin-top:6px" ></span>' );
            $( options.contentColorsId ).append( template );
            template.on( 'click', CPMB.openColorPicker );
        },
        addColorBox              : function( obj, colorsArray, options ) {
            var arrayItem;
            var template, templateDelete;
            if ( colorsArray.constructor === Array ) {
                var colorsTemplate = $( options.contentColorsTemplate );
                colorsTemplate.attr( 'id', options.contentColorsId.replace( '#', "" ) )
                $( options.contentId ).append( colorsTemplate );
                for ( i = 0; i < colorsArray.length; i ++ ) {
                    arrayItem = colorsArray[i];
                    template = $( options.itemTemplate );
                    template.css( "background-color", arrayItem );
                    template.bind( "click", {color : arrayItem}, CPMB.onSelectColor );
                    template.draggable( {
                        revert : true,
                        start  : function() {
                            $( options.deleteItemId ).slideDown( 'slow' );
                        },
                        stop   : function() {
                            $( options.deleteItemId ).slideUp( "slow" );
                        }
                    } );
                    $( options.contentColorsId ).append( template );
                }
                CPMB.addNewColorBotton( options );
                templateDelete = $( options.deleteItemTemplate );
                templateDelete.attr( 'id', options.deleteItemId.replace( "#", "" ) );
                $( options.contentId ).append( templateDelete );
                templateDelete.droppable( {
                    accept : '.color_picker_item',
                    drop   : function( event, ui ) {
                        ui.helper.remove();
                        $( options.deleteItemId ).slideUp( "slow" );
                    }
                } );
            }
        },
        init                     : function( obj, options ) {
            var o = CPMB.getDefaults( options );
            var self = CPMB._getSelf( obj, o );
            CPMB.addColorBox( obj, ['black', 'red', 'white', 'grey', 'green'], o );
            $( o.previewAreaId ).css( 'background-color', '#000000' )

        }
    } );
})( window.jQuery );
//openEditor ImageQuality
! (function( $ ) {
    var OIQ = $.openeditorImageQuality = {};
    $.extend( OIQ, {
        defaults          : {
            levels                : [
                {
                    background_position : '-150px -300px',
                    low                 : 0,
                    high                : 79
                },
                {
                    background_position : '-266px -300px',
                    low                 : 80,
                    high                : 99
                },
                {
                    background_position : '-179px -300px',
                    low                 : 100,
                    high                : 199
                },
                {
                    background_position : '-208px -300px',
                    low                 : 200,
                    high                : 299
                },
                {
                    background_position : '-237px -300px',
                    low                 : 300,
                    high                : 999999
                },
                {
                    background_position : '-292px -300px',
                    low                 : - 99,
                    high                : 0
                }
            ],
            targetContainerId     : '#imageQuality',
            target                : '#imageQuality .icon',
            currentLevel          : 300,
            imageQualityContainer : '.openeditor_quality_container',
            imageQualityHandler   : Boolean( allowImageQuality )

        },
        getDefaults       : function( options ) {
            return $.extend( OIQ.defaults, options );
        },
        addHook           : function( key, fn ) {
            openeditorPluggable.PluginHooks.add( key, fn, OIQ );
        },
        addHookOnce       : function( key, fn ) {
            openeditorPluggable.PluginHooks.once( key, fn, OIQ );
        },
        removeHook        : function( key, fn ) {
            openeditorPluggable.PluginHooks.remove( key, fn, OIQ );
        },
        runHooks          : function( key, p1, p2, p3, p4, p5, p6 ) {
            return openeditorPluggable.PluginHooks.run( OIQ, key, p1, p2, p3, p4, p5, p6 );
        },
        connectHooks      : function() {
            //  $.openeditorObjectActions.addHook( 'onObjectAdded', OD.onOpenToolbarHookCallback );
        },
        checkImageQuality : function() {
            if ( canvas.getActiveObject() && canvas.getActiveObject().type == 'image' ) {
                var source = canvas.getActiveObject()._originalElement.src.replace( "_working", "" );
                var originalWidth = parseInt( $( 'li' ).filter(function() {
                            return $( this ).data( "location" ) == source
                        } ).attr( 'data-width' ) ),
                        originalHeight = parseInt( $( 'li' ).filter(function() {
                            return $( this ).data( "location" ) == source
                        } ).attr( 'data-height' ) ),
                        resize_scale = 1 - canvasScale;
                var finalWidthInch = canvas.getActiveObject().scaleX * (1 / (1 - resize_scale)) * canvas.getActiveObject().getWidth() * 0.01041666666667;
                finallHeightInch = canvas.getActiveObject().scaleY * (1 / (1 - resize_scale)) * canvas.getActiveObject().getHeight() * 0.01041666666667;
                var originalDiagonalPx = Math.sqrt( Math.pow( originalWidth, 2 ) + Math.pow( originalHeight, 2 ) ),
                        finalDiagonalInch = Math.sqrt( Math.pow( finalWidthInch, 2 ) + Math.pow( finallHeightInch, 2 ) );
                var currentLevel = originalDiagonalPx / finalDiagonalInch;
                return {currentLevel : currentLevel};
            }
        },
        observeQuality    : function() {
            var o = OIQ.getDefaults();
            var qlty = OIQ.checkImageQuality();
            if ( o.levels.length > 0 ) {
                $.each( o.levels,
                        (function( o ) {
                            return function( index, value ) {
                                if ( qlty.currentLevel >= value.low && qlty.currentLevel <= value.high ) {
                                    if ( value.background_position ) {
                                        $( o.target ).css( 'background-position', value.background_position );
                                    }
                                }
                            }
                        })( o )
                );
            }
        },
        observe           : function() {
            var o = OIQ.getDefaults();
            canvas.on( "object:scaling", function( e ) {
                if ( e.target.type == 'image' ) {
                    OIQ.observeQuality();
                }
            } );
            canvas.on( "object:selected", function( e ) {
                if ( e.target.type == 'image' ) {
                    $( o.targetContainerId ).show();
                    OIQ.observeQuality();
                }
                else {
                    $( o.targetContainerId ).hide();
                }
            } );
        },
        allowedFeatures   : function( options ) {
            var o = OIQ.getDefaults();
            if ( ! o.imageQualityHandler ) {
                $( o.imageQualityContainer ).addClass( $.openeditorDefaults.defaults.notVisibleElement );
            }
        },
        init              : function( o ) {
            OIQ.observe();
            OIQ.allowedFeatures( o );
        }
    } );
})( window.jQuery );
//openEditor ImageFilters
! (function( $ ) {
    var OIF = $.openeditorImageFilters = {};
    $.extend( OIF, {
        defaults        : {
            filters              : [
                new fabric.Image.filters.Grayscale(),        // grayscale
                new fabric.Image.filters.Sepia2(),           // sepia
                new fabric.Image.filters.Sepia(),            // sepia
                new fabric.Image.filters.Invert(),           // invert
                new fabric.Image.filters.Convolute( {        // emboss
                    matrix : [
                        1, 1, 1,
                        1, 0.7, - 1,
                        - 1, - 1, - 1
                    ]
                } ),
                new fabric.Image.filters.Convolute( {        // sharpen
                    matrix : [
                        0, - 1, 0,
                        - 1, 5, - 1,
                        0, - 1, 0
                    ]
                } ),
                new fabric.Image.filters.Convolute( {        //blur
                    matrix : [
                        1 / 9, 1 / 9, 1 / 9,
                        1 / 9, 1 / 9, 1 / 9,
                        1 / 9, 1 / 9, 1 / 9
                    ]
                } )
            ],
            activeClass          : 'filter_active',
            activeClassDesign    : 'fa-check-square-o',
            notActiveClassDesign : 'fa-square-o',
            filterClass          : '.filters_options',
            filtersContainterId  : '#imageFilters',
            maskId               : '#loading-mask',
            filtersContainer     : '.openeditor_filters_container',
            filtersHandler       : Boolean( allowFilters )
        },
        getDefaults     : function( options ) {
            return $.extend( OIF.defaults, options );
        },
        addHook         : function( key, fn ) {
            openeditorPluggable.PluginHooks.add( key, fn, OIF );
        },
        addHookOnce     : function( key, fn ) {
            openeditorPluggable.PluginHooks.once( key, fn, OIF );
        },
        removeHook      : function( key, fn ) {
            openeditorPluggable.PluginHooks.remove( key, fn, OIF );
        },
        runHooks        : function( key, p1, p2, p3, p4, p5, p6 ) {
            return openeditorPluggable.PluginHooks.run( OIF, key, p1, p2, p3, p4, p5, p6 );
        },
        connectHooks    : function() {
            //  $.openeditorObjectActions.addHook( 'onObjectAdded', OD.onOpenToolbarHookCallback );
        },
        applyFilter     : function( obj, id ) {
            return function() {
                var o = OIF.getDefaults();
                obj.filters[parseInt( id )] = o.filters[parseInt( id )];
                obj.applyFilters( function() {
                    canvas.renderAll();
                    $( o.maskId ).hide();
                    pushUndoData( [
                        {
                            objectId : obj.objectID,
                            filterId : id,
                            filter   : o.filters[parseInt( id )],
                            type     : 'added'
                        }
                    ] );
                    OIF.runHooks( 'updateIframe' );
                } );
            }( obj, id );
        },
        removeFilter    : function( obj, id ) {
            return function() {
                var o = OIF.getDefaults();
                var filterObj = obj.filters[parseInt( id )];
                obj.filters[parseInt( id )] = null;
                obj.applyFilters( function() {
                    canvas.renderAll();
                    $( o.maskId ).hide();
                    pushUndoData( [
                        {
                            objectId : obj.objectID,
                            filterId : id,
                            filter   : filterObj,
                            type     : 'removed'
                        }
                    ] );
                    OIF.runHooks( 'updateIframe' );
                } );
            }( obj, id );
        },
        observeEvent    : function() {
            canvas.on( 'object:selected', function( e ) {
                var obj = e.target;
                var o = OIF.getDefaults();
                if ( obj && typeof obj.type !== 'undefined' && obj.type == 'image' ) {
                    $( o.filterClass ).removeClass( o.activeClass );
                    $( o.filterClass ).addClass( o.notActiveClassDesign );
                    $( o.filterClass ).removeClass( o.activeClassDesign );
                    obj.filters.forEach( function( obj, key ) {
                        if ( obj != null ) {
                            $( o.filterClass + '[data-filter="' + key + '"]' ).addClass( o.activeClass );
                            $( o.filterClass + '[data-filter="' + key + '"]' ).removeClass( o.notActiveClassDesign );
                            $( o.filterClass + '[data-filter="' + key + '"]' ).addClass( o.activeClassDesign );
                        }
                    } );
                    $( o.filtersContainterId ).show();
                }
                else {
                    $( o.filtersContainterId ).hide();
                }
            } );
        },
        allowedFeatures : function( options ) {
            var o = OIF.getDefaults( options );
            if ( ! o.filtersHandler ) {
                $( o.filtersContainer ).addClass( $.openeditorDefaults.defaults.notVisibleElement );
            }
        },
        init            : function() {
            OIF.allowedFeatures();
            OIF.observeEvent();
            var o = OIF.getDefaults();
            $( o.filterClass ).click( (function( e ) {
                return function() {
                    $( o.maskId ).show();
                    setTimeout(
                            (function( that ) {
                                return function() {
                                    var obj = canvas.getActiveObject();
                                    var _self = $( that );
                                    if ( obj && typeof obj.type != 'undefined' && obj.type == 'image' ) {
                                        var id = _self.data( 'filter' );
                                        if ( _self.hasClass( o.activeClass ) ) {
                                            OIF.removeFilter( obj, id )
                                            _self
                                                    .removeClass( o.activeClass )
                                                    .removeClass( o.activeClassDesign )
                                                    .addClass( o.notActiveClassDesign );
                                        }
                                        else {
                                            OIF.applyFilter( obj, id );
                                            _self
                                                    .addClass( o.activeClass )
                                                    .removeClass( o.notActiveClassDesign )
                                                    .addClass( o.activeClassDesign );
                                        }
                                    }
                                }
                            })( this )
                            , 10 );
                }
            })( o ) );
        }
    } )
})( window.jQuery );
//openEditor PositionBlock
! (function( $ ) {
    var OPB = $.openeditorPositionBlock = {};
    $.extend( OPB, {
        defaults           : {
            containerClass    : ".content_format_text",
            bringForwardId    : "#bringForwardId",
            sendBackwardId    : "#sendBackwardId",
            bringToFrontId    : "#bringToFrontId",
            sendToBackId      : '#sendToBackId',
            activeClass       : 'active',
            positionContainer : '.openeditor_position_container',
            positionHandler   : Boolean( allowPosition )

        },
        getDefaults        : function( options ) {
            return $.extend( OPB.defaults, options );
        },
        arrayObjectIndexOf : function( myArray, searchTerm, property ) {
            for ( var i = 0, len = myArray.length; i < len; i ++ ) {
                if ( myArray[i][property] === searchTerm ) return i;
            }
            return - 1;
        },
        bringHelpersToTop  : function() {
            objects = canvas.getHelpers( true );
            objects.forEach( function( obj, key ) {
                if ( typeof obj.setHelper !== 'undefined' && obj.setHelper == true ) {
                    obj.bringToFront();
                }
            } );
        },
        bringForward       : function( callback ) {
            var o = OPB.getDefaults();
            if ( canvas.getActiveObject() ) {
                $( o.bringForwardId ).addClass( o.activeClass );
                setTimeout( (function() {
                    return function() {
                        $( o.bringForwardId ).removeClass( o.activeClass );
                    }
                })(), 100 );
                pushUndoData( [
                    {
                        objectId     : canvas.getActiveObject().objectID,
                        bringForward : true
                    }
                ] );
                canvas.bringForward( canvas.getActiveObject() );
                canvas.renderAll();
            }
            if ( canvas.getActiveGroup() ) {
                var positions = [], ids = [];
                $( o.bringForwardId ).addClass( o.activeClass );
                setTimeout( (function() {
                    return function() {
                        $( o.bringForwardId ).removeClass( o.activeClass );
                    }
                })(), 100 );
                var activeGroup = canvas.getActiveGroup()._objects;
                activeGroup.forEach( function( obj, key ) {
                    positions.push( OPB.arrayObjectIndexOf( canvas.getObjects(), obj.objectID, "objectID" ) );
                } );
                activeGroup.forEach( function( obj, key ) {
                    ids.push( obj.objectID );
                    canvas.bringForwardGroup( obj, null, positions );
                } );
                pushUndoData( [
                    {
                        bringForward : true,
                        type         : 'group',
                        ids          : ids
                    }
                ] );
                canvas.renderAll();
            }
            if ( typeof callback === 'function' ) callback();
            OPB.runHooks( 'updateIframe' );
        },
        sendBackward       : function( callback ) {
            var o = OPB.getDefaults();
            if ( canvas.getActiveObject() ) {
                $( o.sendBackwardId ).addClass( o.activeClass );
                setTimeout( (function() {
                    return function() {
                        $( o.sendBackwardId ).removeClass( o.activeClass );
                    }
                })(), 100 );
                pushUndoData( [
                    {
                        objectId      : canvas.getActiveObject().objectID,
                        sendBackwards : true
                    }
                ] );
                canvas.sendBackwards( canvas.getActiveObject() );
            }
            if ( canvas.getActiveGroup() ) {
                var positions = [], ids = [];
                $( o.sendBackwardId ).addClass( o.activeClass );
                setTimeout( (function() {
                    return function() {
                        $( o.sendBackwardId ).removeClass( o.activeClass );
                    }
                })(), 100 );
                var activeGroup = canvas.getActiveGroup()._objects;
                activeGroup.forEach( function( obj, key ) {
                    positions.push( OPB.arrayObjectIndexOf( canvas.getObjects(), obj.objectID, "objectID" ) );
                } );
                activeGroup.forEach( function( obj, key ) {
                    ids.push( obj.objectID );
                    canvas.sendBackwardsGroup( obj, null, positions );
                } );
                pushUndoData( [
                    {
                        sendBackwards : true,
                        type          : 'group',
                        ids           : ids
                    }
                ] );
                canvas.renderAll();
            }
            if ( typeof callback === 'function' ) callback();
            OPB.runHooks( 'updateIframe' );
        },
        sendToBack         : function( callback ) {
            var o = OPB.getDefaults();
            $( o.sendToBackId ).addClass( o.activeClass );
            setTimeout( (function() {
                return function() {
                    $( o.sendToBackId ).removeClass( o.activeClass );
                }
            })(), 100 );
            if ( canvas.getActiveObject() ) {
                pushUndoData( [
                    {
                        objectId   : canvas.getActiveObject().objectID,
                        sendToBack : true
                    }
                ] );
                canvas.sendToBack( canvas.getActiveObject() )
                if ( typeof callback === 'function' ) callback();
                OPB.runHooks( 'updateIframe' );
            }
        },
        bringToFront       : function( callback ) {
            var o = OPB.getDefaults();
            $( o.bringToFrontId ).addClass( o.activeClass );
            setTimeout( (function() {
                return function() {
                    $( o.bringToFrontId ).removeClass( o.activeClass );
                }
            })(), 100 );
            if ( canvas.getActiveObject() ) {
                pushUndoData( [
                    {
                        objectId     : canvas.getActiveObject().objectID,
                        bringForward : true
                    }
                ] );


                canvas.bringToFront( canvas.getActiveObject() )
                if ( typeof callback === 'function' ) callback();
                OPB.runHooks( 'updateIframe' );
            }
        },
        addHook            : function( key, fn ) {
            openeditorPluggable.PluginHooks.add( key, fn, OPB );
        },
        addHookOnce        : function( key, fn ) {
            openeditorPluggable.PluginHooks.once( key, fn, OPB );
        },
        removeHook         : function( key, fn ) {
            openeditorPluggable.PluginHooks.remove( key, fn, OPB );
        },
        runHooks           : function( key, p1, p2, p3, p4, p5, p6 ) {
            return openeditorPluggable.PluginHooks.run( OPB, key, p1, p2, p3, p4, p5, p6 );
        },
        connectHooks       : function() {

        },
        allowedFeatures    : function( options ) {
            var o = OPB.getDefaults( options );
            if ( ! o.positionHandler ) {
                $( o.positionContainer ).addClass( $.openeditorDefaults.defaults.notVisibleElement );
            }
        },
        init               : function( options ) {
            var o = OPB.getDefaults();
            OPB.allowedFeatures( o );
            //initButtons
            $( o.bringForwardId ).click( function() {
                OPB.bringForward( OPB.bringHelpersToTop );
            } );
            $( o.sendBackwardId ).click( function() {
                OPB.sendBackward( OPB.bringHelpersToTop );
            } );
            $( o.bringToFrontId ).click( function() {
                OPB.bringToFront( OPB.bringHelpersToTop );
            } );
            $( o.sendToBackId ).click( function() {
                OPB.sendToBack( OPB.bringHelpersToTop );
            } );
        }
    } );
})( window.jQuery );
//openEditor SnaptoObject
! (function( $ ) {
    var OSO = $.openeditorSnaptoObject = {};
    $.extend( OSO, {
        defaults          : {
            handlerId              : "#btnToggleSnap",
            isSnaptoObject         : false,
            edgeDetection          : 6,
            snapObjectCenterH      : "snapObjectCenterH",
            snapObjectCenterV      : "snapObjectCenterV",
            snapObjectLeft         : "snapObjectLeft",
            snapObjectLeftInside   : "snapObjectLeftInside",
            snapObjectRight        : "snapObjectRight",
            snapObjectRightInside  : "snapObjectRightInside",
            snapObjectTop          : "snapObjectTop",
            snapObjectTopInside    : "snapObjectTopInside",
            snapObjectBottom       : "snapObjectBottom",
            snapObjectBottomInside : "snapObjectBottomInside",
            //allowed Options
            snapHandler            : Boolean( allowSnap ),
            //container
            snapContainer          : '.openeditor_snap_container'

        },
        getDefaults       : function( options ) {
            return $.extend( OSO.defaults, options );
        },
        drawSnapLine      : function( name, coords, callback ) {
            var line = new fabric.Line( [
                coords.x1, coords.y1, coords.x2, coords.y2,
            ], {
                name        : name,
                strokeDashArray: [3,3],
                stroke      :'black',
                hasControls : false,
                visible     : true,
                selectable  : false,
                strokeWidth : 0.5,
                isSnapLine  : true
            } );
            canvas.add( line );
            canvas.renderAll();
            if ( typeof callback === 'function' )
                callback();
        },
        observe           : function() {
            var o = OSO.getDefaults();
            canvas.observe( 'object:moving', (function( o,objCanvas) {
                return function( e ) {
                    if ( ! o.isSnaptoObject ) return;
                    var obj           = e.target,
                        centerCanvas  = canvas.getCenter(),
                        centerObj     = obj.getCenterPoint();
                    obj.setCoords();
                    if ( typeof obj.angle !== 'undefined' && parseInt( obj.angle ) != 0 ) {
                        return;
                    }
                    objCanvas.forEach( function( targ ) {

                        if(Math.abs( centerCanvas.top - centerObj['y'] ) < o.edgeDetection) {
                            obj.centerV().setCoords();
                            if(!canvas.getObjectsName( o.snapObjectCenterH ).length){
                                OSO.drawSnapLine( o.snapObjectCenterH,  {x1 :0,
                                    y1                                  : centerCanvas.top,
                                    x2                                  : canvas.getWidth(),
                                    y2                                  : centerCanvas.top}, function() {
                                    targ.setSnapedCanvasH( true );
                                } );
                            }
                        }else{
                            if ( targ.get( 'snapCanvasH' ) ) {
                                canvas.remove( canvas.getObjectsName( o.snapObjectCenterH ).pop() );
                                targ.setSnapedCanvasH( false );
                            }
                        }
                        if(Math.abs( centerCanvas.left - centerObj['x'] ) < o.edgeDetection){
                            obj.centerH().setCoords();
                            if(!canvas.getObjectsName( o.snapObjectCenterV ).length){
                                OSO.drawSnapLine( o.snapObjectCenterV,  {x1 :centerCanvas.left,
                                    y1                                      : 0,
                                    x2                                      : centerCanvas.left,
                                    y2                                      : canvas.getHeight()}, function() {
                                    targ.setSnapedCanvasV( true );
                                } );
                            }
                        }else{
                            if ( targ.get( 'snapCanvasV' ) ) {
                                canvas.remove( canvas.getObjectsName( o.snapObjectCenterV ).pop() );
                                targ.setSnapedCanvasV( false );
                            }
                        }
                        if ( (typeof targ.ignoreSnap !== 'undefined' && targ.ignoreSnap) || (typeof targ.angle !== 'undefined' && parseInt( targ.angle ) != 0) ) return;
                        if ( targ == obj || targ.objectID == 100003 || targ.objectID == 100002 || targ.objectID == 100001 || targ.objectID == 100000 )
                            return;
                        if ( typeof targ.name !== 'undefided' && (targ.name == o.snapObjectLeft || targ.name == o.snapObjectLeftInside || targ.name == o.snapObjectRight || targ.name == o.snapObjectRightInside
                                                                          || targ.name == o.snapObjectTop || targ.name == o.snapObjectTopInside || targ.name == o.snapObjectBottom || targ.name == o.snapObjectBottomInside) )
                            return;
                        //left
                        if ( Math.abs( obj.oCoords.tr.x - targ.oCoords.tl.x ) < o.edgeDetection ) {
                            obj.setLeft( targ.getLeft() - obj.getWidth() / 2 - targ.getWidth() / 2 );
                            if ( ! canvas.getObjectsName( o.snapObjectLeft ).length ) {
                                OSO.drawSnapLine( o.snapObjectLeft, {x1 : obj.getCenterPoint().x+obj.getWidth()/2,
                                    y1                                  : 0,
                                    x2                                  : obj.getCenterPoint().x+obj.getWidth()/2,
                                    y2                                  : canvas.getHeight()}, function() {
                                    targ.setSnapedLeft( true );
                                } );
                            }
                        }
                        else {
                            if ( targ.get( 'snapLeft' ) ) {
                                canvas.remove( canvas.getObjectsName( o.snapObjectLeft ).pop() );
                                targ.setSnapedLeft( false );
                            }
                        }
                        //right
                        if ( Math.abs( obj.oCoords.tl.x - targ.oCoords.tr.x ) < o.edgeDetection ) {
                            obj.setLeft( targ.getLeft() + targ.getWidth() / 2 + obj.getWidth() / 2 );
                            if ( ! canvas.getObjectsName( o.snapObjectRight ).length ) {
                                OSO.drawSnapLine( o.snapObjectRight, {x1 : obj.getCenterPoint().x-obj.getWidth()/2,
                                    y1                                   : 0,
                                    x2                                   : obj.getCenterPoint().x-obj.getWidth()/2,
                                    y2                                   : canvas.getHeight()}, function() {
                                    targ.setSnapedRight( true );
                                } );
                            }
                        }
                        else {
                            if ( targ.get( 'snapRight' ) ) {
                                canvas.remove( canvas.getObjectsName( o.snapObjectRight ).pop() );
                                targ.setSnapedRight( false );
                            }
                        }
                        //top
                        if ( Math.abs( obj.oCoords.br.y - targ.oCoords.tr.y ) < o.edgeDetection ) {
                            obj.setTop( targ.getTop() - targ.getHeight() / 2 - obj.getHeight() / 2 );
                            if ( ! canvas.getObjectsName( o.snapObjectTop ).length ) {
                                OSO.drawSnapLine( o.snapObjectTop, {x1 : 0,
                                    y1                                 : obj.getCenterPoint().y+obj.getHeight()/2,
                                    x2                                 : canvas.getWidth(),
                                    y2                                 : obj.getCenterPoint().y+obj.getHeight()/2}, function() {
                                    targ.setSnapedTop( true );
                                } );
                            }
                        }
                        else {
                            if ( targ.get( 'snapTop' ) ) {
                                canvas.remove( canvas.getObjectsName( o.snapObjectTop ).pop() );
                                targ.setSnapedTop( false );
                            }
                        }
                        //bottom
                        if ( Math.abs( targ.oCoords.br.y - obj.oCoords.tr.y ) < o.edgeDetection ) {
                            obj.setTop( targ.getTop() + targ.getHeight() / 2 + obj.getHeight() / 2 );
                            if ( ! canvas.getObjectsName( o.snapObjectBottom ).length ) {
                                OSO.drawSnapLine( o.snapObjectBottom, {x1 : 0,
                                    y1                                    : obj.getCenterPoint().y-obj.getHeight()/2,
                                    x2                                    : canvas.getWidth(),
                                    y2                                    : obj.getCenterPoint().y-obj.getHeight()/2}, function() {
                                    targ.setSnapedBottom( true );
                                } );
                            }
                        }
                        else {
                            if ( targ.get( 'snapBottom' ) ) {
                                canvas.remove( canvas.getObjectsName( o.snapObjectBottom ).pop() );
                                targ.setSnapedBottom( false );
                            }
                        }
                        //leftInside
                        if ( Math.abs( obj.oCoords.tl.x - targ.oCoords.tl.x ) < o.edgeDetection ) {
                            obj.setLeft( targ.getLeft() + obj.getWidth() / 2 - targ.getWidth() / 2 );
                            if ( ! canvas.getObjectsName( o.snapObjectLeftInside ).length ) {
                                OSO.drawSnapLine( o.snapObjectLeftInside, {x1 : obj.getCenterPoint().x-obj.getWidth()/2,
                                    y1                                        : 0,
                                    x2                                        : obj.getCenterPoint().x-obj.getWidth()/2,
                                    y2                                        : canvas.getHeight()}, function() {
                                    targ.setSnapedLeftInside( true );
                                } );
                            }
                        }
                        else {
                            if ( targ.get( 'snapLeftInside' ) ) {
                                canvas.remove( canvas.getObjectsName( o.snapObjectLeftInside ).pop() );
                                targ.setSnapedLeftInside( false );
                            }
                        }
                        //rightInside
                        if ( Math.abs( obj.oCoords.tr.x - targ.oCoords.tr.x ) < o.edgeDetection ) {
                            obj.setLeft( targ.getLeft() + targ.getWidth() / 2 - obj.getWidth() / 2 );
                            if ( ! canvas.getObjectsName( o.snapObjectRightInside ).length ) {
                                OSO.drawSnapLine( o.snapObjectRightInside, {x1 : obj.getCenterPoint().x+obj.getWidth()/2,
                                    y1                                         : 0,
                                    x2                                         : obj.getCenterPoint().x+obj.getWidth()/2,
                                    y2                                         : canvas.getHeight()}, function() {
                                    targ.setSnapedRightInside( true );
                                } );
                            }
                        }
                        else {
                            if ( targ.get( 'snapRightInside' ) ) {
                                canvas.remove( canvas.getObjectsName( o.snapObjectRightInside ).pop() );
                                targ.setSnapedRightInside( false );
                            }
                        }
                        //topInside
                        if ( Math.abs( obj.oCoords.tr.y - targ.oCoords.tr.y ) < o.edgeDetection ) {
                            obj.setTop( targ.getTop() - targ.getHeight() / 2 + obj.getHeight() / 2 );
                            if ( ! canvas.getObjectsName( o.snapObjectTopInside ).length ) {
                                OSO.drawSnapLine( o.snapObjectTopInside, {x1 : 0,
                                    y1                                       : obj.getCenterPoint().y-obj.getHeight()/2,
                                    x2                                       : canvas.getWidth(),
                                    y2                                       : obj.getCenterPoint().y-obj.getHeight()/2}, function() {
                                    targ.setSnapedTopInside( true );
                                } );
                            }
                        }
                        else {
                            if ( targ.get( 'snapTopInside' ) ) {
                                canvas.remove( canvas.getObjectsName( o.snapObjectTopInside ).pop() );
                                targ.setSnapedTopInside( false );
                            }
                        }
                        //bottomInside
                        if ( Math.abs( targ.oCoords.br.y - obj.oCoords.br.y ) < o.edgeDetection ) {
                            obj.setTop( targ.getTop() + targ.getHeight() / 2 - obj.getHeight() / 2 );
                            if ( ! canvas.getObjectsName( o.snapObjectBottomInside ).length ) {
                                OSO.drawSnapLine( o.snapObjectBottomInside, {x1 : 0,
                                    y1                                          : obj.getCenterPoint().y+obj.getHeight()/2,
                                    x2                                          : canvas.getWidth(),
                                    y2                                          : obj.getCenterPoint().y+obj.getHeight()/2}, function() {
                                    targ.setSnapedBottomInside( true );
                                } );
                            }
                        }
                        else {
                            if ( targ.get( 'snapBottomInside' ) ) {
                                canvas.remove( canvas.getObjectsName( o.snapObjectBottomInside ).pop() );
                                targ.setSnapedBottomInside( false );
                            }
                        }
                    } );
                }
            })( o, canvas.getObjects()) );
        },
        verifyObject      : function( obj ) {
            var o = OSO.getDefaults();
            if ( typeof obj !== 'undefined' && typeof obj.name !== 'undefined' && (obj.name == o.snapObjectLeft || obj.name == o.snapObjectRight || obj.name == o.snapObjectTop || obj.name == o.snapObjectBottom ||
                                                                                   obj.name == o.snapObjectLeftInside || obj.name == o.snapObjectRightInside || obj.name == o.snapObjectTopInside || obj.name == o.snapObjectBottomInside) )
                return false;
            return true;
        },
        prepareTempCanvas : function() {
            var o = OSO.getDefaults();
            if ( o.isSnaptoObject ) {
                if ( tempCanvas.getObjectsName( o.snapObjectLeft ).length )
                    tempCanvas.remove( tempCanvas.getObjectsName( o.snapObjectLeft ).pop() );
                if ( tempCanvas.getObjectsName( o.snapObjectRight ).length )
                    tempCanvas.remove( tempCanvas.getObjectsName( o.snapObjectRight ).pop() );
                if ( tempCanvas.getObjectsName( o.snapObjectTop ).length )
                    tempCanvas.remove( tempCanvas.getObjectsName( o.snapObjectTop ).pop() );
                if ( tempCanvas.getObjectsName( o.snapObjectBottom ).length )
                    tempCanvas.remove( tempCanvas.getObjectsName( o.snapObjectBottom ).pop() );
                if ( tempCanvas.getObjectsName( o.snapObjectLeftInside ).length )
                    tempCanvas.remove( tempCanvas.getObjectsName( o.snapObjectLeftInside ).pop() );
                if ( tempCanvas.getObjectsName( o.snapObjectRightInside ).length )
                    tempCanvas.remove( tempCanvas.getObjectsName( o.snapObjectRightInside ).pop() );
                if ( tempCanvas.getObjectsName( o.snapObjectTopInside ).length )
                    tempCanvas.remove( tempCanvas.getObjectsName( o.snapObjectTopInside ).pop() );
                if ( tempCanvas.getObjectsName( o.snapObjectBottomInside ).length )
                    tempCanvas.remove( tempCanvas.getObjectsName( o.snapObjectBottomInside ).pop() );
                if ( tempCanvas.getObjectsName( o.snapObjectCenterH ).length )
                    tempCanvas.remove( tempCanvas.getObjectsName( o.snapObjectCenterH ).pop() );
                if ( tempCanvas.getObjectsName( o.snapObjectCenterV ).length )
                    tempCanvas.remove( tempCanvas.getObjectsName( o.snapObjectCenterV ).pop() );
            }
        },
        addHook           : function( key, fn ) {
            openeditorPluggable.PluginHooks.add( key, fn, OSO );
        },
        addHookOnce       : function( key, fn ) {
            openeditorPluggable.PluginHooks.once( key, fn, OSO );
        },
        removeHook        : function( key, fn ) {
            openeditorPluggable.PluginHooks.remove( key, fn, OSO );
        },
        runHooks          : function( key, p1, p2, p3, p4, p5, p6 ) {
            return openeditorPluggable.PluginHooks.run( OSO, key, p1, p2, p3, p4, p5, p6 );
        },
        connectHooks      : function() {
            //  $.openeditorObjectActions.addHook( 'onObjectAdded', OD.onOpenToolbarHookCallback );
        },
        allowedFeatures   : function( options ) {
            var o = OSO.getDefaults( options );
            if ( ! o.snapHandler )
                $( o.snapContainer ).addClass( $.openeditorDefaults.defaults.notVisibleElement );
        },
        init              : function( options ) {
            var o = OSO.getDefaults();
            OSO.observe();
            OSO.allowedFeatures();
            canvas.on( 'mouse:up', (function( o ) {
                return function( e ) {
                    if ( o.isSnaptoObject ) {
                        if ( canvas.getObjectsName( o.snapObjectLeft ).length )
                            canvas.remove( canvas.getObjectsName( o.snapObjectLeft ).pop() );
                        if ( canvas.getObjectsName( o.snapObjectRight ).length )
                            canvas.remove( canvas.getObjectsName( o.snapObjectRight ).pop() );
                        if ( canvas.getObjectsName( o.snapObjectTop ).length )
                            canvas.remove( canvas.getObjectsName( o.snapObjectTop ).pop() );
                        if ( canvas.getObjectsName( o.snapObjectBottom ).length )
                            canvas.remove( canvas.getObjectsName( o.snapObjectBottom ).pop() );
                        if ( canvas.getObjectsName( o.snapObjectLeftInside ).length )
                            canvas.remove( canvas.getObjectsName( o.snapObjectLeftInside ).pop() );
                        if ( canvas.getObjectsName( o.snapObjectRightInside ).length )
                            canvas.remove( canvas.getObjectsName( o.snapObjectRightInside ).pop() );
                        if ( canvas.getObjectsName( o.snapObjectTopInside ).length )
                            canvas.remove( canvas.getObjectsName( o.snapObjectTopInside ).pop() );
                        if ( canvas.getObjectsName( o.snapObjectBottomInside ).length )
                            canvas.remove( canvas.getObjectsName( o.snapObjectBottomInside ).pop() );
                        if ( canvas.getObjectsName( o.snapObjectCenterH ).length )
                            canvas.remove( canvas.getObjectsName( o.snapObjectCenterH ).pop() );
                        if ( canvas.getObjectsName( o.snapObjectCenterV ).length )
                            canvas.remove( canvas.getObjectsName( o.snapObjectCenterV ).pop() );
                    }
                }
            })( o ) );
            $( o.handlerId ).off( 'click' ).on( 'click', (function( o ) {
                return function( e ) {
                    if ( o.isSnaptoObject ) {
                        o.isSnaptoObject = ! o.isSnaptoObject;
                        $( o.handlerId ).css( 'color', $.openeditorDefaults.defaults.notActiveColorElement );
                    }
                    else {
                        o.isSnaptoObject = ! o.isSnaptoObject;
                        $( o.handlerId ).css( 'color', $.openeditorDefaults.defaults.activeColorElement );
                    }
                }
            })( o ) );
        }
    } );
})( window.jQuery );
//openEditor X3DomCompatibility
! (function( $ ) {
    var OXC = $.openeditorX3DomCompatibility = {};
    $.extend( OXC, {
        defaults    : {
            frameContent      : '.frame_preview',
            iframeId          : 'frame_3d',
            canvasId          : 'x3dom-the_element-canvas',
            validContextNames : ['moz-webgl', 'webkit-3d', 'experimental-webgl', 'webgl'],
            supportX3DomVar   : null,
            isOldWebGL        : false,
            updateOldWebGL    : false,
            notSupport        : false
        },
        getDefaults : function( options ) {
            return $.extend( OXC.defaults, options );
        },
        observe     : function( iframe, o ) {
            var canvasContent = (iframe.contentDocument) ? iframe.contentDocument.getElementById( o.canvasId ) : iframe.contentWindow.getElementById( o.canvasId );
            for ( var i = 0; i < o.validContextNames.length && ! o.supportX3Dom; i ++ ) {
                try {
                    o.supportX3DomVar = canvasContent.getContext( o.validContextNames[i] );
                    try {
                        if ( o.supportX3DomVar ) {
                            var tmp = o.supportX3DomVar.getSupportedExtensions();
                        }
                    }
                    catch ( e ) {
                        o.isOldWebGl = true;
                    }
                }
                catch ( e ) {
                    o.supportX3DomVar = null;
                }
            }
            if ( o.supportX3DomVar ) {
                o.notSupport = false;
            }
            else {
                if ( "WebGLRenderingContext" in window ) {
                    o.updateOldWebGL = true;
                }
                else {
                    o.notSupport = true;
                }
            }
            if ( o.notSupport ) {
                iframe_update = false;
                $( o.frameContent ).hide();
                $( '#droppable' ).css( 'width', '100%' );
                $( '#show_preview' ).css( 'width', '100%' );
            }
        },
        init        : function( options ) {
            if ( isFrontEndUser ) {
                var o = OXC.getDefaults();
                var iframe = document.getElementById( o.iframeId );
                if ( typeof iframe !== 'undefined' && iframe !== null && typeof iframe.attachEvent !== 'undefined' && iframe.attachEvent ) {
                    iframe.attachEvent( 'onload', OXC.observe( iframe, o ) );
                }
                else {
                    if ( typeof iframe !== 'undefined' && iframe !== null )
                        iframe.addEventListener( 'load', OXC.observe( iframe, o ), false );
                }
            }
        }
    } );
})( window.jQuery );
//openEditor tdpreview
! (function( $ ) {
    var OTD = $.openeditorTDpreview = {};
    $.extend( OTD, {
        defaults     : {
            iframe_update : iframe_update,
            previewType   : previewType,
            iframeHandler : 'iframe#frame_3d'
        },
        getDefaults  : function( options ) {
            return $.extend( OTD.defaults, options );
        },
        addHook      : function( key, fn ) {
            openeditorPluggable.PluginHooks.add( key, fn, OTD );
        },
        addHookOnce  : function( key, fn ) {
            openeditorPluggable.PluginHooks.once( key, fn, OTD );
        },
        removeHook   : function( key, fn ) {
            openeditorPluggable.PluginHooks.remove( key, fn, OTD );
        },
        runHooks     : function( key, p1, p2, p3, p4, p5, p6 ) {
            return openeditorPluggable.PluginHooks.run( OTD, key, p1, p2, p3, p4, p5, p6 );
        },
        connectHooks : function() {
            $.openeditorPositionBlock.addHook( 'updateIframe', OTD.updateIframe );
            $.openeditorImageFilters.addHook( 'updateIframe', OTD.updateIframe );
            $.openeditorColorPickerMenu.addHook( 'updateIframe', OTD.updateIframe );
            $.openeditorBasicFunctionality.addHook( 'updateIframe', OTD.updateIframe );
            $.openeditorUploadSection.addHook( 'updateIframe', OTD.updateIframe );
            $.openeditorImagePicker.addHook( 'updateIframe', OTD.updateIframe );
        },
        updateIframe : function() {
            var o = OTD.getDefaults();
            if ( o.iframe_update != false && o.previewType == 'tdpreview' ) {
                var canvas_json = JSON.stringify( canvas.toDatalessObject( ['objectID', 'opacity', 'name'] ) );
                tempCanvas.loadFromDatalessJSON( canvas_json, function() {
                    if ( tempCanvas.getObjectByID( 123456 ).length > 0 )
                        tempCanvas.remove( tempCanvas.getObjectByID( 123456 ).pop() );
                    setTempCanvasDim();
                    tempCanvas.renderAll();
                    $.openeditorSnaptoObject.prepareTempCanvas();
                    setTimeout( function() {
                        var tempImage = tempCanvas.toDataURL( {
                            format  : "jpeg",
                            quality : 1,
                            left    : textureModeLeft,
                            top     : canvasOffsetHeight,
                            width   : tempCanvas.width - 2 * textureModeLeft,
                            height  : tempCanvas.getHeight() - 2 * canvasOffsetHeight} );
                        $( o.iframeHandler ).get( 0 ).contentWindow.postMessage( JSON.stringify( {"image" : [
                            tempImage
                        ], "texture"                                                                      : [
                            [rd_texture, "1"]
                        ]} ), "*" );
                    }, 0 );
                } );
            }
        },
        init         : function( options ) {
            OTD.connectHooks();
            var o = OTD.getDefaults();
        }
    } );
})( window.jQuery );
//$.openeditorImagePicker
! (function( $ ) {
    var OIP = $.openeditorImagePicker = {};
    $.extend( OIP, {
        defaults : {
            obj                       : null,
            imagePicker               : '#fancyboxUploadImage',
            imageGallery              : 'div.imageGallery',
            toggle                    : '#toggleGallery',
            currentFrame              : 'myphotos',
            instagramBtn              : 'span.instagram-btn',
            fotoliaBtn                : 'span.fotolia-btn',
            selectboxBtn              : 'span.selectbox-btn',
            facebookBtn               : 'span.fb-btn',
            myphotosBtn               : 'span.back-to-cloud-albums',
            imageGalleryImageTemplate : '#imageGalleryImageTemplate',
            mask                      : '#loading-mask-images',
            cancelLoading             : true,
            cancelImageBarLoading     : true,
            framesClass               : 'myphotos facebook instagram fotolia selectbox',
            defaultFrame              : 'myphotos',
            loadMore                  : 'div.loadMore'
        },

        cache : {
        },

        _E : function( e, exp ) {
            if ( typeof(OIP.cache[e]) != 'undefined' )
                return OIP.cache[e];
            OIP.cache[e] = exp;
            return OIP.cache[e];
        },

        _O : function( o ) {
            return $.extend( {}, OIP.defaults, o );
        },

        attr : function( attr, value ) {
            if ( typeof attr === 'string' ) {
                if ( typeof (value) != 'undefined' ) {
                    OIP.defaults[attr] = value;
                }
                return OIP.defaults[attr];
            }
            if ( typeof attr === 'object' ) {
                $.each( attr, function( field, val ) {
                    OIP.defaults[field] = val;
                } )
            }
        },

        init : function( o ) {
            var o = OIP._O( o ),
                    imagePicker = $.q( o.imagePicker );

            imagePicker.off( 'click', o.myphotosBtn ).on( 'click', o.myphotosBtn,
                    (function( o ) {
                        return function() {
                            OIP.openImageGallery( o, 'myphotos' );
                        }
                    })( o )
            );
            OIP.openImageGallery( o, 'myphotos' );
            return true;
        },

        addHook : function( key, fn ) {
            openeditorPluggable.PluginHooks.add( key, fn, OIP );
        },

        addHookOnce : function( key, fn ) {
            openeditorPluggable.PluginHooks.once( key, fn, OIP );
        },

        removeHook : function( key, fn ) {
            openeditorPluggable.PluginHooks.remove( key, fn, OIP );
        },

        runHooks : function( key, p1, p2, p3, p4, p5, p6 ) {
            return openeditorPluggable.PluginHooks.run( OIP, key, p1, p2, p3, p4, p5, p6 );
        },

        clearGalleryImages : function( o ) {
            var o = OIP._O( o ),
                    uid = $.printqUniqueId( {prefix : 'loading_', sufix : 'clearGalleryImages', length : 6} ),
                    imagePicker = $.q( o.imagePicker ),
                    galleryContainer = imagePicker.find( '> div.' + o.currentFrame + 'Container' ),
                    toogle = imagePicker.find( o.toggle ),
                    imageGallery = galleryContainer.find( o.imageGallery );
            //$.q(o.mask).prinqLoading('start', uid);
            imageGallery.find( '.imageContainer' ).remove();
            imageGallery
                    .toggleClass( 'hasPhoto', false )
                    .toggleClass( 'collapsed', false )
                    .toggleClass( 'expanded', false );
            toogle
                    .toggleClass( 'collapse', false )
                    .toggleClass( 'expand', false );
            //$.q(o.mask).prinqLoading('stop', uid);
        },

        openImageGallery : function( o, frame ) {
            var o = OIP._O( o ),
                    imagePicker = $.q( o.imagePicker );

            imagePicker.toggleClass( o.framesClass, false ).toggleClass( frame );
            //OIP.resetToggle({'currentFrame': frame});
            OIP.toggleGallery( {'currentFrame' : frame} );
        },

        updateImagePicker : function( o ) {
            var o = OIP._O( o ),
                    uid = $.printqUniqueId( {prefix : 'loading_', sufix : '_updateimagepicker', length : 6} );

            $.q( o.mask ).prinqLoading( 'start', uid, {cancelLoading : o.cancelLoading} );
            //@todo ajax
            var response = {"sid":"77c97dc91b8c1f84077bb89d5deda398","count":0,"files":[]};
            var o = OIP._O(),
                                imagePicker = $.q( o.imagePicker ),
                                galleryContainer = imagePicker.find( '> div.' + o.currentFrame + 'Container' ),
                                imageGallery = galleryContainer.find( o.imageGallery );

                        OIP.clearGalleryImages( o );

                        if ( ! o.cancelImageBarLoading )
                            $( '.bottom-thumbnails' ).printqImageBar( 'parseGetUserPhotosResponse', {}, response );

                        if ( response.count > 0 ) {
                            imageGallery.toggleClass( 'hasPhoto', true );
                            $.each( response.files,
                                    (function( o ) {
                                        return function( index, value ) {
                                            var imageTemplate = $( o.imageGalleryImageTemplate ),
                                                    elem = $( imageTemplate.html() ),
                                                    imageData = {
                                                        id              : value['id'],
                                                        loaded          : true,
                                                        apiloaded       : true,
                                                        data            : uploadedDirPath + uploadPhotoDirName + '/' + value['image'],
                                                        fullName        : uploadPhotoDirName + '/' + value['image'],
                                                        uniqueId        : 'preload_' + value['image'] + '_image',
                                                        other_infos     : value['other_infos'],
                                                        custom_filename : value['image'],
                                                        workingImage    : (typeof(value['other_infos']['working_image']) !=='undefined') ? uploadedDirPath + uploadPhotoDirName + '/' + value['other_infos']['working_image'] :  uploadedDirPath + uploadPhotoDirName + '/' + value['image'],
                                                        thumbnail       : null,
                                                        designerOptions :{
                                                            actualWidth  : parseFloat(value['other_infos']['width']),
                                                            actualHeight : parseFloat(value['other_infos']['height']),
                                                            originalWidth : parseFloat(value['other_infos']['width']),
                                                            originalHeight : parseFloat(value['other_infos']['height'])
                                                        },
                                                    },
                                                    img_src = imageData['data'];

                                            if ( typeof ( value['thumbnail']) != 'undefined' ) {
                                                img_src = uploadedDirPath + uploadPhotoDirName + '/' + value['thumbnail'];
                                                imageData['thumbnail'] = img_src;
                                            }

                                            elem
                                                    .data( {
                                                        imageData     : imageData,
                                                        imagePath     : imageData['fullName'],
                                                        imageFullName : imageData['fullName'],
                                                        imageName     : imageData['custom_filename'],
                                                        imageSid      : uploadPhotoDirName,
                                                        imageId       : imageData['id']
                                                    } )
                                                    .on( 'click',
                                                            (function( elem, imageData, o ) {
                                                                return function( e ) {
                                                                    var uid = $.printqUniqueId( {prefix : 'loading_', sufix : '_ipphotoClick', length : 6} );
                                                                    $.q( o.mask ).prinqLoading( 'start', uid );
                                                                    var remove = $( this ).find( 'span.removeImage' );
                                                                    if ( $( e.target )[0] != remove[0] ) {
                                                                        fabric.Image.fromURL( imageData['workingImage'], (function( imageData ) {
                                                                            return function( img ) {
                                                                                img.set( {
                                                                                    originX : 'center',
                                                                                    originY : 'center',
                                                                                    left    : canvas.getCenter().left,
                                                                                    top     : canvas.getCenter().top,
                                                                                    designerOptions      : {
                                                                                        type             : 'image',
                                                                                        workingImage     : imageData['workingImage'],
                                                                                        originalWidth    : parseInt(imageData['other_infos']['size']['width']),
                                                                                        originalHeight   : parseInt(imageData['other_infos']['size']['height']),
                                                                                        actualWidth      : img.width,
                                                                                        actualHeight     : img.height,
                                                                                        imageLocation    : imageData['fullName'],
                                                                                        imageName        : imageData['custom_filename']
                                                                                    }
                                                                                } );
                                                                                img = OIP.resizeImageCanvas( img );
                                                                                canvas.add( img );
                                                                                pushUndoData([
                                                                                    {
                                                                                        objectId : img.objectID,
                                                                                        added    : img,
                                                                                        type     : 'image'
                                                                                    }
                                                                                ]);
                                                                                $.fancybox.close();
                                                                                OIP.runHooks( 'updateIframe' );
                                                                            }
                                                                        })( imageData ) );
                                                                    }
                                                                    else {
                                                                        var uid1 = $.printqUniqueId( {prefix : 'loading_', sufix : '_ipphotoClick', length : 6} );
                                                                        $.q( o.mask ).prinqLoading( 'start', uid1 );
                                                                        if ( confirm( deletePhotoText ) ) {
                                                                            $.printqAjaxRequest.postRequest( {
                                                                                url        : deleteUserPhotoUrl,
                                                                                data       : {
                                                                                    sid  : elem.data( 'imageSid' ),
                                                                                    name : elem.data( 'imageName' ),
                                                                                    id   : elem.data( 'imageId' )
                                                                                },
                                                                                onComplete : (function( uid, imageName ) {
                                                                                    return function( response ) {
                                                                                        if ( typeof (response) != 'undefined' && response[0] ) {
                                                                                            OIP.updateImagePicker( {cancelImageBarLoading : true} );
                                                                                            $( '.bottom-thumbnails' ).printqImageBar( 'removeElementByPhotoName', {}, imageName );
                                                                                        }
                                                                                        $.q( o.mask ).prinqLoading( 'stop', uid );
                                                                                    }
                                                                                })( uid1, elem.data( 'imageName' ) ),
                                                                                onFail     : (function( uid ) {
                                                                                    return function() {
                                                                                        alert( errorMsgTxt );
                                                                                        $.q( o.mask ).prinqLoading( 'stop', uid );
                                                                                    }
                                                                                })( uid1 )
                                                                            } );
                                                                        }
                                                                        else
                                                                            $.q( o.mask ).prinqLoading( 'stop', uid1 );
                                                                    }
                                                                    $.q( o.mask ).prinqLoading( 'stop', uid );
                                                                }
                                                            })( elem, imageData, o )
                                                    );
                                            imageGallery.prepend( elem );

                                            elem.printqFitBgImage( {
                                                image_src     : img_src,
                                                image_name    : imageData['fullName'],
                                                onImageLoaded : function() {
                                                },
                                                actionType    : 'fitToDiv',
                                                autocenter    : false,
                                                cancelLoading : true
                                            } );
                                        }
                                    })( o )
                            )
                        }
                        OIP.toggleGallery( o );
                        $.q( o.mask ).prinqLoading( 'stop', uid );
            /*
            $.printqAjaxRequest.postRequest( {
                url        : getUserPhotosUrl,
                data       : {
                    sid          : uploadPhotoDirName,
                    count        : 1000,
                    returnThumbs : 1,
                    order        : 'ASC'
                },
                onComplete : (function( options, uid ) {
                    return function( response ) {
                        var o = OIP._O( options ),
                                imagePicker = $.q( o.imagePicker ),
                                galleryContainer = imagePicker.find( '> div.' + o.currentFrame + 'Container' ),
                                imageGallery = galleryContainer.find( o.imageGallery );

                        OIP.clearGalleryImages( o );

                        if ( ! o.cancelImageBarLoading )
                            $( '.bottom-thumbnails' ).printqImageBar( 'parseGetUserPhotosResponse', {}, response );

                        if ( response.count > 0 ) {
                            imageGallery.toggleClass( 'hasPhoto', true );
                            $.each( response.files,
                                    (function( o ) {
                                        return function( index, value ) {
                                            var imageTemplate = $( o.imageGalleryImageTemplate ),
                                                    elem = $( imageTemplate.html() ),
                                                    imageData = {
                                                        id              : value['id'],
                                                        loaded          : true,
                                                        apiloaded       : true,
                                                        data            : uploadedDirPath + uploadPhotoDirName + '/' + value['image'],
                                                        fullName        : uploadPhotoDirName + '/' + value['image'],
                                                        uniqueId        : 'preload_' + value['image'] + '_image',
                                                        other_infos     : value['other_infos'],
                                                        custom_filename : value['image'],
                                                        workingImage    : (typeof(value['other_infos']['working_image']) !=='undefined') ? uploadedDirPath + uploadPhotoDirName + '/' + value['other_infos']['working_image'] :  uploadedDirPath + uploadPhotoDirName + '/' + value['image'],
                                                        thumbnail       : null,
                                                        designerOptions :{
                                                            actualWidth  : parseFloat(value['other_infos']['width']),
                                                            actualHeight : parseFloat(value['other_infos']['height']),
                                                            originalWidth : parseFloat(value['other_infos']['width']),
                                                            originalHeight : parseFloat(value['other_infos']['height'])
                                                        },
                                                    },
                                                    img_src = imageData['data'];

                                            if ( typeof ( value['thumbnail']) != 'undefined' ) {
                                                img_src = uploadedDirPath + uploadPhotoDirName + '/' + value['thumbnail'];
                                                imageData['thumbnail'] = img_src;
                                            }

                                            elem
                                                    .data( {
                                                        imageData     : imageData,
                                                        imagePath     : imageData['fullName'],
                                                        imageFullName : imageData['fullName'],
                                                        imageName     : imageData['custom_filename'],
                                                        imageSid      : uploadPhotoDirName,
                                                        imageId       : imageData['id']
                                                    } )
                                                    .on( 'click',
                                                            (function( elem, imageData, o ) {
                                                                return function( e ) {
                                                                    var uid = $.printqUniqueId( {prefix : 'loading_', sufix : '_ipphotoClick', length : 6} );
                                                                    $.q( o.mask ).prinqLoading( 'start', uid );
                                                                    var remove = $( this ).find( 'span.removeImage' );
                                                                    if ( $( e.target )[0] != remove[0] ) {
                                                                        fabric.Image.fromURL( imageData['workingImage'], (function( imageData ) {
                                                                            return function( img ) {
                                                                                img.set( {
                                                                                    originX : 'center',
                                                                                    originY : 'center',
                                                                                    left    : canvas.getCenter().left,
                                                                                    top     : canvas.getCenter().top,
                                                                                    designerOptions      : {
                                                                                        type             : 'image',
                                                                                        workingImage     : imageData['workingImage'],
                                                                                        originalWidth    : parseInt(imageData['other_infos']['size']['width']),
                                                                                        originalHeight   : parseInt(imageData['other_infos']['size']['height']),
                                                                                        actualWidth      : img.width,
                                                                                        actualHeight     : img.height,
                                                                                        imageLocation    : imageData['fullName'],
                                                                                        imageName        : imageData['custom_filename']
                                                                                    }
                                                                                } );
                                                                                img = OIP.resizeImageCanvas( img );
                                                                                canvas.add( img );
                                                                                pushUndoData([
                                                                                    {
                                                                                        objectId : img.objectID,
                                                                                        added    : img,
                                                                                        type     : 'image'
                                                                                    }
                                                                                ]);
                                                                                $.fancybox.close();
                                                                                OIP.runHooks( 'updateIframe' );
                                                                            }
                                                                        })( imageData ) );
                                                                    }
                                                                    else {
                                                                        var uid1 = $.printqUniqueId( {prefix : 'loading_', sufix : '_ipphotoClick', length : 6} );
                                                                        $.q( o.mask ).prinqLoading( 'start', uid1 );
                                                                        if ( confirm( deletePhotoText ) ) {
                                                                            $.printqAjaxRequest.postRequest( {
                                                                                url        : deleteUserPhotoUrl,
                                                                                data       : {
                                                                                    sid  : elem.data( 'imageSid' ),
                                                                                    name : elem.data( 'imageName' ),
                                                                                    id   : elem.data( 'imageId' )
                                                                                },
                                                                                onComplete : (function( uid, imageName ) {
                                                                                    return function( response ) {
                                                                                        if ( typeof (response) != 'undefined' && response[0] ) {
                                                                                            OIP.updateImagePicker( {cancelImageBarLoading : true} );
                                                                                            $( '.bottom-thumbnails' ).printqImageBar( 'removeElementByPhotoName', {}, imageName );
                                                                                        }
                                                                                        $.q( o.mask ).prinqLoading( 'stop', uid );
                                                                                    }
                                                                                })( uid1, elem.data( 'imageName' ) ),
                                                                                onFail     : (function( uid ) {
                                                                                    return function() {
                                                                                        alert( errorMsgTxt );
                                                                                        $.q( o.mask ).prinqLoading( 'stop', uid );
                                                                                    }
                                                                                })( uid1 )
                                                                            } );
                                                                        }
                                                                        else
                                                                            $.q( o.mask ).prinqLoading( 'stop', uid1 );
                                                                    }
                                                                    $.q( o.mask ).prinqLoading( 'stop', uid );
                                                                }
                                                            })( elem, imageData, o )
                                                    );
                                            imageGallery.prepend( elem );

                                            elem.printqFitBgImage( {
                                                image_src     : img_src,
                                                image_name    : imageData['fullName'],
                                                onImageLoaded : function() {
                                                },
                                                actionType    : 'fitToDiv',
                                                autocenter    : false,
                                                cancelLoading : true
                                            } );
                                        }
                                    })( o )
                            )
                        }
                        OIP.toggleGallery( o );
                        $.q( o.mask ).prinqLoading( 'stop', uid );
                    }
                })( o, uid ),
                onFail     : (function( o, uid ) {
                    return function() {
                        $.q( o.mask ).prinqLoading( 'stop', uid );
                    }
                })( o, uid )
            } );
            */
            return false;
        },

        createImageGalleryPhoto : function( ig, _iItem, o ) {
            var o = OIP._O( o ),
                    imageTemplate = $( o.imageGalleryImageTemplate ),
                    elem = $( imageTemplate.html() );

            ig.toggleClass( 'hasPhoto', true ).toggleClass( 'connect', false );
            if ( _iItem.hasOwnProperty( 'name' ) && _iItem.name != '' ) {
                elem.find( 'span.imageName' ).html( _iItem.name );
            }

            ig.append( elem );

            elem.toggleClass( 'hasPhoto', false );

            elem.printqFitBgImage( {
                image_src        : _iItem['thumbImg'],
                onImageLoaded    : (function( elem ) {
                    return function( img ) {
                        elem.toggleClass( 'hasPhoto', true );
                    }
                })( elem ),
                actionType       : 'fitToDiv',
                autocenter       : false,
                noImageContainer : true,
                cancelLoading    : o.cancelLoading
            } );

            var imageData = {
                id              : _iItem.id,
                loaded          : false,
                apiloaded       : false,
                data            : uploadedDirPath + uploadPhotoDirName + '/' + _iItem.id,
                fullName        : uploadPhotoDirName + '/' + _iItem.id,
                uniqueId        : 'preload_' + _iItem.id + '_image',
                custom_filename : _iItem.id,
                other_infos     : _iItem['other_infos']
                };
            elem
                    .attr( 'id', 'image_' + _iItem.id )
                    .off( 'click' ).on( 'click', (function( _iItem, imageData, o ) {
                        return function( e ) {
                            var uid = $.printqUniqueId( {prefix : 'loading_', sufix : 'createImageContainer', length : 6} ),
                                    elem = $( this ),
                                    elemImageData = elem.data( 'imageData' ),
                                    addToGallerySpan = $( this ).find( 'span.addToGallery' ),
                                    addToGallery = false

                            if ( $( e.target )[0] == addToGallerySpan[0] ) {
                                addToGallery = true;
                            }

                            elemImageData     = elem.data( 'imageData' );
                            elemImageDesigner = elem.data( 'designerOptions' );

                            if ( typeof(elemImageDesigner) != 'undefined' ) {
                                fabric.Image.fromURL( elemImageData['data'], (function( imageData ) {
                                    return function( img ) {
                                        img.set( {
                                            originX         : 'center',
                                            originY         : 'center',
                                            left            : canvas.getCenter().left,
                                            top             : canvas.getCenter().top,
                                            designerOptions : elemImageDesigner
                                        } );
                                        img = OIP.resizeImageCanvas( img );
                                        canvas.add( img );
                                        pushUndoData( [
                                            {
                                                objectId : img.objectID,
                                                added    : img,
                                                type     : 'image'
                                            }
                                        ] );
                                        $.fancybox.close();
                                        OIP.runHooks( 'updateIframe' );
                                    }
                                })( elemImageData ) );
                            }
                            else {
                                $.q( o.mask ).prinqLoading( 'start', uid );
                                $.printqAjaxRequest.postRequest( {
                                    url        : uploadUrlPhotoUrl,
                                    data       : {
                                        photo_url       : encodeURIComponent( _iItem['originalImg'] ),
                                        custom_filename : imageData['custom_filename'],
                                        createThumbnail : 1,
                                        other_infos     : _iItem['other_infos'],
                                        tName           : imageData['custom_filename'] + '_thumb',
                                        width           : 'auto',
                                        height          : '150'
                                    },
                                    onComplete : (function( _iItem,imageData, elem, uid, addToGallery, o ) {
                                        return function( response ) {
                                            if ( typeof (response) != 'undefined' ) {
                                                if ( typeof (response.success) != 'undefined' && response.success ) {
                                                    if ( typeof (response.result) != 'undefined' ) {
                                                        imageData['id'] = response.result.id;
                                                        imageData['thumbnail'] = false;
                                                        if ( typeof (response.result.thumbnail) != 'undefined' ) {
                                                            if ( typeof (response.result.thumbnail.success) != 'undefined' ) {
                                                                imageData['thumbnail'] = uploadedDirPath + uploadPhotoDirName + '/' + response.result.thumbnail.result;
                                                            }
                                                        }
                                                        elem.data( {
                                                            imageData      : imageData,
                                                            designerOptions:{
                                                                actualWidth    : _iItem['width'],
                                                                actualHeight   : _iItem['height'],
                                                                originalWidth  : _iItem['width'],
                                                                originalHeight : _iItem['height'],
                                                                type           : 'image',
                                                                imageName      : imageData['custom_filename'],
                                                                imageLocation  : imageData['fullName'],
                                                                workingImage   : imageData['data'],
                                                                exist_wImage   : 0
                                                            }
                                                        } );

                                                        if ( ! addToGallery ) {
                                                            fabric.Image.fromURL( imageData['data'], (function( response,_iItem,imageData ) {
                                                                return function( img ) {
                                                                    img.set( {
                                                                        originX : 'center',
                                                                        originY : 'center',
                                                                        left    : canvas.getCenter().left,
                                                                        top     : canvas.getCenter().top
                                                                    } );
                                                                    if(typeof _iItem['type'] !== 'undefined' && (_iItem['type'] =='facebook' || _iItem['type'] =='instagram' )){
                                                                        img.set({
                                                                            designerOptions:{
                                                                                actualWidth    : _iItem['width'],
                                                                                actualHeight   : _iItem['height'],
                                                                                originalWidth  : _iItem['width'],
                                                                                originalHeight : _iItem['height'],
                                                                                type           : 'image',
                                                                                imageName      : imageData['custom_filename'],
                                                                                imageLocation  : imageData['fullName'],
                                                                                workingImage   : imageData['data'],
                                                                                exist_wImage   : 0
                                                                            }
                                                                        });
                                                                    }
                                                                    img = OIP.resizeImageCanvas( img );
                                                                    canvas.add( img );
                                                                    pushUndoData([
                                                                        {
                                                                            objectId : img.objectID,
                                                                            added    : img,
                                                                            type     : 'image'
                                                                        }
                                                                    ]);
                                                                    $.fancybox.close();
                                                                    OIP.runHooks( 'updateIframe' );
                                                                }
                                                            })( response,_iItem,imageData ) );
                                                        }

                                                        OIP.updateImagePicker();
                                                    }
                                                }
                                            }
                                            $.q( o.mask ).prinqLoading( 'stop', uid );
                                        }
                                    })( _iItem,imageData, elem, uid, addToGallery, o ),
                                    onFail     : (function( uid ) {
                                        return function() {
                                            alert( 'Error!' );
                                            $.q( o.mask ).prinqLoading( 'stop', uid );
                                        }
                                    })( uid )
                                } );
                            }
                        }
                    })( _iItem, imageData, o ) );

        },

        resizeImageCanvas : function( image ) {
            var maxWidth = 400;
            var maxHeight = 400;
            var ratio = 0;
            var width = image.width;
            var height = image.height;

            if ( width > maxWidth ) {
                ratio = maxWidth / width;
                image.width = maxWidth;
                image.height = height * ratio;
                height = height * ratio;
                width = width * ratio;
            }

            if ( height > maxHeight ) {
                ratio = maxHeight / height;
                image.height = maxHeight;
                image.width = width * ratio;
                width = width * ratio;
            }
            return image;
        },

        openImagePicker : function( o ) {
            var o = OIP._O( o ),
                    imagePicker = $.q( o.imagePicker );
            imagePicker.toggleClass( 'edit', true );
            var connectBtn = imagePicker.find( o.connectUploadBtn );
            $( connectBtn ).show();
            $( o.topButtonsClass ).removeClass( o.activeElement );
            $( o.localUploadBtn ).addClass( o.activeElement );
            OIP.openImageGallery( o, o.defaultFrame );
        },

        closeImagePicker : function( o ) {
            var o = OIP._O( o ),
                    imagePicker = $.q( o.imagePicker );
            imagePicker
                    .toggleClass( 'edit', false );
        },

        setPositionImagePicker : function( o ) {
            var o = OIP._O( o ),
                    _obj = o.obj,
                    objOffset = _obj.offset(),
                    imagePicker = $.q( o.imagePicker ),
                    windowWidth = $( window ).width(),
                    imagePickerWidth = imagePicker.width();

            imagePicker
                    .css( {
                        'top'  : objOffset.top,
                        'left' : objOffset.left + (_obj.width() / 2) - imagePickerWidth / 2
                    } );

            var procent = null;

            if ( imagePickerWidth > windowWidth ) {
                procent = ((windowWidth / imagePickerWidth) - 0.02).toFixed( 2 );

                imagePicker.css( {
                    transform          : 'scale(' + procent + ')',
                    'transform-origin' : 'left top',
                    left               : 4
                } );
            }
            else {
                var scale = $.responsivePlugin.getScale();
                left = (objOffset.left) + ( (_obj.width() / 2) * scale ) - (imagePickerWidth / 2);
                if ( scale > 0 && scale < 1 ) {
                    procent = scale;
                    imagePicker.css( {
                        left : left
                    } );
                }
                else {
                    imagePicker.css( {
                        transform          : '',
                        'transform-origin' : ''
                    } );
                }
            }
        },

        toogleButtons : function( btn, status, o ) {
            var o = OIP._O( o ),
                    imagePicker = $.q( o.imagePicker ),
                    b = null;

            status = parseInt( status );
            if ( isNaN( status ) )
                status = 0;

            switch ( btn ) {
                case 'facebook':
                    b = imagePicker.find( o.facebookBtn );
                    if ( ! allow_facebook )
                        status = 0;
                    break;
                case 'instagram':
                    b = imagePicker.find( o.instagramBtn );
                    if ( ! allow_instagram )
                        status = 0;
                    break;
                case 'fotolia':
                    b = imagePicker.find( o.fotoliaBtn );
                    if ( ! allow_fotolia )
                        status = 0;
                    break;
                case 'selectbox':
                    b = imagePicker.find( o.selectboxBtn );
                    if ( ! allow_selectbox )
                        status = 0;
                    break;
                case 'myphotos':
                    b = imagePicker.find( o.myphotosBtn );
                    if ( ! allow_uploaded_photos )
                        status = 0;
                    break;
            }
            b.hide();
            if ( status ) {
                b.show();
                b.css( 'display', 'inline-block' );
            }
        },//if custom options doesn't allow a button then hide it

        resetToggle : function( o ) {
            var o = OIP._O( o ),
                    imagePicker = $.q( o.imagePicker ),
                    toogle = imagePicker.find( o.toggle ),
                    expandGallery = toogle.find( '#expandGallery' ),
                    collapseGallery = toogle.find( '#collapseGallery' );

            expandGallery.off( 'click' ).on( 'click',
                    (function( o ) {
                        return function() {
                            OIP.expandGallery( o );
                        }
                    })( o )
            );
            collapseGallery.off( 'click' ).on( 'click',
                    (function( o ) {
                        return function() {
                            OIP.collapseGallery( o );
                        }
                    })( o )
            );
        },

        toggleGallery : function( o ) {
            var o = OIP._O( o ),
                    imagePicker = $.q( o.imagePicker ),
                    galleryContainer = imagePicker.find( '> .' + o.currentFrame + 'Container' ),
                    imageGallery = galleryContainer.find( o.imageGallery );

            var instance = jcf.getInstance( imageGallery );
            if ( typeof (instance) != 'undefined' ) {
                instance.refresh();
            }
            else {
                jcf.replace( imageGallery, 'Scrollable' );
            }
            return true;

            if ( imageGallery.hasClass( 'expanded' ) )
                return OIP.expandGallery( o );
            if ( imageGallery.hasClass( 'collapsed' ) )
                return OIP.collapseGallery( o );
            return OIP.collapseGallery( o );
        },

        expandGallery : function( o ) {
            var o = OIP._O( o ),
                    imagePicker = $.q( o.imagePicker ),
                    galleryContainer = imagePicker.find( '> .' + o.currentFrame + 'Container' ),
                    imageGallery = galleryContainer.find( o.imageGallery ),
                    loadMore = imageGallery.find( o.loadMore ),
                    bounding = imagePicker[0].getBoundingClientRect(),
                    imageGalleryHeight = $( window ).height() - bounding.top - (imagePicker.height() - imageGallery.height()) - 10,
                    imageContainers = imageGallery.find( '.imageContainer' ).length,
                    imageRows = parseInt( imageContainers / 3 ) + ( ( (imageContainers % 3) == 0 ) ? 0 : 1 );

            if ( imageGalleryHeight > imageRows * 148 )
                imageGalleryHeight = imageRows * 148;

            if ( loadMore.length ) {
                imageGalleryHeight += 25;
            }

            imageGallery
                    .animate( {
                        height : imageGalleryHeight
                    },
                    {
                        duration : 200,
                        complete : (function( o ) {
                            return function() {
                                $( this )
                                        /*.scrollTop( 0 )*/
                                        .css( 'overflow', 'auto' )
                                        .addClass( 'expanded' )
                                        .removeClass( 'collapsed' );
                                if ( imageRows <= 2 )
                                    $( o.toggle ).removeClass( 'collapse' ).removeClass( 'expand' );
                                else
                                    $( o.toggle ).addClass( 'expand' ).removeClass( 'collapse' );
                            }
                        })( o )
                    }
            );
        },

        collapseGallery : function( o ) {
            var o = OIP._O( o ),
                    imagePicker = $.q( o.imagePicker ),
                    galleryContainer = imagePicker.find( '> .' + o.currentFrame + 'Container' ),
                    imageGallery = galleryContainer.find( o.imageGallery ),
                    loadMore = imageGallery.find( o.loadMore ),
                    imageContainers = imageGallery.find( '.imageContainer' ).length,
                    imageRows = parseInt( imageContainers / 3 ) + ( ( (imageContainers % 3) == 0 ) ? 0 : 1 ),
                    imageGalleryHeight = 296;

            if ( imageRows <= 1 ) {
                imageGalleryHeight = 148
            }

            if ( loadMore.length ) {
                imageGalleryHeight += 25;
            }

            imageGallery
                    .animate( {
                        height : imageGalleryHeight },
                    {
                        duration : 200,
                        complete : function() {
                            $( this )
                                    .scrollTop( 0 )
                                    .css( 'overflow', 'hidden' )
                                    .addClass( 'collapsed' )
                                    .removeClass( 'expanded' );
                            if ( imageRows <= 2 )
                                $( o.toggle ).removeClass( 'collapse' ).removeClass( 'expand' );
                            else
                                $( o.toggle ).addClass( 'collapse' ).removeClass( 'expand' );
                        }
                    }
            );
        }
    } );

    $.fn.openeditorImagePicker = function( a1, a2 ) {
        OIP.attr( 'obj', this );
        if ( typeof a1 === 'string' ) {
            this.each( function() {
                if ( ! $.isFunction( OIP[a1] ) || a1.charAt( 0 ) === '_' ) {
                    return $.error(
                            'No such method "' + a1 + '"'
                    );
                }
                var result = OIP[a1]( a2 );
                return result;
            } );
        }
        else {
            var o = OIP._O( a1 );
            return this.each( function() {
                OIP.init( o );
            } );
        }
    };
})( window.jQuery );
//openEditor UploadSection
! (function( $ ) {
    var OUS = $.openeditorUploadSection = {};
    $.extend( OUS, {
        defaults : {
            popupTriggerClass            : ".svgedit_upload_picture",
            titleContentClass            : ".titlecontent",
            imagePicker                  : '#fancyboxUploadImage',
            facebookPicker               : 'div.facebookContainer',
            instagramPicker              : 'div.instagramContainer',
            localPicker                  : 'div.myphotosContainer',
            facebookImageGallery         : "div.imageGallery",
            instagramImageGallery        : "div.imageGallery",
            localImageGallery            : "div.imageGallery",
            instagramMethod              : 'getUserRecent',
            imageGalleryImageTemplate    : '#socialImageGalleryImageTemplate',
            facebookAlbumGalleryTemplate : 'div#facebookAlbumGalleryTemplate',
            facebookBtn                  : '.fancytitle.facebookBtn',
            instagramBtn                 : '.fancytitle.instagramBtn',
            localUploadBtn               : '.fancytitle.localUploadBtn',
            connectBtn                   : 'div.connectBtn',
            connectUploadBtn             : 'label.connectBtn',
            imageGallery                 : 'div.facebookPickerBody',
            imageGalleryInstagram        : 'div.instagramPickerBody',
            mask                         : '#loading-mask',
            activeElement                : "activeElement",
            topButtonsClass              : ".fancytitle",
            version                      : 'v2.5'

        },

        getDefaults : function( options ) {
            return $.extend( OUS.defaults, options );
        },

        observe      : function( options ) {
            var o = OUS.getDefaults( options );
            $( o.popupTriggerClass ).fancybox( {
                openEffect  : 'none',
                closeEffect : 'none',
                autoSize    : false,
                height      : 500,
                width       : 870,
                beforeLoad  : (function( o ) {
                    return function() {
                        $( o.imagePicker ).css({
                            'left':'0px',
                            'top':'0px'
                        })
                        /*
                        var defaultFrame = 'myphotos';
                        $.openeditorImagePicker.openImagePicker( { defaultFrame : defaultFrame,
                            connectUploadBtn                                    : o.connectUploadBtn,
                            localUploadBtn                                      : o.localUploadBtn,
                            activeElement                                       : o.activeElement,
                            topButtonsClass                                     : o.topButtonsClass
                        } );
                        $.openeditorImagePicker.updateImagePicker();
                        */
                    }
                })( o )
            } );
        },

        //facebook begin
        openfacebook : function( o ) {
            var o = OUS.getDefaults( o ),
                    imagePicker = $.q( o.imagePicker ),
                    uid = $.printqUniqueId( {prefix : 'loading_', sufix : 'openfacebook', length : 6} );
            $.q( o.mask ).prinqLoading( 'start', uid );
            $.openeditorImagePicker.openImageGallery( {}, 'facebook' );
            $.q( o.mask ).prinqLoading( 'stop', uid );
            return true;
        },

        facebookShowNotLogin : function( o ) { //if user is not logged in then this
            var o = OUS.getDefaults( o ),
                    imagePicker = $.q( o.imagePicker ),
                    facebookPicker = imagePicker.find( o.facebookPicker ),
                    imageGallery = facebookPicker.find( o.facebookImageGallery ),
                    connectBtn = imageGallery.find( o.connectBtn );

            $.openeditorImagePicker.clearGalleryImages( ({'currentFrame' : 'facebook'}) );
            $.openeditorImagePicker.toggleGallery( {'currentFrame' : 'facebook'} );
            imageGallery.toggleClass( 'connect', true );
            $( o.titleContentClass ).css( "display", "block" );
            $( o.titleContentClass ).animate( {top : "20px"}, 300 );
            $( o.imageGallery ).show();

            connectBtn.off( 'click' ).on( 'click', function() {
                if ( typeof (FB) != 'undefined' ) {
                    FB.login(
                            (function( o ) {
                                return function( response ) {
                                    if ( typeof (response.status) != 'undefined' ) {
                                        switch ( response.status ) {
                                            case 'connected':
                                                OUS.facebookShowLogin( o );
                                                break;
                                            case 'not_authorized':
                                                alert( translateStrings.facebook.notAuthorized );
                                                break;
                                            default:
                                                alert( translateStrings.facebook.notLoggedIn );
                                                break;
                                        }

                                    }
                                }
                            })( o ),
                            {scope : 'user_photos'} );
                }
            } );
        },

        facebookShowLogin : function( o ) { // this will be showen after the user is loggedin
            var o = OUS.getDefaults( o ),
                    imagePicker = $.q( o.imagePicker ),
                    facebookPicker = imagePicker.find( o.facebookPicker ),
                    imageGallery = facebookPicker.find( o.facebookImageGallery );
            $( o.titleContentClass ).css( "display", "block" );
            $( o.imageGallery ).show();
            imageGallery.toggleClass( 'connect hasPhoto', false );
            $.openeditorImagePicker.clearGalleryImages( {currentFrame : 'facebook'} );
            OUS.getFacebookAlbums( o );
        },

        getFacebookAlbums : function( o, params ) {
            var o = OUS.getDefaults( o ),
                    uid = $.printqUniqueId( {prefix : 'loading_', sufix : 'getFacebookAlbums', length : 6} );
            $.q( o.mask ).prinqLoading( 'start', uid );

            if ( typeof( params ) == 'undefined' )
                params = '';
            FB.api( o.version + '/me/albums?limit=3' + params,
                    (function( o ) {
                        return function( response ) {
                            if ( typeof (response.data ) == 'object' ) {
                                if ( response.data.length ) {
                                    $.each( response.data,
                                            (function( o ) {
                                                return function( i, v ) {
                                                    OUS.createFacebookAlbum( v.id, o );
                                                }
                                            })( o )
                                    );
                                }
                                if ( typeof(response.paging ) != 'undefined' ) {
                                    if ( typeof(response.paging.next) != 'undefined' ) {
                                        OUS.getFacebookAlbums( o, '&after=' + response.paging.cursors.after )
                                    }
                                    else {
                                        $.openeditorImagePicker.toggleGallery( {'currentFrame' : 'facebook'} );
                                    }
                                }
                                else {
                                    $.openeditorImagePicker.toggleGallery( {'currentFrame' : 'facebook'} );
                                }
                            }
                            $.q( o.mask ).prinqLoading( 'stop', uid );
                        }
                    })( o )
            );
        },

        getFacebookImageDetails : function( imageId, callback, o ) {
            var o = OUS.getDefaults( o );
            FB.api( o.version + '/' + imageId.id + "?fields=images",
                    (function( o ) {
                        return function( response ) {
                            callback( response );
                        }
                    })( o )
            );
        },

        createFacebookAlbum : function( albumId, o ) {
            var o = OUS.getDefaults( o );

            FB.api( o.version + '/' + albumId + "?fields=count,link,name,type,created_time,cover_photo",
                    (function( albumId, o ) {
                        return function( response ) {
                            var o = OUS.getDefaults( o );
                            if ( typeof(response.count) != 'undefined' && response.count ) {
                                var imagePicker = $.q( o.imagePicker ),
                                        facebookPicker = imagePicker.find( o.facebookPicker ),
                                        imageGallery = facebookPicker.find( o.facebookImageGallery ),
                                        imageTemplate = $( o.facebookAlbumGalleryTemplate ),
                                        elem = $( imageTemplate.html() );

                                imageGallery.toggleClass( 'hasPhoto', true ).toggleClass( 'connect', false );
                                imageGallery.append( elem );
                                var title = response.name + ' - (' + response.count + ')';
                                elem.attr( 'title', title );
                                elem.find( 'span.albumName' ).html( title );
                                elem.toggleClass( 'hasPhoto', false );
                                OUS.getFacebookImageDetails( response.cover_photo, (function( elem, o ) {
                                    return function( response ) {
                                        elem.printqFitBgImage( {
                                            image_src        : response.images[response.images.length - 1].source,
                                            onImageLoaded    : (function( elem ) {
                                                return function( img ) {
                                                    elem.toggleClass( 'hasPhoto', true );
                                                }
                                            })( elem ),
                                            actionType       : 'fitToDiv',
                                            autocenter       : false,
                                            noImageContainer : true,
                                            cancelLoading    : true
                                        } );
                                    }
                                })( elem, o ), o );

                                elem.off( 'click' ).on( 'click', (function( albumId, o ) {
                                    return function( e ) {
                                        $( document ).trigger( 'click', {cancelBlur : true} );
                                        e.stopPropagation();
                                        $.openeditorImagePicker.clearGalleryImages( {currentFrame : 'facebook'} );
                                        OUS.getFacebookAlbumPhotos( albumId, o );
                                    }
                                })( albumId, o ) );
                            }
                        }
                    })( albumId, o )
            );
        },

        getFacebookAlbumPhotos : function( albumId, o, params ) {
            var o = OUS.getDefaults( o );

            if ( typeof( params ) == 'undefined' )
                params = '';
            FB.api( o.version + '/' + albumId + '/photos?limit=5&fields=source,images' + params,
                    (function( albumId, o ) {
                        return function( response ) {
                            if ( typeof (response.data ) == 'object' ) {
                                if ( response.data.length ) {
                                    $.each( response.data,
                                            (function( o ) {
                                                return function( i, v ) {
                                                    var o = OUS.getDefaults( o ),
                                                            imagePicker = $.q( o.imagePicker ),
                                                            facebookPicker = imagePicker.find( o.facebookPicker ),
                                                            imageGallery = facebookPicker.find( o.facebookImageGallery ),
                                                            originalImg = v.images[0].source,
                                                            thumbImg = v.images[v.images.length - 1].source,
                                                            _iItem = {
                                                                id          : v.id,
                                                                thumbImg    : thumbImg,
                                                                originalImg : originalImg,
                                                                width       : v.images[0].width,
                                                                height      : v.images[0].height,
                                                                type        : 'facebook',
                                                                other_infos : {
                                                                    type : 'facebook',
                                                                    id   : v.id,
                                                                    size :{
                                                                        width  : parseInt(v.images[0].width),
                                                                        height : parseInt(v.images[0].height)
                                                                    }
                                                                }
                                                            }
                                                    $.openeditorImagePicker.createImageGalleryPhoto( imageGallery, _iItem, {imageGalleryImageTemplate : '#socialImageGalleryImageTemplate', cancelLoading : true} );
                                                }
                                            })( o )
                                    );
                                }

                                if ( typeof(response.paging ) != 'undefined' ) {
                                    if ( typeof(response.paging.next) != 'undefined' ) {
                                        OUS.getFacebookAlbumPhotos( albumId, o, '&after=' + response.paging.cursors.after )
                                    }
                                    $.openeditorImagePicker.toggleGallery( {'currentFrame' : 'facebook'} )
                                }
                                else {
                                    $.openeditorImagePicker.toggleGallery( {'currentFrame' : 'facebook'} );
                                }
                            }
                        }
                    })( albumId, o )
            );
        },
        //facebook end

        //instagram begin
        openInstagram          : function( o ) {
            var o = OUS.getDefaults( o ),
                    imagePicker = $.q( o.imagePicker ),
                    instagramBtn = imagePicker.find( o.instagramBtn ),
                    uid = $.printqUniqueId( {prefix : 'loading_', sufix : 'instagramInit', length : 6} );
            $.q( o.mask ).prinqLoading( 'start', uid );
            $.openeditorImagePicker.openImageGallery( {}, 'instagram' );
            $.openeditorImagePicker.clearGalleryImages( {currentFrame : 'instagram'} );
            $.openeditorImagePicker.toggleGallery( {'currentFrame' : 'instagram'} );
            $( o.topButtonsClass ).removeClass( o.activeElement );
            $( o.instagramBtn ).addClass( o.activeElement );
            $( o.titleContentClass ).css( "display", "block" );
            $.printqAjaxRequest.postRequest( {
                url        : instagramActionUrl,
                data       : {
                    method : o.instagramMethod,
                },
                onComplete : (function( o, uid ) {
                    return function( response ) {
                        $.q( o.mask ).prinqLoading( 'stop', uid );
                        if ( typeof (response) != 'undefined' ) {
                            if ( typeof (response.auth) != 'undefined' && response.auth ) {
                                OUS.instagramShowLogin( response, o );
                                return;
                            }
                            else { //not logged in into instagram
                                OUS.instagramShowNotLogin( response, o );
                                return;
                            }
                        }
                        else {
                            alert( 'Could Not Connect To Instagram' );
                            instagramBtn.toggleClass( 'disabled', true ).hide();
                        }
                    }
                })( o, uid )
            } );
            return true;
        },

        instagramShowLogin : function( response, o ) { // this will be showen after the user is loggedin
            var o = OUS.getDefaults( o ),
                    imagePicker = $.q( o.imagePicker ),
                    instagramPicker = imagePicker.find( o.instagramPicker ),
                    imageGallery = instagramPicker.find( o.instagramImageGallery );

            //  $( o.titleContentClass ).animate({top:"20px"},300);
            imageGallery.toggleClass( 'connect hasPhoto', false );
            OUS.refreshInstagramPhotos( response, o );
        },

        instagramShowNotLogin : function( response, o ) { //if user is not logged in then this
            var o = OUS.getDefaults( o ),
                    imagePicker = $.q( o.imagePicker ),
                    instagramPicker = imagePicker.find( o.instagramPicker ),
                    imageGallery = instagramPicker.find( o.instagramImageGallery ),
                    connectBtn = imageGallery.find( o.connectBtn );

            //$( o.titleContentClass ).css("display","block");

            //$( o.imageGalleryInstagram ).show();
            $.openeditorImagePicker.clearGalleryImages( ({'currentFrame' : 'instagram'}) );
            $.openeditorImagePicker.toggleGallery( {'currentFrame' : 'instagram'} );
            imageGallery.toggleClass( 'connect', true );

            connectBtn.off( 'click.connect' ).on( 'click.connect', function() {
                $( this ).popupWindow( {
                    windowURL     : response.authUrl,
                    windowName    : 'instagram_connect',
                    centerBrowser : 1,
                    centerScreen  : 1,
                    height        : 300,
                    left          : 0,
                    location      : 0,
                    menubar       : 0,
                    resizable     : 1,
                    scrollbars    : 1,
                    status        : 0,
                    width         : 450,
                    top           : 0,
                    toolbar       : 0
                } );
            } );
        },

        refreshInstagramPhotos : function( response, o ) {
            var o = OUS.getDefaults( o ),
                    imagePicker = $.q( o.imagePicker ),
                    instagramPicker = imagePicker.find( o.instagramPicker ),
                    imageGallery = instagramPicker.find( o.instagramImageGallery ),
                    uid = $.printqUniqueId( {prefix : 'loading_', sufix : 'refreshInstagramPhotos', length : 6} );

            $.q( o.mask ).prinqLoading( 'start', uid );

            $.openeditorImagePicker.clearGalleryImages( {currentFrame : 'instagram'} );

            if ( o.instagramMethod == 'getUserRecent' ) {
                if ( response.data.length ) {
                    $.each( response.data,
                            (function( ig, o ) {
                                return function( i, v ) {
                                    if ( v.type == 'image' ) {
                                        var _iItem = {
                                            id          : v.id,
                                            thumbImg    : v.images.thumbnail.url,
                                            originalImg : v.images.standard_resolution.url,
                                            width       : v.images.standard_resolution.width,
                                            height      : v.images.standard_resolution.height,
                                            type        : 'instagram',
                                            other_infos : {
                                                type : 'instagram',
                                                id   : v.id
                                            }
                                        }

                                        $.openeditorImagePicker.createImageGalleryPhoto( ig, _iItem, o );
                                    }
                                }
                            })( imageGallery, o )
                    );
                }
            }
            $.openeditorImagePicker.toggleGallery( {'currentFrame' : 'instagram'} );
            $.q( o.mask ).prinqLoading( 'stop', uid );
        },
        //isntagram end

        openLocalImages : function( o ) {

            var o = OUS.getDefaults( o ),
                    imagePicker = $.q( o.imagePicker ),
                    localUploadBtn = imagePicker.find( o.localUploadBtn ),
                    localPicker = imagePicker.find( o.localPicker ),
                    imageGallery = localPicker.find( o.localImageGallery ),
                    connectBtn = imageGallery.find( o.connectUploadBtn );

            $.openeditorImagePicker.openImageGallery( {}, 'myphotos' );
            $( o.topButtonsClass ).removeClass( o.activeElement );
            $( o.localUploadBtn ).addClass( o.activeElement );
            $( o.titleContentClass ).css( "display", "block" );
            connectBtn.show();

        },

        addHook : function( key, fn ) {
            openeditorPluggable.PluginHooks.add( key, fn, OUS );
        },

        addHookOnce : function( key, fn ) {
            openeditorPluggable.PluginHooks.once( key, fn, OUS );
        },

        removeHook : function( key, fn ) {
            openeditorPluggable.PluginHooks.remove( key, fn, OUS );
        },

        runHooks : function( key, p1, p2, p3, p4, p5, p6 ) {
            return openeditorPluggable.PluginHooks.run( OUS, key, p1, p2, p3, p4, p5, p6 );
        },

        connectHooks : function() {
        },

        init : function( options ) {
            var o = OUS.getDefaults(),
                    imagePicker = $.q( o.imagePicker ),
                    facebookBtn = imagePicker.find( o.facebookBtn ),
                    instagramBtn = imagePicker.find( o.instagramBtn ),
                    localUploadBtn = imagePicker.find( o.localUploadBtn );

            OUS.observe( o );
            localUploadBtn.off( 'click' ).on( 'click',
                    (function( o ) {
                        return function() {
                            $.openeditorUploadSection.openLocalImages( o );
                        }
                    })( o )
            );
            instagramBtn.off( 'click' ).on( 'click',
                    (function( o ) {
                        return function() {
                            $.openeditorUploadSection.openInstagram( o );
                        }
                    })( o )
            );
            if ( facebookAppId != '' ) {
                $.ajaxSetup( { cache : true } );
                $.getScript( '//connect.facebook.net/en_UK/all.js',
                        (function( o ) {
                            return function() {
                                var o = OUS.getDefaults( o ),
                                        imagePicker = $.q( o.imagePicker ),
                                        facebookBtn = imagePicker.find( o.facebookBtn );
                                FB.init( {
                                    appId   : facebookAppId,
                                    version : o.version
                                } );
                                facebookBtn.show().click(
                                        (function( o ) {
                                            return function() {
                                                $( o.topButtonsClass ).removeClass( o.activeElement );
                                                $( this ).addClass( o.activeElement );
                                                OUS.openfacebook( o );
                                                FB.getLoginStatus( (function( o ) {
                                                    return function( response ) {
                                                        if ( typeof (response.status) != 'undefined' ) {
                                                            switch ( response.status ) {
                                                                case 'connected':
                                                                    OUS.facebookShowLogin( o );
                                                                    break;
                                                                default: // in this case we have "not_authorized"
                                                                    OUS.facebookShowNotLogin( o );
                                                                    break;
                                                            }
                                                        }
                                                        else {
                                                            OUS.facebookShowNotLogin( o );
                                                        }
                                                    }
                                                })( o ) )
                                            }
                                        })( o )
                                );
                            }
                        })( o )
                );

            }
            facebookBtn.hide();
            var defaultFrame = 'myphotos';
            $.openeditorImagePicker.updateImagePicker();
            $.openeditorImagePicker.openImagePicker({   defaultFrame : defaultFrame,
                connectUploadBtn                                    : o.connectUploadBtn,
                localUploadBtn                                      : o.localUploadBtn,
                activeElement                                       : o.activeElement,
                topButtonsClass                                     : o.topButtonsClass
            },'myphotos');
        }
    } );
})( window.jQuery );
//openEditor CropImage
! (function( $ ) {
    var OCI = $.openeditorCropImage = {};
    $.extend( OCI, {
        defaults    : {
            imageCropContainer   : '#imageCrop',
            triggerId            : '#imageCropHandler',
            cropperContainerId   : '.workingImageArea',
            restoreCropDataClass : '.restoreCrop',
            horizontalFlipClass  : '.horizontalFlip',
            verticalFlipClass    : '.vertivalFlip',
            CropOkClass          : '.save_crop',
            menuCropOptions      : '.menuCropOptions',
            menuCropActions      : '.menuCropActions',
            fancyBoxHelperClass  : 'fancybox-image-crop',
            analysePic           : '.analyse_pic',
            cropperHelper        : '.cropper_helper',
            analyseButtons       : '.analyse_buttons',
            analyseButtonsOff    : '.choser_analyse_off',
            analyseButtonsOn     : '.choser_analyse_on',
            cropperContentClass  : '.cropper_content_crop',
            analyseData          : {},
            cropper              : false
        },
        getDefaults : function( options ) {
            return $.extend( OCI.defaults, options );
        },
        observe     : function( o ) {
            var o = OCI.getDefaults( o );
            $( o.triggerId ).fancybox( {
                openEffect  : 'none',
                closeEffect : 'fade',
                autoSize    : false,
                width       : "auto",
                height      : "auto",
                minWidth    : 500,
                wrapCSS     : o.fancyBoxHelperClass,
                helpers   : {
                    overlay : {closeClick: false} // prevents closing when clicking OUTSIDE fancybox
                },
                beforeShow  : function() {
                    $( '.fancybox-inner' ).addClass( 'fancybox-image-crop-helper' );
                    $.fancybox.showLoading();
                },
                beforeLoad  : (function( o ) {
                    return function() {
                        var imageSettings = canvas.getActiveObject().designerOptions;
                        var img = $( new Image() ).attr( 'src', imageSettings['workingImage'] );
                        img.css( {
                            'max-width'  : '900px',
                            'max-height' : '700px'
                        } )
                        img.imagesLoaded().always( (function( o, img, imageSettings ) {
                            return function() {
                                var flipX = typeof imageSettings['cropData'] !== 'undefined' && imageSettings['cropData']['flipX'] !== 'undefined' && imageSettings['cropData']['flipX'] == - 1 ? - 1 : 1,
                                    flipY = typeof imageSettings['cropData'] !== 'undefined' && imageSettings['cropData']['flipY'] !== 'undefined' && imageSettings['cropData']['flipY'] == - 1 ? - 1 : 1
                                var divulet = document.createElement('div');
                                $( o.cropperContainerId ).html( divulet );
                                $( divulet ).html( img );
                                $(divulet ).css({
                                    width   : $( img ).width(),
                                    height  : $( img ).height(),
                                    'margin': '0 auto'
                                });
                                $(divulet ).addClass( o.cropperContentClass.replace('.',''));
                                o.cropper = new Cropper( img, {
                                    autoCropArea             : 0.50,
                                    movable                  : false,
                                    zoomable                 : false,
                                    rotatable                : true,
                                    scalable                 : true,
                                    data                     : {
                                        scaleX : flipX,
                                        scaleY : flipY
                                    },
                                    minContainerWidth        : $( img ).width(),
                                    minContainerHeight       : $( img ).height(),
                                    ratioWidthOriginalImage  : imageSettings['originalWidth'] / $( img ).width(),
                                    ratioHeightOriginalImage : imageSettings['originalHeight'] / $( img ).height(),
                                    ratioWidthActualImage    : imageSettings['actualWidth'] / $( img ).width(),
                                    ratioHeightActualImage   : imageSettings['actualHeight'] / $( img ).height(),
                                    designerData             : imageSettings,
                                    built                    : function() {
                                        $( o.cropper.cropper ).addClass( o.cropperHelper.replace( '.', '' ) );
                                        if ( imageSettings['cropData'] !== 'undefined' ) {
                                            this.cropper.setCropBoxData( imageSettings['dataCrop'] );
                                        }
                                        $.fancybox.update( function() {
                                            $( '.fancybox-wrap' ).removeClass( o.fancyBoxHelperClass );
                                        } );
                                        $.fancybox.hideLoading();

                                    }
                                } );
                            }
                        })( o, img[0], imageSettings ) );
                    }
                })( o ),
                afterClose  : (function( o ) {
                    return function() {
                        var editArea = $( o.cropperContainerId );
                        o.cropper.destroy();
                        editArea.html( '' );
                        $( o.analyseButtons ).hide();
                        $( o.analysePic ).show();
                        $( o.menuCropOptions ).css('opacity','1');
                        $( o.menuCropActions ).css('opacity','1');
                    }
                })( o )
            } );
            $( o.horizontalFlipClass ).off( 'click' ).on( 'click', (function( o ) {
                return function( e ) {
                    if ( o.cropper ) {
                        var img = $( o.cropperContentClass ).find( '>img' );
                        var data = img[0].cropper.getData();
                        if ( data.scaleX == 1 )
                            img[0].cropper.scaleX( - 1 );
                        else
                            img[0].cropper.scaleX( 1 );
                    }
                }
            })( o ) );
            $( o.verticalFlipClass ).off( 'click' ).on( 'click', (function( o ) {
                return function( e ) {
                    if ( o.cropper ) {
                        var img = $( o.cropperContentClass ).find( '>img' );
                        var data = img[0].cropper.getData();
                        if ( data.scaleY == 1 )
                            img[0].cropper.scaleY( - 1 );
                        else
                            img[0].cropper.scaleY( 1 );
                    }
                }
            })( o ) );
            $( o.restoreCropDataClass ).off( 'click' ).on( 'click', (function( o ) {
                return function( e ) {
                    if ( o.cropper ) {
                        var img = $( o.cropperContentClass ).find( '>img' );
                        var data = img[0].cropper.reset();
                    }
                }
            })( o ) );
            $( o.CropOkClass ).off( 'click' ).on( 'click', (function( o ) {
                return function( e ) {
                    if ( o.cropper ) {
                        var img = $( o.cropperContentClass ).find( ' >img' );
                        var dataCrop = img[0].cropper.getCropBoxData();
                        var flipCrop = img[0].cropper.getImageData();
                        var imageSettings = img[0].cropper.getOptionsData();
                        if(canvas.getActiveObject()){
                            var activeObject = canvas.getActiveObject(),
                            cropperImage={'width' : imageSettings['minContainerWidth'],
                                          'height': imageSettings['minContainerHeight']
                            }
                            xCrop      = (activeObject.width  * dataCrop['left']  / cropperImage['width'])-activeObject.width/2,
                            yCrop      = (activeObject.height * dataCrop['top']   / cropperImage['height'])-activeObject.height/2,
                            widthCrop  = activeObject.width  * dataCrop['width']  / cropperImage['width'],
                            heightCrop = activeObject.height * dataCrop['height'] / cropperImage['height'];
                            var undoRedoData = {
                                objectId : activeObject.objectID,
                                oldStage : {
                                    clipTo           : activeObject.clipTo,
                                    cropObjectData   : activeObject.cropObjectData,
                                    designerOptions  : $.extend(true, {}, activeObject.getDesignerOptions())
                                },
                                type     : 'image',
                                action   : 'crop'
                            };
                            activeObject.setDesignerOptions('cropObjectData',{
                                xCrop       : xCrop,
                                yCrop       : yCrop,
                                widthCrop   : widthCrop,
                                heightCrop  : heightCrop,
                                xMiddlePoint: ((xCrop+widthCrop)  + xCrop ) / 2,
                                yMiddlePoint: ((yCrop+heightCrop) + yCrop ) / 2,
                                flipCropX   : flipCrop['scaleX'],
                                flipCropY   : flipCrop['scaleY']
                            });
                            activeObject.setFlipX(flipCrop['scaleX'] == -1 ? true : false);
                            activeObject.setFlipY(flipCrop['scaleY'] == -1 ? true : false);
                            activeObject.clipTo = (function(obj,o,x,y,width,height){
                                return function(ctx){
                                    if(this.getCropObjectData('xCrop')){
                                        ctx.rect(this.cropObjectData['xCrop'],this.cropObjectData['yCrop'],this.cropObjectData['widthCrop'],this.cropObjectData['heightCrop']);
                                    }else{
                                        ctx.rect(x,y,width,height);
                                    }
                                }
                            })(activeObject,o,xCrop,yCrop,widthCrop,heightCrop);
                            activeObject.designerOptions['dataCrop'] = dataCrop;
                            undoRedoData.newStage = {
                                clipTo            : activeObject.clipTo,
                                cropObjectData    : activeObject.cropObjectData,
                                designerOptions   : activeObject.getDesignerOptions(),
                            };
                            pushUndoData([undoRedoData]);
                            $.fancybox.close();
                            activeObject.setCoords();
                            canvas.renderAll();
                            return false;
                        }
                        /*
                        $.ajax( {
                            type       : "POST",
                            dataType   : "json",
                            data       : {
                                data_crop    : dataCrop,
                                image_src    : imageSettings['designerData']['workingImage'],
                                ratio_width  : img[0].cropper.options.ratioWidthActualImage,
                                ratio_height : img[0].cropper.options.ratioHeightActualImage,
                                exist_wImage : imageSettings['designerData']['exist_wImage'],
                                other_infos  : {
                                    type            : imageSettings['designerData']['type'],
                                    image_location  : imageSettings['designerData']['imageLocation'],
                                    original_width  : imageSettings['designerData']['actualWidth'],
                                    original_height : imageSettings['designerData']['actualHeight'],
                                    image_name      : imageSettings['designerData']['imageName'],
                                    flipCropX       : typeof(flipCrop['scaleX']) !== 'undefined' ? flipCrop['scaleX'] : 0,
                                    flipCropY       : typeof(flipCrop['scaleY']) !== 'undefined' ? flipCrop['scaleY'] : 0
                                }
                            },
                            url        : cropImageUrl,
                            beforeSend : function() {
                                $.fancybox.showLoading();
                            },
                            success    : (function( o ) {
                                return function( response ) {
                                    if ( typeof response.success !== 'undefined' && response.success ) {
                                        if ( typeof response.imageSrc !== 'undefined' ) {
                                            if ( canvas.getActiveObject() ) {
                                                var oldData =canvas.getActiveObject();
                                                var currentSizeData={
                                                    'width' : response.currentWidth,
                                                    'height': response.currentHeight
                                                }
                                                var blockOptions = OCI.resizeImage({
                                                   'width' : canvas.getActiveObject().getWidth(),
                                                   'height': canvas.getActiveObject().getHeight()
                                                },currentSizeData);
                                                canvas.getActiveObject().setSrc( response.imageSrc, (function( o, response, _self, oldData ) {
                                                    return function( response, _that, oldData ) {
                                                        if ( typeof typeof response.cropData !== 'undefined' ) {
                                                            if ( typeof _that.designerOptions !== 'undefined' ) {
                                                                _that.designerOptions['cropData'] = response.cropData;
                                                                setTimeout( function() {
                                                                    canvas.renderAll();
                                                                    pushUndoData( [
                                                                        {
                                                                            'objectId'     : canvas.getActiveObject().objectID,
                                                                            'type'         : 'image',
                                                                            'action'       : 'crop',
                                                                            'oldStage'     : oldData,
                                                                            'newStage'     : canvas.getActiveObject()
                                                                        }
                                                                    ] );

                                                                }, 70 );
                                                            }
                                                        }
                                                        $.fancybox.hideLoading();
                                                        $.fancybox.close();
                                                        canvas.renderAll();
                                                    }( response, _self, oldData )
                                                })( o, response, canvas.getActiveObject(),oldData ),{
                                                    width:blockOptions['width'],
                                                    height:blockOptions['height']
                                                });
                                            }
                                            else {
                                                $.fancybox.hideLoading();
                                            }
                                        }
                                        else {
                                            $.fancybox.hideLoading();
                                            alert( translateStrings.error );
                                        }
                                    }
                                    else {
                                        $.fancybox.hideLoading();
                                    }
                                    canvas.renderAll();
                                }
                            })( o ),
                            error      : (function( o ) {
                                return function() {
                                    $.fancybox.hideLoading();
                                    alert( translateStrings.error );
                                }
                            })( o )
                        } );
                        */
                    }
                }
            })( o ) );
            $( o.analysePic ).off( 'click' ).on( 'click', (function( o ) {
                return function( e ) {
                    if ( typeof SmartCrop === 'function' ) {
                        var img = $( o.cropperContentClass ).find( '>img' ),
                                cropperOptions = img[0].cropper.getImageData();
                        $( this ).text( translateStrings.analysing );
                        $( this ).attr( 'disabled', true );
                        var _self = $( this );
                        setTimeout( (function( o, _self, cropperOptions ) {
                            return function() {
                                SmartCrop.crop( img[0], {debug : true}, function( result ) {
                                    $( _self ).text( translateStrings.analyse );
                                    $( _self ).attr( 'disabled', false );
                                    $( _self ).hide();
                                    $( o.menuCropOptions ).css('opacity','0');
                                    $( o.menuCropActions ).css('opacity', '0');
                                    $( o.analyseButtons ).show();
                                    o.analyseData = result.topCrop;
                                    var debugCanvas = result.debugCanvas;

                                    if ( typeof(cropperOptions['scaleX']) !== 'undefined' && typeof (cropperOptions['scaleY']) !== 'undefined' ) {
                                        $( debugCanvas ).css( {
                                            '-ms-transform'     : 'scale(' + cropperOptions['scaleX'] + ', ' + cropperOptions['scaleY'] + ')',
                                            '-webkit-transform' : 'scale(' + cropperOptions['scaleX'] + ', ' + cropperOptions['scaleY'] + ')',
                                            '-o-transform'      : 'scale(' + cropperOptions['scaleX'] + ', ' + cropperOptions['scaleY'] + ')',
                                            'transform'         : 'scale(' + cropperOptions['scaleX'] + ', ' + cropperOptions['scaleY'] + ')'
                                        } );
                                    }
                                    $( debugCanvas ).css( {
                                        'max-width'  : '900px',
                                        'max-height' : '700px'
                                    } );
                                    $( o.cropperHelper ).hide();
                                    $( o.cropperContentClass ).append( debugCanvas );
                                    $.fancybox.hideLoading();
                                } );
                            }
                        })( o, _self, cropperOptions ), 50 );
                    }
                }
            })( o ) );
            $( o.analyseButtonsOff ).off( 'click' ).on( 'click', (function( o ) {
                return function() {
                    $( o.analyseButtons ).hide();
                    $( o.analysePic ).show();
                    $( o.menuCropOptions ).css('opacity','1');
                    $( o.menuCropActions ).css('opacity','1');
                    $( o.cropperContentClass ).find( '>canvas' ).remove();
                    $( o.cropperHelper ).show();

                }
            })( o ) );
            $( o.analyseButtonsOn ).off( 'click' ).on( 'click', (function( o ) {
                return function() {
                    var img = $( o.cropperContentClass ).find( '>img' );
                    var cropperOptions = img[0].cropper.getOptionsData();
                    var imageData = img[0].cropper.getImageData();

                    var left, top,
                            width = parseFloat( o.analyseData['width'] ) / parseFloat( cropperOptions['ratioWidthActualImage'] ),
                            height = parseFloat( o.analyseData['height'] ) / parseFloat( cropperOptions['ratioHeightActualImage'] );
                    if ( imageData['scaleY'] == - 1 ) {
                        top = (parseFloat( cropperOptions['designerData']['actualHeight'] ) - o.analyseData['height'] - o.analyseData['y']) / parseFloat( cropperOptions['ratioHeightActualImage'] );
                    }
                    else {
                        top = parseFloat( o.analyseData['y'] ) / parseFloat( cropperOptions['ratioHeightActualImage'] );
                    }
                    if ( imageData['scaleX'] == - 1 ) {
                        left = (parseFloat( cropperOptions['designerData']['actualWidth'] ) - o.analyseData['width'] - o.analyseData['x']) / parseFloat( cropperOptions['ratioWidthActualImage'] );
                    }
                    else {
                        left = parseFloat( o.analyseData['x'] ) / parseFloat( cropperOptions['ratioWidthActualImage'] );
                    }

                    img[0].cropper.setCropBoxData( {
                        left   : left,
                        top    : top,
                        width  : width,
                        height : height
                    } );
                    $( o.analyseButtons ).hide();
                    $( o.analysePic ).show();
                    $( o.menuCropOptions ).css('opacity','1');
                    $( o.menuCropActions ).css('opacity','1');
                    $( o.cropperContentClass ).find( '>canvas' ).remove();
                    $( o.cropperHelper ).show();
                }
            })( o ) );
            canvas.on("object:selected",function(e){
                 var obj = e.target;
                if(typeof obj['type'] !=='undefined' && obj['type']=='image'){
                    $( o.imageCropContainer ).show();
                }
                else{
                    $( o.imageCropContainer ).hide();
                }
            });
        },
        resizeImage : function( desiredData, nowData ) {
            var result = {};
            if(desiredData['width']>desiredData['height']){
                var ratioWidth = desiredData['width'] / nowData['width'],
                    ratioHeight = desiredData['height'] / nowData['height'];
                    result['height'] = desiredData['height'];
                    result['width']  = nowData['width'] / nowData['height'] * desiredData['height'];
                    return result;
            }else{
                    result['width']  = desiredData['width'];
                    result['height'] = nowData['height'] / nowData['width'] * desiredData['width'];
                    return result;
            }

        },
        init        : function( options ) {
            var o = OCI.getDefaults();
            OCI.observe( o );
        }
    } )
})( window.jQuery );
//openEditor PanCanvas
!(function($){
    var OPC = $.openeditorPanCanvas = {};
    $.extend(OPC,  {
        deafaults: {
            draggerContainer    : '#dragZoomContainer',
            horizontalContainer : '#horizontalContainer',
            verticalContainer   : '#verticalContainer',
            horizontalScroller  : '.horizontalScroller',
            verticalScroller    : '.verticalScroller',
            templateContainer   : ''
        },
        getDefaults:function(o){
            return $.extend(OPC.defaults,o);
        },
        init:function(options){
            var o = OPC.getDefaults();

        }
    });
})(window.jQuery);

addImageToCache = function( page, image, name ) {
    pageImageCachePreview[page] = {
        image : image,
        name  : name
    };
}
clearImageCache = function() {
    pageImageCachePreview = {};
}
getImageCache = function( page ) {
    if ( typeof(pageImageCachePreview[page]) !== 'undefined' )
        return pageImageCachePreview[page];
    return false;
}
$( document ).ready( function() {
    //openeditor_saveProject edit box
    $( "#btnSaveClick" ).click( function() {
        var cell = document.getElementById( "editCell" );
        if ( _currentOpenPanel == "#effectSave" && _currentEditPanel == 1 ) {
            closeEditCellDirect();
            _currentEditPanel = 0;
            var btn = document.getElementById( "btnSaveClick" );
            btn.style.color = "#5C5C5C";
            btn.style.backgroundColor = "transparent";
            return;
        }
        $( _currentOpenPanel ).hide();
        _currentOpenPanel = "#effectSave";
        _currentEditPanel = 1;
        var options = {};
        $( "#effectSave" ).show();
        setAllButtonsNotActive();
        var btn = document.getElementById( "btnSaveClick" );
        btn.style.color = "white";
        cell.style.height = "100px";
        btn.style.backgroundColor = "#27B7F5";
        cell.style.height = "100px";
    } );
    //openeditor_saveProject Action
    $( "#save_button_design" ).click( function() {
        var project_name = $( "#project_name" ).val();
        var project_description = $( "#project_description" ).val();
        if ( ! project_name.length ) {
            alert( "Please enter a Project Name" );
            return;
        }
        var oldDataLocation = $( '.select_page_number_active' ).attr( 'data-location' );
        deleteOffsetHelpers();
        getCanvasForPreview();
        canvas.viewportTransform = [1, 0, 0, 1, 0, 0];
        canvas.renderAll();
        themePageContent[oldDataLocation].content = JSON.stringify( canvas.toJSON( propertiesToIncludeCanvas ) );
        themePageContent[oldDataLocation].content_type = 'json';
		var _img = canvas.toDataURL({ format:"jpeg",quality:1,multiplier: 0.5});
        var data_send = {"project_name" : project_name, '_token' : $('[name="_token"]').val(), "project_description" : project_description,"project_id":project_id,"img":_img, "content" : JSON.stringify( themePageContent )};
        calculateInitialZoom( canvas.getWidth() );
        $.ajax( {
            url        : baseUrl + "/design/save",
            type       : "POST",
            dataType   : "json",
            data       : data_send,
            beforeSend : function() {},
            success    : function( msg ) {
                if ( msg.error.length ) {
                    $( '#save_message' ).text( msg.error );
                    $( '#save_message' ).show();
                    setTimeout( function() {
                        $( '#save_message' ).hide();
                    }, 3000 );
                }
                if ( msg.succes.length ) {
                    $( '#save_message' ).text( msg.succes );
                    $( '#save_message' ).show();
                    setTimeout( function() {
                        $( '#save_message' ).hide();
                    }, 3000 );
                    //populate the select drop-down
                    var mySelect = $( '#select_theme' );
                    mySelect.append( $( '<option></option>' ).val( msg.id ).html( project_name ) );
                }
            },
            error      : function() {}
        } );
    } );
    //openeditor_animationProject
    $( "#save_button_tab" ).click( function() {
        $( ".load_div_side" ).css( 'display', 'none' );
        $( ".save_div_side" ).slideToggle( "slow" );
    } );
    //openeditor_animationProject
    $( "#load_button_tab" ).click( function() {
        $( ".save_div_side" ).css( 'display', 'none' );
        $( ".load_div_side" ).slideToggle( "slow" );
    } );
    //openeditor_loadProject
    $( "#load_button_design" ).click( function() {
        var selected_theme = $( "#select_theme" ).val();
        var data_send = {"theme_id" : selected_theme};
        $.ajax( {
            url        : baseUrl + "openeditor/design/getTheme",
            type       : "POST",
            dataType   : "json",
            data       : data_send,
            beforeSend : function() {},
            success    : function( msg ) {
                if ( typeof(msg.error) !== 'undefined' ) {
                    $( '#save_message_load' ).text( msg.error );
                    $( '#save_message_load' ).show();
                    setTimeout( function() {
                        $( '#save_message_load' ).hide();
                    }, 3000 );
                }
                else {
                    $( '#save_message_load' ).show();
                    $( '#save_message_load' ).text( "Project loaded successfully!" );
                    setTimeout( function() {
                        $( '#save_message_load' ).hide();
                    }, 2000 );
                    themePageContent = msg.items.items;
                    var button_number = msg.items.totalRecords;
                    $( '#select_page_design .list_page_design' ).empty();
                    $.each( msg.items.items, function( key, obj ) {
                        $( '.list_page_design' ).append( "<li><button class='select_page_number' data-location='" + (obj.page_number - 1) + "'>Page " + obj.page_number + "</button></li>" );

                    } );
                    $( '.select_page_number' ).removeClass( 'select_page_number_active' );
                    $( '.select_page_number:first' ).addClass( 'select_page_number_active' );
                    $( '.current_element .page_num' ).html( "Page 1" );
                    canvas.clear();
                    setCanvasDimensions( msg.items.items[0].width, msg.items.items[0].height );
                    setTextureMode( msg.items.items[0].width, msg.items.items[0].height );
                    selectThemeReply( msg.items.items[0].content, msg.items.items[0].content_type );

                }
            },
            error      : function() {}
        } );
    } );
} );
$( document ).on( 'click', '.select_page_number', function() {
    //openeditor_loadPageDesign
    canvas.remove( gridGroup );
    _isGrid = false;
    deleteOffsetHelpers();
    $( '#btnToggleGrid' ).css( 'color', "#5c5c5c" );
    var oldDataLocation = $( '.select_page_number_active' ).attr( 'data-location' );
    getCanvasForPreview();
    canvas.viewportTransform = [1, 0, 0, 1, 0, 0];
    canvas.renderAll();
    themePageContent[oldDataLocation].content_type = 'json'
    themePageContent[oldDataLocation].content = JSON.stringify( canvas.toJSON( propertiesToIncludeCanvas ) );
    themePageContent[oldDataLocation].content_preview = canvas.toSVG( {viewBox : {
        x      : textureModeLeft,
        y      : canvasOffsetHeight,
        width  : canvas.getWidth() - 2 * textureModeLeft,
        height : canvas.getHeight() - 2 * canvasOffsetHeight
    } } );
    themePageContent[oldDataLocation].visited = true;
    $( '.select_page_number' ).removeClass( 'select_page_number_active' );
    $( this ).addClass( 'select_page_number_active' );
    $( '.list_page_design' ).hide();
    $( '.current_element' ).removeClass( 'active' );
    var dataLocation = $( this ).attr( 'data-location' );
    themePageContent[parseInt( dataLocation )].visited = true;
    $( '.current_element .page_num' ).html( "Page " + (parseInt( dataLocation ) + 1) );
    canvas.clear();
    setCanvasDimensions( themePageContent[dataLocation].width, themePageContent[dataLocation].height );
    setTextureMode( themePageContent[dataLocation].width, themePageContent[dataLocation].height );
    selectThemeReply( themePageContent[dataLocation].content, themePageContent[dataLocation].content_type );

} );
///openeditor_preview_page_image
$( document ).on( 'click', '.select_page_preview', function() {
    var page = $( this ).attr( 'data-location' );
    var id = page_id;
    var file = selection_id + '.pdf';
    var idProduct = product_id;
    $( '.select_page_preview ' ).removeClass( 'select_page_preview_active' );
    $( this ).addClass( 'select_page_preview_active' );
    var cacheImage = getImageCache( page );
    if ( cacheImage ) {
        $( "#image_preview" ).attr( "src", cacheImage.image );
    }
    else {
        $.ajax( {
            url        : baseUrl + "personalize/index/getPage/id/" + id + "/page/" + page + "/idProduct/" + idProduct + '/file/' + file,
            type       : "GET",
            beforeSend : function() {
                $( "#image_preview" ).css( 'display', 'none' );
                jQuery( "#loadingGif" ).css( 'display', "block" );
            },
            success    : function( response ) {
                response = JSON.parse( response );
                addImageToCache( parseInt( page ), response.result.image, response.result.name );
                $( "#image_preview" ).attr( "src", response.result.image );
                $( "#loadingGif" ).css( 'display', "none" );
                $( "#image_preview" ).css( 'display', 'unset' );

            },
            error      : function() {
                alert( 'An error has occured!' );
            }
        } );
    }
} );
$( document ).on( 'click', '.select_option_drop_down_canvas', function() {
    var objID = $( this ).attr( 'data-type' );
    var selected_object = canvas.getObjectByID( objID );
    canvas.setActiveObject( selected_object[0] );
    selectedRightClickObjectPosition = canvas.getObjects().indexOf( canvas.getActiveObject() );
    canvas.bringToFront( canvas.getActiveObject() );
    objects = canvas.getHelpers( true );
    objects.forEach( function( obj, key ) {
        if ( typeof obj.setHelper !== 'undefined' && obj.setHelper == true ) {
            obj.bringToFront();
        }
    } );
    $( '#contextMenuCanvasRightClick' ).remove();
} );
$( document ).on( 'click', '.revision_history_desingn', function() {
    if ( $( this ).hasClass( 'fa-angle-double-right' ) ) {
        $( this ).removeClass( 'fa-angle-double-right' );
        $( this ).addClass( 'fa-angle-double-left' );
    }
    else {
        $( this ).removeClass( 'fa-angle-double-left' );
        $( this ).addClass( 'fa-angle-double-right' );
    }
    $( '.left_side_menu' ).toggleClass( 'active' );
} );
$( document ).on( 'click', '.revision_history_list_item', function() {
    var itemId = $( this ).attr( 'data-id' );
    $( '.revision_history_list_item' ).removeClass( 'active' );
    if ( canvas.getObjectByID( itemId ).pop() ) {
        $( this ).addClass( 'active' );
        canvas.deactivateAll();
        canvas.getObjectByID( itemId ).pop().active = true;
        canvas.renderAll();
    }
} );
$( document ).on( 'click', '#select_page_design .current_element', function() {
    if ( $( this ).hasClass( 'active' ) ) {
        $( '.list_page_design' ).hide();
        $( this ).removeClass( 'active' );
    }
    else {
        $( '.list_page_design' ).show();
        $( this ).addClass( 'active' );
    }
} );
//openeditorPluggableHooks
var openeditorPluggable = function() {};
! (function( window, openeditorPluggable, $ ) {

    openeditorPluggable.PluginHookClass = (function() {

        var Hooks = function() {
            return {
                // Hooks
                afterOpenToolbar : [],
            };
        };

        function PluginHookClass () {
            this.hooks = Hooks();
            this.globalBucket = {};
        }

        PluginHookClass.prototype.getBucket = function( instance ) {
            if ( instance ) {
                if ( ! instance.pluginHookBucket ) {
                    instance.pluginHookBucket = {};
                }
                return instance.pluginHookBucket;
            }
            return this.globalBucket;
        };

        PluginHookClass.prototype.add = function( key, fn, instance ) {
            //if fn is array, run this for all the array items
            if ( Array.isArray( fn ) ) {
                for ( var i = 0, len = fn.length; i < len; i ++ ) {
                    this.add( key, fn[i] );
                }
            }
            else {
                var bucket = this.getBucket( instance );

                if ( typeof bucket[key] === "undefined" ) {
                    bucket[key] = [];
                }

                fn.skip = false;

                if ( bucket[key].indexOf( fn ) == - 1 ) {
                    bucket[key].push( fn ); //only add a hook if it has not already been added (adding the same hook twice is now silently ignored)
                }
            }
            return this;
        };

        PluginHookClass.prototype.once = function( key, fn, instance ) {
            if ( Array.isArray( fn ) ) {
                for ( var i = 0, len = fn.length; i < len; i ++ ) {
                    fn[i].runOnce = true;
                    this.add( key, fn[i], instance );
                }
            }
            else {
                fn.runOnce = true;
                this.add( key, fn, instance );
            }
        };

        PluginHookClass.prototype.remove = function( key, fn, instance ) {
            var status = false;

            var bucket = this.getBucket( instance );

            if ( typeof bucket[key] !== 'undefined' ) {
                for ( var i = 0, leni = bucket[key].length; i < leni; i ++ ) {
                    if ( bucket[key][i] == fn ) {
                        bucket[key][i].skip = true;
                        status = true;
                        break;
                    }
                }
            }
            return status;
        };

        PluginHookClass.prototype.destroy = function( instance ) {
            var bucket = this.getBucket( instance );
            for ( var key in bucket ) {
                if ( bucket.hasOwnProperty( key ) ) {
                    for ( var i = 0, leni = bucket[key].length; i < leni; i ++ ) {
                        this.remove( key, bucket[key], instance );
                    }
                }
            }
        };

        PluginHookClass.prototype.run = function( instance, key, p1, p2, p3, p4, p5, p6 ) {
            p1 = this._runBucket( this.globalBucket, instance, key, p1, p2, p3, p4, p5, p6 );
            p1 = this._runBucket( this.getBucket( instance ), instance, key, p1, p2, p3, p4, p5, p6 );

            return p1;
        };

        PluginHookClass.prototype._runBucket = function( bucket, instance, key, p1, p2, p3, p4, p5, p6 ) {
            var handlers = bucket[key],
                    res, i, len;

            // performance considerations - http://jsperf.com/call-vs-apply-for-a-plugin-architecture
            if ( handlers ) {
                for ( i = 0, len = handlers.length; i < len; i ++ ) {
                    if ( ! handlers[i].skip ) {
                        res = handlers[i].call( instance, p1, p2, p3, p4, p5, p6 );

                        if ( res !== void 0 ) {
                            p1 = res;
                        }

                        if ( handlers[i].runOnce ) {
                            this.remove( key, handlers[i], bucket === this.globalBucket ? null : instance );
                        }
                    }
                }
            }

            return p1;
        };

        PluginHookClass.prototype.register = function( key ) {
            if ( ! this.isRegistered( key ) ) {
                this.hooks[key] = [];
            }
        };

        PluginHookClass.prototype.deregister = function( key ) {
            delete this.hooks[key];
        };

        PluginHookClass.prototype.isRegistered = function( key ) {
            return (typeof this.hooks[key] !== "undefined");
        };

        PluginHookClass.prototype.getRegistered = function() {
            return Object.keys( this.hooks );
        };

        return PluginHookClass;

    })();
    openeditorPluggable.PluginHooks = new openeditorPluggable.PluginHookClass();

})( window, openeditorPluggable, window.jQuery );



