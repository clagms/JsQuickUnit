/*
 * Responsible for performing the ast generation.
 */
var makeJsDriverGenerator = function(specP) {
	
	var a = require("assert");
	
	var _ = require('underscore');
	
	var spec = specP || {};
	
	var that = {};
	
	var l = spec.logger || require('../src/logger.js').get('JsDriverGenerator');
	
	that.generatePreambleCode = function(sourceCodeAst) {
		return 'TestCase = TestCase("TestCase");';
	};
	
	that.generateCodeFromTest = function(test, sourceCodeAst) {
		var code = '';
		
		code += _.template('TestCase.prototype.test_<%= testName %> = function() {', {
			testName: test.testName
		});
		code += '\n';
		
		_.each(test.withExpressions, function(withExpression) {
			code += withExpression;
			code += '\n';
		});
		
		_.each(test.runExpressions, function(runExpression) {
			code += runExpression;
			code += '\n';
		});
		
		_.each(test.expectExpressions, function(expectExpression) {
			code += expectExpression;
			code += '\n';
		});
		
		code+='};';
		code += '\n';
		
		
		return code;
	};
	
	that.generatePostambleCode = function(sourceCodeAst) {
		return "";
	};
	
	return that;
};

module.exports = makeJsDriverGenerator;