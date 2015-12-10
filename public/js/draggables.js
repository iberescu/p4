$( function() {
    // Text
    for ( i = 0; i < textList.length; i ++ ) {

        $( "#draggableText" + i ).draggable( {
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
    $( '#curvedTextEdit' ).draggable( {
                containment    : 'body',
                appendTo       : 'body',
                revertDuration : 500,
                distance       : 40
            }
    );
} );


	