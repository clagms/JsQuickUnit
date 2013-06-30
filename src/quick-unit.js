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

var QuickUnit = function() {
	
	var jsDriver = require('../src/js-driver-generator.js')();
	var generator = require('../src/generator.js')(jsDriver);
	var parser = require('../src/parser.js')();
	var fileSystem = require('../src/file-system.js')();
	
	var l = console.log;
	
	var generateTestToFile = function(srcFile, testFile) {
		var codeString = fileSystem.readFile(srcFile);
		
		var topLevelNode = parser.parse(codeString);
		
		var testCode = generator.generateTestCodeAST(topLevelNode, {
			sourceFileName: srcFile
		});
		
		if (!testCode) {
			return; //No code, does not generate file.
		}
		
		var prettyTestCode = parser.beautify(testCode);
		
		fileSystem.writeFile(testFile, prettyTestCode);
	};
	
	var isValidFile = function(fileName) {
		return fileName.lastIndexOf(".js") === (fileName.length-3);
	};
	
	var generateTestsToDir = function(srcDir, trgDir) {
		fileSystem.mapEachFile(srcDir, function(file) {
			if (isValidFile(file)) {
				generateTestToFile(srcDir + '/' + file, trgDir + '/test-' + file);				
			}
		});
	};
	
	return {
		generateTestToFile: generateTestToFile,
		generateTestsToDir: generateTestsToDir
	};
}();

module.exports = QuickUnit;
