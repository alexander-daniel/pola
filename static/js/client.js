
io = io.connect();

// Send the ready event.
io.emit('ready');

io.on('connect', function(){
	
});

// Listen for the new visitor event.
io.on('new visitor', function() {
    $('.log').append('<p class="medium">dis when you were here. ' + new Date().toString() +'</p>');
});

io.on('outgoing', function(image){
    //$('.gallery').prepend($('<div class="grid__item one-fifth pics"><img src="' + image + '"/></div>'));
	$('<div class="grid__item one-fifth pics"><img src="' + image + '"/></div>').hide().prependTo('.gallery').animate({width: 'toggle'}, function(){
		console.log('fading out');
		$(this).delay(1200).fadeOut(5000);
	});
	$('#btn_snapshot').attr("disabled", false);
    $('#btn_snapshot').removeClass('btn--inactive');
    $('#btn_snapshot').addClass('button');

});


io.on('outgoingsafari', function(image){
	$('<div class="grid__item one-fifth pics"><img src="data:image/png;base64,' + image + '"/></div>').hide().prependTo('.gallerysafari').animate({width: 'toggle'}, function(){
		console.log('fading out');
		$(this).delay(60000).fadeOut(5000);
	});
});
	





