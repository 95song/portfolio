$(document).ready(function(){

//	$('.left_quick').delay(3800).fadeIn(1000)

	// $('.gnb').mouseover(function(){
	// 	$('.navi,.ham').addClass('over')
	// })
	// $('.gnb').mouseleave(function(){
	// 	$('.navi,.ham').removeClass('over')
	// })

	$('.main_over').mouseover(function(){
		$('.main_img_box,.main_tit2,.main_txt_box').addClass('over')
	})
	$('.main_over').mouseleave(function(){
		$('.main_img_box,.main_tit2,.main_txt_box').removeClass('over')
	})

	$(".premium_content").mouseover(function() {
		var idx = $(this).index();
		$(".premium_bg").removeClass("active");
		$(".premium_bg").eq(idx).addClass("active");
		$(".premium_content").removeClass("active");
		$(".premium_content").eq(idx).addClass("active");
		$('.premium_vd_box').addClass('hide')
		$(".premium_thumb_box").addClass("hide");
	});
	$('.premium_content').mouseleave(function(){
		$(".premium_thumb_box").removeClass("hide");
		$('.premium_bg').removeClass('active')
		$('.premium_content').removeClass('active')
	})

	$('.footer_bt').click(function(){
		$('.privacy_pop_wrap').addClass('active')
		$('.privacy_pop_bg').addClass('active')
	})
	$('.privacy_close').click(function(){
		$('.privacy_pop_wrap').removeClass('active')
		$('.privacy_pop_bg').removeClass('active')
	})


	// $('.call,.tel p').mouseover(function(){
	// 	$('.tel').addClass('active')
	// })
	// $('.call,.tel p').mouseleave(function(){
	// 	$('.tel').removeClass('active')
	// })

	// $('body.sub .navi,body.sub .ham').addClass('white')
	$('body .navi,body .ham').addClass('white')
	$('body.sub .navi,body.sub .ham,body.sub .right_scroll_wrap').delay(0).fadeIn(1000);

	$('.right_scroll span').animate({'opacity':'1'},0,function bb(){
		$(this).delay(0).animate({'top':'9rem'},1800,function(){
			$(this).css({'top':'0','opacity':'0'})
			$(this).animate({'opacity':'1'},700,bb)
		})
	})

	// $('.intro_content').mouseover(function(){
	// 	$('#cursor').addClass('drag')
	// 	$('.cursor_skip').addClass('drag')
	// })
	// $('.intro_content').mouseleave(function(){
	// 	$('#cursor').removeClass('drag')
	// 	$('.cursor_skip').removeClass('drag')
	// })

	$('.slide_drag').mouseover(function(){
		$('#cursor').addClass('drag')
		$('.cursor_skip').addClass('drag')
	})
	$('.slide_drag').mouseleave(function(){
		$('#cursor').removeClass('drag')
		$('.cursor_skip').removeClass('drag')
	})
	$('.slide_drag2').mouseover(function(){
		$('#cursor').addClass('drag2')
	})
	$('.slide_drag2').mouseleave(function(){
		$('#cursor').removeClass('drag2')
	})
	$('.cursor_cick').mouseover(function(){
		$('#cursor').addClass('click')
	})
	$('.cursor_cick').mouseleave(function(){
		$('#cursor').removeClass('click')
	})
		 
	$('.main_box.box01').mouseover(function(){
		$('.main_box').addClass('active')
	})
	$('.main_box.box01').mouseleave(function(){
		$('.main_box').removeClass('active')
	})
	$('.main_box.box02').mouseover(function(){
		$('.main_box').addClass('active2')
	})
	$('.main_box.box02').mouseleave(function(){
		$('.main_box').removeClass('active2')
	})
	$('.main_box.box03').mouseover(function(){
		$('.main_box').addClass('active3')
	})
	$('.main_box.box03').mouseleave(function(){
		$('.main_box').removeClass('active3')
	})
	

	const cursor = document.querySelector('#cursor');
	const cursorCircle = cursor.querySelector('.cursor__circle');

	const mouse = { x: -100, y: -100 }; // mouse pointer's coordinates
	const pos = { x: 0, y: 0 }; // cursor's coordinates
	const speed = 0.2; // between 0 and 1

	const updateCoordinates = e => {
	  mouse.x = e.clientX;
	  mouse.y = e.clientY;
	}

	window.addEventListener('mousemove', updateCoordinates);


	function getAngle(diffX, diffY) {
	  return Math.atan2(diffY, diffX) * 180 / Math.PI;
	}

	function getSqueeze(diffX, diffY) {
	  const distance = Math.sqrt(
		Math.pow(diffX, 2) + Math.pow(diffY, 2)
	  );
	  const maxSqueeze = 0.15;
	  const accelerator = 1500;
	  return Math.min(distance / accelerator, maxSqueeze);
	}


	const updateCursor = () => {
	  const diffX = Math.round(mouse.x - pos.x);
	  const diffY = Math.round(mouse.y - pos.y);
	  
	  pos.x += diffX * speed;
	  pos.y += diffY * speed;
	  
	  const angle = getAngle(diffX, diffY);
	  const squeeze = getSqueeze(diffX, diffY);
	  
	  const scale = 'scale(' + (1 + squeeze) + ', ' + (1 - squeeze) +')';
	  const rotate = 'rotate(' + angle +'deg)';
	  const translate = 'translate3d(' + pos.x + 'px ,' + pos.y + 'px, 0)';

	  cursor.style.transform = translate;
	  cursorCircle.style.transform = rotate + scale;
	};

	function loop() {
	  updateCursor();
	  requestAnimationFrame(loop);
	}

	requestAnimationFrame(loop);



	const cursorModifiers = document.querySelectorAll('[cursor-class]');

	cursorModifiers.forEach(curosrModifier => {
	  curosrModifier.addEventListener('mouseenter', function() {
		const className = this.getAttribute('cursor-class');
		cursor.classList.add(className);
	  });
	  
	  curosrModifier.addEventListener('mouseleave', function() {
		const className = this.getAttribute('cursor-class');
		cursor.classList.remove(className);
	  });
	});


	$('.main_wrap').delay(0).animate({'opacity':'1'},0,function(){
		$(this).addClass('intro2')
		$(this).delay(2600).animate({'opacity':'1'},0,function(){
            $(this).addClass('intro2')
            $(this).delay(2200).animate({'opacity':'1'},0,function(){
                $(this).addClass('intro3')
				$(this).delay(1500).animate({'opacity':'1'},0,function(){
					$(this).addClass('intro4')
                    $(this).delay(3000).animate({'opacity':'1'},0,function(){
                        $(this).addClass('intro5')
                        $(this).delay(0).animate({'opacity':'1'},0,function(){
                            $(this).addClass('intro6')
                            $(this).delay(0).animate({'opacity':'1'},0,function(){
                                $(this).addClass('intro7')
                                $(this).delay(500).animate({'opacity':'1'},0,function(){
                                    $(this).addClass('intro8')
                                    $(this).delay(2500).animate({'opacity':'1'},0,function(){
                                        $(this).addClass('intro9')
                                        $('body.main .navi,body.main .ham, .top').delay(1000).fadeIn(1000);
                                        $(this).delay(1000).animate({'opacity':'1'},0,function(){
											$('.top').show();
                                            $('.cursor_skip2').removeClass('show')
                                            $('.main_skip_wrap').delay(0).fadeOut(0)
                                            $('.intro_bg_box').delay(0).fadeOut(1000)
                                            $('.main_tit,.main_tit2,.main_tit3').delay(0).fadeOut(0)
                                            $(this).addClass('intro10')
                                            $('.main_wrap,.main_guest').addClass('on');
                                            setTimeout(function() {
                                                $('.main_wrap').addClass('end');
                                            }, 800);
                                            $('body').off('scroll touchmove mousewheel');
                                        })
                                    })
                                })
                            })
                        })
                    })
				})
            })
		})
	})
    $('.main_skip_wrap').delay(0).animate({'opacity':'1'},0,function(){
        $(this).fadeIn(1000)
        $('.cursor_skip2').addClass('show')
    })
    $('.main_skip_bt').click(function(){
        $('body.main .navi,body.main .ham, .top').delay(300).fadeIn(1000);
		$('.top').show();
        $('.cursor_skip2').removeClass('show')
        $('.main_skip_wrap').delay(0).fadeOut(0)
        $('.intro_bg_box').delay(0).fadeOut(1000)
        $('main_tit2').delay(0).fadeOut(0)
		$('.main_wrap').addClass('intro intro2 intro3 intro4 intro5 intro6 intro7 intro8 intro9');
		$(this).delay(300).animate({'opacity':'1'},0,function(){
            $('.main_wrap').addClass('intro10 on');
            setTimeout(function() {
                $('.main_wrap').addClass('end');
            }, 800);
			$('body').off('scroll touchmove mousewheel');
		})
    })
	

	$('.top .button').click(function(){
		$('body,html').animate({'scrollTop':'0'},400)
	})

	ham = 0
	$('.ham').click(function(){
		if( ham == 0 ){  
			ham = 1; 
			$(this).addClass("active");
			$('.site_wrap,.site_bg').addClass("active");
		}
		else if ( ham == 1 ){
			ham = 0;
			$(this).removeClass("active");
			$('.site_wrap,.site_bg').removeClass("active");
		}
	})


	const trigger = new ScrollTrigger.default({
	  trigger: {
			// once: true,
			offset: {
            element: {
                x: 0,
                y: 0.05
            },
//			viewport: {
//                x: 0,
//                y: (trigger, frame, direction) => {
//                    return trigger.visible ? 0 : 0.3
//                }
//             }
        },
		toggle:{
			class:{
				in:'active',
				out:'inactive'
			}
		}

	  }
	});
	trigger.add('[data-active]')
//			.add('[data-slideInBottom]')
//			.add('[data-fadeIn]')
//			.add('[data-slideInBottom]')

win_w = $(window).width();
if ( win_w > 1400 ){

	$(document).on('click', '.top .button', function(){
		$.fn.fullpage.moveTo(1);
		$('.navi,.ham,.right_scroll_wrap').addClass('white');
		$('.main_wrap').addClass('on');
		setTimeout(function() {
			$('.main_wrap').addClass('end');
		}, 800);
		$('.main_wrap,.location_wrap,.premium_wrap,.complex_wrap,.comm_wrap,.unit_wrap,.brand_wrap').removeClass('active2 end2 end3 end4 end5 end6 end7 end8 on2 on3 on4 on5 on6 on7 on8')
	});

//main
	var full_move = true;
	$("#section1111").on("DOMMouseScroll mousewheel wheel", function(event,delta){
		$.fn.fullpage.setAllowScrolling(false);
		$.fn.fullpage.setKeyboardScrolling(false);
		if (delta > 0) {
			if($('.main_wrap').hasClass('end') == true){
				// $.fn.fullpage.moveTo(1);
			} else if($('.main_wrap').hasClass('end2') == true){
				$('.main_wrap').removeClass('on2 end2').addClass('on');
				setTimeout(function() {
					$('.main_wrap').addClass('end');
				}, 800);
			}
		} else if (delta < 0) {
			if($('.main_wrap').hasClass('end2') == true){
				$.fn.fullpage.moveTo(2);
			} else if($('.main_wrap').hasClass('end') == true){
				$('.main_wrap').removeClass('on end').addClass('on2');
				setTimeout(function() {
					$('.main_wrap').addClass('end2');
				}, 800);
			}
		}
	});

//location
	var full_move = true;
	$("#section4").on("DOMMouseScroll mousewheel wheel", function(event,delta){
		$.fn.fullpage.setAllowScrolling(false);
		$.fn.fullpage.setKeyboardScrolling(false);
		if (delta > 0) {
			if($('.complex_wrap').hasClass('end') == true){
				$.fn.fullpage.moveTo(3);
			} else if($('.complex_wrap').hasClass('end2') == true){
				$('.complex_wrap').removeClass('end2 active2').addClass('on');
				setTimeout(function() {
					$('.complex_wrap').removeClass('on2').addClass('end');
				}, 800);
			}
		} else if (delta < 0) {
			if($('.complex_wrap').hasClass('end2') == true){
				$.fn.fullpage.moveTo(5);
			} else if($('.complex_wrap').hasClass('end') == true){
				$('.complex_wrap').removeClass('end').addClass('active2 on2');
				setTimeout(function() {
					$('.complex_wrap').removeClass('on').addClass('end2');
				}, 800);
			}
		}
	});


	$('#fullpage').fullpage({
		
//		responsiveWidth: 1400,
		navigation: true,
		// anchors: ['main','location','community','calendar','ff','aa','cc','info'],
		'verticalCentered': true,
		'css3': true,
		'navigation': false,
		scrollingSpeed: 800,
	
		'afterLoad': function(anchorLink, index){

			// if ($('.section').is('.active')){
	    	// 	var sec = $(this).attr('id');
			// 	$('#'+sec).addClass('on');
            //     setTimeout(function() {
            //         $('#'+sec).addClass('end');
            //     }, 800);
	    	// }
			
			if(index == 1){
			} else {
				// $('.main_wrap').removeClass('on');
			}

			if(index == 2){			
				$.fn.fullpage.setAllowScrolling(true);
				$.fn.fullpage.setKeyboardScrolling(true);	
			} else {

			}

			if(index == 3){
				$.fn.fullpage.setAllowScrolling(true);
				$.fn.fullpage.setKeyboardScrolling(true);
			}else {

			}

			if(index == 4){
			}else {

			}
			
			if(index == 5){
				$.fn.fullpage.setAllowScrolling(true);
				$.fn.fullpage.setKeyboardScrolling(true);
			}else {

			}
			
			if(index == 6){
			}else {
			}
				
//	
//						if(index == 4){
//						}
//						else {			
//						}



		},
		'onLeave' : function (index, nextIndex, direction){

			if (index == 1 && direction == 'down'){
				$('.navi,.ham,.right_scroll_wrap').addClass('white');
                $('.main_wrap').removeClass('end');
                setTimeout(function() {
                    $('.main_wrap').removeClass('on');
                }, 800);
				$('.premium_wrap').addClass('on');
				setTimeout(function() {
					$('.premium_wrap').addClass('end');
				}, 800);
			};

			if (index == 2 && direction == 'up'){
				// $('.navi,.ham,.right_scroll_wrap').removeClass('white');
				$('.main_wrap').addClass('on');
				setTimeout(function() {
					$('.main_wrap').addClass('end');
				}, 800);
                $('.premium_wrap').removeClass('end');
                setTimeout(function() {
                    $('.premium_wrap').removeClass('on');
                }, 800);

			} else if (index == 2 && direction == 'down'){
				$('.navi,.ham,.right_scroll_wrap').removeClass('white');
				$('.location_wrap').addClass('on');
				setTimeout(function() {
					$('.location_wrap').addClass('end');
				}, 800);
                $('.premium_wrap').removeClass('end');
                setTimeout(function() {
                    $('.premium_wrap').removeClass('on');
                }, 800); 	
			};

			if (index == 3 && direction == 'up'){
				$('.navi,.ham,.right_scroll_wrap').addClass('white');
				$('.premium_wrap').addClass('on');
				setTimeout(function() {
					$('.premium_wrap').addClass('end');
				}, 800);
                $('.location_wrap').removeClass('end');
                setTimeout(function() {
                    $('.location_wrap').removeClass('on');
                }, 800);               
			} else if (index == 3 && direction == 'down'){
				$('.navi,.ham,.right_scroll_wrap').addClass('white');
				$('.complex_wrap').addClass('on');
				setTimeout(function() {
					$('.complex_wrap').addClass('end');
				}, 800);
                $('.location_wrap').removeClass('end');
                setTimeout(function() {
                    $('.location_wrap').removeClass('on');
                }, 800);   
			};
            
			if (index == 4 && direction == 'up'){
				$('.navi,.ham,.right_scroll_wrap').removeClass('white');
                $('.location_wrap').addClass('on');
                setTimeout(function() {
                    $('.location_wrap').addClass('end');
                }, 800);
                $('.complex_wrap').removeClass('end');
                setTimeout(function() {
                    $('.complex_wrap').removeClass('on');
                }, 800);             
			} else if (index == 4 && direction == 'down'){
				$('.navi,.ham,.right_scroll_wrap').removeClass('white');
				$('.comm_wrap').addClass('on');
				setTimeout(function() {
					$('.comm_wrap').addClass('end');
				}, 800);
                $('.complex_wrap').removeClass('end');
                setTimeout(function() {
                    $('.complex_wrap').removeClass('on');
                }, 800);   
			};
            
			// if (index == 5 && direction == 'up'){
            //     $('.complex_wrap').addClass('on');
            //     setTimeout(function() {
            //         $('.complex_wrap').addClass('end');
            //     }, 800);
            //     $('.unit_wrap').removeClass('end');
            //     setTimeout(function() {
            //         $('.unit_wrap').removeClass('on');
            //     }, 800);             
			// } else if (index == 5 && direction == 'down'){
			// 	$('.navi,.ham,.right_scroll_wrap').removeClass('white');
			// 	$('.comm_wrap').addClass('on');
			// 	setTimeout(function() {
			// 		$('.comm_wrap').addClass('end');
			// 	}, 800);
            //     $('.unit_wrap').removeClass('end');
            //     setTimeout(function() {
            //         $('.unit_wrap').removeClass('on');
            //     }, 800);   
			// };
            
			if (index == 5 && direction == 'up'){
				$('.navi,.ham,.right_scroll_wrap').addClass('white');
                $('.complex_wrap').addClass('on2');
                setTimeout(function() {
                    $('.complex_wrap').addClass('end2');
                }, 800);
                $('.comm_wrap').removeClass('end');
                setTimeout(function() {
                    $('.comm_wrap').removeClass('on');
                }, 800);             
			} else if (index == 5 && direction == 'down'){
				$('.navi,.ham,.right_scroll_wrap').addClass('white');
				$('.brand_wrap').addClass('on');
				setTimeout(function() {
					$('.brand_wrap').addClass('end');
				}, 800);
                $('.comm_wrap').removeClass('end');
                setTimeout(function() {
                    $('.comm_wrap').removeClass('on');
                }, 800);   
			};

			if (index == 6 && direction == 'up'){
				$('.navi,.ham,.right_scroll_wrap').removeClass('white');
                $('.comm_wrap').addClass('on');
                setTimeout(function() {
                    $('.comm_wrap').addClass('end');
                }, 800);
                $('.brand_wrap').removeClass('end');
                setTimeout(function() {
                    $('.brand_wrap').removeClass('on');
                }, 800);
			} else if (index == 6 && direction == 'down'){
                // $('.brand_wrap').removeClass('end');
                // setTimeout(function() {
                //     $('.brand_wrap').removeClass('on');
                // }, 800);        
				$('.footer').addClass('on end');
				$('header,.ham,.right_scroll_wrap').fadeOut();        				
			};

			if (index == 7 && direction == 'up'){
				// $('.brand_wrap').addClass('on');
				// setTimeout(function() {
				// 	$('.brand_wrap').addClass('end');
				// }, 800);
				$('.footer').removeClass('on');
				setTimeout(function() {
					$('.footer').removeClass('end');
				}, 800);
				$('header,.ham,.right_scroll_wrap').fadeIn();
			} else if (index == 7 && direction == 'down'){
			};

//			if (index == 5 && direction == 'up'){				
//				$('header,.right_scroll_wrap').fadeIn();
//			} else if (index == 5 && direction == 'down'){
//
//			};

		},

	});

}


$(window).scroll(function(){

	sc = $(window).scrollTop();


	if ( sc>21 )
	{
		$('.navi').addClass('active')
		$('.ham').addClass('active2')
	}
	if ( sc<21 )
	{
		$('.navi').removeClass('active')
		$('.ham').removeClass('active2')
	}
/* 
	if( val <= sc ){
		$('.footer_guest').addClass('active');
	} else {
		$('.footer_guest').removeClass('active');
	}

*/

});

});