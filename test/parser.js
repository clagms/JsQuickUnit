var a = require('assert');
var l = require('../src/logger.js');

var Parser = require('../src/parser.js');
var FileSystem = require('../src/file-system.js');


var testParserExists = function() {

	var parser = new Parser();
	
	a(parser);
	a.equal(parser, parser);
	
	var p2 = new Parser();
	
	a.notEqual(parser, p2);
	
	a.notDeepEqual(parser, p2);
};

var testParserBasic = function() {
	var fs = new FileSystem();
	var parser = new Parser();
	var codeast1 = fs.readFile("./samples/src/sampleInc.js");
	var expectedJson = JSON.parse(fs.readFile("./samples/src/sampleInc.json"));
	var actast1 = parser.parse(codeast1);
	
	a(actast1);
	
	a.deepEqual(JSON.stringify(expectedJson, null, 4), JSON.stringify(actast1, null, 4));
};


exports.run = function() {
	testParserExists();
	testParserBasic();
};

