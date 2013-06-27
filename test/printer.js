var a = require('assert');

var Parser = require('../src/parser.js');
var FileSystem = require('../src/file-system.js');
var Printer = require('../src/printer.js');


var testPrinterExists = function() {

	var printer = new Printer();
	
	a(printer);
	a.equal(printer, printer);
	
	var p2 = new Printer();
	
	a.notEqual(printer, p2);
	
	a.notDeepEqual(printer, p2);
	
	a(printer.print);
	a(printer.printCode);
	
};

var testPrinterBasic = function() {
	var fs = new FileSystem();
	var parser = new Parser();
	var printer = new Printer();
	var codeast = fs.readFile("./samples/src/inc.js");
	var actast = parser.parse(codeast);
	var codeact = printer.print(actast);
	
	a(codeact);

};


exports.run = function() {
	testPrinterExists();
	testPrinterBasic();
};

