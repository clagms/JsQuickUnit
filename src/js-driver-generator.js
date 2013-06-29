/*
 * Responsible for performing the ast generation.
 */
var jsDriverGenerator = function(specP) {
	
	var _ = require('underscore');
	
	var spec = specP || {};
	
	var that = {};
	
	var l = require('../src/logger.js').get('JsDriverGenerator');
	
	if (!spec.abstGenerator) {
		var abstractGeneratorFactory = require("../src/abstract-generator.js");
		that.abstractGenerator = abstractGeneratorFactory();
	} else {
		that.abstractGenerator = spec.abstGenerator();
	}

	var generateTestCodeAST = function(sourceCodeAst) {
		l.info("Generating test code...");

		l.debug("\n" + JSON.stringify(sourceCodeAst, null, 4));
		
		var visitor = jsDriverGeneratorVisitor();
		
		var code = visitor.genCode(sourceCodeAst);

		l.info("Generating test code... OK");
		
		l.debug(code);
		
		return code;
	};
	
	

	var jsDriverGeneratorVisitor = function() {
		
		var thisVisitor= {};
		
		thisVisitor.genCode = function(element) {
			var type = element.TYPE;
			l.debug("Visiting element: " + type + "...");
			if (thisVisitor['genCode' + type]) {
				l.debug("Can handle.");
				return thisVisitor['genCode' + type].call(thisVisitor, element);
			} else {
				l.debug("Cannot handle.");
				throw new Error("Unhandled AST Node of type " + type);
			}
		};

		thisVisitor.genCodeToplevel = function(element) {
			l.debug("Visiting Toplevel node...");

			var code = "";
			
			code += _.template('<%= testCaseName %> = TestCase("<%= testCaseName %>");', {
				testCaseName: "GeneratedTestCase"
			});
			
			_.each(element.body, function(child) {
				code += thisVisitor.genCode(child);
			});
			
			
			l.debug("Visiting Toplevel node... OK");
			
			return code;
		};
		
		thisVisitor.genCodeVar = function(element) {
			l.debug("Visiting Var node...");

			var code = "";
			
			l.debug("Visiting Var node... OK");
			
			return code;
		};
		
		return thisVisitor;
	};
	
	that.generateTestCodeAST = generateTestCodeAST;
	that.jsDriverGeneratorVisitor = jsDriverGeneratorVisitor;
	
	return that;

};

module.exports = jsDriverGenerator;