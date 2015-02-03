/* ----------------

	Example:

	var responsiveImage = require('./modules/responsiveImage'),
		images = querySelectorAll('[data-img-src]');

	for (var i = images.length - 1; i >= 0; i--) {
		new responsiveImage({
			element: images[i]
		});
	};

---------------- */

function ResponsiveImage(options){
	this.element = options.element;
	this.srcAttr = options.srcAttr || 'data-img-src';
	this.imgSrc = this.element.getAttribute(this.srcAttr);
	this.classAttr = options.classAttr || 'data-img-class';
	this.className = this.element.getAttribute(this.classAttr);
	this.altAttr = options.altAttr || 'data-img-alt';
	this.alt = this.element.getAttribute(this.altAttr);

	this.imgSrcSplit = this.imgSrc.split('.');
	this.imgType = this.imgSrc.split('.')[this.imgSrcSplit.length -1 ];

	this.imgWidths = options.imgWidths || [150, 480, 1024, 1226]; // standard wp sizes
	this.imgHeights = options.imgHeights || [150, 293, 624, 748];
	this.imgWidths = this.imgWidths.sort(function(a,b){return a-b}).reverse();
	this.imgHeights = this.imgHeights.sort(function(a,b){return a-b}).reverse();

	this.targetHeight = null; // set in fn below
	this.targetWidth = this.checkWidth();
	
	this.replaceImage();
}

// returns the correct width/height for the screen width
ResponsiveImage.prototype.checkWidth = function() {
	var Tools = require('./tools'),
		windowWidth = Tools.windowSize().width;

	for (var i = this.imgWidths.length - 1; i >= 0; i--) {
		var imgWidth = this.imgWidths[i];

		if(windowWidth <= imgWidth) {
			this.targetHeight = this.imgHeights[i];
			return imgWidth;
		} 
	};

	this.targetHeight = false;
	return false;
};

// replace the placeholder div with the image
ResponsiveImage.prototype.replaceImage = function() {
	var parent = this.element.parentNode,
		image = new Image(),
		originalSrc = this.imgSrc,
		newSrc;

	image.onerror = function(){
		this.imgSrc = image.src = originalSrc;
	}

	if(this.targetWidth !== false){
		newSrc = this.imgSrcSplit.slice(0, this.imgSrcSplit.length -1).join('.') + '-' + this.targetWidth + 'x' + this.targetHeight + '.' + this.imgType;
		this.imgSrc = decodeURI(newSrc);
	}

	image.src = this.imgSrc;
	image.className = this.className;
	image.alt = this.alt;

	parent.replaceChild(image, this.element);

};

module.exports = ResponsiveImage;