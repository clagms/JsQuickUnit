var a = require('assert');

var jsDriverGenerator = require('../src/js-driver-generator.js');
var parser = require('../src/parser.js');
var fileSystem = require('../src/file-system.js');

var testGeneratorExists = function() {

	var generator = jsDriverGenerator();
	
	a(generator);
	a.deepEqual(generator, generator);
	
	var p2 = jsDriverGenerator();
	
	a.notEqual(generator, p2);
	
	a.notDeepEqual(generator, p2);
	
	a(generator.generateTestCodeAST);
	a(generator.abstractGenerator);
	
};

var testTransform = function() {

	var generator = jsDriverGenerator();
		
	var parserInstance = parser();
	var fs = fileSystem();
	
	var codeString = fs.readFile("./samples/src/inc.js");
	var codeAST = parserInstance.parse(codeString);
	
};

exports.run = function() {
	testGeneratorExists();
	testTransform();
};

