/*
 * Responsible for performing the ast generation.
 */
var jsDriverGenerator = function(abstGenerator) {

	var l = require('../src/logger.js').get('JsDriverGenerator');

	if (!abstGenerator) {
		var abstractGeneratorFactory = require("../src/abstract-generator.js");
		this.abstractGenerator = abstractGeneratorFactory();
	} else {
		this.abstractGenerator = abstGenerator;
	}
	
	var astWalkerFactory = require('../src/ast-walker.js');

	var generateTestCodeAST = function(sourceCodeAst) {
		l.info("Generating test code...");

		l.debug("\n" + JSON.stringify(sourceCodeAst, null, 4));

		var visitor = jsDriverGeneratorVisitor();

		var walker = astWalkerFactory(visitor.callback);

		sourceCodeAst.walk(walker);

		l.info("Generating test code...");
	};

	var jsDriverGeneratorVisitor = function() {
		
		var result = {};
		
		result.generatedCode = {};

		result.callback = function(element) {
			var type = element.TYPE;
			l.debug("Visiting element: " + type + "...");
			if (result['visit' + type]) {
				l.debug("Can handle.");
				result['visit' + type].call(result, element);
			} else {
				l.debug("Cannot handle.");
			}
		};

		result.visitToplevel = function(element) {
			l.debug("Visiting Toplevel node...");
			
			l.debug("Visiting Toplevel node... OK");
		};
		
		return result;
	};

	return {
		generateTestCodeAST : generateTestCodeAST,
		abstractGenerator : abstractGenerator,
		jsDriverGeneratorVisitor : jsDriverGeneratorVisitor
	};

};

module.exports = jsDriverGenerator;