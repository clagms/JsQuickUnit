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
