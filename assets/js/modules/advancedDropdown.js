function advancedDropdown(options){
	this.currentValue = options.currentValue;
	this.mainElement = options.mainElement;
	this.childElements = options.childElements;
	
	this.onChangeFn = options.onChangeFn;
	this.onInitFn = options.onInitFn;

	this.bindEvents();

	if(typeof this.onInitFn !== 'undefined') this.onInitFn();
}

advancedDropdown.prototype.bindEvents = function(value) {
	var self = this;

	function clickEvent(e){
		var value = this.getAttribute('data-value');

		self.updateValue(e, value);
	}

	for (var i = this.childElements.length - 1; i >= 0; i--) {
		var child = this.childElements[i];

		child.addEventListener('click', clickEvent, false);
	};
};

advancedDropdown.prototype.updateValue = function(e, value) {
	this.currentValue = value;

	this.onChangeFn(e, value);
};

module.exports = advancedDropdown;