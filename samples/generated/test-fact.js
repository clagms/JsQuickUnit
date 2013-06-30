TestCase = TestCase("TestCase");

TestCase.prototype.test_generalArgs = function() {
    assertEquals(factorial(10), 3628800);
    assertEquals(factorial(5), 120);
};

TestCase.prototype.test_cornerCases = function() {
    assertEquals(factorial(1), 1);
    assertEquals(factorial(0), 1);
    assertEquals(factorial(-10), -1);
};