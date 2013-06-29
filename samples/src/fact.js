/** 
 * @test generalArgs
 * @expect assertEquals(factorial(10), 3628800);
 * @expect assertEquals(factorial(5), 120);
 * 
 * @test cornerCases
 * @expect assertEquals(factorial(1), 1);
 * @expect assertEquals(factorial(0), 1);
 * @expect assertEquals(factorial(-10), -1);
 */
var factorial = function (num){
    if (num < 0) {
        return -1;
    }
    else if (num == 0) {
        return 1;
    }
    else {
        return (num * factorial(num - 1));
    }
};