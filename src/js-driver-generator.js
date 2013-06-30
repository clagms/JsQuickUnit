/***********************************************************************

  JsQuickUnit - Quickly define and run unit tests in any test framework.
  https://github.com/clagms/JsQuickUnit

  -------------------------------- (C) ---------------------------------

                           Author: Claudio Gomes
                            <cla.gms@gmail.com>

  Distributed under the BSD license:

    Copyright 2013 (c) Claudio Gomes <cla.gms@gmail.com>

    Redistribution and use in source and binary forms, with or without
    modification, are permitted provided that the following conditions
    are met:

        * Redistributions of source code must retain the above
          copyright notice, this list of conditions and the following
          disclaimer.

        * Redistributions in binary form must reproduce the above
          copyright notice, this list of conditions and the following
          disclaimer in the documentation and/or other materials
          provided with the distribution.

    THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDER “AS IS” AND ANY
    EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
    IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
    PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER BE
    LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY,
    OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
    PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
    PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
    THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR
    TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF
    THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF
    SUCH DAMAGE.

 ***********************************************************************/

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