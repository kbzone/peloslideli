/**
 * PeloSlideLi - for jQuery 1.3.2
 * @name      peloslideli.v2.0.js
 * @author    Guillermo H. Cabello - http://www.kbzone.com.ar/
 * @version   2.0
 * @date      10-Ene-2010
 * @copyright (c) 2010 Guillermo H. Cabello (http://www.kbzone.com.ar/)
 * @license   MIT - http://es.wikipedia.org/wiki/Licencia_MIT
 * @example   http://www.kbzone.com.ar/PeloSlideLi/ejemplo
*/

(function($) {

	$.fn.PeloSlideLi = function(options){
	  
		// Propiedades predeterminadas
		var defaults = {			
			prevId: 		'prevBtn',
			nextId: 		'nextBtn',	
			pauseId: 		'pauseBtn',	
			playId: 		'playBtn',	
			speed: 			2000,
			autoStart:		true,
			pause:			2000,
			direction:		"vertical"
		}; 
		var options = $.extend(defaults, options);
		
		var SlideLi = this;
		var SlideLiUl = this.find("ul");
		var SlideLiLi = this.find("li");
		
		var position = 0;
		var timeout;

		SlideLi.css({"overflow":"hidden","position":"relative"});
		SlideLiLi.css({"width":SlideLi.css("width"),"height":SlideLi.css("height"),"list-style":"none"});
		SlideLiUl.css({"margin":0,"padding":0,"position":"relative","top":0});
		
		if (options.direction == "vertical")
		{
			var moverSlide = SlideLiUl.height();
			var moverSlideLi = SlideLiLi.height();
		}
		else
		{
			var totalLis = SlideLiLi.length;
			var newWidth = parseInt(SlideLiLi.css("width"));
			newWidth = totalLis * newWidth;
			SlideLiUl.css({"width":newWidth + "px"});			
			SlideLiLi.css({"float":"left"});
			var moverSlide = SlideLiUl.width();
			var moverSlideLi = SlideLiLi.width();
		}
		
		SlideLi.find("." + options.prevId).bind("click", function(event){
			slideLis("prev");
			event.preventDefault();
		});

		SlideLi.find("." + options.nextId).bind("click", function(event){
			slideLis("next");
			event.preventDefault();
		});

		SlideLi.find("." + options.pauseId).bind("click", function(event){
			slidePause();
			event.preventDefault();
		});
		
		SlideLi.find("." + options.playId).bind("click", function(event){
			slidePlay();
			event.preventDefault();
		});

		function slideLis(dir){
			
			clearTimeout(timeout);
			
			if (dir == "next")
			{
				position = position + moverSlideLi;
			}
			else
			{
				position = position - moverSlideLi;
			}
			
			if (position >= moverSlide) { position = 0;}
			if (position < 0) { position = moverSlide - moverSlideLi;}
			
			if (options.direction == "vertical")
			{
				SlideLi.find("ul").animate(
					{ top: "-" + position + "px" }, 
					{ queue:false, duration:options.speed }
				);
			}
			else
			{
				SlideLi.find("ul").animate(
					{ left: "-" + position + "px" }, 
					{ queue:false, duration:options.speed }
				);
			}

			SlideLi.find("." + options.playId).css({"display":"none"});
			SlideLi.find("." + options.pauseId).css({"display":"inline-block"});

			if(options.autoStart){
				timeout = setTimeout(function(){
					slideLis("next");
				},options.pause);
			};
		}
		
		function slidePause ()
		{
			clearTimeout(timeout);
			SlideLi.find("." + options.pauseId).css({"display":"none"});
			SlideLi.find("." + options.playId).css({"display":"inline-block"});
		}
		
		function slidePlay ()
		{
			clearTimeout(timeout);

			SlideLi.find("." + options.pauseId).css({"display":"inline-block"});
			SlideLi.find("." + options.playId).css({"display":"none"});
			
			timeout = setTimeout(function(){
				slideLis("next");
			},options.pause);
		}
		
		if(options.autoStart){;
			timeout = setTimeout(function(){
				slideLis("next");
			},options.pause);
		}
		else
		{
			SlideLi.find("." + options.pauseId).css({"display":"none"});
			SlideLi.find("." + options.playId).css({"display":"inline-block"});
		};

	};
})(jQuery);
