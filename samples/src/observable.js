/**
 * @constructor
 */
var Observable = function() {
	this.observers = [];

	/**
	 * @test test1
	 * @with observer=function() {};
	 * @run this.addObserver(observer);
	 * @expect assertEquals(observer, this.observers[0]);
	 * 
	 * @test test2
	 * @with observer1 = function() {};
	 * @with observer2 = function() {};
	 * @run this.addObserver(observer1);
	 * @run this.addObserver(observer2);
	 * @expect assertEquals(2,this.observers.length);
	 * @expect assertEquals(observer1,this.observers[0]);
	 * @expect assertEquals(observer2,this.observers[1]);
	 * 
	 * @test test3
	 * @with observer={}
	 * @with callback=function(){ this.addObserver(observer); };
	 * @expect assertException(callback , "TypeError");
	 * 
	 */
	this.addObserver = function(observer) {
		if (typeof observer != "function") {
			throw new TypeError("observer is not function");
		}
		this.observers.push(observer);
	};

};