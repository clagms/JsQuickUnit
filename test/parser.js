var a = require('assert');
var l = require('../src/logger.js');

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
	var expectedJson = JSON.parse(fs.readFile("./samples/src/inc.json"));
	var actast1 = parser.parse(codeast1);
	
	a(actast1);
	
	a.deepEqual(JSON.stringify(expectedJson, null, 4), JSON.stringify(actast1, null, 4));
};


exports.run = function() {
	testParserExists();
	testParserBasic();
};

