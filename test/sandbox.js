var a = require('assert');
var FileSystem = require('../src/file-system.js');

var testBasicValues = function() {
	a(!undefined);
	a(false == false);
	a('' == false);
	a(a.someReallyStrangeProperty == undefined);
	a(!a.someReallyStrangeProperty);
	
	var fs = new FileSystem();
	
	a.equal(JSON.stringify(JSON.parse(fs.readFile("./samples/src/sampleInc.json")), null, 4), fs.readFile("./samples/src/sampleInc.json"));
	
};

exports.run = function() {
	testBasicValues();
};

