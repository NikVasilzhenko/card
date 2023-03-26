$(document).ready(function(){
	//browsers
	if (navigator.userAgent.search(/Safari/) > 0) {$('body').addClass('safari');};
	if (navigator.userAgent.search(/Firefox/) > 0) {$('body').addClass('fierfox');};
	if (navigator.userAgent.search(/MSIE/) > 0 || navigator.userAgent.search(/NET CLR /) > 0) {$('body').addClass('ie');};
	if (navigator.userAgent.search(/Chrome/) > 0) {$('body').addClass('chrome');};
	if (navigator.userAgent.search(/YaBrowser/) > 0) {$('body').addClass('yandex');};
	if (navigator.userAgent.search(/OPR/) > 0) {$('body').addClass('opera');};
	if (navigator.userAgent.search(/Konqueror/) > 0) {$('body').addClass('konqueror');};
	if (navigator.userAgent.search(/Iceweasel/) > 0) {$('body').addClass('iceweasel');};
	if (navigator.userAgent.search(/SeaMonkey/) > 0) {$('body').addClass('seamonkey');};
	if (navigator.userAgent.search(/Edge/) > 0) {$('body').addClass('edge');};
	
	//preloader
	var iter = 0;
	var loaded = false;
	$(window).on('load', function(){
		loaded = true;
	});
	var print = function numbPrint(){
		$('#js-persents').html(iter);
		iter = iter + 1;
		if( iter > 100){
			clearInterval(inter);
			if(loaded){
				$('#js-preloader').addClass('hide');
				function playVideo(){
					$('#js-video').addClass('show');
					if($(window).width() > 767){
						$('#js-video')[0].play();
					}					
				}
				setTimeout(playVideo, 1000);
			} else{
				$(window).on('load', function(){
					loaded = true;
					$('#js-preloader').addClass('hide');
					function playVideo(){
						$('#js-video').addClass('show');
						if($(window).width() > 767){
							$('#js-video')[0].play();
						}
					}
					setTimeout(playVideo, 1000);
				});
			}
		}
	}
	var inter = setInterval(print, 80);
	
	//formstyller init
	$(document).ready(function(){ 
		$(function() {
			$('select').styler({
				selectSearch: true,
			});
		});
	});
	
	//fullpage init
	if($(window).width() > 767){	
		$('#fullpage').fullpage({
			sectionSelector: '.vertical-scrolling',
			navigation: false,
			slidesNavigation: false,
			controlArrows: false,
			css: true,
			anchors: ['pre-order-crypterium-card', 'your-money-your-way', 'there-are-no-limits', 'join-the-future'],
			scrollingSpeed: 1000,
			scrollOverflow: false,
			loopTop: false,
			loopBottom: false,
			loopHorizontal: false,
			onLeave : function (index, nextIndex, direction) {
				var titleNumb = '.blc--slide-' + nextIndex + ' .blc-title span'
				setTimeout(function(){
					var title1 = new TimelineMax();
					title1.staggerFromTo(titleNumb, 1.25,
					{ease: Back.easeInOut.config(1.7), opacity: 0, x: -150},
					{ease: Back.easeInOut.config(1.7), opacity: 1, x: 0}, -0.05);
				}, 10);
			}
		});		
	}
	
	
	//form
	$('#js-order-btn').on('click', function(){
		$('#js-up').addClass('open');
	});
	
	$('.js-val[name="tel"]').on('focus', function(){
		if(!($('.js-val[name="tel"]').val())){
		   $('.js-val[name="tel"]').val('+')
		}
	});
	$('.js-val[name="tel"]').on('blur', function(){
		if($.trim($('.js-val[name="tel"]').val()) == '+'){
		   $('.js-val[name="tel"]').val('')
		}
	});
	
	
	$('.js-form-val').on('submit', function(e){
    	e.preventDefault();
    
        var form = $(this),
            fields = $(form).find('.js-val'),
			validName = false, 
			validEmail = false, 
			validCountry = false,
			validTel = false,
			valid = false;
		
		if (!$.trim($('.js-val[name="full-name"]').val())){
            $('.js-val[name="full-name"]').addClass('error');
            validName = false;            
        } else{
			$('.js-val[name="full-name"]').removeClass('error');
			$('.js-val[name="full-name"]').closest('.js-label').addClass('check');
            validName = true; 
		}
		
		if (!$.trim($('.js-val[name="tel"]').val())){
            $('.js-val[name="tel"]').addClass('error');
            validTel = false;            
        } else{
			$('.js-val[name="tel"]').removeClass('error');
			$('.js-val[name="tel"]').closest('.js-label').addClass('check');
            validTel = true; 
		}
		
		if (!$.trim($('.js-val[name="email"]').val())){
        	$('.js-val[name="email"]').addClass('error');
            validEmail = false;            
        } else if($('.js-val[name="email"]').val().indexOf('@')<0){
    		$('.js-val[name="email"]').addClass('error');
            validEmail = false;
  		} else if($('.js-val[name="email"]').val().indexOf('@') != $('.js-val[name="email"]').val().lastIndexOf('@')){
			$('.js-val[name="email"]').addClass('error');
            validEmail = false;
  		} else if($('.js-val[name="email"]').val().indexOf('.')<0){
  			$('.js-val[name="email"]').addClass('error');
            validEmail = false;
  		} else if($('.js-val[name="email"]').val().lastIndexOf('.') < $('.js-val[name="email"]').val().indexOf('@')){
			$('.js-val[name="email"]').addClass('error');
            validEmail = false;
  		} else {
            $('.js-val[name="email"]').removeClass('error');
			$('.js-val[name="email"]').closest('.js-label').addClass('check');
			validEmail = true;
        }
		
		if(($('select[name="country"] option:selected').length) && ($('select[name="country"] option').filter(':selected').index() != 0 ) ){
			$('select[name="country"]').removeClass('error');
			$('select[name="country"]').closest('.js-label').addClass('check');
			validCountry = true;
		} else{
			$('select[name="country"]').addClass('error');
			validCountry = false;
			
		}
		
//		if (!$.trim($('.js-val[name="tel-code"]').val())){
//            $('.js-val[name="tel-code"]').addClass('error');
//            validCode = false;            
//        } else{
//			$('.js-val[name="tel-code"]').removeClass('error');
//			$('.js-val[name="tel-code"]').closest('.js-label').addClass('check');
//            validCode = true; 
//		}
		
		if(validTel != true){
			$('.js-val[name="tel"]').addClass('error');
		} else{
			$('.js-val[name="tel"]').closest('.js-label').addClass('check');
		}


		if( (validName == true) && (validEmail = true) && (validCountry = true)){
			valid = true;
		}
		
		
		
		
		
		
		
		
		
    
    
            if (valid){
               $.ajax({
    				url: "...",
    				type: "POST",
    				response: "HTML",
    				data: $(this).serialize(), 
				    headers: {
						"X_Authorization": "...",
						"X_UserId":"..."
					},
                    success: function(data) {
    					$('#js-up').addClass('ready');
                    },
    				error: function() {
    					console.log("submit error");
    				}
    			});
            } else{
				$('#js-message').html('Oops! Please fill in required information.')
			}
        });
    $('.js-val').on('keypress', function(){
        $(this).removeClass('error');
    });
});




