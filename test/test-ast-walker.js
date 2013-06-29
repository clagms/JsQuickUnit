var a = require('assert');
var l = require('../src/logger.js');

var astWalker = require('../src/ast-walker.js');


var testASTWalkerExists = function() {

	var astwalkerInstance = astWalker(function() {});
	
	a(astwalkerInstance);
	a.equal(astwalkerInstance, astwalkerInstance);
	
	var p2 = astWalker(function() {});
	
	a.notEqual(astwalkerInstance, p2);
	
	a.notDeepEqual(astwalkerInstance, p2);
};


exports.run = function() {
	testASTWalkerExists();
};

