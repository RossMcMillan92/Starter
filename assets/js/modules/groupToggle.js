/*
	Example: 

	<a href="#" data-toggle-class="header-dropdowns:.js-header-search:is-active">toggle</a>
	
	data-toggle-class="<group-name>:<target-element-select>:<toggle-class>"
*/
module.exports = (function(){

	var groups = {},
		querySelector = function(query){return document.querySelector(query)};

	function add(options){
			var toggleElement = options.element,
				targetArray = toggleElement.getAttribute('data-toggle-class').split(':'),
				targetGroup = targetArray.length === 3 ? targetArray[0] : false,
				targetElement = targetArray.length > 1 ? targetArray[targetArray.length - 2] : toggleElement,
				targetClass = targetArray[targetArray.length - 1];

			if(targetGroup){
				if(typeof groups[targetGroup] === "undefined") groups[targetGroup] = [];
				(groups[targetGroup]).push({
					targetElement: targetElement,
					targetClass: targetClass
				});
			}

			bindEvent(toggleElement, targetGroup, targetElement, targetClass);
	}
									
	function bindEvent(toggleElement, targetGroup, targetElement, targetClass){
		toggleElement.addEventListener('click', function(e){
			e.preventDefault();
			if(targetGroup){
				var isToggled = querySelector(targetElement).classList.contains(targetClass);
				for (var i = groups[targetGroup].length - 1; i >= 0; i--) {
					var groupEl = groups[targetGroup][i];
					querySelector(groupEl['targetElement']).classList.remove(groupEl['targetClass']);
				};
				if(!isToggled) {
					querySelector(targetElement).classList.add(targetClass);
				}
			} else {
				querySelector(targetElement).classList.toggle(targetClass)
			}
			
		}, false);
	}

	return {
		add: function(options){
			add(options);
		}
	}
})();