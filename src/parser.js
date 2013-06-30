var makeParser = function() {
	var uglifyjs = require('uglify-js');
	
	var parseCode = function(code) {
		return uglifyjs.parse(code);
	};
	
	var beautify = function(code) {
		var stream = uglifyjs.OutputStream({beautify: true});
		var astNode = parseCode(code);
		astNode.print(stream);
		return stream + '';
	};
	
	return {
		parseCode: parseCode,
		parse: parseCode,
		beautify : beautify
	};
};

module.exports = makeParser;