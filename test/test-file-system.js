var a = require('assert');
var fileSystem = require('../src/file-system.js');


var testFileSystemExists = function() {

	var fs = fileSystem();
	
	a(fs);
	a.equal(fs, fs);
	
	var f2 = fileSystem();
	
	a.notEqual(fs, f2);
	
	a.notDeepEqual(fs, f2);
};

var testFileSystemBasic = function() {
	var fs = fileSystem();
	var codeast1 = fs.readFile("./samples/src/inc.js");
	var codeast2 = fs.readFile("./samples/src/inc.js");
	
	a(codeast1);
	a(codeast2);
	
	a.deepEqual(codeast1, codeast2);
};

var testMapEachFile = function() {
	var fs = fileSystem();
	
	var fsNative = require('fs');
	
	var fsReadSync = fsNative.readdirSync;
	
	var fsReadSyncDouble = function(dir) {
		
		fsReadSyncDouble.called = true;
		fsReadSyncDouble.dir = dir;
		
		return [1,2,3,4,5];
	};
	
	fsNative.readdirSync = fsReadSyncDouble;
	
	a(! fsReadSyncDouble.called);
	
	var files = fs.mapEachFile("./samples/src", function(item) {
		return item;
	});
	
	a(fsReadSyncDouble.called);
	a.deepEqual(fsReadSyncDouble.dir, "./samples/src");
	a.deepEqual(files, [1,2,3,4,5]);
	
	fs.readdirSync = fsReadSync;
};


exports.run = function() {
	testFileSystemExists();
	testFileSystemBasic();
	testMapEachFile();
};

