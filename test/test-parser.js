var a = require('assert');
var l = console.log;

var parserFactory = require('../src/parser.js');
var fileSystemFactory = require('../src/file-system.js');


var testParserExists = function() {

	var parser = parserFactory();
	
	a(parser);
	a.equal(parser, parser);
	
	var p2 = parserFactory();
	
	a.notEqual(parser, p2);
	
	a.notDeepEqual(parser, p2);
};

var testParserBasic = function() {
	var fs = fileSystemFactory();
	var parser = parserFactory();
	var codeast1 = fs.readFile("./samples/src/inc.js");
	
	var actast1 = parser.parse(codeast1);
	
	a(actast1);
	
};

var testBeautify = function() {
	var parser = parserFactory();
	var uglyCode = "var a = function() { return 0; };";
	
	var codePretty = parser.beautify(uglyCode);
	
};


exports.run = function() {
	testParserExists();
	testParserBasic();
	testBeautify();
};

