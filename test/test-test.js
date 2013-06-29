var a = require('assert');
var l = console.log;

var makeTests = require('../src/test.js');

var makeParser = require('../src/parser.js');

var makeFileSystem = require('../src/file-system.js');

var makeGenerator = require('../src/generator.js');

var test_basicUtilities = function() {

	var longComment = [ '* ', ' * @test generalArgs',
			' * @expect assertEquals(factorial(10), 3628800);',
			' * @expect assertEquals(factorial(5), 120);', ' * ',
			' * @test cornerCases', ' * @with assertEquals(factorial(1), 1);',
			' * @expect assertEquals(factorial(1), 1);',
			' * @run console.log("running teste");',
			' * @expect assertEquals(factorial(-10), -1);', ' ' ];

	a(makeTests.containsTestAnnotation(longComment[1]));
	a(!makeTests.containsTestAnnotation(longComment[0]));
	a(!makeTests.containsTestAnnotation(longComment[2]));
	a(!makeTests.containsTestAnnotation(longComment[3]));
	a(!makeTests.containsTestAnnotation(longComment[4]));
	a(makeTests.containsTestAnnotation(longComment[5]));

	a(makeTests.containsRunAnnotation(longComment[8]));
	a(!makeTests.containsRunAnnotation(longComment[0]));
	a(!makeTests.containsRunAnnotation(longComment[2]));
	a(!makeTests.containsRunAnnotation(longComment[3]));
	a(!makeTests.containsRunAnnotation(longComment[4]));
	a(!makeTests.containsRunAnnotation(longComment[5]));

	a(makeTests.containsExpectAnnotation(longComment[2]));
	a(makeTests.containsExpectAnnotation(longComment[3]));
	a(!makeTests.containsExpectAnnotation(longComment[4]));
	a(!makeTests.containsExpectAnnotation(longComment[5]));

	a(makeTests.containsWithAnnotation(longComment[6]));
	a(!makeTests.containsWithAnnotation(longComment[2]));
	a(!makeTests.containsWithAnnotation(longComment[3]));
	a(!makeTests.containsWithAnnotation(longComment[4]));
	a(!makeTests.containsWithAnnotation(longComment[5]));

	a.equal(makeTests.parseTestName(longComment[1]), "generalArgs");
	a.equal(makeTests.parseTestName(longComment[5]), "cornerCases");

	a.equal(makeTests.parseWithExpression(longComment[6]),
			'assertEquals(factorial(1), 1);');

	a.equal(makeTests.parseRunExpression(longComment[8]),
			'console.log("running teste");');

	a.equal(makeTests.parseExpectExpression(longComment[2]),
			'assertEquals(factorial(10), 3628800);');
	a.equal(makeTests.parseExpectExpression(longComment[3]),
			'assertEquals(factorial(5), 120);');

};

var test_groupTestAnnotations = function() {

	var longComment = [ '* ', ' * @test generalArgs',
			' * @expect assertEquals(factorial(10), 3628800);',
			' * @expect assertEquals(factorial(5), 120);', ' * ',
			' * @test cornerCases', ' * @with assertEquals(factorial(1), 1);',
			' * @expect assertEquals(factorial(1), 1);',
			' * @run console.log("running teste");',
			' * @expect assertEquals(factorial(-10), -1);', ' ' ];

	var groupedComment = [
			[ ' * @test generalArgs',
					' * @expect assertEquals(factorial(10), 3628800);',
					' * @expect assertEquals(factorial(5), 120);' ],
			[ ' * @test cornerCases',
					' * @with assertEquals(factorial(1), 1);',
					' * @expect assertEquals(factorial(1), 1);',
					' * @run console.log("running teste");',
					' * @expect assertEquals(factorial(-10), -1);' ] ];

	a.deepEqual(groupedComment, makeTests.groupTestAnnotations(longComment));

};

var test_makeTestsFromGroup = function() {

	var groupedComment = [
			[ ' * @test generalArgs',
					' * @expect assertEquals(factorial(10), 3628800);',
					' * @expect assertEquals(factorial(5), 120);' ],
			[ ' * @test cornerCases',
					' * @with assertEquals(factorial(1), 1);',
					' * @expect assertEquals(factorial(1), 1);',
					' * @run console.log("running teste");',
					' * @expect assertEquals(factorial(-10), -1);' ] ];

	var firstTest = {
		testName : 'generalArgs',
		withExpressions : [],
		runExpressions : [],
		expectExpressions : [ 'assertEquals(factorial(10), 3628800);',
				'assertEquals(factorial(5), 120);' ]
	};

	a.deepEqual(firstTest, makeTests.makeTestsFromGroup(groupedComment[0]));

	var secondTest = {
		testName : 'cornerCases',
		withExpressions : [ 'assertEquals(factorial(1), 1);' ],
		runExpressions : [ 'console.log("running teste");' ],
		expectExpressions : [ 'assertEquals(factorial(1), 1);',
				'assertEquals(factorial(-10), -1);' ]
	};

	a.deepEqual(secondTest, makeTests.makeTestsFromGroup(groupedComment[1]));
};

var test_makeTests = function() {
	var parser = makeParser();

	var fs = makeFileSystem();
	
	var generator = makeGenerator();
	
	var codeString = fs.readFile("./samples/src/fact.js");

	var topLevelNode = parser.parse(codeString);
	
	var testsNodes = generator.findAllTestAnnotations(topLevelNode);
	
	var expectedTests = [ { testName: 'generalArgs',
	    withExpressions: [],
	    runExpressions: [],
	    expectExpressions: 
	     [ 'assertEquals(factorial(10), 3628800);',
	       'assertEquals(factorial(5), 120);' ] },
	  { testName: 'cornerCases',
	    withExpressions: [],
	    runExpressions: [],
	    expectExpressions: 
	     [ 'assertEquals(factorial(1), 1);',
	       'assertEquals(factorial(0), 1);',
	       'assertEquals(factorial(-10), -1);' ] } ];

	
	a.deepEqual(expectedTests, makeTests(testsNodes[0]));
	
};

var test_makeTestsSplitComments = function() {
	var parser = makeParser();

	var fs = makeFileSystem();
	
	var generator = makeGenerator();
	
	var codeString = fs.readFile("./samples/src/factSplitComments.js");

	var topLevelNode = parser.parse(codeString);
	
	var testsNodes = generator.findAllTestAnnotations(topLevelNode);
	
	var expectedTests = [ { testName: 'generalArgs',
	    withExpressions: [],
	    runExpressions: [],
	    expectExpressions: 
	     [ 'assertEquals(factorial(10), 3628800);',
	       'assertEquals(factorial(5), 120);' ] },
	  { testName: 'cornerCases',
	    withExpressions: [],
	    runExpressions: [],
	    expectExpressions: 
	     [ 'assertEquals(factorial(1), 1);',
	       'assertEquals(factorial(0), 1);',
	       'assertEquals(factorial(-10), -1);' ] } ];

	
	a.deepEqual(expectedTests, makeTests(testsNodes[0]));
	
};

exports.run = function() {
	test_basicUtilities();
	test_groupTestAnnotations();
	test_makeTestsFromGroup();
	test_makeTests();
	test_makeTestsSplitComments();
};
