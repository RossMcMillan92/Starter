/*----------------------------------
    Element Break
    Will add a class to a target
    if an elements children 
    outgrow the element

    options:
    	brokenClass: 'has-broken',
    	dataAttrName: 'data-children-width'
----------------------------------*/

var ElementBreak = module.exports = function(parent, children, options){
	var targetElement = (options && options.targetElement) || parent,
		brokenClass = (options && options.brokenClass) || 'has-broken',
		dataAttrName = (options && options.dataAttrName) || 'data-children-width',
		containerWidth, childrenWidth;
		
	targetElement.classList.remove(brokenClass);

	containerWidth = parent.offsetWidth,
	childrenWidth = (function(){
		 if(parent.getAttribute(dataAttrName) !== null) return parseInt(parent.getAttribute(dataAttrName));

		 var totalWidth = 0;
		 for (var i = children.length - 1; i >= 0; i--) {
		 	if(typeof children[i] === "number") {
				totalWidth += children[i];
		 	} else {
		 		totalWidth += children[i].offsetWidth;
		 	}
		 };
		 return totalWidth;
	})();

	if(parent.getAttribute(dataAttrName) === null) parent.setAttribute(dataAttrName, childrenWidth);

	if(childrenWidth >= containerWidth && !targetElement.classList.contains(brokenClass)){
		targetElement.classList.add(brokenClass);
	} else if(childrenWidth < containerWidth && targetElement.classList.contains(brokenClass)) {
		targetElement.classList.remove(brokenClass);
	}
}

