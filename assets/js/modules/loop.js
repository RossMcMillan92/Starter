(function(){
	function Loop() {
		this.frame = this.frame.bind(this);
		this.lastTime = 0;
		this.stopped = false;
		this.callback = function() {};
	}
	Loop.prototype.start = function(callback) {
		this.stopped = false;
		if(typeof callback !== "undefined") this.callback = callback;
		
		requestAnimationFrame(this.frame);
	};
	Loop.prototype.stop = function() {
		this.stopped = true;
	};
	Loop.prototype.frame = function(time) {
		var seconds = (time - this.lastTime) / 1000;
		this.lastTime = time;
		if (seconds < 0.2) this.callback(seconds);
		if (!this.stopped) requestAnimationFrame(this.frame);
	};

	module.exports = new Loop();
})();