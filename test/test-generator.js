var a = require('assert');

var makeParser = require('../src/parser.js');

var makeFileSystem = require('../src/file-system.js');

var makeGenerator = require('../src/generator.js');

var testGeneratorExists = function() {

	var generator = makeGenerator();
	
	a(generator);
	a.deepEqual(generator, generator);
	
	var p2 = makeGenerator();
	
	a.notEqual(generator, p2);
	
	
	
};

var test_nodeContainsTestAnnotation = function() {

	var generator = makeGenerator();
	
	var parser = makeParser();
	
	var fs = makeFileSystem();
	
	var codeString = fs.readFile("./samples/src/inc.js");
	
	var topLevelNode = parser.parse(codeString);
	
	a(generator.nodeContainsTestAnnotation(topLevelNode));
	
};

var test_findAllTestAnnotations = function() {

	var generator = makeGenerator();
	
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

var test_overwriteMethods = function() {

	var generator = makeGenerator();
	
	a.throws(function() {
		generator.generatePreambleCode({});
	}, "Error");
	
	a.throws(function() {
		generator.generatePostambleCode({});
	}, "Error");
	
	a.throws(function() {
		generator.generatePostambleCode({});
	}, "Error");
	
};


var test_generatorCompletion = function() {
	
	var missingMethods = {
			generatePreambleCode: function(codeAst) {
				missingMethods.generatePreambleCode.called = true;
				return true;
			},
			generateCodeFromTest: function(test, sourceCodeAst) {
				missingMethods.generateCodeFromTest.called = true;
				return true;
			},
			generatePostambleCode: function(codeAst) {
				missingMethods.generatePostambleCode.called = true;
				return true;
			}
	};
	
	var generator = makeGenerator(missingMethods);
	
	a(generator.generatePreambleCode());
	a(generator.generatePreambleCode.called);
	
	a(generator.generateCodeFromTest());
	a(generator.generateCodeFromTest.called);
	
	a(generator.generatePostambleCode());
	a(generator.generatePostambleCode.called);
	
};


exports.run = function() {
	testGeneratorExists();
	test_nodeContainsTestAnnotation();
	test_findAllTestAnnotations();
	test_overwriteMethods();
	test_generatorCompletion();
};

