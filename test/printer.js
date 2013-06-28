var a = require('assert');

var parserFactory = require('../src/parser.js');
var fileSystemFactory = require('../src/file-system.js');
var printerFactory = require('../src/printer.js');


var testPrinterExists = function() {

	var printer = printerFactory();
	
	a(printer);
	a.equal(printer, printer);
	
	var p2 = printerFactory();
	
	a.notEqual(printer, p2);
	
	a.notDeepEqual(printer, p2);
	
	a(printer.print);
	a(printer.printCode);
	
};

var testPrinterBasic = function() {
	var fs = fileSystemFactory();
	var parser = parserFactory();
	var printer = printerFactory();
	var codeast = fs.readFile("./samples/src/inc.js");
	var actast = parser.parse(codeast);
	var codeact = printer.print(actast);
	
	a(codeact);

};


exports.run = function() {
	testPrinterExists();
	testPrinterBasic();
};

