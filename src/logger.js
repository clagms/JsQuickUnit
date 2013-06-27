var quickUnitLogger = (function() {
	var logger = require('../lib/logger.js');
	
	logger.useDefaults();
	
	return logger;
})();

module.exports = quickUnitLogger;
