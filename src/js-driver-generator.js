/*
 * Responsible for performing the ast generation.
 */
var makeJsDriverGenerator = function(specP) {
	
	var a = require("assert");
	
	var _ = require('underscore');
	
	var spec = specP || {};
	
	var sourceFile = "";
	
	var that = {};
	
	that.updateSrcFile = function(srcFile) {
		sourceFile = srcFile;
	};
	
	var l = spec.logger || require('../src/logger.js').get('JsDriverGenerator');
	
	var getFileName = function(sourceFile) {
		var fileNameWithExtension = _.last(sourceFile.split('/'));
		var fileName = fileNameWithExtension.slice(0, fileNameWithExtension.length - 3);
		return fileName;
	};
	
	var getTestCaseName = function() {
		if (sourceFile) {
			return getFileName(sourceFile) + "TestCase";
		} else {
			return "TestCase";
		}
	};
	
	that.generatePreambleCode = function(sourceCodeAst) {
		return _.template('var <%= testName %> = TestCase("<%= testName %>");', {
			testName : getTestCaseName()
		});
	};
	
	that.generateCodeFromTest = function(test, sourceCodeAst) {
		var code = '';
		
		code += _.template('<%= testCaseName %>.prototype.test_<%= testName %> = function() {', {
			testName: test.testName,
			testCaseName: getTestCaseName() 
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