// JavaScript Document
$(document).keydown(function (evt) {
    if ($('#hyperlinkInput').is(':focus')) return;
    if ($('.handsontableInput').is(':focus')) return;
    if ($('#textFieldInput').is(':focus')) return;
    if ($('#fontSizeInput').is(':focus')) return;
    var object = canvas.getActiveObject() || canvas.getActiveGroup();

    if ([37, 38, 39, 40].indexOf(evt.keyCode) >= 0) {
        if (canvas.getActiveObject()) {
            pushUndoData([
                {
                    objectId: object.objectID,
                    oldStage: {
                        top: object.top,
                        left: object.left
                    },
                    newStage: {
                        top: object.get('top') + (evt.keyCode == 38 ? -1 : 0) + (evt.keyCode == 40 ? 1 : 0),
                        left: object.get('left') + (evt.keyCode == 37 ? -1 : 0) + (evt.keyCode == 39 ? 1 : 0)
                    }
                }
            ]);
        }
        if (canvas.getActiveGroup()){
            var undoData = [];
            object.getObjects().forEach(function (obj, index) {
                undoData.push({
                    objectId: obj.objectID,
                    oldStage: {
                        top: obj.top + object.top,
                        left: obj.left + object.left
                    },
                    newStage: {
                        top: obj.top + object.top + (evt.keyCode == 38 ? -1 : 0) + (evt.keyCode == 40 ? 1 : 0),
                        left: obj.left + object.left + (evt.keyCode == 37 ? -1 : 0) + (evt.keyCode == 39 ? 1 : 0)
                    }
                });
                if (index == canvas.getActiveGroup().getObjects().length - 1) {
                    pushUndoData(undoData);
                }
            })
        }
    }

    switch (evt.keyCode) {
        case 8:
            animateDelete();
            break;
        case 38:  /* Up arrow was pressed */
            if (object) {
                evt.preventDefault();
                object.set('top', object.get('top') - 1);
                canvas.renderAll();
            }
            break;
        case 40:  /* Down arrow was pressed */
            if (object) {
                evt.preventDefault();
                pushUndoData([
                    {
                        objectId: object.objectID,
                        oldStage: {
                            top: object.top
                        },
                        newStage: {
                            top: object.get('top') + 1
                        }
                    }
                ]);
                object.set('top', object.get('top') + 1);
                canvas.renderAll();
            }
            break;
        case 37:  /* Left arrow was pressed */
            if (object) {
                evt.preventDefault();
                pushUndoData([
                    {
                        objectId: object.objectID,
                        oldStage: {
                            left: object.left
                        },
                        newStage: {
                            left: object.get('left') - 1
                        }
                    }
                ]);
                object.set('left', object.get('left') - 1);
                canvas.renderAll();
            }

            break;
        case 39:  /* Right arrow was pressed */
            if (object) {
                evt.preventDefault();
                pushUndoData([
                    {
                        objectId: object.objectID,
                        oldStage: {
                            left: object.left
                        },
                        newStage: {
                            left: object.get('left') + 1
                        }
                    }
                ]);
                object.set('left', object.get('left') + 1);
                canvas.renderAll();
            }
            break;
        case 46: /* Delete button was pressed */
            deleteCanvasObject();
            break;
        case 90:
            if (evt.ctrlKey || evt.metaKey) {
                undo();
            }
            break;
        case 16:
            shiftKeyPressed=true;
            break;    
    }
});

$(document).keyup(function (evt) {
    if(evt.keyCode==16)
        shiftKeyPressed=false;
});

$( document ).mousedown( function( evt ) {
    event = evt;

    if ( isFrontEndUser ) {
        if ( ! jQuery.contains( $( '.left_side_menu' )[0], event.target ) && $( '.left_side_menu' ).hasClass( 'active' ) ) {
            $( '.revision_history_desingn' ).removeClass( 'fa-angle-double-left' );
            $( '.revision_history_desingn' ).addClass( 'fa-angle-double-right' );
            $( '.left_side_menu' ).removeClass( 'active' );
        }
    }
    var container = $('#select_page_design');
    if (!container.is(evt.target)
        && container.has(evt.target).length === 0)
    {
        $('.list_page_design').hide();
        $('.current_element' ).removeClass('active');
    }
});