
var Tools = {};

// quick binding fallback for ie
Tools.bind = function(elem, type, func, useCapture){
	elems = typeof elem[0] === "undefined" ? [elem] : elem;
	useCapture = typeof useCapture === "undefined" ? false : useCapture;

	for (var i = elems.length - 1; i >= 0; i--) {
		var elem = elems[i];
		if(typeof elem === "undefined") continue;

		if(document.addEventListener){ 
			elem.addEventListener(type, function(e){
				func.apply(this, [e]);
			}, useCapture)
	    } else {
	        elem.attachEvent('on'+type, function(e){
				func.apply(elem, [e]);
	        });
	    }
	};
}

Tools.stopPropagation = function(e){
	if (e.stopPropagation) e.stopPropagation(); 
	else e.cancelBubble = true;
}
Tools.preventDefault = function(e){
	e.preventDefault ? e.preventDefault() : e.returnValue = false;
}

Tools.getParent = function(elem, className){
	var parentEl = false,
		currentElem = elem,
		className = typeof className !== "undefined" ? className : false;

	if(!className) return currentElem.parentNode;

	while(currentElem.parentNode){
		parentEl = currentElem.parentNode;

		if(parentEl.classList.contains(className)){
			return parentEl;
		}
		currentElem = parentEl;
	}

	return false;
}

Tools.clickClass = function(elem, targets, className){
	if(elem == null) return;
	Tools.bind(elem, 'click', function(e, self){
		e.preventDefault();
		targets = (typeof targets[0] === "undefined") ? [targets] : targets;
		for (var i = targets.length - 1; i >= 0; i--) {
			var target = targets[i] === "this" ? elem : targets[i];

			target.classList.toggle(className);
		};
	})
}

Tools.getQueryVariable = function(url, variable)
{
	var url = url.split('?')[1],
		vars = url.split("&");

	for (var i=0;i<vars.length;i++) {
		var pair = vars[i].split("=");
		if(pair[0] == variable){return pair[1];}
	}
	return(false);
}

Tools.isEmail = function(email){
    return /^([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22))*\x40([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d))*$/.test( email );
}

Tools.ScrollbarWidth = (function (){
    var outer = document.createElement("div");
    outer.style.visibility = "hidden";
    outer.style.width = "100px";
    outer.style.msOverflowStyle = "scrollbar"; // needed for WinJS apps

    document.body.appendChild(outer);

    var widthNoScroll = outer.offsetWidth;
    // force scrollbars
    outer.style.overflow = "scroll";

    // add innerdiv
    var inner = document.createElement("div");
    inner.style.width = "100%";
    outer.appendChild(inner);        

    var widthWithScroll = inner.offsetWidth;

    // remove divs
    outer.parentNode.removeChild(outer);

    return widthNoScroll - widthWithScroll;
})();

Tools.windowSize = function(includeSidebar){
	var w = window,
	    d = document,
	    e = d.documentElement,
	    g = d.getElementsByTagName('body')[0],
	    x = d.documentElement.clientWidth || e.clientWidth || g.clientWidth,
	    y = d.documentElement.clientHeight || e.clientHeight|| g.clientHeight;

	includeSidebar = typeof includeSidebar !== "undefined" ? includeSidebar : true;

	return {
		width: x + (includeSidebar ? Tools.ScrollbarWidth : 0),
		height: y
	}
}

module.exports = Tools;

