/*
 * Responsible for performing the ast generation.
 */
var JsDriverGenerator = function(abstGenerator) {
	
	var abstractGenerator;
	
	var l = require('../src/logger.js').get('JsDriverGenerator');
	
	if (!abstGenerator) {
		var AbstractGenerator = require("../src/abstract-generator.js");
		abstractGenerator = new AbstractGenerator();
	} else {
		abstractGenerator = abstGenerator;
	}
	
	
	var generateTestCodeAST = function(sourceCodeAst) {
		l.info("Generating test code...");
		
		l.debug("\n" + JSON.stringify(sourceCodeAst, null, 4) );
		
		l.info("Generating test code...");
	};
	
	return {
		generateTestCodeAST: generateTestCodeAST,
		abstractGenerator: abstractGenerator
	};
};

module.exports = JsDriverGenerator;