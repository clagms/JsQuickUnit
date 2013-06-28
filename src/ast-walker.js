/*
 * Responsible for visiting the AST.
 */
var astWalker = function(callback) {
	
	var uglifyjs = require('uglify-js');
	
	return new uglifyjs.TreeWalker(callback);
};

module.exports = astWalker;