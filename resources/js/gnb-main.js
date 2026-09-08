( function() {
		$(document).ready(function() {

			
			var container = $("#container"),
				header = $("header"),
				naviHeight,
				containerTop;
			

			var myGnb = new gnb();

			var myWindowEvent = $.fn.WndowEvent;

			
			function updatePorp(type){
				myWindowEvent.scrollUpdate();
			}
			
			//=================================== GNB ==========================================
			
			function gnb() {
				

				var navi = $(".navi"),
				    gnb = $(".gnb"),
				    gnbLine = $(".gnb ul li span"),
				    depth1 = $(".gnb>ul>li"),
				    depth2 = $(".gnb ul li ul"),
				    btns = $(".gnb>ul a"),
				    bg = $(".navi-bg"),
				    header = $("header"),
					

				    mBtn = $(".menu-icon"),
				    mMenu = $(".m-menu"),
				    mCloseBtn = $(".m-menu .close");

				this.addBgMotion = function(){
					navi.addClass("motion");
				}

				this.removeBgMotion = function(){
					navi.removeClass("motion");
				}
	
				this.gnbFixed = function(){
					header.css({"position" : "fixed","top" : "0px","left":($("#container").offset().left)+"px"});
				}

				this.gnbUnfixed = function(targetPos){
					header.css({"position" : "relative","top" : targetPos + "px","left":0});
				}

				this.gnbPos = function(){
					if( header.css("position") == "fixed"){
						header.css({"left":($("#container").offset().left)+"px"});
					}else{
						header.css({"left":0});
					}
				}

				this.gnbBgWhite = function(){
					if (navi.hasClass("nochange") == false) {
						navi.addClass("not-working");
						navi.addClass("wh");
					}
				}

				this.gnbBgNoneWhite = function(){
					if (navi.hasClass("nochange") == false) {
						navi.removeClass("not-working");
						navi.removeClass("wh");
					}
				}

				this.mobileMenuClose = function(){
					mobileMenuClose();
				}
				
				init();
				
				function init() {
					defaultSet();
					addEvent();	
				}

				function defaultSet() {
					bg.addClass("motion");
					gnb.addClass("motion");
					depth2.addClass("motion");
					gnbLine.addClass("motion");

					header.css("z-index", 999);
				}


				function addEvent() {

					gnb.bind("mouseenter", function(e) {
						e.preventDefault();

						if (navi.hasClass("nochange") == false && navi.hasClass("not-working") == false)navi.addClass("wh");
						bg.addClass("open");
						gnb.addClass("open");
						depth2.addClass("open");
					});
					
					gnb.bind("mouseleave", function(e) {
						e.preventDefault();

						if (navi.hasClass("nochange") == false && navi.hasClass("not-working") == false)navi.removeClass("wh");
						bg.removeClass("open");
						gnb.removeClass("open");
						depth2.removeClass("open");
					});


					depth1.bind("mouseenter", function(e) {
						gnbLine.eq(depth1.index(this)).addClass("depth1-line-show");
					});
					
					depth1.bind("mouseleave", function(e) {
						gnbLine.eq(depth1.index(this)).removeClass("depth1-line-show");
					});
					

					btns.bind("focus", function(e){
						if (navi.hasClass("nochange") == false && navi.hasClass("not-working") == false)navi.addClass("wh");
						bg.addClass("open");
						gnb.addClass("open");
						depth2.addClass("open");
					});
					
					btns.bind("blur", function(e){
						if (navi.hasClass("nochange") == false && navi.hasClass("not-working") == false)navi.removeClass("wh");
						bg.removeClass("open");
						gnb.removeClass("open");
						depth2.removeClass("open");
					});
					

					mBtn.bind("click", function(e) {
						e.preventDefault();
						mobileMenuOpen();
					});

					mCloseBtn.bind("click", function(e) {
						e.preventDefault();
						mobileMenuClose();
					});
				}


				function mobileMenuOpen() {
					if (mMenu.hasClass("display-block") === false) {
						$("body").addClass("hide");
						$("body").children().not(".full-popup").not("header").css({display:"none"});
						$(".navi").addClass('bgw');
						mMenu.addClass("display-block");
					}
				}


				function mobileMenuClose() {
					if (mMenu.hasClass("display-block") === true) {
						$("body").removeClass("hide");
						$("body").children().not(".full-popup").not("header").css({display:"block"});
						$(".navi").removeClass('bgw');
						mMenu.removeClass("display-block");
					}
				}				

			};
			
		});
	}());
;