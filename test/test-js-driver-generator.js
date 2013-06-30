var a = require('assert');

var makeGenerator = require('../src/generator.js');
var makeJsDriverGenerator = require('../src/js-driver-generator.js');
var makeParser = require('../src/parser.js');
var makeFileSystem = require('../src/file-system.js');

var l = console.log;

var testGeneratorExists = function() {

	var generator = makeJsDriverGenerator();
	
	a(generator);
	a.deepEqual(generator, generator);
	
	var p2 = makeJsDriverGenerator();
	
	a.notEqual(generator, p2);
	
	a(generator.generatePreambleCode);
	a(generator.generateCodeFromTest);
	a(generator.generatePostambleCode);
	
	
};

var test_generatorCompletion = function() {
	
	var generator = makeGenerator(makeJsDriverGenerator());
	
	var parser = makeParser();
	
	var fs = makeFileSystem();
	
	var codeString = fs.readFile("./samples/src/fact.js");
	
	var topLevelNode = parser.parse(codeString);
	
	var code = generator.generateTestCodeAST(topLevelNode);
	
	l(code);
};


exports.run = function() {
	testGeneratorExists();
	test_generatorCompletion();
};

