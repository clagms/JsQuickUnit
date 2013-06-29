/*
 * Contains utilities reusable across all generators.
 */
var makeGenerator = function(specP) {

	var spec = specP || {};

	var that = {};

	var _ = require('underscore');

	var a = require('assert');

	var makeTests = spec.makeTests || require('../src/test.js');

	var l = spec.logger || require('../src/logger.js').get('AbstractGenerator');

	var makeASTWalker = spec.astWalkerFactory
			|| require('../src/ast-walker.js');

	that.generatePreambleCode = spec.generatePreambleCode
			|| function(sourceCodeAst) {
				throw new Error("This must be provided in spec");
			};

	that.generateCodeFromTest = spec.generateCodeFromTest
			|| function(test) {
				throw "This must be provided in spec";
			};

	that.generatePostambleCode = spec.generatePostambleCode
			|| function(sourceCodeAst) {
				throw "This must be provided in spec";
			};

	that.generateTestCodeAST = function(sourceCodeAst) {
		l.info("Generating test code...");

		l.debug("AST: \n" + JSON.stringify(sourceCodeAst, null, 4));

		var code = "";

		code += that.generatePreambleCode(sourceCodeAst);

		_.each(that.findAllTestAnnotations(sourceCodeAst), function(node) {
			_.each(makeTests(node), function(test) {
				code += that.generateCodeFromTest(test);				
			});
		});

		code += that.generatePostambleCode(sourceCodeAst);

		l.info("Generating test code... OK");

		l.debug(code);

		return code;
	};

	that.findAllTestAnnotations = function(sourceCodeAst) {
		var annotatedNodes = [];
		astWalkerInstance = makeASTWalker(function(astNode) {
			if (that.nodeContainsTestAnnotation(astNode)) {
				annotatedNodes.push(astNode);
			}
		});

		sourceCodeAst.walk(astWalkerInstance);

		return that.removeDuplicateAnnotations(annotatedNodes);
	};

	that.removeDuplicateAnnotations = function(annotatedNodesArray) {
		// the array contains "duplicate" elements together in clusters.

		annotatedNodes = _
				.reduce(
						annotatedNodesArray,
						function(cleanArray, node) {
							a(node.start.comments_before);
							var comment = _.find(node.start.comments_before, function(c){ return that.commentContainsTestAnnotation(c.value); });
							a(comment);
							if (cleanArray.length === 0) {
								cleanArray.push(node);
							} else if (cleanArray[cleanArray.length - 1].start.comments_before.value !== node.start.comments_before.value) {
								cleanArray.push(node);
							} // else ignores node.
							return cleanArray;
						}, []);

		return annotatedNodes;
	};

	that.nodeContainsTestAnnotation = function(astNode) {

		// if (astNode.TYPE === "Toplevel") {
		// // top level node doesn't count as annotation.
		// // this is because if it is annotated, then the first child will be
		// annotated too.
		// // so we use that annotation.
		// return false;
		// }

		var startToken = astNode.start;

		a(startToken, "startToken not defined!");

		var commentsBeforeArray = startToken.comments_before;

		a(commentsBeforeArray, "commentsBeforeArray not defined!");

		return _.some(commentsBeforeArray, function(commentObj) {
			return that.commentContainsTestAnnotation(commentObj.value);
		});
	};

	that.commentContainsTestAnnotation = function(commentString) {
		return (commentString.indexOf("@test")) !== -1;
	};

	return that;
};

module.exports = makeGenerator;