var a = require('assert');

var JsDriverGenerator = require('../src/js-driver-generator.js');
var Parser = require('../src/parser.js');
var FileSystem = require('../src/file-system.js');

var testGeneratorExists = function() {

	var generator = new JsDriverGenerator();
	
	a(generator);
	a.deepEqual(generator, generator);
	
	var p2 = new JsDriverGenerator();
	
	a.notEqual(generator, p2);
	
	a.notDeepEqual(generator, p2);
	
	a(generator.generateTestCodeAST);
	a(generator.abstractGenerator);
	
};

var testTransform = function() {

	var generator = new JsDriverGenerator();
		
	var parser = new Parser();
	var fs = new FileSystem();
	
	var codeString = fs.readFile("./samples/src/inc.js");
	var codeAST = parser.parse(codeString);
	
	generator.generateTestCodeAST(codeAST);
	
};

exports.run = function() {
	testGeneratorExists();
	testTransform();
};

