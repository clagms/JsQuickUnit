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
	
	var c1 = '* \n * @test generalArgs\n * @expect assertEquals(factorial(10), 3628800);\n * @expect assertEquals(factorial(5), 120);\n * \n * @test cornerCases\n * @expect assertEquals(factorial(1), 1);\n * @expect assertEquals(factorial(0), 1);\n * @expect assertEquals(factorial(-10), -1);\n ';
	var c2 = '* \r\n * @test generalArgs\r\n * @expect assertEquals(factorial(10), 3628800);\r\n * @expect assertEquals(factorial(5), 120);\n * \n * @test cornerCases\r\n * @expect assertEquals(factorial(1), 1);\r\n * @expect assertEquals(factorial(0), 1);\r\n * @expect assertEquals(factorial(-10), -1);\r\n ';
	
	var c1Splited = c1.replace(/\r\n/g, "\n").split('\n');
	var c2Splited = c2.replace(/\r\n/g, "\n").split('\n');
	
//	l(c1Splited);
//	l(c2Splited);
	
	a.deepEqual(c1Splited, c2Splited);
	
	
};

var testUnderscoreStuff = function() {
	var list = [[0, 1], [2, 3], [4, 5]];
	var flat = _.reduceRight(list, function(a, b) { return a.concat(b); }, []);
	
	a.deepEqual(flat, [ 4, 5, 2, 3, 0, 1 ]);
	
	var flatInv = _.reduce(list, function(a, b) { return a.concat(b); }, []);
	
	a.deepEqual(flatInv, [ 0, 1, 2, 3, 4, 5]);

	
	
};

exports.run = function() {
	testBasicValues();
	testUnderscoreStuff();
};

