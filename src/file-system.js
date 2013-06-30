var makeFileSystem = function() {
	var fs = require('fs');
	var _ = require('underscore');
	
	var that = {};
	
	that.readFile = function(filePath) {
		return fs.readFileSync(filePath, 'utf8');
	};
	
	that.mapEachFile = function(dirPath, callback) {
		var files = fs.readdirSync(dirPath);
		return _.map(files, callback);
	};
	
	that.writeFile = function(filePath, data) {
		return fs.writeFileSync(filePath, data);
	};
	
	
	
	return that;
};

module.exports = makeFileSystem;