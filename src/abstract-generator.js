/*
 * Contains utilities reusable across all generators.
 */
var makeAbstractQuickUnitGenerator = function(specP) {
	
	var spec = specP || {};
	
	var that = {};
	
	var makeTest = spec.makeTest || require('../src/test.js');
	
	var makeASTWalker = spec.astWalkerFactory || require('../src/ast-walker.js');
	
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

module.exports = makeAbstractQuickUnitGenerator;