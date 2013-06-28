var a = require('assert');

var AbstractGenerator = require('../src/abstract-generator.js');


var testGeneratorExists = function() {

	var generator = new AbstractGenerator();
	
	a(generator);
	a.deepEqual(generator, generator);
	
	var p2 = new AbstractGenerator();
	
	a.notEqual(generator, p2);
	
};

exports.run = function() {
	testGeneratorExists();
};

