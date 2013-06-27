var fs = require('fs');
var futils = require('underscore');
var l = console.log;

var alltests = [];
var testFiles = fs.readdirSync('./test');
var testModules = futils.map(testFiles, function(testFile) {
	return require('./test/' + testFile);
});

futils.each(testModules, function(testModule) {
	testModule.run();
});
