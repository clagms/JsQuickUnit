var incTestCase = TestCase("incTestCase");

incTestCase.prototype.test_incTest = function() {
    assertEquals(increment(5), 6);
};