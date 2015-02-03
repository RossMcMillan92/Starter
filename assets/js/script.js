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