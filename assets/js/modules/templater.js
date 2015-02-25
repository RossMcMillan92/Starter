function Templater(template, data){
	var reg;

	for (prop in data){
		reg = new RegExp('\\{\\{' + prop + '\\}\\}', 'g');

		template = template.replace(reg, data[prop]);
	}

	return template;
}

module.exports = Templater;