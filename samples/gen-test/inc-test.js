SampleIncTest = TestCase("SampleIncTest"); // created for one file

SampleIncTest.prototype.testInc = function() {
	// Collect all stubs and declare their vars here.
	var x;
	
	// this comes from the first @with
	x = JSON.parse('5');
	assertEquals(JSON.parse('6'), inc(x));
	
};