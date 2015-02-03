(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/*
//  Polyfills
=====================================*/
if (!window.console) console = {log: function() {}};

if (!Array.prototype.indexOf)
{
  Array.prototype.indexOf = function(elt /*, from*/)
  {
    var len = this.length >>> 0;

    var from = Number(arguments[1]) || 0;
    from = (from < 0)
         ? Math.ceil(from)
         : Math.floor(from);
    if (from < 0)
      from += len;

    for (; from < len; from++)
    {
      if (from in this &&
          this[from] === elt)
        return from;
    }
    return -1;
  };
};


if (!String.prototype.trim) {
  String.prototype.trim = function () {
    return this.replace(/^\s+|\s+$/g, '');
  };
};

/*! @source http://purl.eligrey.com/github/classList.js/blob/master/classList.js*/
;if("document" in self&&!("classList" in document.createElement("_"))){(function(j){"use strict";if(!("Element" in j)){return}var a="classList",f="prototype",m=j.Element[f],b=Object,k=String[f].trim||function(){return this.replace(/^\s+|\s+$/g,"")},c=Array[f].indexOf||function(q){var p=0,o=this.length;for(;p<o;p++){if(p in this&&this[p]===q){return p}}return -1},n=function(o,p){this.name=o;this.code=DOMException[o];this.message=p},g=function(p,o){if(o===""){throw new n("SYNTAX_ERR","An invalid or illegal string was specified")}if(/\s/.test(o)){throw new n("INVALID_CHARACTER_ERR","String contains an invalid character")}return c.call(p,o)},d=function(s){var r=k.call(s.getAttribute("class")||""),q=r?r.split(/\s+/):[],p=0,o=q.length;for(;p<o;p++){this.push(q[p])}this._updateClassName=function(){s.setAttribute("class",this.toString())}},e=d[f]=[],i=function(){return new d(this)};n[f]=Error[f];e.item=function(o){return this[o]||null};e.contains=function(o){o+="";return g(this,o)!==-1};e.add=function(){var s=arguments,r=0,p=s.length,q,o=false;do{q=s[r]+"";if(g(this,q)===-1){this.push(q);o=true}}while(++r<p);if(o){this._updateClassName()}};e.remove=function(){var t=arguments,s=0,p=t.length,r,o=false;do{r=t[s]+"";var q=g(this,r);if(q!==-1){this.splice(q,1);o=true}}while(++s<p);if(o){this._updateClassName()}};e.toggle=function(p,q){p+="";var o=this.contains(p),r=o?q!==true&&"remove":q!==false&&"add";if(r){this[r](p)}return !o};e.toString=function(){return this.join(" ")};if(b.defineProperty){var l={get:i,enumerable:true,configurable:true};try{b.defineProperty(m,a,l)}catch(h){if(h.number===-2146823252){l.enumerable=false;b.defineProperty(m,a,l)}}}else{if(b[f].__defineGetter__){m.__defineGetter__(a,i)}}}(self))};

// Adapted from https://gist.github.com/paulirish/1579671 which derived from 
// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating

// requestAnimationFrame polyfill by Erik Möller.
// Fixes from Paul Irish, Tino Zijdel, Andrew Mao, Klemen Slavič, Darius Bacon

// MIT license

if (!Date.now)
    Date.now = function() { return new Date().getTime(); };

(function() {
    'use strict';
    
    var vendors = ['webkit', 'moz'];
    for (var i = 0; i < vendors.length && !window.requestAnimationFrame; ++i) {
        var vp = vendors[i];
        window.requestAnimationFrame = window[vp+'RequestAnimationFrame'];
        window.cancelAnimationFrame = (window[vp+'CancelAnimationFrame']
                                   || window[vp+'CancelRequestAnimationFrame']);
    }
    if (/iP(ad|hone|od).*OS 6/.test(window.navigator.userAgent) // iOS6 is buggy
        || !window.requestAnimationFrame || !window.cancelAnimationFrame) {
        var lastTime = 0;
        window.requestAnimationFrame = function(callback) {
            var now = Date.now();
            var nextTime = Math.max(lastTime + 16, now);
            return setTimeout(function() { callback(lastTime = nextTime); },
                              nextTime - now);
        };
        window.cancelAnimationFrame = clearTimeout;
    }
}());

var PROJ = window.PROJ = PROJ || {};

;(function(){

	"use strict";

	var	Tools = require('./modules/tools.js'),
		domready = require('./plugins/domready.js'),

		doc = document,
		body = doc.body,
		querySelector = function(string){
			return doc.querySelector(string);
		},
		querySelectorAll = function(string){
			return doc.querySelectorAll(string);
		},

		clickEvent = 'click';

	// This will run on document ready
	PROJ.init = function(){
		PROJ.miscFunctions();
		
	}

	PROJ.miscFunctions = function(){
		var requireTest = require('./modules/slider')
		console.log('Organise the apps/sites quality code within these functions');
	}

	// Once loaded, run PROJ.init();
	domready(function () {
	  PROJ.init();

	  body.classList.remove('preload');
	})

})();
},{"./modules/slider":2,"./modules/tools.js":3,"./plugins/domready.js":4}],2:[function(require,module,exports){
/* ----------------

	Example:

	var Slider = require('./modules/slider'),
		basicSliders = querySelectorAll('.js-slider');

	for (var i = basicSliders.length - 1; i >= 0; i--) {
		Slider.init(basicSliders[i], {
			autoSlide: 15
		});
	};

---------------- */

Slider = (function(){

	"use strict";

	var Tools = require('./tools.js'),
		Slider;

	Slider = function(element, options){
		var self = this;

		self.options = {
			fadeTime: .5,

			counter: false,
			autoSlide: false,

			slideSelector: 			'js-slide',
			controlLeftSelector: 	'js-control--left',
			controlRightSelector: 	'js-control--right',
			controlRadioSelector: 	'js-control--radio',

			activeClass: 			'is-active',
			outroClass: 			'is-fading-out',
			introClass: 			'is-fading-in',
			autoSlideStartClass: 	'has-started'
		}

		self.$parent = element;
		self.$slides = self.$parent.querySelectorAll('.'+self.options.slideSelector);
		self.$radios = self.$parent.querySelectorAll('.'+self.options.controlRadioSelector);
		self.$controlLeft = self.$parent.querySelectorAll('.'+self.options.controlLeftSelector);
		self.$controlRight = self.$parent.querySelectorAll('.'+self.options.controlRightSelector);

		self.slideNum = self.$slides.length
		self.slideCur = 0;
		self.isFading = false;
		self.slideTimer = false;

		for(var key in options){
			self.options[key] = options[key];
		}

		// fix binding
		self._autoSlide = self._autoSlide.bind(self);

		self._bindControls();
		if(self.options.counter) self._updateCounter();
		if(self.options.autoSlide) {
			self.$parent.classList.add(self.options.autoSlideStartClass);
			self._autoSlide();
		}
	}

	Slider.prototype._bindControls = function() {
		var self = this;

		if(self.$controlLeft.length){
			Tools.bind(self.$controlLeft,'click', function(e){
				e.preventDefault();
				gotoSlide({'scroll': -1})
			});
		}

		if(self.$controlRight.length){
			Tools.bind(self.$controlRight,'click', function(e){
				e.preventDefault();
				gotoSlide({'scroll': 1})
			});
		}

		if(self.$radios.length){
			Tools.bind(self.$radios,'click', function(e){
				e.preventDefault();
				var target = this.getAttribute('data-target_slide');
				gotoSlide({'target': target}, this)
			});
		}

		function gotoSlide(target, radio){
			if(self.isFading) return;
			if(typeof radio !== "undefined"){
				if(radio.classList.contains(self.options.activeClass)) return;
			}
			if(self.slideTimer) clearInterval(self.slideTimer);
			self._slide(target);
			if(self.slideTimer) self._autoSlide();
		}
	}

	Slider.prototype._updateRadios = function() {
		var self = this;

		// reasign radio active class
		for (var i = self.$radios.length - 1; i >= 0; i--) {
			self.$radios[i].classList.remove(self.options.activeClass);
		};
		self.$radios[self.slideCur].classList.add(self.options.activeClass);
	};

	Slider.prototype._updateCounter = function() {
		var self = this,
			$counter = self.$parent.find(self.options.counter);

		$counter.html((self.slideCur + 1) + ' <span class="divider">/</span> '+self.slideNum)
	};

	Slider.prototype._autoSlide = function() {
		var self = this;

		self.slideTimer = setTimeout(function(){
			self._slide({'scroll': 1});
			self._autoSlide()
		}, self.options.autoSlide * 1000);
	};

	Slider.prototype._slide = function(dir){

		var self = this,
			$slideCur = self.$parent.querySelector('.'+self.options.slideSelector+'.'+self.options.activeClass) ? self.$parent.querySelector('.'+self.options.slideSelector+'.'+self.options.activeClass) : self.$slides[0] ,
			slideNew = 	typeof dir['scroll'] !== "undefined"
						? (self.slideCur + dir['scroll'] > (self.slideNum-1) ? 0 : (self.slideCur + dir['scroll'] < 0 ? (self.slideNum-1) : self.slideCur + dir['scroll']))
						: parseInt(dir['target']) >= self.slideNum ? 0 : parseInt(dir['target']),
			$slideNew = self.$slides[slideNew];

		$slideCur.classList.add(self.options.outroClass);
		$slideCur.classList.remove(self.options.activeClass);
		$slideNew.classList.add(self.options.introClass)

		self.isFading = true;

		setTimeout(function(){
			$slideCur.classList.remove(self.options.outroClass);
			$slideNew.classList.remove(self.options.introClass)
			$slideNew.classList.add(self.options.activeClass)

			self.isFading = false;
		}, self.options.fadeTime * 1000);

		self.slideCur = slideNew;
		
		if(self.options.counter) self._updateCounter();
		if(self.$radios.length) self._updateRadios();
	};

    return {
    	init: function(selector, options){
    		return new Slider(selector, options)
    	}
    };
})();

module.exports = Slider;
},{"./tools.js":3}],3:[function(require,module,exports){

var Tools = {};

// quick binding fallback for ie
Tools.bind = function(elem, type, func, useCapture){
	elems = typeof elem[0] === "undefined" ? [elem] : elem;
	useCapture = typeof useCapture === "undefined" ? false : useCapture;

	for (var i = elems.length - 1; i >= 0; i--) {
		var elem = elems[i];
		if(typeof elem === "undefined") continue;

		if(document.addEventListener){ 
			elem.addEventListener(type, function(e){
				func.apply(this, [e]);
			}, useCapture)
	    } else {
	        elem.attachEvent('on'+type, function(e){
				func.apply(elem, [e]);
	        });
	    }
	};
}

Tools.stopPropagation = function(e){
	if (e.stopPropagation) e.stopPropagation(); 
	else e.cancelBubble = true;
}
Tools.preventDefault = function(e){
	e.preventDefault ? e.preventDefault() : e.returnValue = false;
}

Tools.getParent = function(elem, className){
	var parentEl = false,
		currentElem = elem,
		className = typeof className !== "undefined" ? className : false;

	if(!className) return currentElem.parentNode;

	while(currentElem.parentNode){
		parentEl = currentElem.parentNode;

		if(parentEl.classList.contains(className)){
			return parentEl;
		}
		currentElem = parentEl;
	}

	return false;
}

Tools.clickClass = function(elem, targets, className){
	if(elem == null) return;
	Tools.bind(elem, 'click', function(e, self){
		e.preventDefault();
		targets = (typeof targets[0] === "undefined") ? [targets] : targets;
		for (var i = targets.length - 1; i >= 0; i--) {
			var target = targets[i] === "this" ? elem : targets[i];

			target.classList.toggle(className);
		};
	})
}

Tools.getQueryVariable = function(url, variable)
{
	var url = url.split('?')[1],
		vars = url.split("&");

	for (var i=0;i<vars.length;i++) {
		var pair = vars[i].split("=");
		if(pair[0] == variable){return pair[1];}
	}
	return(false);
}

Tools.isEmail = function(email){
    return /^([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22))*\x40([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d))*$/.test( email );
}

Tools.ScrollbarWidth = (function (){
    var outer = document.createElement("div");
    outer.style.visibility = "hidden";
    outer.style.width = "100px";
    outer.style.msOverflowStyle = "scrollbar"; // needed for WinJS apps

    document.body.appendChild(outer);

    var widthNoScroll = outer.offsetWidth;
    // force scrollbars
    outer.style.overflow = "scroll";

    // add innerdiv
    var inner = document.createElement("div");
    inner.style.width = "100%";
    outer.appendChild(inner);        

    var widthWithScroll = inner.offsetWidth;

    // remove divs
    outer.parentNode.removeChild(outer);

    return widthNoScroll - widthWithScroll;
})();

Tools.windowSize = function(includeSidebar){
	var w = window,
	    d = document,
	    e = d.documentElement,
	    g = d.getElementsByTagName('body')[0],
	    x = d.documentElement.clientWidth || e.clientWidth || g.clientWidth,
	    y = d.documentElement.clientHeight || e.clientHeight|| g.clientHeight;

	includeSidebar = typeof includeSidebar !== "undefined" ? includeSidebar : true;

	return {
		width: x + (includeSidebar ? Tools.ScrollbarWidth : 0),
		height: y
	}
}

module.exports = Tools;


},{}],4:[function(require,module,exports){
/*! * domready (c) Dustin Diaz 2012 - License MIT */
!function(e,t){typeof module!="undefined"?module.exports=t():typeof define=="function"&&typeof define.amd=="object"?define(t):this[e]=t()}("domready",function(e){function p(e){h=1;while(e=t.shift())e()}var t=[],n,r=!1,i=document,s=i.documentElement,o=s.doScroll,u="DOMContentLoaded",a="addEventListener",f="onreadystatechange",l="readyState",c=o?/^loaded|^c/:/^loaded|c/,h=c.test(i[l]);return i[a]&&i[a](u,n=function(){i.removeEventListener(u,n,r),p()},r),o&&i.attachEvent(f,n=function(){/^c/.test(i[l])&&(i.detachEvent(f,n),p())}),e=o?function(n){self!=top?h?n():t.push(n):function(){try{s.doScroll("left")}catch(t){return setTimeout(function(){e(n)},50)}n()}()}:function(e){h?e():t.push(e)}});
},{}]},{},[1])