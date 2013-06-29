var a = require('assert');
var l = require('../src/logger.js');

var makeTest = require('../src/test.js');

var testTestExists = function() {
	
	var dummy = {};
	
	var testInstance = makeTest(dummy);
	
	a(testInstance);
	a.equal(testInstance, testInstance);

	a.deepEqual(testInstance.node, dummy);
	
	var p2 = makeTest(dummy);
	
	a.notEqual(testInstance, p2);
	
	a(testInstance !== p2);
	a(testInstance !== p2);
	a.deepEqual(testInstance, p2);
	
};


exports.run = function() {
	testTestExists();
};

