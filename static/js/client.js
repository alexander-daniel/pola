/* jshint quotmark: false, maxlen: false */
/* global io, $ */
(function () {
	'use strict';

	io = io.connect();

	// Send the ready event.
	io.emit('ready');

	io.on('connect', function (){
		
	});

	io.on('new visitor', function () {

	});

	io.on('newshapshot', function(image){
		$('<div class="grid__item one-fifth pics"><img src="data:image/png;base64,' + image + '"/></div>')
			.hide()
			.prependTo('.gallerysafari')
			.animate({width: 'toggle'}, function () {
				$(this).delay(12000).fadeOut(5000);
			});
	});

	 $(document).ready(function () {
	 	$('#btn2').click(function () {
	 		snapShot();
	 	});

		$('#webcam').scriptcam({ 
			width: 320,
			height: 240
		});

		$('#btn_snapshot').click(function (){
	    	$('.title_head').slideUp(1000);
		});

		window.chriddyP = function (interval) {
			setInterval(function () {
				snapShot();
			}, interval);
		};
	});

	function snapShot () { 
		io.emit('snapshot', $.scriptcam.getFrameAsBase64());
		$('#btn2').addClass('btn--inactive');
		$('#btn2').removeClass('button');
		$('#btn2').attr('disabled', true);
		setTimeout(enableButton, 5000);

		$('.hide').css({
			top: '-500',
			left: '-500',
			position: 'absolute'
		});
	}

	function enableButton (){
		$('#btn2').removeClass('btn--inactive');
		$('#btn2').addClass('button');
		$('#btn2').attr('disabled', false);
	}
})();

	





