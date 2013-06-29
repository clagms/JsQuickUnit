var makeTestsRet = (function() {

	var makeTests = function(astNode) {
		return makeTests._makeTests(astNode);
	};

	var _ = require('underscore');

	makeTests.splitInLines = function(str) {
		return str.replace(/\r\n/g, "\n").split('\n');
	};

	makeTests.groupTestAnnotations = function(lines) {
		var testAnnotationGroups = [];
		var numberOfTests = -1;
		_.each(lines, function(line) {
			if (makeTests.containsTestAnnotation(line)) {
				numberOfTests++;
				testAnnotationGroups[numberOfTests] = [];
				testAnnotationGroups[numberOfTests].push(line);
			} else if (makeTests.containsRunAnnotation(line)
					|| makeTests.containsExpectAnnotation(line)
					|| makeTests.containsWithAnnotation(line)) {
				testAnnotationGroups[numberOfTests].push(line);
			}

		});

		return testAnnotationGroups;
	};

	makeTests.makeTestsFromGroups = function(testAnnotationGroups) {
		return _.map(testAnnotationGroups, makeTests.makeTestsFromGroup);
	};

	makeTests.makeTestsFromGroup = function(testGroup) {

		var testName = "";
		var withExpressions = [];
		var runExpressions = [];
		var expectExpressions = [];

		_.each(testGroup, function(line) {
			if (makeTests.containsTestAnnotation(line)) {
				testName = makeTests.parseTestName(line);
			} else if (makeTests.containsWithAnnotation(line)) {
				withExpressions.push(makeTests.parseWithExpression(line));
			} else if (makeTests.containsRunAnnotation(line)) {
				runExpressions.push(makeTests.parseRunExpression(line));
			} else if (makeTests.containsExpectAnnotation(line)) {
				expectExpressions.push(makeTests.parseExpectExpression(line));
			} else {
				throw new Error("Unexpected annotation found!");
			}
		});

		return makeTests.makeTest(testName, withExpressions, runExpressions,
				expectExpressions);
	};

	makeTests.makeTest = function(testName, withExpressions, runExpressions,
			expectExpressions) {
		return {
			testName : testName,
			withExpressions : withExpressions,
			runExpressions : runExpressions,
			expectExpressions : expectExpressions
		};
	};

	makeTests.parseTestName = function(line) {
		var parts = line.split("@test");
		return _.last(parts).trim();
	};

	makeTests.parseWithExpression = function(line) {
		var parts = line.split("@with");
		return _.last(parts).trim();
	};

	makeTests.parseRunExpression = function(line) {
		var parts = line.split("@run");
		return _.last(parts).trim();
	};

	makeTests.parseExpectExpression = function(line) {
		var parts = line.split("@expect");
		return _.last(parts).trim();
	};

	makeTests.containsTestAnnotation = function(line) {
		return (line.indexOf("@test")) !== -1;
	};

	makeTests.containsRunAnnotation = function(line) {
		return (line.indexOf("@run")) !== -1;
	};

	makeTests.containsExpectAnnotation = function(line) {
		return (line.indexOf("@expect")) !== -1;
	};

	makeTests.containsWithAnnotation = function(line) {
		return (line.indexOf("@with")) !== -1;
	};

	makeTests.getNodeTestComments = function(astNode) {
		var candidateComments = _.filter(astNode.start.comments_before,
				function(comment) {
					return makeTests.containsTestAnnotation(comment.value);
				});

		var flatComments = _.flatten(candidateComments, true); // shallow flat

		return _.map(flatComments, function(comment) {
			return comment.value;
		});
	};

	makeTests._makeTests = function(astNode) {
		var nodeCommentLines = makeTests.getNodeTestComments(astNode);
		var testGroups = _.map(nodeCommentLines, function(commentStr) {
			var lines = makeTests.splitInLines(commentStr);
			var annotationGroups = makeTests.groupTestAnnotations(lines);
			var tests = makeTests.makeTestsFromGroups(annotationGroups);
			return tests;
		});

		return _.flatten(testGroups, true);
	};

	return makeTests;
})();

module.exports = makeTestsRet;