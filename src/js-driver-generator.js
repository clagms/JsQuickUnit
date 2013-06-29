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
		return "Preamble Code!";
	};
	
	that.generateCodeFromTest = function(test, sourceCodeAst) {
		return "Code From Test!";
	};
	
	that.generatePostambleCode = function(sourceCodeAst) {
		return "Postamble Code!";
	};
	
	return that;
};

module.exports = makeJsDriverGenerator;