/* ----------------

	Example:

	var scrollItems = []''

	scrollItems.push(new ScrollItem({
		element: querySelector('.js-sidemenu-links'),
		stopAnim: 165,
		translateYEnd: -165
	}));

	ResponsiveHelper.add(function(w){
		if(w >= headerScrollBreakpoint){
			Loop.start(loopStart);
		} else {
			Loop.stop();
			for (var i = scrollItems.length - 1; i >= 0; i--) {
				scrollItems[i].reset();
			};
		}
	}, true);

---------------- */

function ScrollItem(options){
	this.element = options.element;
	this.startAnim = options.startAnim || 0;
	this.stopAnim = options.stopAnim;
	
	this.translateYEnd = options.translateYEnd || 0;

	this.scaleStart = options.scaleStart || 1;
	this.scaleEnd = options.scaleEnd || 1;
	this.scaleCurrent = this.scaleStart;
}

ScrollItem.prototype.update = function(scrollTop) {
	var progress = scrollTop <= 0 ? 0 : scrollTop / this.stopAnim,
		newTranslateY,
		newScale, scaleDifference;

	progress = progress >= 1 ? 1 : (progress <= -1 ? -1 : progress);

	newTranslateY = Math.round(this.translateYEnd * progress);
	scaleDifference = this.scaleEnd - this.scaleStart;
	newScale = this.scaleCurrent + (scaleDifference * progress);
	newScale = Math.round(newScale * 100) / 100 // round to two decimal places

	this.element.style.cssText = ' \
		-webkit-transform: translate3d(0,' + newTranslateY + 'px, 0) scale('+ newScale +'); \
			-ms-transform: translate(0,' + newTranslateY + 'px) scale('+ newScale +'); \
			-ms-transform: translate3d(0,' + newTranslateY + 'px, 0) scale('+ newScale +'); \
				transform: translate3d(0,' + newTranslateY + 'px, 0) scale('+ newScale +'); \
		';
};

ScrollItem.prototype.reset = function() {
	this.element.style.cssText = ' \
		-webkit-transform: translate3d(0,0,0) scale(1); \
			-ms-transform: translate3d(0,0,0) scale(1); \
				transform: translate3d(0,0,0) scale(1); \
	';
};

module.exports = ScrollItem;