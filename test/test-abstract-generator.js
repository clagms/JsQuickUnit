var a = require('assert');

var makeParser = require('../src/parser.js');

var makeFileSystem = require('../src/file-system.js');

var abstractGenerator = require('../src/abstract-generator.js');

var testGeneratorExists = function() {

	var generator = abstractGenerator();
	
	a(generator);
	a.deepEqual(generator, generator);
	
	var p2 = abstractGenerator();
	
	a.notEqual(generator, p2);
	
};

var test_nodeContainsTestAnnotation = function() {

	var generator = abstractGenerator();
	
	var parser = makeParser();
	
	var fs = makeFileSystem();
	
	var codeString = fs.readFile("./samples/src/inc.js");
	
	var topLevelNode = parser.parse(codeString);
	
	a(generator.nodeContainsTestAnnotation(topLevelNode));
	
};

var test_findAllTestAnnotations = function() {

	var generator = abstractGenerator();
	
	var parser = makeParser();
	
	var fs = makeFileSystem();
	
	var codeString = fs.readFile("./samples/src/inc.js");
	
	var topLevelNode = parser.parse(codeString);
	
	generator.nodeContainsTestAnnotation = function(astNode) {
		return true;
	};
	
	a.equal(generator.findAllTestAnnotations(topLevelNode).length, 10);
	
	
	generator.nodeContainsTestAnnotation = function(astNode) {
		return false;
	};
	
	a.equal(generator.findAllTestAnnotations(topLevelNode).length, 0);
	
};




exports.run = function() {
	testGeneratorExists();
	test_nodeContainsTestAnnotation();
	test_findAllTestAnnotations();
};

