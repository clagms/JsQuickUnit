var QuickUnitParser = function() {
	var uglifyjs = require('uglify-js');
	
	var parseCode = function(code) {
		return uglifyjs.parse(code);
	};
	
	return {
		parseCode: parseCode,
		parse: parseCode
	};
};

module.exports = QuickUnitParser;