var a = require('assert');

var abstractGenerator = require('../src/abstract-generator.js');


var testGeneratorExists = function() {

	var generator = abstractGenerator();
	
	a(generator);
	a.deepEqual(generator, generator);
	
	var p2 = abstractGenerator();
	
	a.notEqual(generator, p2);
	
};

exports.run = function() {
	testGeneratorExists();
};

