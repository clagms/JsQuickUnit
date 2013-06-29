var a = require('assert');
var logger = require('../src/logger');

var testLoggerExists = function() {
	a(logger);
	a.equal(logger, logger);
	
	var l2 = require('../src/logger');
	
	a.equal(logger, l2);
	
	a.deepEqual(logger, l2);
};

var testLoggerInterface = function() {
	a(logger.debug);
	a(logger.info);
	a(logger.warn);
	a(logger.error);
};

var runSomeLogging = function() {
	
};

exports.run = function() {
	testLoggerExists();
	testLoggerInterface();
	runSomeLogging();
};

