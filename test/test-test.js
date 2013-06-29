var a = require('assert');
var l = require('../src/logger.js');

var makeTests = require('../src/test.js');

var testTestExists = function() {
	
	var dummy = {};
	
	var testInstance = makeTests(dummy)[0];
	
	a(testInstance);
	a.equal(testInstance, testInstance);

	a.deepEqual(testInstance.node, dummy);
	
	var p2 = makeTests(dummy);
	
	a.notEqual(testInstance, p2);
	
	a(testInstance !== p2);
	a(testInstance !== p2);
	
};


exports.run = function() {
	testTestExists();
};

