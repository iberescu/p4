function runEffectEditShow () {
    if ( _currentEditPanel == 0 ) {
        _currentEditPanel = 2;
    }
    else if ( _currentEditPanel == 1 ) {
        _currentEditPanel = 3;
    }

    $( _currentOpenPanel ).hide();

    setupEditCell();

    var options = {};
    $( "#effectMainMenu" ).hide();
    $( "#effectBackgrounds" ).hide();
    $( "#effectText" ).hide();
    $( "#effectTexture" ).hide();
    $( "#effectShape" ).hide();
    $( "#effectObjects" ).hide();
    $( "#effectPeople" ).hide();
    $( "#effectCharts" ).hide();
    $( "#effectUploader" ).hide();
    $( "#effectSave" ).hide();
    $( "#effectEdit" ).show();
};

function runEffectMainMenuShow () {
    $( _currentOpenPanel ).hide();
    _currentOpenPanel = "#effectMainMenu";
    //_currentEditPanel = 1;
    var options = {};

    $( "#effectMainMenu" ).show();
};

function runEffectBackgroundsShow () {

    var cell = document.getElementById( "editCell" );
    if ( _currentOpenPanel == "#effectBackgrounds" && _currentEditPanel == 1 ) {
        _currentEditPanel = 0;
        closeEditCellDirect();

        var btn = document.getElementById( "btnBackgroundsClick" );
        btn.style.backgroundColor = "transparent";
        btn.style.color = "#5C5C5C";
        return;
    }

    $( _currentOpenPanel ).hide();
    _currentOpenPanel = "#effectBackgrounds";
    _currentEditPanel = 1;

    var options = {};
    $( "#effectBackgrounds" ).show();
    //$( "#effectBackgrounds" ).show( "slide", options, 500, callback);

    setAllButtonsNotActive();
    var btn = document.getElementById( "btnBackgroundsClick" );
    btn.style.color = "white";
    btn.style.backgroundColor = "#27B7F5";

    //cell.style.backgroundImage = "url("+jsUrl+"svgedit/easel/images/cell_category_larger.png)";
    cell.style.height = "140px";
    [10, 100, 200, 500, 1000, 2000, 3000].forEach( function( time ) {
        setTimeout( function() {
            var newWidth = $( '#animateBackgrounds' ).width();
            scrollPageThemesPages = (Math.floor( newWidth / 742 ) + 1);
        }, time );
    } );
};

function runEffectTextShow () {
    var cell = document.getElementById( "editCell" );
    if ( _currentOpenPanel == "#effectText" && _currentEditPanel == 1 ) {
        _currentEditPanel = 0;
        closeEditCellDirect();

        var btn = document.getElementById( "btnTextClick" );
        btn.style.color = "#5C5C5C";
        btn.style.backgroundColor = "transparent";
        return;
    }

    $( _currentOpenPanel ).hide();
    _currentOpenPanel = "#effectText";
    _currentEditPanel = 1;
    var options = {};
    $( "#effectText" ).show();

    setAllButtonsNotActive();
    var btn = document.getElementById( "btnTextClick" );
    btn.style.color = "white";
    btn.style.backgroundColor = "#27B7F5";
    cell.style.height = "55px";
};

function runEffectTextureShow () {
    var cell = document.getElementById( "editCell" );

    if ( _currentOpenPanel == "#effectTexture" && _currentEditPanel == 1 ) {
        _currentEditPanel = 0;
        closeEditCellDirect();
        var btn = document.getElementById( "btnTextureClick" );
        btn.style.color = "#5C5C5C";
        btn.style.backgroundColor = "transparent";
        return;
    }
    $( _currentOpenPanel ).hide();
    _currentOpenPanel = "#effectTexture";
    _currentEditPanel = 1;

    var options = {};
    $( "#effectTexture" ).show();

    setAllButtonsNotActive();
    var btn = document.getElementById( "btnTextureClick" );
    btn.style.color = "white";
    btn.style.backgroundColor = "#27B7F5";
    cell.style.height = "55px";


};

function runEffectShapeShow () {
    var cell = document.getElementById( "editCell" );
    if ( _currentOpenPanel == "#effectShape" && _currentEditPanel == 1 ) {
        _currentEditPanel = 0;
        closeEditCellDirect();

        var btn = document.getElementById( "btnShapeClick" );
        btn.style.color = "#5C5C5C";
        btn.style.backgroundColor = "transparent";
        return;
    }

    $( _currentOpenPanel ).hide();
    _currentOpenPanel = "#effectShape";
    _currentEditPanel = 1;

    var options = {};
    $( "#effectShape" ).show();

    setAllButtonsNotActive();
    var btn = document.getElementById( "btnShapeClick" );
    cell.style.height = "55px";
    btn.style.color = "white";
    btn.style.backgroundColor = "#27B7F5";

};

function runEffectCustomUpload () {
    var cell = document.getElementById( "editCell" );
    if ( _currentOpenPanel == "#effectUploader" && _currentEditPanel == 1 ) {
        closeEditCellDirect();
        _currentEditPanel = 0;

        var btn = document.getElementById( "btnCustomClick" );
        btn.style.color = "#5C5C5C";
        btn.style.backgroundColor = "transparent";
        return;
    }

    $( _currentOpenPanel ).hide();
    _currentOpenPanel = "#effectUploader";
    _currentEditPanel = 1;
    var options = {};
    $( "#effectUploader" ).show();

    setAllButtonsNotActive();
    var btn = document.getElementById( "btnCustomClick" );
    btn.style.color = "white";
    cell.style.height = "100px";
    btn.style.backgroundColor = "#27B7F5";
    cell.style.height = "100px";
};

function setButtonActive () {
    if ( _currentOpenPanel == "#effectBackgrounds" ) {
        var btn = document.getElementById( "btnBackgroundsClick" );
        btn.style.color = "#ffffff";
        btn.style.backgroundColor = '#27B7F5';
    }
    else if ( _currentOpenPanel == "#effectObjects" ) {
        var btn = document.getElementById( "btnObjectsClick" );
        btn.style.color = "#ffffff";
        btn.style.backgroundColor = '#27B7F5';
    }
    else if ( _currentOpenPanel == "#effectText" ) {
        var btn = document.getElementById( "btnTextClick" );
        btn.style.color = "#ffffff";
        btn.style.backgroundColor = '#27B7F5';

    }
    else if ( _currentOpenPanel == "#effectShape" ) {
        var btn = document.getElementById( "btnShapeClick" );
        btn.style.color = "#ffffff";
        btn.style.backgroundColor = '#27B7F5';
    }
    else if ( _currentOpenPanel == "#effectCharts" ) {
        var btn = document.getElementById( "btnChartsClick" );
        btn.style.color = "#ffffff";
        btn.style.backgroundColor = '#27B7F5';
    }
    else if ( _currentOpenPanel == "#effectUploader" ) {

        var btn = document.getElementById( "btnCustomClick" );
        btn.style.color = "#ffffff";
        btn.style.backgroundColor = '#27B7F5';
        var cell = document.getElementById( "editCell" );
        cell.style.height = '100px';

    }

}

function setAllButtonsNotActive () {
    if ( $( '.ui-cs-supercontainer' ).has( event.target ).length > 0 || event.target.className == 'ui-cs-supercontainer' || event.target.id == 'curvedTextEdit' || event.target.id == 'curvedTextInput' || event.target.id == 'applyCurvedText' )
        return;
    if ( canvas && canvas.getActiveGroup() ) {
        closeEditCell();
    }

    if ( canvas && canvas.getActiveObject() ) {
        closeEditCell();
    }

    var cell = document.getElementById( "editCell" );


    if ( cell.style.opacity == "0" ) {
        if ( ! lockFade ) {
            lockFade = true;
            fade( "editCell", - 2 );
        }
    }

    var btnThemes = document.getElementById( "btnBackgroundsClick" );
    if ( btnThemes ) {
        btnThemes.style.color = "#5C5C5C";
        btnThemes.style.backgroundColor = "transparent";
    }

    var btnObjects = document.getElementById( "btnObjectsClick" );
    if ( btnObjects ) {
        btnObjects.style.color = "#5C5C5C";
        btnObjects.style.backgroundColor = "transparent";
    }

    var btnTexture = document.getElementById( "btnTextureClick" );
    if ( btnTexture ) {
        btnTexture.style.color = "#5C5C5C";
        btnTexture.style.backgroundColor = "transparent";
    }

    var btnShapes = document.getElementById( "btnShapeClick" );
    if ( btnShapes ) {
        btnShapes.style.color = "#5C5C5C";
        btnShapes.style.backgroundColor = "transparent";
    }

    var btnText = document.getElementById( "btnTextClick" );
    if ( btnText ) {
        btnText.style.color = "#5C5C5C";
        btnText.style.backgroundColor = "transparent";
    }

    var btnCharts = document.getElementById( "btnChartsClick" );
    if ( btnCharts ) {
        btnCharts.style.color = "#5C5C5C";
        btnCharts.style.backgroundColor = "transparent";
    }

    var btnUpload = document.getElementById( "btnCustomClick" );
    if ( btnUpload ) {
        btnUpload.style.color = "#5C5C5C";
        btnUpload.style.backgroundColor = "transparent";
    }
    var btnSave = document.getElementById( "btnSaveClick" );
    if ( btnSave ) {
        btnSave.style.color = "#5C5C5C";
        btnSave.style.backgroundColor = "transparent";
    }
    $( '#currentColorEditId' ).chromoselector( 'hide', 1 );
    $( '#colorPickerContent' ).hide();
    isColorPickerOpen = false;
}

function closeEditCellDirect () {
    if ( _isFreeDrawing ) return;
    var cell = document.getElementById( "editCell" );

    if ( cell.style.opacity != "0" ) {
        if ( ! lockFade ) {
            lockFade = true;
            fade( "editCell", 2 );
        }
    }
    $( '#currentColorEditId' ).chromoselector( 'hide', 1 );
    $( '#colorPickerContent' ).hide();
    isColorPickerOpen = false;
}

function setupEditCell () {
    var cell = document.getElementById( "editCell" );
    if ( cell ) {
        cell.style.height = "55px";
        cell.style.backgroundRepeat = "repeat-x";
    }

}

function closeEditCell () {
    if(typeof event === 'undefined') return;
    if ( $( '.ui-cs-supercontainer' ).has( event.target ).length > 0 || event.target.className == 'ui-cs-supercontainer' || event.target.id == 'curvedTextEdit' || event.target.id == 'curvedTextInput' || event.target.id == 'applyCurvedText' )
        return;
    if ( _isFreeDrawing ) return;
    $( "#effectEdit" ).hide();
    var cell = document.getElementById( "editCell" );

    if ( _currentEditPanel != 3 && _currentEditPanel != 1 ) {

        setTimeout( "closeEditCellTimeout()", 300 );

    }
    else {

        if ( _currentOpenPanel == "#effectBackgrounds" || _currentOpenPanel == "#effectUploader" ) {
            //cell.style.backgroundImage = "url("+jsUrl+"svgedit/easel/images/cell_category_larger.png)";
            cell.style.height = "140px";
        }
        else {
            if ( _currentOpenPanel == "#effectSave" )
                cell.style.height = "100px";
            else
                cell.style.height = "55px";
        }
    }
    if ( cell.style.opacity == "0" ) {
        if ( ! lockFade ) {

            lockFade = true;
            fade( "editCell", - 2 );
        }
    }

    $( _currentOpenPanel ).show();

}

function closeEditCellTimeout () {
    var cell = document.getElementById( "editCell" );
    if ( cell ) {
        cell.style.height = "55px";
    }
}

function clickTwicePrecaustion () {
    lockFade = false;
}

var TimeToFade = 50.0;

function fade ( eid, fadeIn ) {
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
            $( '.edit_delete_group' ).show();
            $( '.designer_tab' ).show();
        }, 500 );
    }
    var element = document.getElementById( eid );
    if ( element == null ) {
        lockFade = false;
        return;
    }

    element.FadeState = fadeIn;

    if ( element.FadeState == null ) {
        if ( element.style.opacity == null
                     || element.style.opacity == ''
                || element.style.opacity == '1' ) {
            element.FadeState = 2;
        }
        else {
            element.FadeState = - 2;
        }
    }

    if ( element.FadeState == 1 || element.FadeState == - 1 ) {
        element.FadeState = element.FadeState == 1 ? - 1 : 1;
        element.FadeTimeLeft = TimeToFade - element.FadeTimeLeft;
    }
    else {
        if ( element.FadeState == 2 ) {
            //element.style.display = "none";
        }
        else {
            element.style.display = "block";
        }

        element.FadeState = element.FadeState == 2 ? - 1 : 1;
        element.FadeTimeLeft = TimeToFade;
        setTimeout( "animateFade(" + new Date().getTime() + ",'" + eid + "')", 33 );
    }
}

function animateFade ( lastTick, eid ) {
    var curTick = new Date().getTime();
    var elapsedTicks = curTick - lastTick;

    var element = document.getElementById( eid );

    if ( element.FadeTimeLeft <= elapsedTicks ) {
        element.style.opacity = element.FadeState == 1 ? '1' : '0';
        element.style.filter = 'alpha(opacity = '
                                       + (element.FadeState == 1 ? '100' : '0') + ')';
        element.FadeState = element.FadeState == 1 ? 2 : - 2;

        if ( element.FadeState == 2 ) {
            element.style.display = "block";
        }
        else {
            element.style.display = "none";
            $( _currentOpenPanel ).hide();
        }
        lockFade = false;
        return;
    }

    element.FadeTimeLeft -= elapsedTicks;
    var newOpVal = element.FadeTimeLeft / TimeToFade;
    if ( element.FadeState == 1 )
        newOpVal = 1 - newOpVal;


    element.style.opacity = newOpVal;
    element.style.filter = 'alpha(opacity = ' + (newOpVal * 100) + ')';

    setTimeout( "animateFade(" + curTick + ",'" + eid + "')", 33 );
}

$( function() {
    //*************************
    // HIDE ALL INITIAL WIN

    _currentOpenPanel = "#effectMainMenu";

    var cell = document.getElementById( "editCell" );
    if ( cell ) {
        cell.style.opacity = 0.0;
        cell.style.display = "none";

    }

    $( "#effectMainMenu" ).hide();
    $( "#effectBackgrounds" ).hide();
    $( "#effectEdit" ).hide();
    $( "#effectText" ).hide();
    $( "#effectTexture" ).hide();
    $( "#effectShape" ).hide();
    $( "#effectObjects" ).hide();
    $( "#effectPeople" ).hide();
    $( "#effectCharts" ).hide();
    $( "#effectUploader" ).hide();
    $( "#effectSave" ).hide();

} );