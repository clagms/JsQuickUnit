var QuickUnitFs = function() {
	var fs = require('fs');
	
	var readFile = function(filePath) {
		return fs.readFileSync(filePath, 'utf8');
	};
	
	
	return {
		readFile: readFile
	};
};

module.exports = QuickUnitFs;