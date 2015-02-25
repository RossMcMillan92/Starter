var Lightbox = module.exports = (function(){

	"use strict";

	var instance;

	function lightbox(){

		var $body = document.body,
			Tools = require('./tools'),

			$lightbox,
			$lightbox__bgclose,
			$lightbox__content,
			$lightbox__close,

			isBuilt = false,
			isHidden = false,

			animateTime = .3; // s

		function _build(){
			if(isBuilt) return false;

			var $$lightbox = document.createElement('div'),
				$$lightbox__bgclose = document.createElement('div'),
				$$lightbox__wrapper = document.createElement('div'),
				$$lightbox__content = document.createElement('div'),
				$$lightbox__close = document.createElement('div');

			$$lightbox.className = 'lightbox';
			$$lightbox__bgclose.className = 'lightbox__bgclose';
			$$lightbox__wrapper.className = 'lightbox__wrapper';
			$$lightbox__content.className = 'lightbox__content';
			$$lightbox__close.className = 'lightbox__close';

			$$lightbox__close.innerHTML = '&times;';

			$$lightbox__wrapper.appendChild($$lightbox__content);
			$$lightbox__wrapper.appendChild($$lightbox__close);

			$$lightbox.appendChild($$lightbox__bgclose);
			$$lightbox.appendChild($$lightbox__wrapper);

			document.body.appendChild($$lightbox);

			$lightbox = $$lightbox;
			$lightbox__bgclose = $$lightbox__bgclose;
			$lightbox__content = $$lightbox__content;
			$lightbox__close = $$lightbox__close;

			_bindings();

			isBuilt = true
			return isBuilt;
		}

		function _bindings(){
			$lightbox__bgclose.addEventListener('click', _destroy);
			$lightbox__close.addEventListener('click', _destroy);
		}

		function _insertData(data){
			// insert data to lightbox__content
			$lightbox__content.innerHTML = data;
		}

		function _show(){
			// set classes
			$lightbox.classList.remove('is-hidden');
			$body.classList.add('lightbox-is-active');

			setTimeout(function(){
				$lightbox.classList.add('is-visible');
			}, 0)

			isHidden = false
			return true;
		}

		function _hide(){
			if(isHidden) return false;

			// hide dom object
			$lightbox.classList.remove('is-visible');
			$lightbox.classList.add('is-hidden');
			$body.classList.remove('lightbox-is-active');

			isHidden = true
			return true;
		}

		function _destroy(){
			if(!isBuilt) return false;

			_hide();
			setTimeout(function(){
				$lightbox.parentNode.removeChild($lightbox);
			}, animateTime * 1000);

			isBuilt = false;
			return true;
		}

		function _ajax(url, callback){
			var ajax = $.ajax(url);

			ajax.done(function(ajaxData){
				runCallbacks(ajaxData);
			});

			ajax.fail(function(){
				runCallbacks('FAILED TO CONNECT')
			})

			function runCallbacks(data){
				if(typeof callback[0] !== "undefined"){
					for (var i = callback.length - 1; i >= 0; i--) {
						callback[i](data);
					};
					return;
				}
				if(typeof callback !== "undefined") callback(data);
			}
		}

		return {
			display: function(data, callback){
				_build();

				function show(){
					if(typeof data !== "undefined"){
						if(typeof data.url !== "undefined"){
							_ajax(data.url, [_insertData, _show]);
						} else {
							_insertData(data);
							_show();
						}
						
					} else {
						return _show();
					}

					if(typeof callback !== "undefined") callback();
				}
				setTimeout(show, 0);
			},

			hide: function(){
				return _hide();
			},

			destroy: function(){
				return _destroy();
			}
		}

	}

	return {
		getInstance: function(){
			if(!instance){
				instance = lightbox();
			}

			return instance;
		}
	}
})();