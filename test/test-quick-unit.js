var a = require('assert');

var l = console.log;


var test_quickUnitComplete = function() {
	
	quickUnit = require('../src/quick-unit.js');
	
	quickUnit.generateTestToFile('samples/src/fact.js', 'samples/generated/test-fact.js');
	
	quickUnit.generateTestsToDir('samples/src/', 'samples/generated/');
};


exports.run = function() {
	test_quickUnitComplete();
};

