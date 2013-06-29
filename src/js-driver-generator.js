/*
 * Responsible for performing the ast generation.
 */
var makeJsDriverGenerator = function(specP) {
	
	var a = require("assert");
	
	var _ = require('underscore');
	
	var spec = specP || {};
	
	var that = {};
	
	var l = require('../src/logger.js').get('JsDriverGenerator');
	
	if (!spec.abstGenerator) {
		var abstractGeneratorFactory = require("../src/abstract-generator.js");
		that.abstractGenerator = abstractGeneratorFactory(spec);
	} else {
		that.abstractGenerator = spec.abstGenerator(spec);
	}
	
	that.prototype = that.abstractGenerator;

	that.generateTestCodeAST = function(sourceCodeAst) {
		l.info("Generating test code...");

		l.debug("AST: \n" + JSON.stringify(sourceCodeAst, null, 4));
		
		_.each(that.findAllTestAnnotations(sourceCodeAst), function(test) {
			code += that.generateTestCode(test);
		});

		l.info("Generating test code... OK");
		
		l.debug(code);
		
		return code;
	};
	
	
	
	
	return that;
};

module.exports = makeJsDriverGenerator;