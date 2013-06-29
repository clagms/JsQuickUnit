var a = require('assert');

var makeParser = require('../src/parser.js');

var l = console.log;

var _ = require('underscore');

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
	
	var codeString = fs.readFile("./samples/src/fact.js");
	
	var topLevelNode = parser.parse(codeString);
	
	var varNode = topLevelNode.body[0];
	
	a( generator.nodeContainsTestAnnotation(topLevelNode));
	
	//l(varNode);
	
	//l(varNode.start.comments_before[0].value);
	
	a(generator.nodeContainsTestAnnotation(varNode));
	
	var varDef = varNode.definitions[0];
	
	//l(varDef);
	
	a(! generator.nodeContainsTestAnnotation(varDef));
};

var test_findAllTestAnnotationsStubbed = function() {

	var generator = makeGenerator();
	
	var parser = makeParser();
	
	var fs = makeFileSystem();
	
	var codeString = fs.readFile("./samples/src/fact.js");
	
	var topLevelNode = parser.parse(codeString);
	
	generator.nodeContainsTestAnnotation = function(astNode) {
		return true;
	};
	
	generator.removeDuplicateAnnotations = function(arr) { return arr; };
	
	a.equal(generator.findAllTestAnnotations(topLevelNode).length, 30);
	
	generator.nodeContainsTestAnnotation = function(astNode) {
		return false;
	};
	
	a.equal(generator.findAllTestAnnotations(topLevelNode).length, 0);
	
};

var test_findAllTestAnnotationsStubbedDuplicates = function() {
	
	var generator = makeGenerator();
	
	var parser = makeParser();
	
	var fs = makeFileSystem();
	
	var codeString = fs.readFile("./samples/src/fact.js");
	
	var topLevelNode = parser.parse(codeString);
	
	generator.removeDuplicateAnnotations = function(arr) { return arr; };
	
	var annotatedNodes = generator.findAllTestAnnotations(topLevelNode);
	
	a(annotatedNodes.length === 2);
	
};


var test_findAllTestAnnotationsComplex = function() {

	var generator = makeGenerator();
	
	var parser = makeParser();
	
	var fs = makeFileSystem();
	
	var codeString = fs.readFile("./samples/src/observable.js");
	
	var topLevelNode = parser.parse(codeString);
	
	var tests = generator.findAllTestAnnotations(topLevelNode);
	
	a(tests.length === 1);
	
	//l(tests);
};

var test_commentContainsTestAnnotation = function() {
	var generator = makeGenerator();
	
	var c1 = '* \n * @test generalArgs\n * @expect assertEquals(factorial(10), 3628800);\n * @expect assertEquals(factorial(5), 120);\n * \n * @test cornerCases\n * @expect assertEquals(factorial(1), 1);\n * @expect assertEquals(factorial(0), 1);\n * @expect assertEquals(factorial(-10), -1);\n ';
	
	var c2 = '* @some test invalid notation *';
	
	a(generator.commentContainsTestAnnotation(c1));
	
	a(! generator.commentContainsTestAnnotation(c2));
	
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
	test_findAllTestAnnotationsStubbed();
	test_findAllTestAnnotationsStubbedDuplicates();
	test_overwriteMethods();
	test_generatorCompletion();
	test_commentContainsTestAnnotation();
	test_findAllTestAnnotationsComplex();
};

