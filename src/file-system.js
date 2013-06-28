var quickUnitFs = function() {
	var fs = require('fs');
	var futils = require('underscore');
	
	var readFile = function(filePath) {
		return fs.readFileSync(filePath, 'utf8');
	};
	
	var mapEachFile = function(dirPath, callback) {
		var files = fs.readdirSync(dirPath);
		return futils.map(files, callback);
	};
	
	return {
		readFile: readFile,
		mapEachFile: mapEachFile
	};
};

module.exports = quickUnitFs;