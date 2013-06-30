var QuickUnit = function() {
	
	var jsDriver = require('../src/js-driver-generator.js')();
	var generator = require('../src/generator.js')(jsDriver);
	var parser = require('../src/parser.js')();
	var fileSystem = require('../src/file-system.js')();

	
	var generateTestToFile = function(srcFile, testFile) {
		var codeString = fileSystem.readFile(srcFile);
		
		var topLevelNode = parser.parse(codeString);
		
		var testCode = generator.generateTestCodeAST(topLevelNode);
		
		var prettyTestCode = parser.beautify(testCode);
		
		fileSystem.writeFile(testFile, prettyTestCode);
	};
	
	return {
		generateTestToFile: generateTestToFile
	};
}();

module.exports = QuickUnit;
