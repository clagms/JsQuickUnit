var QuickUnitPrinter = function() {
	
	var printCode = function(code) {
		return code.print_to_string();
	};
	
	return {
		printCode: printCode,
		print: printCode
	};
};

module.exports = QuickUnitPrinter;