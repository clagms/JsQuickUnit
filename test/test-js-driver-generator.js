var a = require('assert');

var makeGenerator = require('../src/generator.js');
var makeJsDriverGenerator = require('../src/js-driver-generator.js');
var parser = require('../src/parser.js');
var fileSystem = require('../src/file-system.js');

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



exports.run = function() {
	testGeneratorExists();
};

