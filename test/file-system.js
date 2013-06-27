var a = require('assert');
var FileSystem = require('../src/file-system.js');


var testFileSystemExists = function() {

	var fs = new FileSystem();
	
	a(fs);
	a.equal(fs, fs);
	
	var f2 = new FileSystem();
	
	a.notEqual(fs, f2);
	
	a.notDeepEqual(fs, f2);
};

var testFileSystemBasic = function() {
	var fs = new FileSystem();
	var codeast1 = fs.readFile("./samples/src/sampleInc.js");
	var codeast2 = fs.readFile("./samples/src/sampleInc.js");
	
	a(codeast1);
	a(codeast2);
	
	a.deepEqual(codeast1, codeast2);
};


exports.run = function() {
	testFileSystemExists();
	testFileSystemBasic();
};

