var a = require('assert');
var fileSystem = require('../src/file-system.js');

var testBasicValues = function() {
	a(!undefined);
	a(!!!undefined);
	a(false == false);
	a('' == false);
	a(!(0 === false));
	a(false == 0);
	a(a.someReallyStrangeProperty == undefined);
	a(!a.someReallyStrangeProperty);
	
	var fs = fileSystem();
	
	a.equal(JSON.stringify(JSON.parse(fs.readFile("./samples/src/inc.json")), null, 4), fs.readFile("./samples/src/inc.json"));
	
};

exports.run = function() {
	testBasicValues();
};

