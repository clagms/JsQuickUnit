var makeASTWalker = function(callback) {
	
	var uglifyjs = require('uglify-js');
	
	return new uglifyjs.TreeWalker(callback);
};

module.exports = makeASTWalker;