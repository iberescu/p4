$( function() {
    var isSafari = false;

    if ( typeof(WhichBrowser) != 'undefined' ) {
        var browserDetect = new WhichBrowser();
        isSafari = browserDetect.isBrowser( 'Safari' );
    }
    if ( isSafari )
        $( '.files-upload-input' ).removeAttr( 'multiple' );
    $( '.bottom-thumbnails' ).printqImageBar();
    $.printqDroppable.init();
} );
//$.prinqLoading
! (function( $ ) {
    var PL = $.prinqLoading = {};
    $.extend( PL, {
        defaults : {
            mask          : null,
            dataNs        : 'queue',
            cancelLoading : false
        },
        _O       : function( o ) {
            var defaults = $.extend( true, {}, PL.defaults );
            return $.extend( true, defaults, o );
        },
        attr     : function( attr, value ) {
            if ( typeof attr === 'string' ) {
                if ( typeof (value) != 'undefined' ) {
                    PL.defaults[attr] = value;
                }
                return PL.defaults[attr];
            }
            if ( typeof attr === 'object' ) {
                $.each( attr, function( field, val ) {
                    PL.defaults[field] = val;
                } )
            }
        },

        start   : function( ns, o ) {
            if ( o.cancelLoading )
                return;
            if ( typeof (ns) == 'undefined' )
                ns = 'default';
            var o = PL._O( o ),
                    mask = $.q( o.mask ),
                    queueData = mask.data( o.dataNs ),
                    status = true;
            if ( typeof(queueData) == 'undefined' )
                queueData = {};
            queueData[ns] = status;

            mask.data( o.dataNs, queueData );
            PL.check( o );
            return mask.data( o.dataNs );
        },
        stop    : function( ns, o ) {
            if ( o.cancelLoading )
                return;
            if ( typeof (ns) == 'undefined' )
                ns = 'default';
            var o = PL._O( o ),
                    mask = $.q( o.mask ),
                    queueData = mask.data( o.dataNs ),
                    status = false;
            if ( typeof(queueData) == 'undefined' )
                queueData = {};
            queueData[ns] = status;

            delete queueData[ns];

            mask.data( o.dataNs, queueData );
            PL.check( o );
            return mask.data( o.dataNs );
        },
        stopAll : function( o ) {
            var o = PL._O( o ),
                    mask = $.q( o.mask ),
                    queueData = {};

            mask.data( o.dataNs, queueData );
            PL.check( o );
            return mask.data( o.dataNs );
        },
        check   : function( o ) {
            this.hide = true;
            var o = PL._O( o ),
                    mask = $.q( o.mask ),
                    queueData = mask.data( o.dataNs ),
                    check = this;

            if ( typeof(queueData) != 'undefined' ) {
                $.each( queueData, function( ns, status ) {
                    if ( status )
                        check.hide = false;
                } );
            }

            if ( this.hide )
                PL._hide( o );
            else
                PL._show( o );
        },
        _show   : function( o ) {
            var o = PL._O( o ),
                    mask = $.q( o.mask );
            if ( mask.length )
                mask.show();
        },
        _hide   : function( o ) {
            var o = PL._O( o ),
                    mask = $.q( o.mask );
            if ( mask.length )
                mask.hide();
        }
    } );

    $.fn.prinqLoading = function( a1, a2, o ) {
        var o = PL._O( o );
        o.mask = this;
        if ( typeof a1 === 'string' ) {
            this.each( function() {
                if ( ! $.isFunction( PL[a1] ) || a1.charAt( 0 ) === '_' ) {
                    return $.error(
                            'No such method "' + a1 + '"'
                    );
                }
                var result = PL[a1]( a2, o );
                return result;
            } );
        }
        else {
            return this.each( function() {
                PL.start( a1, o );
            } );
        }
    };
})( window.jQuery );
//$.printqFitBgImage
! (function( $ ) {
    var isSafari = false;
    var FBI = $.printqFitBgImage = function() {
    }

    $.extend( FBI, {
        defaults        : {
            elem             : null,
            image_src        : null,
            image_name       : null,
            preloadBgImage   : '#preloadBgImage',
            /*			image_width: '100%',
             image_height: '100%',*/
            onImageLoaded    : function( img ) {
            },
            actionType       : 'preload',
            noImageContainer : false, //if to put the image into a div or not
            autocenter       : true,
            uid              : null,
            mask             : '#loading-mask',
            cancelLoading    : false
        },
        _O              : function( o ) {
            return $.extend( {}, FBI.defaults, o );
        },
        preloadBgImage  : function( o ) {
            var o = FBI._O( o ),
                    uid = $.printqUniqueId( {prefix : 'loading_', sufix : 'preloadBgImage', length : 6} ),
                    img = $( "<img/>" )
                            .attr( {
                                "src" : o.image_src + ((isSafari && FBI.isLink( o.image_src )) ? ('?t=' + $.printqUniqueId( {length : 10} )) : '')
                            } );

            $.q( o.mask ).prinqLoading( 'start', uid, {'cancelLoading' : o.cancelLoading} );

            img.imagesLoaded().always(
                    (function( o, uid ) {
                        return function( param ) {
                            o.onImageLoaded( param.images[0].img );
                            $.q( o.mask ).prinqLoading( 'stop', uid, {'cancelLoading' : o.cancelLoading} );
                        }
                    })( o, uid )
            );
        },
        isLink          : function( str ) {
            var link = str.substr( 0, 10 ),
                    secure = link.indexOf( 'https://' ),
                    plain = link.indexOf( 'http://' );
            if ( secure >= 0 || plain >= 0 )
                return true;
            return false;
        },
        fitBgImageToDiv : function( o ) {
            var o = FBI._O( o ),
                    uid = $.printqUniqueId( {prefix : 'loading_', sufix : 'fitBgImageToDiv', length : 6} ),
                    originalOnImageLoaded = o.onImageLoaded;

            $.q( o.mask ).prinqLoading( 'start', uid, {'cancelLoading' : o.cancelLoading} );

            o.onImageLoaded = (function( originalOnImageLoaded, o, uid ) {
                return function( img ) {
                    var elem = o.elem;
                    elem.css( 'background-image', 'url("' + o.image_src + '")' );
                    if ( o.autocenter ) {
                        //elem.css('background-position', 'center center');
                        //if resize after width then we must see whet will be the height
                        var newWidthProcent = parseInt( elem.width() / img.width * 100 ); // we try to fit image with it's width
                        var newHeightProcent = parseInt( elem.height() / img.height * 100 ); // we try to fit image with it's height
                        var newHeight = parseInt( img.height * newWidthProcent / 100 );
                        var newWidth = parseInt( img.width * newHeightProcent / 100 );
                        if ( newHeight < elem.height() ) { //if new image's height is smaller than block's height then fit with height( we have horizintal scroll)
                            elem.css( 'background-size', 'auto ' + elem.height() + 'px' );
                            elem.css( 'background-position', '-' + parseInt( (newWidth - elem.width()) / 2 + 0.5 ) + 'px' + ' 0' );
                            elem.data( 'resizeWidth', true );
                        }
                        else {
                            elem.css( 'background-size', elem.width() + 'px ' + 'auto' );
                            elem.css( 'background-position', '0 ' + '-' + parseInt( (newHeight - elem.height()) / 2 + 0.5 ) + 'px' );
                        }
                    }
                    else {
                        if ( img.width < img.height ) {
                            elem.css( 'background-size', 'auto ' + elem.height() + 'px' );
                        }
                        else {
                            elem.css( 'background-size', elem.width() + 'px ' + 'auto' );
                        }

                        elem.css( 'background-position', 'center center' );
                    }
                    originalOnImageLoaded( img, o );
                    $.q( o.mask ).prinqLoading( 'stop', uid, {'cancelLoading' : o.cancelLoading} );
                }
            })( originalOnImageLoaded, o, uid );

            FBI.preloadBgImage( o );
        },
        fitImageToDiv   : function( o ) {
            var o = FBI._O( o ),
                    uid = $.printqUniqueId( {prefix : 'loading_', sufix : 'fitImageToDiv', length : 6} ),
                    originalOnImageLoaded = o.onImageLoaded;
            $.q( o.mask ).prinqLoading( 'start', uid, {'cancelLoading' : o.cancelLoading} );
            o.onImageLoaded = (function( originalOnImageLoaded, o, uid ) {
                return function( img ) {
                    elem = o.elem;
                    noImageContainer = false;
                    var img = $( img );

                    if ( typeof (o.noImageContainer) != 'undefined' && o.noImageContainer )
                        noImageContainer = true;

                    if ( noImageContainer )
                        var imgContainer = elem.append( img );
                    else {
                        var imgContainer = $( '<div />' ).append( img );
                        elem.prepend( imgContainer );
                    }
                    if ( o.autocenter ) {
                        var newWidthProcent = parseInt( elem.width() / img[0].width * 100 ); // we try to fit image with it's width
                        var newHeightProcent = parseInt( elem.height() / img[0].height * 100 ); // we try to fit image with it's height
                        var newHeight = parseInt( img[0].height * newWidthProcent / 100 );
                        var newWidth = parseInt( img[0].width * newHeightProcent / 100 );

                        if ( newHeight < elem.height() ) { //if new image's height is smaller than block's height then fit with height( we have horizintal scroll)
                            img.css( {
                                width    : 'auto',
                                height   : elem.height() + 'px',
                                left     : '-' + parseInt( (newWidth - elem.width()) / 2 + 0.5 ) + 'px',
                                top      : 0,
                                position : 'relative'
                            } );
                            elem.data( 'resizeWidth', true );
                        }
                        else {
                            img.css( {
                                width    : elem.width() + 'px',
                                height   : 'auto',
                                left     : 0,
                                top      : '-' + parseInt( (newHeight - elem.height()) / 2 + 0.5 ) + 'px',
                                position : 'relative'
                            } );

                        }
                    }
                    else {
                        img.css( {
                            'max-width'  : '90px',
                            'max-height' : '68px',
                            margin       : '0 auto'
                        } );

                        var newWidthProcent = parseInt( elem.width() / img[0].width * 100 ); // we try to fit image with it's width
                        var newHeightProcent = parseInt( elem.height() / img[0].height * 100 ); // we try to fit image with it's height
                        var newHeight = parseInt( img[0].height * newWidthProcent / 100 );
                        var newWidth = parseInt( img[0].width * newHeightProcent / 100 );

                        if ( newWidth <= elem.width() && newHeight >= elem.height() ) { //if new image's height is smaller than block's height then fit with height( we have horizintal scroll)
                            img.css( {
                                'vertical-align' : 'middle'
                            } );
                        }
                        else {
                            img.css( {
                                'vertical-align' : 'middle'
                            } );
                            img.parent().addClass( 'fit' );
                        }
                    }
                    originalOnImageLoaded( img );
                    $.q( o.mask ).prinqLoading( 'stop', uid, {'cancelLoading' : o.cancelLoading} );
                }
            })( originalOnImageLoaded, o, uid );

            FBI.preloadBgImage( o );
        }
    } );

    $.fn.printqFitBgImage = function( o ) {
        return this.each(
                (function( o ) {
                    return function() {
                        o.elem = $( this );
                        switch ( o.actionType ) {
                            case 'preload' :
                                FBI.preloadBgImage( o );
                                break;
                            case 'fitToDiv' :
                                FBI.fitBgImageToDiv( o );
                                break;
                            case 'fitImageToDiv' :
                                FBI.fitImageToDiv( o );
                                break;
                        }
                    }
                })( o )
        );
    }

})( window.jQuery );
//$.printqUniqueId
! (function( $ ) {
    $.printqUniqueId = function( options ) {
        var prefix = '',
                sufix = '',
                length = 10,
                start = 0,
                random_string = Math.random().toString( 36 ).substr( 2, 10 );
        if ( typeof (options) != 'undefined' ) {
            if ( typeof (options['prefix']) != 'undefined' )
                prefix = options['prefix'];
            if ( typeof (options['sufix']) != 'undefined' )
                sufix = options['sufix'];
            if ( typeof (options['length']) != 'undefined' )
                length = options['length'];
            if ( typeof (options['start']) != 'undefined' )
                start = options['start'];
        }

        for ( var i = 0; i < (length / 10 + 1); i ++ ) {
            random_string += Math.random().toString( 36 ).substr( 2, 10 );
        }

        return prefix + random_string.substr( start, length ) + sufix;

    };

})( window.jQuery );
//$.printqFileUploader
! (function( $ ) {

    var PFU = $.printqFileUploader = {}

    $.extend( PFU, {
        defaults : {
            context           : 'body',
            url               : null,
            dropZoneMask      : '.dropZoneMask',
            dropZoneIconMask  : '.dropZoneIconMask',
            filesUpload       : ".files-upload-input",
            dropArea          : "#body",
            mask              : '#loading-mask',
            onAppendParams    : function( fd ) {},
			maxConnections    : 2,
            onDrop            : function() {
            },
            onUpload          : function() {
            },
			onFileToQueue: function(imageData){},
            onFileUploadStart : function( imageData, o ) {
            },
            onProgress        : function( percent, imageData ) {
            },
            onComplete        : function( xhr, imageData ) {
            },
            onCompleteAll     : function( imagesData ) {
            },
            onApiComplete     : function( imageData ) {

            },
			onApiError: function (imageData) {
			},
            onDragEnter       : function() {
            },
            onDragLeave       : function() {
            },
            allowed_types     : ['image/jpg', 'image/jpeg', 'image/png', 'image/gif'],
			maxFileSize: 100000   //in kb
        },

        getDefaults : function( options ) {
            //return $.extend({}, PFU.defaults, options);
            var defaults = $.extend( true, defaults, PFU.defaults );
            return $.extend( true, defaults, options );

        },

        checkCompleteAll : function( imagesData ) {
            var allLoaded = true;
			if ( typeof( imagesData ) != 'undefined' && imagesData ) {
                $.each( imagesData, function( index, data ) {
                    if ( typeof(data['loaded']) == 'undefined' || ! data['loaded'] ) {
                        allLoaded = false;
                    }
                } );
            }
            else
                allLoaded = false;
            return allLoaded;
        },

		dequeue: function(id, files, imagesData, queue, options){
			var o       = PFU.getDefaults(options);
			var i 	= queue.indexOf(id),
					max = o.maxConnections,
					nextId;
			if (i >= 0) {
				queue.splice(i, 1);

				if (queue.length >= max && i < max){
					nextId = queue[max-1];
					PFU.uploadFile(nextId, files, imagesData, queue, o);
				}
			}
		},

		uploadFile: function (id, files, imagesData, queue, options) {
            var o = PFU.getDefaults( options ),
			file		= files[id],
                    reader = null,
                    xhr = new XMLHttpRequest(),
                    fd = new FormData();

			if ( file.size / 1000 > o.maxFileSize ) {
				imagesData[id]['loaded'] = true;
				PFU.dequeue(id, files, imagesData, queue, o);
				o.onApiError(imagesData[id]);
				if (PFU.checkCompleteAll(imagesData))
					o.onCompleteAll(imagesData);
                return;
			}
			if (jQuery.inArray(file.type, o.allowed_types) == -1) {
				imagesData[id]['loaded'] = true;
				PFU.dequeue(id, files, imagesData, queue, o);
				o.onApiError(imagesData[id]);
				if (PFU.checkCompleteAll(imagesData))
					o.onCompleteAll(imagesData);
                return;
			}

            if ( typeof FileReader !== "undefined" && (/image/i).test( file.type ) ) {
                reader = new FileReader();
				reader.onload = (function (imagesData, id) {
                    return function( evt ) {
						imagesData[id]['apiloaded'] = true;
						return;
						imagesData[id]['data'] = evt.target.result;
						o.onApiComplete(imagesData[id]);
                    };
					})(imagesData, id);
                reader.readAsDataURL( file );
            }

			xhr.upload.addEventListener("progress", (function(imagesData, id){
				return function (evt) {
                if ( evt.lengthComputable ) {
                    var percent = (evt.loaded / evt.total) * 100;
						o.onProgress(percent, imagesData[id]);
                }
                else {
                }
				}
			})(imagesData, id), false);

            // File uploaded
            xhr.addEventListener( "load", function() {
            }, false );

            xhr.open( "POST", o.url, true );
            fd.append( 'qqfile', file );
            if ( typeof(window.parent.FORM_KEY) != "undefined" ) {
                fd.append( 'form_key', window.parent.FORM_KEY );
            }
			fd.append('custom_filename', imagesData[id]['custom_filename']);
			o.onAppendParams(fd, imagesData[id]);
			xhr.onreadystatechange = (function(imagesData, queue, files, id, o){
				return function () {
                if ( 4 === this.readyState ) {
					imagesData[id]['loaded'] = true;
					PFU.dequeue(id, files, imagesData, queue, o);
					o.onComplete(this, imagesData[id]);
					if (PFU.checkCompleteAll(imagesData))
						o.onCompleteAll(imagesData);
                }
			}
			})(imagesData, queue, files, id, o);
			o.onFileUploadStart(imagesData[id],o);
			xhr.send(fd, o);
        },

        traverseFiles : function( files, options ) {
            var o = PFU.getDefaults( options );
			var imagesData  = {};
			var queue		= [];
            if ( typeof files !== "undefined" ) {
                for ( var i = 0, l = files.length; i < l; i ++ ) {
					imagesData[i] = {
                        id              : i,
                        loaded          : false,
                        apiloaded       : false,
                        data            : null,
                        other_infos     : {type : 'imageBarUpload'},
                        uniqueId        : $.printqUniqueId( {prefix : 'preload_', sufix : '_image', length : 12} ),
                        custom_filename : $.printqUniqueId( {length : 32} )
                    };
                }

                for ( var i = 0, l = files.length; i < l; i ++ ) {
						var len = queue.push(i);
						o.onFileToQueue(imagesData[i]);

						if (len <= o.maxConnections){
							PFU.uploadFile(i, files, imagesData, queue, o);
						}
                }
            }
            else {
                alert( "No support for the File API in this web browser" );
            }
        },

        init : function( options ) {
            $.event.props.push( 'dataTransfer' );
            var o = PFU.getDefaults( options ),
                    filesUpload         = $( o.context ).find( o.filesUpload ),
                    dropArea            = $( o.context ).find( o.dropArea ).andSelf(),
                    collection          = $(),
                    collectionDragLeave = $();


            filesUpload.on( "change", function() {
                o.onUpload();
                PFU.traverseFiles( this.files, o );
            } );

            dropArea.on( "dragleave", function( evt ) {
                var target = evt.target;
                try{
                    if(evt.relatedTarget.nodeType == 3) return;
                } catch(err) {}
                if(evt.target === evt.relatedTarget) return;
                collectionDragLeave = collectionDragLeave.not(target);
                if(collectionDragLeave.length === 0){
                    $( this ).removeClass( "over" );
                    $(o.dropZoneMask ).addClass('off');
                    $( o.dropZoneIconMask ).addClass('off');
                    setTimeout(function(){
                        $( o.dropZoneMask ).removeClass('on');
                        $( o.dropZoneMask ).removeClass('off');
                        $( o.dropZoneIconMask ).removeClass('on');
                        $( o.dropZoneIconMask ).removeClass('off');

                    },500);
                }
                evt.preventDefault();
                evt.stopPropagation();
            } );

            dropArea.on( "dragenter", function( evt ) {
                // filter out events which have a text node as relatedTarget
                // we have to do this in a try/catch block in case the relatedTarget was pulled from outside of the current document (eg. another iFrame)
                try{
                    if(evt.relatedTarget.nodeType == 3) return;
                } catch(err) {}
                // filter out events where the target and relatedTarget are the same
                if(evt.target === evt.relatedTarget) return;
                collectionDragLeave = collectionDragLeave.add(evt.target);

                $( this ).addClass( "over" );
                $( this ).removeClass( "isdrag" );
                $(o.dropZoneMask ).addClass('on');
                $( o.dropZoneIconMask ).addClass('on');

                evt.preventDefault();
                evt.stopPropagation();
            } );
            dropArea.on( "dragover", function( evt ) {
                evt.preventDefault();
                evt.stopPropagation();
            } );
            dropArea.on( "drop", function( evt ) {
                if($( o.dropZoneMask ).hasClass('on')){
                    setTimeout(function(){
                        $(o.dropZoneMask ).addClass('off');
                        $( o.dropZoneIconMask ).addClass('off');
                    },0);
                    setTimeout(function(){
                        $( o.dropZoneMask ).removeClass('on');
                        $( o.dropZoneMask ).removeClass('off');
                        $( o.dropZoneIconMask ).removeClass('on');
                        $( o.dropZoneIconMask ).removeClass('off');
                    },400);
                    if ( _currentOpenPanel != "#effectUploader" || _currentEditPanel != 1) {
                        runEffectCustomUpload();
                    }
                    PFU.traverseFiles( evt.dataTransfer.files, o );
                    $( this ).removeClass( "over" );
                    $( this ).removeClass( "isdrag" );

                    o.onDrop();
                    evt.preventDefault();
                    evt.stopPropagation();
                }
            } );
            $( window ).on( "dragleave.PFU", function( evt ) {
                setTimeout( function() {
                    collection = collection.not( evt.target );
                    if ( collection.size() === 0 ) {
                        dropArea.removeClass( "isdrag" );
                        if ( typeof(o.onDragLeave) == 'function' )
                            o.onDragLeave();
                    }
                }, 1 );
                evt.preventDefault();
                evt.stopPropagation();
            } );

            $( window ).on( "drop.PFU", function( evt ) {
                dropArea.removeClass( "isdrag" );
                dropArea.removeClass( "over" );
                setTimeout( function() {
                    collection = collection.not( evt.target );
                    if ( collection.size() === 0 ) {
                        dropArea.removeClass( "isdrag" );
                    }
                }, 1 );
                evt.preventDefault();
                evt.stopPropagation();
            } );

            $( window ).on( "dragenter.PFU", function( evt ) {

                if ( collection.size() === 0 ) {
                    dropArea.addClass( "isdrag" );
                    dropArea.removeClass( "over" );
                }
                collection = collection.add( evt.target );

                if ( typeof(o.onDragEnter) == 'function' )
                    o.onDragEnter();

                evt.preventDefault();
                evt.stopPropagation();
            } );
        }
    } );

})( window.jQuery );
//$.printqImageBar
! (function( $ ) {
    var PIB = $.printqImageBar = {};
    $.extend( PIB, {
        defaults    : {
            imageBarId        : '.bottom-thumbnails',
            carouselContainer : '.jcarousel',
            mask              : '#loading-mask',
            dropZoneMask      : '.dropZoneMask',
            dropZoneIconMask  : '.dropZoneIconMask',
            prevTrigger       : '.jcarousel-prev-vertical',
            nextTrigger       : '.jcarousel-next-vertical',
            carouselStep      : 8,
            addNewTrigger     : 'a.jcarousel-add-vertical',
            fileInput         : 'input.files-upload-input',
            itemList          : '.jcarousel-list',
            item              : '.jcarousel-list .jcarousel-item',
            placeHolder       : '.jcarousel-item.f-placeholder',
            placeHolderClass  : 'f-placeholder',
            previewContainer  : '<li class="jcarousel-item jcarousel-item-vertical in svgedit_carousel">' +
                                '<div class="placeholder preview-container" style="width:100%;height:100%;">' +
                                '<div class="image-prev preview">' +
                                '<div class="overlay-prev" style="">' +
                                '<div class="percents progress">0%</div>' +
                                '</div>' +
                                '<canvas></canvas>' +
                                '</div>' +
                                '</div>' +
                                '</li>'
        },
        getDefaults : function( options ) {
            return $.extend( PIB.defaults, options );
        },

        _getSelf : function( obj, options ) {
            var self = $( obj );

            if ( ! self.length ) {
                self = $( o.imageBarId );
            }

            if ( self.length )
                return self;
            return $.error(
                    'Invalid Image Bar'
            );
        },

        init : function( obj, options ) {
            var o = PIB.getDefaults( options ),
                    self = PIB._getSelf( obj, o );
            PIB.initFileUpload( obj, o );

            var carouselContainer = self.find( o.carouselContainer ),
                    prevTrigger = self.find( o.prevTrigger ),
                    nextTrigger = self.find( o.nextTrigger );
            PIB.updateImageBar( obj, options, 0 );
            prevTrigger.off( 'click' ).on( 'click', function() {
                carouselContainer.jcarousel( 'scroll', '-=' + o.carouselStep );
            } );

            nextTrigger.off( 'click' ).on( 'click', function() {
                carouselContainer.jcarousel( 'scroll', '+=' + o.carouselStep );
            } );
        },

        parseGetUserPhotosResponse : function( obj, options, response ) {
            if ( typeof (response) != 'undefined' ) {
                PIB.clearImageBarItems( obj, options, response );
                if ( response.count > 8 )
                    jQuery( '#next_button_upload' ).css( 'opacity', 1 );
                if ( response.count > 0 ) {
                    $.each( response.files,
                            (function( obj, options ) {
                                return function( index, value ) {
                                    var imageData = {
                                        id              : value['id'],
                                        loaded          : true,
                                        apiloaded       : true,
                                        data            : uploadedDirPath + uploadPhotoDirName + '/' + value['image'],
                                        uniqueId        : 'preload_' + value['image'] + '_image',
                                        other_infos     : value['other_infos'],
                                        custom_filename : value['image']
                                    };

                                    PIB.createNewElement( obj, options, imageData );

                                    var o = PIB.getDefaults( options ),
                                            self = PIB._getSelf( obj, options ),
                                            elem = self.find( o.itemList + ' #' + imageData['uniqueId'] );

                                    var img_src = imageData['data'];

                                    if ( typeof ( value['thumbnail']) != 'undefined' ) {
                                        img_src = uploadedDirPath + uploadPhotoDirName + '/' + value['thumbnail'];
                                        imageData['thumbnail'] = img_src;
                                    }

                                    var overlay = elem.find( '.image-prev.preview' ),
                                            placeholder = elem.find( '.placeholder' );

                                    if ( placeholder.length ) {
                                        placeholder.printqFitBgImage( {
                                            image_src        : img_src,
                                            onImageLoaded    : (function( overlay ) {
                                                return function( img ) {
                                                    if ( overlay.length ) {
                                                        overlay.remove();
                                                    }
                                                    PIB._createTooltip( img );
                                                }
                                            })( overlay ),
                                            actionType       : 'fitImageToDiv',
                                            autocenter       : false,
                                            noImageContainer : true,
                                            cancelLoading    : true
                                        } );
                                    }

                                    elem.data( 'imageData', imageData )
                                            .removeClass( 'in' )
                                            .addClass( 'image' );
                                }
                            })( obj, options )
                    );
                }
            }
        },

        clearImageBarItems : function( obj, options, response ) {
            var o = PIB.getDefaults( options ),
                    self = PIB._getSelf( obj, o ),
                    itemList = self.find( o.itemList ),
                    preventRemove = [];

            if ( response.count > 0 ) {
                $.each( response.files, function( index, value ) {
                    preventRemove.push( 'preload_' + value['image'] + '_image' );
                } );
            }

            if ( itemList ) {
                var items = itemList.find( '>li.jcarousel-item' );

                if ( items.length ) {
                    items.each(
                            (function( o ) {
                                return function() {
                                    var _self = $( this );
                                    if ( ! _self.hasClass( o.placeHolderClass ) ) {
                                        if ( ! $.inArray( _self.attr( 'id' ), preventRemove ) )
                                            _self.remove();
                                    }
                                }
                            })( o )
                    )
                }
            }
        },

        updateImageBar : function( obj, options, response ) {
            var o = PIB.getDefaults( options ),
                    self = PIB._getSelf( obj, o );

            $.printqAjaxRequest.postRequest( {
                url        : getUserPhotosUrl,
                data       : {
                    sid          : uploadPhotoDirName,
                    count        : 1000,
                    returnThumbs : 1,
                    order        : 'ASC'
                },
                options    : o,
                onComplete : (function( obj, options ) {
                    return function( response ) {
                        PIB.parseGetUserPhotosResponse( obj, options, response );
                    }
                })( obj, o )
            } );

            PIB._reloadCarousel( obj, o );
            return false;
        },

        _reloadCarousel : function( obj, options ) {
            var o = PIB.getDefaults( options ),
                    self = PIB._getSelf( obj, o ),
                    carouselContainer = self.find( o.carouselContainer );

            self.data( 'printqImageBar', o );

            if ( typeof ( carouselContainer.data( 'jcarousel' ) ) != 'undefined' ) {
                carouselContainer.jcarousel( "reload" );
                carouselContainer.jcarousel( "scroll", 0, false );
            }
            else {
                carouselContainer.jcarousel( {
                    vertical : true,
                    scroll   : 0
                } );
            }
        },

        initFileUpload : function( obj, options ) {
            var o        = PIB.getDefaults( options ),
                    self = PIB._getSelf( obj, o )
                    uid  = $.printqUniqueId( {prefix : 'loading_', sufix : 'upload_image', length : 6} );
            $.printqFileUploader.init( {
                url               : uploadUserPhotoUrl + '?_token=' + $('[name="_token"]').val(),
                context           : 'body',
                filesUpload       : self.find( '.files-upload-input' ).get( 0 ),
                dropArea          : '#body',
                onAppendParams    : (function( options ) {
                    return function( fd, imageData ) {
                        fd.append( 'createThumbnail', 1 );
                        fd.append( 'createWorkingImage', 1 );
                        fd.append( 'tName', imageData['custom_filename'] + '_thumb' );
                        fd.append( 'wName', imageData['custom_filename'] + '_working' );
                        fd.append( 'width', 'auto' );
                        fd.append( 'quality', 90 );
                        fd.append( 'height', 100 );
                        fd.append( 'sid', sid );
                        fd.append( 'other_infos[type]', 'imageBarUpload' );
                    }
                })( o ),
                onDrop            : (function( options ) {

                })( o ),
                onUpload          : (function( obj, options ) {
                    return function() {
                    }
                })( obj, o ),
				onFileToQueue     : (function(obj, options){
                    return function( imageData ) {
                        PIB.createNewElement( obj, options, imageData );
                    }
                })( obj, o ),
                onComplete        : (function( obj, options ) {
                    return function( e, imageData ) {
                        var o = PIB.getDefaults( options ),
                                self = PIB._getSelf( obj, options ),
                                elem = self.find( o.itemList + ' #' + imageData['uniqueId'] );
                        if ( elem.length ) {
                            var response = $.parseJSON( e.response );

                            if ( typeof (response.success) != 'undefined' && response.success ) {
                                img_src = uploadedDirPath + uploadPhotoDirName + '/' + response.path;
                                imageData = elem.data( 'imageData' );
                                imageData['id'] = response.id;
                                imageData['other_infos'] = response.other_infos;
                                imageData['data'] = img_src;
                                if ( response.thumbnail.success ) {
                                    img_src = uploadedDirPath + uploadPhotoDirName + '/' + response.thumbnail.result;
                                    imageData['thumbnail'] = img_src;
                                }


                                var overlay = elem.find( '.image-prev.preview .overlay-prev' ),
                                        placeholder = elem.find( '.placeholder' );

                                if ( overlay.length ) {
                                    overlay.remove();
                                }
                                if ( placeholder.length ) {
                                    placeholder.printqFitBgImage( {
                                        image_src        : img_src,
                                        onImageLoaded    : (function( placeholder ) {
                                            return function( img ) {
                                                PIB._createTooltip( img );
                                                placeholder.find( '.preview' ).remove();
                                                var total_width = 0;
                                                jQuery( '.ul_svg_edit li' ).each( function() {
                                                    total_width = total_width + $( this ).width();
                                                } );
                                                total_width = total_width - 8 * Math.abs( jQuery( '.ul_svg_edit li' ).width() );
                                                jQuery( '#prev_button_upload' ).css( 'opacity', 0.3 );
                                                if ( total_width > Math.abs( parseInt( jQuery( '.ul_svg_edit' ).css( "left" ) ) ) )
                                                    jQuery( "#next_button_upload" ).css( 'opacity', 1 );
                                            }
                                        })( placeholder ),
                                        actionType       : 'fitImageToDiv',
                                        autocenter       : false,
                                        noImageContainer : true,
                                        cancelLoading    : true
                                    } );
                                }
                                if ( typeof imageData['other_infos']['size'] !== 'undefined' && typeof imageData['other_infos']['size']['height'] !== 'undefined' )
                                    elem.attr( 'data-height', imageData['other_infos']['size']['height'] );
                                else
                                    elem.attr( 'data-height', 0 );
                                if ( typeof imageData['other_infos']['size'] !== 'undefined' && typeof imageData['other_infos']['size']['width'] !== 'undefined' )
                                    elem.attr( 'data-width', imageData['other_infos']['size']['width'] );
                                else
                                    elem.attr( 'data-width', 0 );
                                elem.data( 'imageData', imageData );
                                elem.data( 'imageId', response.id );
                                elem.removeClass( 'in' );
                                elem.addClass( 'image' );
                            }
                            else {
                                elem.remove();
                            }
                        }
                    }
                })( obj, o ),
                onApiError        : (function(obj, options){
	                  return function (imageData) {
		                  var o                   = PIB.getDefaults(options),
				                  self                = PIB._getSelf(obj, options),
				                  elem                = self.find(o.itemList + ' #' + imageData['uniqueId']);
		                  if (elem.length) {
			                  elem.remove();
		                  }
	                  }
                  })( obj, o ),
                onCompleteAll     : (function( obj, options,uid ) {
                    return function( images ) {
                        $.openeditorImagePicker.updateImagePicker();
                        $.q( options.mask ).prinqLoading( 'stop', uid );
                    }
                })( obj, o, uid ),
                onFileUploadStart : (function(obj,options,uid) {
                    return function(imageData){
                        $.q( options.mask ).prinqLoading( 'start', uid );
                    }})(obj,o,uid),
                onApiComplete     : (function( obj, options ) {
                    return function( imageData ) {
                    }
                })( obj, o ),
                onProgress        : (function( obj, options ) {
                    return function( percent, imageData ) {
                        return false;//deleting this will enable percentage instead of loading gif
                    }
                })( obj, o ),
                onDragEnter       : (function( obj, options ) {
                    return function() {
                        $(o.dropZoneMask ).addClass('on');
                        $( o.dropZoneIconMask ).addClass('on');
                    }
                })( obj, o ),
                onDragLeave       : (function( obj, options ) {
                    return function() {
                       $(o.dropZoneMask ).addClass('off');
                       $( o.dropZoneIconMask ).addClass('off');
                       setTimeout(function(){
                           $( o.dropZoneMask ).removeClass('on');
                           $( o.dropZoneMask ).removeClass('off');
                           $( o.dropZoneIconMask ).removeClass('on');
                           $( o.dropZoneIconMask ).removeClass('off');

                       },500);
                    }
                })( obj, o )
            } );
            self.find( o.addNewTrigger ).off( 'click' ).on( 'click', function() {
                PIB.triggerFileUploader( obj, o );
            } );
        },

        triggerFileUploader : function( obj, options ) {
            var o = PIB.getDefaults( options ),
                    self = PIB._getSelf( obj, o );

            self.find( o.fileInput ).click();

        },

        createNewElement : function( obj, options, imageData ) {
            var o = PIB.getDefaults( options ),
                    self = PIB._getSelf( obj, o ),
                    itemList = self.find( o.itemList ),
                    placeholder = PIB._getPlaceholder( obj, o ), //this needs to be removed if we add a new image
                    elem = $( o.previewContainer );

            elem.find( '.progress' ).html( '<img src="' + loadingGifSrc + '" alt="" style="vertical-align:middle;background-color:transparent; width:40px; height:40px;" />' );
            if ( itemList ) {

                var exist = itemList.find( '#' + imageData['uniqueId'] );

                if ( exist.length )
                    exist.remove();

                itemList.prepend( elem );
                elem.attr( 'data-name', imageData['custom_filename'] );
                elem.attr( 'data-location', uploadedDirPath + uploadPhotoDirName + '/' + imageData['custom_filename'] );
                elem.attr( 'data-type', "upload_image" );
                if ( typeof imageData['other_infos']['size'] !== 'undefined' && typeof imageData['other_infos']['size']['height'] !== 'undefined' )
                    elem.attr( 'data-height', imageData['other_infos']['size']['height'] );
                else
                    elem.attr( 'data-height', 0 );
                if ( typeof imageData['other_infos']['size'] !== 'undefined' && typeof imageData['other_infos']['size']['width'] !== 'undefined' )
                    elem.attr( 'data-width', imageData['other_infos']['size']['width'] );
                else
                    elem.attr( 'data-width', 0 );
                elem.attr( 'id', imageData['uniqueId'] )
                        .addClass( 'imageContent' )
                        .data( {
                            'imageData'     : imageData,
                            'imagePath'     : uploadedDirPath + uploadPhotoDirName + '/' + imageData['custom_filename'] + '_working',
                            'workingImage'  : (typeof(imageData['other_infos']['working_image']) !=='undefined') ? uploadedDirPath + uploadPhotoDirName + '/' + imageData['other_infos']['working_image'] :  uploadedDirPath + uploadPhotoDirName + '/' + imageData['custom_filename'],
                            'imageFullName' : uploadPhotoDirName + '/' + imageData['custom_filename'],
                            'imageName'     : imageData['custom_filename'],
                            'imageSid'      : uploadPhotoDirName,
                            'imageId'       : imageData['id'],
                            'data-name'     : imageData['custom_filename'],
                            'data-location' : uploadedDirPath + uploadPhotoDirName + '/' + imageData['custom_filename'],

                        } ).off( 'click' )
                        .on( 'click', (function() {
                            return function( o ) {
                                var o = PIB.getDefaults( options ),
                                        self = PIB._getSelf( obj, options ),
                                        itemList = self.find( o.itemList );
                                itemList.find( 'li.active' ).removeClass( 'active' );
                                $( this ).addClass( 'active' );
                            }
                        })( o )
                        );

                PIB._enableItemDraggble( obj, elem, o );

                PIB.createElementOptions( elem, o );

            }

            if ( placeholder && ! exist.length )
                placeholder.remove();

            PIB._reloadCarousel( obj, options );

        },

        createElementOptions : function( elem, o ) {


        },

        createCanvasImage : function( canvas, img_src, params ) {

            var jImg = $( '<img   />' ).attr( 'src', img_src );

            jImg.imagesLoaded().always(
                    (function( jImg, canvas, params ) {
                        return function() {
                            var img = jImg[0],
                                    jCanvas = $( canvas ),
                                    imgWidth = img.width,
                                    imgHeight = img.height,
                                    canvasWidth = jCanvas.width(),
                                    canvasHeight = jCanvas.height(),
                                    imageParams = {};
                            var ctx = canvas.getContext( "2d" );
                            canvas.width = canvasWidth;
                            canvas.height = canvasHeight;

                            /*if ( imgWidth > imgHeight ){
                             canvasImgHeight = imgHeight * canvasWidth / imgWidth;
                             ctx.drawImage( img, 0, (canvasHeight - canvasImgHeight) / 2, canvasWidth, canvasImgHeight );
                             imageParams['width'] = canvasWidth;
                             imageParams['height'] = canvasImgHeight;
                             }
                             else{*/
                            canvasImgWidth = imgWidth * canvasHeight / imgHeight;
                            ctx.drawImage( img, (canvasWidth - canvasImgWidth) / 2, 0, canvasImgWidth, canvasHeight );
                            imageParams['width'] = canvasImgWidth;
                            imageParams['height'] = canvasHeight;

                            //}

                            imageParams['img'] = jImg;

                            params.callback( imageParams );
                        }
                    })( jImg, canvas, params )
            );
            return;
        },

        removeElementByPhotoName : function( obj, options, photoName ) {
            var o = PIB.getDefaults( options ),
                    self = PIB._getSelf( obj, o ),
                    itemList = self.find( o.itemList );
            itemList.find( '.image' ).each( (function( obj, o, photoName ) {
                return function() {
                    if ( $( this ).data( 'imageName' ) == photoName ) {
                        $( this ).remove();
                        PIB._reloadCarousel( obj, o );
                    }
                }
            })( obj, o, photoName ) );
            return true;
        },

        _getPlaceholder : function( obj, options ) {
            var o = PIB.getDefaults( options ),
                    self = PIB._getSelf( obj, o ),
                    placeHolder = self.find( o.placeHolder ).first();

            if ( placeHolder.length )
                return placeHolder;
            return false;
        },

        createTooltip : function( obj, img ) {
            PIB._createTooltip( img );
        },

        _createTooltip : function( img ) {
            return;
            var elem = img.parent();
            elem.attr( 'title', '' );
            elem.tooltip( {
                position : {
                    my    : "center bottom-20",
                    at    : "center top",
                    using : function( a, b ) {
                        $( this ).css( a ).addClass( "img-prev-tooltip" );
                    }
                },
                content  : function() {
                    var ratio = img.width() / img.height(),
                            a = img.attr( "src" ).replace( "_thumb", "" ),
                            slideshow_width = 200 * ratio,
                            loader_margin = parseInt( slideshow_width / 2 ),
                            b = $( "<img>" ).attr( "src", a ).attr( "style", "width:auto; height: 200px;" );
                    b.hide();

                    var preloader = $( "<div>", {
                                "class" : "preloader"
                            } ).attr( "style", "margin-left: " + loader_margin + "px" ),
                            c = $( "<div>" ).attr( "style", "width: " + slideshow_width + "px; height: 200px; overflow:hidden;" );
                    c.append( b );
                    c.append( preloader );

                    b.imagesLoaded().always( (function( img ) {
                        return function() {
                            b.show();
                            b.parent().find( ".preloader" ).remove();
                            b.parent().attr( "style", "height: 200px;  overflow:hidden;" );
                        }
                    })( b ) );

                    return c;
                },
                show     : {
                    delay : 500
                }
            } );
        },

        disableTooltip : function( elem, o ) {
            //elem.tooltip('disable');
        },

        enableTooltip : function( elem, o ) {
            //elem.tooltip('enable');
        },

        _enableItemDraggble : function( obj, item, o ) {
            item.draggable( {
                appendTo       : 'body',
                containment    : 'body',
                revertDuration : 500,
                scroll         : false,
                distance       : 40,
                revert         : "invalid",
                helper         : function() {

                    var _self = $( this ),
                            data = _self.data(),
                            helperImgPath = false,
                            width = _self.width(),
                            height = _self.height(),
                            backgroundSize = '';

                    if ( typeof ( data ) != 'undefined' && typeof ( data['imagePath'] ) != 'undefined' ) {
                        helperImgPath = data['imagePath'];
                        if ( typeof ( data['imageData'] ) != 'undefined' && typeof ( data['imageData']['thumbnail'] ) != 'undefined' ) {
                            helperImgPath = data['imageData']['thumbnail'];
                        }
                    }

                    var imgWidth = _self.find( 'img' ).width(),
                            imgHeight = _self.find( 'img' ).height();

                    if ( imgWidth <= imgHeight )
                        backgroundSize = 'auto 100%';
                    else
                        backgroundSize = '100% auto';

                    return $( '<div>' ).css( {
                        width                 : width,
                        height                : height,
                        'border'              : '1px solid #717173',
                        'background-color'    : '#ededed',
                        'background-image'    : 'url("' + helperImgPath + '")',
                        'background-position' : 'center center',
                        'background-repeat'   : 'no-repeat',
                        'background-size'     : backgroundSize,
                        'z-index'             : '99999'
                    } );
                },
                onDrag         : function( event, ui ) {
                    var img = this.find( '>img' );
                    if ( img.length )
                        img.tooltip( 'hide' );
                },
                cursor         : "move"

            } );
        }
    } )
    ;

    $.fn.printqImageBar = function( options, options1, options2 ) {
        if ( typeof options === 'string' ) {
            this.each( function() {
                if ( typeof(PIB[options]) != 'function' || options.charAt( 0 ) === '_' ) {
                    return $.error(
                            'No such method "' + options + '"'
                    );
                }
                var result = PIB[options]( this, options1, options2 );
                return result;
            } );
        }
        else {
            var o = PIB.getDefaults( options );
            return this.each( function() {
                PIB.init( this, o );
            } );
        }
    };
})( window.jQuery );
//$.printqAjaxRequest
! (function( $ ) {

    var PAR = $.printqAjaxRequest = {};
    var data_send = {};
    if ( typeof(window.parent.FORM_KEY) != 'undefined' )
        data_send.form_key = window.parent.FORM_KEY;
    $.extend( PAR, {
        defaults    : {
            url        : null,
            data       : data_send,
            dataType   : 'JSON',
            onComplete : function( response ) {},
            onFail     : function( response ) {},
            mask       : '#loading-mask'
        },
        _O          : function( o ) {
            var defaults = $.extend( true, {}, PAR.defaults );
            return $.extend( true, defaults, o );
        },
        postRequest : function( options ) {
            var o = PAR._O( options ),
                    uid = $.printqUniqueId( {prefix : 'loading_', sufix : '_postRequest', length : 6} ),
                    cancelLoading = false;
            if ( o.url == getUserPhotosUrl )
                cancelLoading = true;

            $( o.mask ).prinqLoading( 'start', uid, {cancelLoading : cancelLoading} );
            $.ajax( {
                type       : 'POST',
                url        : o.url,
                'dataType' : o.dataType,
                data       : o.data
            } ).done(
                            (function( uid, o ) {
                                return function( response ) {
                                    o.onComplete( response );
                                    $( o.mask ).prinqLoading( 'stop', uid );
                                }
                            })( uid, o )

                    ).fail(
                            (function( uid, o ) {
                                return function( response ) {
                                    o.onFail( response );
                                    $( o.mask ).prinqLoading( 'stop', uid );
                                }
                            })( uid, o )
                    );

        },
        getRequest  : function( options ) {
            var o = PAR._O( options );
            $.ajax( {
                type       : 'GET',
                url        : o.url,
                'dataType' : 'JSON',
                data       : o.data,
                cache      : false
            } ).done(function( response ) {
                o.onComplete( response );
            } ).fail( function( response ) {
                o.onFail( response );
            } );
        }
    } );

})( window.jQuery );
//$.printqPreview
! (function( $ ) {
    var PP = $.printqPreview = {};

    $.extend( PP, {
        defaults                  : {
            blocksContainer      : 'div.page_blocks',
            tablesContainer      : 'div.tableContainer',
            pagesContainer       : '#edit_tab .personalize_page',
            previewPageContainer : '#preview_tab .pages-container div.pages .page',
            mask                 : '#loading-mask',
            currentPage          : 0, // this is used for cache image. because photobook can preview current editor page
            tableCellProp        : [
                'backgroundColor',
                'backgroundColorId',
                'boldText',
                'borders',
                'className',
                'col',
                'color',
                'fontColor',
                'fontColorId',
                'fontFamily',
                'fontSize',
                'fontSizeHtml',
                'fontSizePdf',
                'italicText',
                'prop',
                'row',
                'type',
                'underlineText'
            ]
        },
        _O                        : function( o ) {
            return $.extend( {}, PP.defaults, o );
        },
        parseResponse             : function( response, o ) {
            var error = false;
            if ( typeof (response) != 'undefined' && response && typeof (response.result) != 'undefined' ) {
                if ( response.result.error )
                    error = response.result.error;
                if ( response.result.image ) {
                    var image = response.result.image,
                            name = response.result.name;
                    if ( typeof(response.result.wtm_image) != 'undefined' && response.result.wtm_image )
                        image = response.result.wtm_image;

                    if ( typeof(response.result.wtm_name) != 'undefined' && response.result.wtm_name )
                        name = response.result.wtm_name;
                    if ( image ) {
                        if ( ! userCancelPreview ) {
                            if ( typeof(response.result.texture) != 'undefined' ) {
                                o['texture'] = response.result.texture;
                            }
                            PP.showPreviewImage( image, name, o );
                        }
                    }
                    else {
                        error = 'No Preview Image';
                    }
                }
            }
            else {
                error = errorMsgTxt;
            }
            if ( error )
                alert( error );
        },
        getPreview                : function( options ) {
            var o = PP._O( options );
            if ( multipleLayouts ) {
                $.printqPreview.getMultipleLayoutsPreview( o );
            }
            else {
                $.printqPreview.getSingleTemplatePreview( o );
            }
        },
        getSingleTemplatePreview  : function( options ) {
            userCancelPreview = false;
            var o = PP._O( options ),
                    _data = PP.makeBlocksData( $( o.pagesContainer ).find( o.blocksContainer ), o ),
                    uid = $.printqUniqueId( {prefix : 'loading_', sufix : 'getPreview', length : 6} );

            $.q( o.mask ).prinqLoading( 'start', uid );
            _data['selection'] = urlSelection;
            _data['id'] = urlId;
            _data['idProduct'] = urlIdProduct;

            $.each( $( o.pagesContainer ),
                    (function( _data, o ) {
                        return function( index, value ) {
                            var pageData = $.extend( {}, $( this ).data() ),
                                    page_no = pageData.page_no;

                            var page_Tablesdata = PP.makeTablesData( $( this ).find( o.tablesContainer ) );
                            if ( ! _data.hasOwnProperty( 'renderTables' ) )
                                _data['renderTables'] = {};
                            _data['renderTables'][page_no] = page_Tablesdata;

                        }
                    })( _data, o )
            );

            o.currentPage = 0;

            $.printqAjaxRequest.postRequest( {
                url        : urlPreview,
                data       : _data,
                onComplete : (function( o, uid ) {
                    return function( response ) {
                        PP.clearImageCache();
                        PP.parseResponse( response, o );
                        $.q( o.mask ).prinqLoading( 'stop', uid );
                    }
                })( o, uid ),
                onFail     : (function( o, uid ) {
                    return function() {
                        $.q( o.mask ).prinqLoading( 'stop', uid );
                    }
                })( o, uid )
            } );
            return true;
        },
        getMultipleLayoutsPreview : function( options ) {
            userCancelPreview = false;
            var o = PP._O( options ),
                    _data = {},
                    uid = $.printqUniqueId( {prefix : 'loading_', sufix : 'getPreview', length : 6} );

            $.q( o.mask ).prinqLoading( 'start', uid );
            _data['selection'] = urlSelection;
            _data['idProduct'] = urlIdProduct;
            _data['currentPage'] = $.printqEditorPagination.getCurrentPageIndex();
            _data['pdfs'] = {};
            _data['order'] = {};
            $.each( $( o.pagesContainer ),
                    (function( _data, o ) {
                        return function( index, value ) {
                            var pageData = $.extend( {}, $( this ).data() ),
                                    type = pageData.type,
                                    id = pageData.id,
                                    page_no = pageData.page_no;

                            if ( ! _data.hasOwnProperty( 'pdfs' ) )
                                _data['pdfs'] = {};
                            if ( ! _data['pdfs'].hasOwnProperty( index ) )
                                _data['pdfs'][index] = {};
                            if ( ! _data['pdfs'][index].hasOwnProperty( type ) )
                                _data['pdfs'][index][type] = {};
                            if ( ! _data['pdfs'][index][type].hasOwnProperty( id ) )
                                _data['pdfs'][index][type][id] = {};
                            if ( ! _data['pdfs'][index][type][id].hasOwnProperty( page_no ) )
                                _data['pdfs'][index][type][id][page_no] = {};

                            var page_Tablesdata = PP.makeTablesData( $( this ).find( o.tablesContainer ) );
                            var page_data = PP.makeBlocksData( $( this ).find( o.blocksContainer ), o );
                            page_data['is_page'] = true;
                            if ( ! page_data.hasOwnProperty( 'renderTables' ) )
                                page_data['renderTables'] = {};
                            page_data['renderTables'][page_no] = page_Tablesdata;

                            _data['pdfs'][index][type][id][page_no] = page_data;

                        }
                    })( _data, o )
            );

            o.currentPage = _data['currentPage'];
            $.printqAjaxRequest.postRequest( {
                url        : urlNewPagePreview,
                data       : _data,
                onComplete : (function( o, uid ) {
                    return function( response ) {
                        PP.clearImageCache();
                        PP.parseResponse( response, o );
                        $.q( o.mask ).prinqLoading( 'stop', uid );
                    }
                })( o, uid ),
                onFail     : (function( o, uid ) {
                    return function() {
                        $.q( o.mask ).prinqLoading( 'stop', uid );
                    }
                })( o, uid )
            } );
            return true;
        },
        showPreviewImage          : function( images, name, options ) {
            var image = images;
            if ( $.isArray( image ) )
                image = images[0];
            var o = PP._O( options ),
                    magnify = $( "<div class='magnify' id='magnify'><div class='large' style='background: url(" + image + ") no-repeat; z-index: 10'></div><img class='small' src='" + image + "' /></div>" ),
                    uid = $.printqUniqueId( {prefix : 'loading_', sufix : 'getPreview', length : 6} );

            $.q( o.mask ).prinqLoading( 'start', uid );

            magnify.printqFitBgImage( {
                image_src     : image,
                onImageLoaded : (function( image, name, o, magnify, uid ) {
                    return function() {
                        $( o.previewPageContainer ).html( '' ).append( magnify );
                        PP.magnify( magnify );
                        PP.addImageToCache( o.currentPage, image, name );
                        if ( typeof(o.onPreviewComplete) == 'function' )
                            o.onPreviewComplete( image, name, o.currentPage );
                        $.q( o.mask ).prinqLoading( 'stop', uid );
                    }
                })( image, name, o, magnify, uid ),
                actionType    : 'preload'
            } );

            if ( ! multipleLayouts && tdPreview ) {
                PP.populate3DImage( images, options['texture'] );
            }
        },
        populate3DImage           : function( images, texture ) {
            if ( typeof (texture) != 'undefined' && $.isArray( texture ) ) {
                if ( $( 'iframe#frame_3d' ).length ) {
                    $( 'iframe#frame_3d' ).get( 0 ).contentWindow.postMessage( JSON.stringify( {image : images, texture : texture} ), '*' );
                }
            }
        },
        magnify                   : function( magnify ) {
            var native_width = 0,
                    native_height = 0;
            magnify.mousemove( function( e ) {
                if ( ! native_width && ! native_height ) {
                    var image_object = new Image();
                    image_object.src = $( ".small" ).attr( "src" );

                    native_width = image_object.width;
                    native_height = image_object.height;
                }
                else {
                    var magnify_offset = $( this ).offset();

                    var mx = e.pageX - magnify_offset.left;
                    var my = e.pageY - magnify_offset.top;

                    //Finally the code to fade out the glass if the mouse is outside the container
                    if ( mx < $( this ).width() && my < $( this ).height() && mx > 0 && my > 0 ) {
                        $( ".large" ).fadeIn( 100 );
                    }
                    else {
                        $( ".large" ).fadeOut( 100 );
                    }
                    if ( $( ".large" ).is( ":visible" ) ) {
                        var rx = Math.round( mx / $( ".small" ).width() * native_width - $( ".large" ).width() / 2 ) * - 1;
                        var ry = Math.round( my / $( ".small" ).height() * native_height - $( ".large" ).height() / 2 ) * - 1;
                        var bgp = rx + "px " + ry + "px";

                        var px = mx - $( ".large" ).width() / 2;
                        var py = my - $( ".large" ).height() / 2;

                        $( ".large" ).css( {'left' : px, 'top' : py, 'background-position' : bgp } );
                    }
                }
            } );
        },
        getPreviewImage           : function( options ) {
            userCancelPreview = false;
            var o = PP._O( options ),
                    uid = $.printqUniqueId( {prefix : 'loading_', sufix : 'getPreviewImage', length : 6} ),
                    page = parseInt( o.page ) - 1,
                    cacheImage = PP.getImageCache( page );
            $.q( o.mask ).prinqLoading( 'start', uid );

            o.currentPage = page;//important
            if ( cacheImage ) {
                PP.showPreviewImage( cacheImage.image, cacheImage.name, o );
            }
            else {
                var uid1 = $.printqUniqueId( {prefix : 'loading_', sufix : 'getPreviewImage', length : 6} );
                $.q( o.mask ).prinqLoading( 'start', uid1 );
                $.printqAjaxRequest.getRequest( {
                    url        : urlGetPage.replace( '[%page]', o.page ),
                    onComplete : (function( uid, o ) {
                        return function( response ) {
                            PP.parseResponse( response, o );
                            $.q( o.mask ).prinqLoading( 'stop', uid );
                        }
                    })( uid1, o ),
                    onFail     : (function( uid, o ) {
                        return function() {
                            $.q( o.mask ).prinqLoading( 'stop', uid );
                        }
                    })( uid1, o )
                } );
            }
            $.q( o.mask ).prinqLoading( 'stop', uid );
        },
        attachPreview             : function( options ) {
            var o = PP._O( options ),
                    project_data = $.printqPreview.serializeProject(),
                    uid = $.printqUniqueId( {prefix : 'loading_', sufix : 'attachPreview', length : 6} ),
                    imageCache = PP.getImageCache( 0 ).image;
            if ( typeof ( o.attachImage ) != 'undefined' )
                imageCache = o.attachImage;

            $.q( o.mask ).prinqLoading( 'start', uid );
            $.printqAjaxRequest.postRequest( {
                url        : attachUrl,
                data       : {
                    'file'         : urlSelection,
                    'preview'      : imageCache,
                    'bundle'       : false,
                    'data'         : false,
                    'project_data' : project_data
                },
                onComplete : (function( uid, o ) {
                    return function( response ) {
                        $.q( o.mask ).prinqLoading( 'stop', uid );
                        if ( typeof (o.onComplete) == 'function' )
                            return o.onComplete( response );
                    }
                })( uid, o ),
                onFail     : (function( uid, o ) {
                    return function() {
                        $.q( o.mask ).prinqLoading( 'stop', uid );
                        if ( typeof (o.onFail) == 'function' )
                            return o.onFail();
                    }
                })( uid, o )
            } );
        },
        addImageToCache           : function( page, image, name ) {
            pageImageCache[page] = {
                image : image,
                name  : name
            };
        },
        clearImageCache           : function() {
            pageImageCache = {};
        },
        getImageCache             : function( page ) {
            if ( typeof(pageImageCache[page]) !== 'undefined' )
                return pageImageCache[page];
            return false;
        },
        makeBlocksData            : function( blocksContainer, options ) {
            var o = PP._O( options ),
                    _data = {};
            if ( $.type( blocksContainer ) == 'object' && blocksContainer.length > 0 ) {
                $.each( blocksContainer, function( index, value ) {

                    var blockDataCtnr = $( this ).find( '.block_data:first' ),
                            blockData = blockDataCtnr.data();

                    if ( typeof(blockData) != 'undefined' ) {

                        var blockLeft = blockData['left'],
                                blockTop = blockData['top'];
                        /*Start adjust the rotate origin*/
                        if ( blockData['rotateAngle'] != 0 ) {
                            var tetha = blockData['tetha'];
                            var topleft = {
                                x : blockData['width'] * - 1 / 2,
                                y : blockData['height'] * - 1 / 2
                            };

                            var topLeftD = {
                                x : topleft.x * Math.cos( tetha ) - topleft.y * Math.sin( tetha ),
                                y : topleft.x * Math.sin( tetha ) + topleft.y * Math.cos( tetha )
                            }

                            var deviation = {
                                x : topleft.x - topLeftD.x,
                                y : topLeftD.y - topleft.y
                            }

                            blockLeft = blockLeft - deviation.x;
                            blockTop = blockTop - deviation.y;
                        }
                        /*End adjust the rotate origin*/

                        _data[blockData['block_name'] + '_properties'] = {
                            opacity      : blockData['opacity'],
                            movable      : blockData['movable'],
                            top          : parseFloat( blockData['pdf_height'] - (blockData['pdf_height'] * blockTop / blockData['page_height']) - (blockData['pdf_height'] * blockData['height'] / blockData['page_height']) ) + parseFloat( blockData['TrimBoxW'] ),
                            left         : parseFloat( blockData['pdf_width'] * blockLeft / blockData['page_width'] ) + parseFloat( blockData['TrimBoxH'] ),
                            width        : parseFloat( blockData['pdf_width'] * blockData['width'] / blockData['page_width'] ).toFixed( 2 ),
                            height       : parseFloat( blockData['pdf_height'] * blockData['height'] / blockData['page_height'] ).toFixed( 2 ),
                            resizable    : blockData['resizable'],
                            rotatable    : blockData['rotatable'],
                            rotateAngle  : blockData['rotateAngle'],
                            block_height : blockData['height'],
                            block_width  : blockData['width'],
                            deleted      : blockData['deleted']
                        };

                        var properties = {};

                        if ( $( this ).hasClass( 'text' ) ) {
                            _data[blockData['block_name']] = {};
                            if ( 'text' == blockData['type'] || 'textflow' == blockData['type'] ) {
                                _data[blockData['block_name']] = blockDataCtnr.pqUnescape();

                                var fontsize = blockData['font_size_default'],
                                        custom_rules = blockData['custom_rules'],
                                        allow_automatically_zoom = parseInt( custom_rules['allow_automatically_zoom'] );

                                if ( ! blockData['changed_font_size'] && ! allow_automatically_zoom )
                                    fontsize = blockData['font_size_original'];

                                properties = {
                                    fontname        : blockData['font'],
                                    fontsize        : fontsize,
                                    fillcolor       : blockData['fillcolor'],
                                    colorspace      : blockData['colorspace'],
                                    underline       : blockData['underline'],
                                    italic          : blockData['italic'],
                                    bold            : blockData['bold'],
                                    alignment       : blockData['alignment'],
                                    valignment      : blockData['valignment'],
                                    opacityfill     : blockData['opacityfill'],
                                    text_block_type : blockData['type']
                                }
                            }
                        }

                        if ( $( this ).hasClass( 'image' ) ) {

                            var draggable_img = blockDataCtnr.find( 'img' ).getjWindowCrop(),
                                    cropX = 0,
                                    cropY = 0,
                                    cropW = 0,
                                    cropH = 0,
                                    focalX = 0,
                                    focalY = 0,
                                    workingPercent = null,
                                    leftSlider = null;

                            if ( typeof (draggable_img) != 'undefined' ) {
                                cropX = draggable_img.result.cropX;
                                cropY = draggable_img.result.cropY;
                                cropW = draggable_img.result.cropW;
                                cropH = draggable_img.result.cropH;
                                focalX = draggable_img.focalPoint.x;
                                focalY = draggable_img.focalPoint.y;
                                workingPercent = draggable_img.workingPercent;
                                leftSlider = blockDataCtnr.find( 'img' ).data( 'left-slider' );
                            }

                            if ( typeof( _data['image'] ) == 'undefined' )
                                _data['image'] = {};
                            if ( typeof( _data['local_images'] ) == 'undefined' )
                                _data['local_images'] = {};
                            if ( blockData['value'].length > 0 ) {
                                _data['local_images'][blockData['block_name']] = blockData['value'];
                            }
                            if ( typeof( blockData['imagePath'] ) != 'undefined' && blockData['imagePath'].length > 0 ) {
                                if ( parseInt( blockData['local_images'] ) == 1 && parseInt( blockData['selectbox'] ) == 1 ) {
                                    _data['local_images'][blockData['block_name']] = blockData['imagePath'];
                                }
                                else {
                                    _data['image'][blockData['block_name']] = blockData['imagePath'];
                                }
                            }

                            properties = {
                                sepia                   : blockData['sepia'],
                                greyscale               : blockData['greyscale'],
                                flip_horizontal         : blockData['flip_horizontal'],
                                flip_vertical           : blockData['flip_vertical'],
                                flip_both               : blockData['flip_both'],
                                invert                  : blockData['invert'],
                                circle                  : blockData['circle'],
                                resizePercentage        : blockData['page_resize_percentageW'],
                                resizePercentage_width  : blockData['page_resize_percentageW'], //pdf height is in pt so we transform to px(*0.75)
                                resizePercentage_height : blockData['page_resize_percentageH'],
                                block_height            : blockData['height'],
                                block_width             : blockData['width'],
                                cropX                   : cropX,
                                cropY                   : cropY,
                                cropW                   : cropW,
                                cropH                   : cropH,
                                focalX                  : focalX,
                                focalY                  : focalY,
                                workingPercent          : workingPercent,
                                leftSlider              : leftSlider,
                                image_block_type        : blockData['type'],
                                other_infos             : typeof(blockData['other_infos']) == 'object' ? blockData['other_infos'] : {}
                            }
                        }

                        $.extend( _data[blockData['block_name'] + '_properties'], properties );
                    }
                } );
            }

            return _data;
        },
        makeTablesData            : function( tablesContainer, options ) {
            var o = PP._O( options ),
                    _data = {};
            if ( $.type( tablesContainer ) == 'object' && tablesContainer.length > 0 ) {
                $.each( tablesContainer, function( index, value ) {
                    _data[index] = $( this ).printqTablePlugin( 'makePreviewData' );
                } );
            }

            return _data;
        },
        serializeBlocksData       : function( blocksContainer, options ) {
            var o = PP._O( options ),
                    _data = {};

            if ( $.type( blocksContainer ) == 'object' && blocksContainer.length > 0 ) {
                $.each( blocksContainer, function() {
                    var dataContainer = $( this ).find( '.block_data:first' );

                    if ( dataContainer.length > 0 ) {
                        _data[dataContainer.data( 'block_name' )] = $.extend( {}, dataContainer.data() );

                        if ( $( this ).hasClass( 'text' ) ) {
                            _data[dataContainer.data( 'block_name' )]['value'] = dataContainer.html();
                        }

                        if ( $( this ).hasClass( 'image' ) ) {
                            var draggable_img = dataContainer.find( 'img' ).getjWindowCrop();
                            var focalX = 0,
                                    focalY = 0,
                                    workingPercent = null,
                                    leftSlider = null;

                            if ( typeof (draggable_img) != 'undefined' ) {
                                focalX = draggable_img.focalPoint.x;
                                focalY = draggable_img.focalPoint.y;
                                workingPercent = draggable_img.workingPercent,
                                        leftSlider = dataContainer.find( 'img' ).data( 'left-slider' );
                            }

                            _data[dataContainer.data( 'block_name' )]['focalX'] = focalX;
                            _data[dataContainer.data( 'block_name' )]['focalY'] = focalY;
                            _data[dataContainer.data( 'block_name' )]['workingPercent'] = workingPercent;
                            _data[dataContainer.data( 'block_name' )]['leftSlider'] = leftSlider;
                        }

                        _data[dataContainer.data( 'block_name' )]['defaults'] = null;
                    }

                } );
            }

            return _data;
        },
        serializeTablesData       : function( tablesContainer, options ) {
            var o = PP._O( options ),
                    _data = {};

            if ( $.type( tablesContainer ) == 'object' && tablesContainer.length > 0 ) {
                $.each( tablesContainer, function( t, v ) {
                    var _self = $( this );
                    _selfData = _self.data(),
                            hot = _self.handsontable( 'getInstance' ),
                            tableData = {},
                            rows = hot.countRows(),
                            cols = hot.countCols();
                    tableData['top'] = _selfData['top'];
                    tableData['left'] = _selfData['left'];
                    tableData['width'] = 0;
                    tableData['height'] = 0;
                    tableData['tCols'] = cols;
                    tableData['tRows'] = rows;
                    tableData['data'] = hot.getData();
                    tableData['rows'] = {};
                    tableData['colsWidth'] = [];
                    tableData['rowHeights'] = [];
                    tableData['mergeCells'] = [];
                    for ( var r = 0; r < rows; r ++ ) {
                        tableData['rows'][r] = {};
                        tableData['rows'][r]['cols'] = {};
                        for ( var c = 0; c < cols; c ++ ) {
                            tableData['rows'][r]['cols'][c] = {};

                            var cellMeta = hot.getCellMeta( r, c ),
                                    cell = _self.find( 'tbody > tr:eq(' + r + ') > td:eq(' + c + ')' ),
                                    rowSpan = cell.attr( 'rowspan' ),
                                    colSpan = cell.attr( 'colspan' ),
                                    mergeDetails = {
                                        row     : r,
                                        col     : c,
                                        rowspan : rowSpan != undefined ? rowSpan : 1,
                                        colspan : colSpan != undefined ? colSpan : 1
                                    };

                            tableData['rows'][r]['cols'][c]['cellMeta'] = {};

                            $.each( cellMeta, function( n, v ) {
                                if ( o.tableCellProp.indexOf( n ) != - 1 ) {
                                    tableData['rows'][r]['cols'][c]['cellMeta'][n] = v;
                                }
                            } );

                            tableData['rows'][r]['cols'][c]['data'] = hot.getDataAtCell( r, c );
                            tableData['rows'][r]['cols'][c]['colwidth'] = hot.getColWidth( c );
                            tableData['rows'][r]['cols'][c]['rowheight'] = cell.height();

                            tableData['rows'][r]['cols'][c]['rowSpan'] = mergeDetails['rowspan'];
                            tableData['rows'][r]['cols'][c]['colSpan'] = mergeDetails['colspan'];

                            if ( mergeDetails['rowspan'] > 1 || mergeDetails['colspan'] > 1 ) {
                                tableData['mergeCells'].push( mergeDetails );
                            }

                            if ( r == 0 ) {
                                tableData['width'] += tableData['rows'][r]['cols'][c]['colwidth'];
                                tableData['colsWidth'][c] = tableData['rows'][r]['cols'][c]['colwidth'];
                            }
                            if ( c == 0 ) {
                                tableData['height'] += tableData['rows'][r]['cols'][c]['rowheight'];
                                tableData['rowHeights'][r] = tableData['rows'][r]['cols'][c]['rowheight'];
                            }
                        }
                    }

                    _data[t] = tableData;
                } );
            }

            return _data;
        },
        serializeProject          : function( options ) {
            var o = PP._O( options ),
                    _data = {};

            if ( typeof(_data['pages']) == 'undefined' )
                _data['pages'] = {};

            $.each( $( o.pagesContainer ), function( page_no, pageIdentifier ) {
                var pageContainer = $( pageIdentifier ),
                        thisPageData = {};

                thisPageData['type'] = pageContainer.data( 'type' );       // template or layput
                thisPageData['id'] = pageContainer.data( 'id' );         //layout_id or template_id
                thisPageData['page_no'] = pageContainer.data( 'page_no' );    // pdf page number
                thisPageData['template_page'] = pageContainer.data( 'template_page' );    // template page number
                thisPageData['custom_rules'] = pageContainer.data( 'custom_rules' );    // pdf custom rules
                thisPageData['template_id'] = templateId;                       // product template_id
                thisPageData['index'] = $.printqEditorPagination.getPageIndex( pageContainer ); // current page index
                var blocks_data = PP.serializeBlocksData( pageContainer.find( o.blocksContainer ) );
                var tables_data = PP.serializeTablesData( pageContainer.find( o.tablesContainer ) );
                blocks_data['is_page'] = true;
                thisPageData['blocks_data'] = blocks_data;
                thisPageData['tables_data'] = tables_data;

                _data['pages'][page_no] = thisPageData;
                _data['tid'] = templateId;

            } );

            return _data;
        },
        saveFrame                 : function( options ) {
            var o = $.extend( {}, PP.defaults, options );
            if ( allowSaveFrame ) {
                var uid = $.printqUniqueId( {prefix : 'loading_', sufix : '_saveFrame', length : 6} );

                $.q( o.mask ).prinqLoading( 'start', uid );
                var project_data = PP.serializeProject( o );

                $.printqAjaxRequest.postRequest( {
                    url        : saveFrameUrl,
                    data       : {
                        selection    : urlSelection,
                        template_id  : templateId,
                        project_data : project_data
                    },
                    onComplete : (function( uid, o ) {
                        return function( response ) {
                            if ( typeof (o.callback) == 'function' )
                                o.callback();
                            $.q( o.mask ).prinqLoading( 'stop', uid );
                        }
                    })( uid, o ),
                    onFail     : (function( uid, o ) {
                        return function() {
                            if ( typeof (o.callback) == 'function' )
                                o.callback();
                            console.log( 'save failed' );
                            $.q( o.mask ).prinqLoading( 'stop', uid );
                        }
                    })( uid, o )
                } );
            }
            else {
                if ( typeof (o.callback) == 'function' )
                    o.callback();
            }
            return true;
        },
        loadFrame                 : function( options ) {
            if ( allowSaveFrame && isSaveFrame ) {
                var o = $.extend( {}, PP.defaults, options ),
                        uid = $.printqUniqueId( {prefix : 'loading_', sufix : '_loadFrame', length : 6} );

                $.q( o.mask ).prinqLoading( 'start', uid );

                $.printqAjaxRequest.postRequest( {
                    url        : loadFrameUrl,
                    data       : {
                        selection   : urlSelection,
                        template_id : templateId
                    },
                    onComplete : (function( uid, o ) {
                        return function( response ) {
                            if ( typeof (response.success) != 'undefined' && response.success ) {

                                if ( ! $.isEmptyObject( response.result ) && typeof (response.result.pages) != 'undefined' ) {
                                    var pages = response.result.pages;

                                    loadPagesStatus = {
                                        pages      : [],
                                        loaded     : true,
                                        success    : true,
                                        message    : '',
                                        messageBox : null,
                                        uid        : $.printqUniqueId( {prefix : 'loading_', sufix : '_loadPagesStatus', length : 6} )
                                    };

                                    $.printqEditorOperator.loadData( response.result, loadPagesStatus, {} );
                                }
                            }
                            else {
                                $.printqConfigurator.showContainer();
                            }
                            $.q( o.mask ).prinqLoading( 'stop', uid );
                        }
                    })( uid, o ),
                    onFail     : (function( uid, o ) {
                        return function() {
                            console.log( 'delete fail' );
                            $.q( o.mask ).prinqLoading( 'stop', uid );
                            $.printqConfigurator.showContainer();
                        }
                    })( uid, o )
                } );
            }
            else {
                $.printqConfigurator.showContainer();
                $.printqTablePlugin.initDefaultTables();
            }
            return true;
        },
        clearSavedFrame           : function( options ) {
            var o = $.extend( {}, PP.defaults, options );

            if ( allowSaveFrame ) {

                $.printqAjaxRequest.postRequest( {
                    url        : clearSavedFrameUrl,
                    data       : {
                        selection   : urlSelection,
                        template_id : templateId
                    },
                    onComplete : (function( o ) {
                        return function( response ) {
                            if ( typeof (o.callback) == 'function' )
                                o.callback();
                        }
                    })( o ),
                    onFail     : (function( o ) {
                        return function() {
                            if ( typeof (o.callback) == 'function' )
                                o.callback();
                        }
                    })( o )
                } );
            }
            else {
                if ( typeof (o.callback) == 'function' )
                    o.callback();
            }
            return true;
        }
    } );
})( window.jQuery );
//$.printqFineUploader
! (function( $ ) {
    var PFU = $.printqFineUploader = {};
    $.extend( PFU, {
        defaults : {
            fineUploader : '.myphotosC'
        },
        _O       : function( o ) {
            return $.extend( {}, PFU.defaults, o );
        },
        init     : function( o ) {
            var o = PFU._O( o ),
                    fineuploader = $( o.fineUploader ),
                    uid = $.printqUniqueId( {prefix : 'loading_', sufix : '_uploadImageFineUploader', length : 6} )
                    f = fineuploader.fineUploader( {
                        request     : {
                            endpoint : uploadUserPhotoUrl,
                            params   : {
                                id              : 'randomid',
                                createThumbnail : 1,
                                width           : 'auto',
                                height          : 150,
                                other_infos     : { type : 'editorUpload'}
                            }
                        },
                        autoUpload  : true,
                        multiple    : ! isSafari,
                        text        : {
                            uploadButton : uploadBottonText,
                            dragZone     : dragZoneText
                        },
                        validation  : {
                            allowedExtensions : fineuploader.attr( 'data-validate' ) ?
                                                [fineuploader.attr( 'data-validate' )] : ['jpeg', 'jpg', 'png', 'gif']
                        },
                        template    : '<div class="qq-uploader">' +
                                      '<div class="qq-upload-drop-area"><span>{dragZoneText}</span></div>' +

                                      '<span class="qq-drop-processing"><span>{dropProcessingText}</span><span class="qq-drop-processing-spinner"></span></span>' +
                                      '<ul class="qq-upload-list"></ul>' +
                                      '</div>',
                        showMessage : function( message ) {
                            alert( message );
                        }
                    } )
                            .on( 'submit',
                                    (function( uid ) {
                                        return function( id, name ) {
                                            $( '#loading-mask' ).prinqLoading( 'start', uid );
                                        }
                                    })( uid )
                            )
                            .on( 'complete',
                                    (function( uid ) {
                                        return function( event, id, fileName, responseJSON ) {
                                            var target = $( uploaderObj );
                                            if ( responseJSON.success ) {
                                                var image_src = uploadedDirPath + uploadPhotoDirName + '/' + responseJSON.path,
                                                        img = $( "<img/>" ),
                                                        uid1 = $.printqUniqueId( {prefix : 'loading_', sufix : '_uploadImageFineUploaderComplete', length : 6} );
                                                $( '#loading-mask' ).prinqLoading( 'start', uid1 );
                                                img.imagesLoaded().always(
                                                        (function( image_src, responseJSON, uploadPhotoTrigger, uid ) {
                                                            if ( 'toolbar' == uploadPhotoTrigger ) {
                                                                var settings = {
                                                                    imagePath   : uploadPhotoDirName + '/' + responseJSON.path,
                                                                    image_src   : image_src,
                                                                    other_infos : {type : 'editorUploadToolbar'}
                                                                }
                                                                $.printqImageEditor.setImageToBlock( settings );
                                                            }
                                                            //if ('emptyImageContainer' == uploadPhotoTrigger )
                                                            $.openeditorImagePicker.updateImagePicker();
                                                            $( '#loading-mask' ).prinqLoading( 'stop', uid );
                                                        })( image_src, responseJSON, uploadPhotoTrigger, uid1 )
                                                );
                                                img.attr( "src", image_src )
                                                img.attr( "id", responseJSON.path );
                                            }
                                            else {
                                                alert( errorMsgTxt );
                                            }
                                            $( '#loading-mask' ).prinqLoading( 'stop', uid );
                                        }
                                    })( uid )
                            ).on( 'fail',
                                    (function( uid ) {
                                        return function() {
                                            $( '#loading-mask' ).prinqLoading( 'stop', uid );
                                        }
                                    })( uid )
                            );
        }
    } )
})( window.jQuery );
//$.printqDroppable
! (function( $ ) {
    var PD = $.printqDroppable = {};
    $.extend( PD, {
        defaults    : {
            droppable : '#c'
        },
        _O          : function( o ) {
            return $.extend( {}, PD.defaults, o );
        },
        init        : function( o ) {
            var o         = PD._O( o ),
                droppable = $.q( o.droppable );
            droppable.droppable( {
                destroy : true,
                drop    : function( event, ui ) {
                    var dataType      = ui.draggable.attr( "data-type" );
                    var dataName      = ui.draggable.attr( "data-name" );
                    var imageSettings = ui.draggable.data();

                    if ( dataType == "upload_image" ) {
                        fabric.Image.fromURL( ui.draggable.data( 'workingImage' ),
                                (function( event,ui,imageSettings ) {
                                    return function( img ) {
                                        var currentPos = canvas.getPointer(event);
                                        img.set( {
                                            originX          : 'center',
                                            originY          : 'center',
                                            designerOptions  : {
                                                type             : 'image',
                                                workingImage     : imageSettings['workingImage'],
                                                originalWidth    : imageSettings['width'],
                                                originalHeight   : imageSettings['height'],
                                                actualWidth      : img.width,
                                                actualHeight     : img.height,
                                                imageLocation    : imageSettings['imageFullName'],
                                                imageName        : imageSettings['name']
                                            }
                                        } );
                                        img.set( {left:currentPos.x, top:currentPos.y} );
                                        img = PD.resizeImage( img );
                                        canvas.add( img );
                                        pushUndoData( [
                                            {
                                                objectId : img.objectID,
                                                added    : img,
                                                type     : 'image'
                                            }
                                        ] );
                                        update_iframe();

                                    }
                                })(event, ui,imageSettings ));
                    }
                    else {
                        var currentPos = ui.helper.position();
                        var currentPos = ui.helper.offset();
                        if ( dataType == "background" ) {
                            canvas.clear();
                            text = new fabric.Text( 'loading your theme...', {
                                fontFamily : 'CA_BND_Web_Bold_700',
                                fill       : '#404140',
                                left       : (canvas.width - 100) / 2,
                                top        : 250,
                                scaleX     : (0.5 * canvasScale),
                                scaleY     : (0.5 * canvasScale)
                            } );

                            canvas.add( text );
                            var interval = 0;
                            var myInterval = setInterval( function() {
                                interval ++;
                                if ( interval === 20 ) {
                                    clearInterval( myInterval );
                                }
                                canvas.renderAll();
                                canvas.renderAll();
                            }, 10 );

                            var dataLocation = ui.draggable.attr( "data-location" );
                            var fileToLoad = PD.searchVal( dataLocation, themesGlobal );
                            canvas.viewportTransform = [1, 0, 0, 1, 0, 0];
                            canvas.renderAll();
                            selectTheme( dataLocation );
                        }
                        else {
                            addElementToCanvas(event, ui );
                        }
                    }
                }
            } );
        },
        searchVal   : function( nameKey, myArray ) {
            for ( var i = 0; i < myArray.length; i ++ ) {
                if ( myArray[i].id === nameKey ) {
                    return myArray[i];
                }
            }
        },
        resizeImage : function( image ) {
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
        }
    } );
})( window.jQuery );



