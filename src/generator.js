/*
 * Contains utilities reusable across all generators.
 */
var makeGenerator = function(specP) {
	
	var spec = specP || {};
	
	var that = {};
	
	var makeTest = spec.makeTest || require('../src/test.js');
	
	var l = spec.logger || require('../src/logger.js').get('AbstractGenerator');
	
	var makeASTWalker = spec.astWalkerFactory || require('../src/ast-walker.js');
	
	that.generatePreambleCode = spec.generatePreambleCode || function(sourceCodeAst) {
		throw new Error("This must be provided in spec");
	};
	
	that.generateCodeFromTest = spec.generateCodeFromTest || function(test, sourceCodeAst) {
		throw "This must be provided in spec";
	};
	
	that.generatePostambleCode = spec.generatePostambleCode || function(sourceCodeAst) {
		throw "This must be provided in spec";
	};
	
	that.generateTestCodeAST = function(sourceCodeAst) {
		l.info("Generating test code...");

		l.debug("AST: \n" + JSON.stringify(sourceCodeAst, null, 4));
		
		var code = "";
		
		code += that.generatePreambleCode(sourceCodeAst);
		
		_.each(that.findAllTestAnnotations(sourceCodeAst), function(test) {
			code += that.generateCodeFromTest(test, sourceCodeAst);
		});
		
		code += that.generatePostambleCode(sourceCodeAst);
		
		l.info("Generating test code... OK");
		
		l.debug(code);
		
		return code;
	};
	
	that.findAllTestAnnotations = function(sourceCodeAst) {
		var tests = [];
		astWalkerInstance = makeASTWalker(function(astNode) {
			if (that.nodeContainsTestAnnotation(astNode)) {
				tests.push(makeTest(astNode));
			}
		});
		
		sourceCodeAst.walk(astWalkerInstance);
		
		return tests;
	};
	
	that.nodeContainsTestAnnotation = function(astNode) {
		return true;
	};
	
	
	return that;
};

module.exports = makeGenerator;