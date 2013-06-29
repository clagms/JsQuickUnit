var a = require('assert');
var fileSystem = require('../src/file-system.js');

var l = console.log;

var _ = require('underscore');

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
	
	var obj1 = {};
	var obj2 = {};
	
	a(obj1 != obj2);
	a(obj1 !== obj2);
	
	a.deepEqual(obj1, obj2);
	
	var obj3 = {node: {}};
	var obj4 = {node: {}};
	
	a(obj3 != obj4);
	a(obj3 !== obj4);
	
	a.deepEqual(obj3, obj4);
	
};

var testUnderscoreStuff = function() {
	var list = [[0, 1], [2, 3], [4, 5]];
	var flat = _.reduceRight(list, function(a, b) { return a.concat(b); }, []);
	
	a.deepEqual(flat, [ 4, 5, 2, 3, 0, 1 ]);
	
	var flatInv = _.reduce(list, function(a, b) { return a.concat(b); }, []);
	
//	l(flatInv);
};

exports.run = function() {
	testBasicValues();
	testUnderscoreStuff();
};

