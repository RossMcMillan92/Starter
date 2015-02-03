
var HeightListener = function(options, callback){
	this.element = options.element;
	this.callback = callback;

	if(typeof callback === "undefined" || typeof this.element === "undefined" || this.element === null) return;

	this.startTime = new Date().getTime();
	this.totalTime = options.totalTime || 7000;
	this.offsetTime = options.offsetTime || 500;
	this.currentHeight = options.element.offsetHeight;


	this.checkHeight();
}

HeightListener.prototype.checkHeight = function() {
	var self = this,

		currentTime = new Date().getTime(),
		newCurrentHeight;

	if(self.startTime + self.totalTime > currentTime) {
		newCurrentHeight = self.element.offsetHeight;

		if(newCurrentHeight != self.currentHeight) {
			self.callback();
			this.currentHeight = newCurrentHeight;
		}

		setTimeout(function(){
			self.checkHeight.apply(self);
		}, self.offsetTime);
	}
};

module.exports = HeightListener;