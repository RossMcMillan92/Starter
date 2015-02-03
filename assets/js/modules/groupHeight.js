/*----------------------------------
    Group Height
    Makes items within a group the same height

    example:

    var GroupHeight = require('./modules/groupHeight.js'),
		ResponsiveHelper = require('./modules/responsiveHelper.js'),

		parents = querySelectorAll('.js-height-group');

	for (var i = parents.length - 1; i >= 0; i--) {
		var parentEl = parents[i];

		ResponsiveHelper.resizeProxy(function(){
			GroupHeight(parentEl, '.js-height-item');
		}, true);
	};
		
----------------------------------*/

var Tools = require('./tools.js'),

	GroupHeight = module.exports = function(parent, itemSelector, options){
	var items = parent.querySelectorAll(itemSelector),
		largest = 0,
		windowWidth = Tools.windowSize().width;

	for (var i = items.length - 1; i >= 0; i--) {
		var item = items[i],
			itemHeight = item.offsetHeight;

		if(itemHeight > largest) largest = itemHeight;
	};
	for (var i = items.length - 1; i >= 0; i--) {
		var item = items[i],
			adjustHeightAbove = item.getAttribute('data-adjust-height-above'),
			newHeight = largest;

		if(windowWidth < adjustHeightAbove) newHeight = 0;

		item.style.minHeight = newHeight + 'px';		
	};
}