var Tools = require('./tools');

function customDropdown(dropdown){
	this.dropdown = dropdown;
	this.parent = Tools.getParent(this.dropdown);
	this.currentValue = this.dropdown.value;
	this.currentValueText = this.dropdown.querySelector('[value="'+this.dropdown.value+'"]').innerHTML;

	this.createMarkup();
	this.bindEvents();
}

customDropdown.prototype.createMarkup = function() {
	var frag = document.createDocumentFragment(),
		wrapper = document.createElement('div'),
		face = document.createElement('div'),
		clone = this.dropdown.cloneNode(true);

	wrapper.className = 'custom-dropdown';
	face.className = (clone.getAttribute('data-class') || '') + ' custom-dropdown__face';
	face.innerHTML = this.currentValueText;
	clone.classList.add('custom-dropdown__original');

	wrapper.appendChild(face);
	wrapper.appendChild(clone);
	frag.appendChild(wrapper);

	this.parent.replaceChild(frag, this.dropdown);

	this.dropdown = clone;
	this.face = face;
};

customDropdown.prototype.bindEvents = function() {
	var self = this;

	function onDropdownChange(){
		var newData = self.dropdown.querySelector('[value="'+self.dropdown.value+'"]').innerHTML;

		self.face.innerHTML = newData;
	}
	this.dropdown.addEventListener('change',onDropdownChange,false);
};

module.exports = customDropdown;