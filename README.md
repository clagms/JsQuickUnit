JsQuickUnit
===========

Most developers that don't write tests argue that it takes too much time to write them. Moreover, the "pause" required to write tests will almost surely break your "line-of-though" if you are developing a more complex algorithm. 
Even more: by separating tests and source code, whenever there is a change in the code (refactoring), all the tests must be updated. These changes are frequent in the initial stages of a project and because of this, most developers prefer to write tests at a later stage. Big mistake!

JsQuickUnit is the solution: you can quickly define tests diretly from the unit you are developing and all the boilerplate code will be generated for you. This works much like generating documentation with JsDoc. 

## Example: Consider the following function, defined in file fact.js

	var factorial = function (num)
	{
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

In order to generate two tests for this function, just add the following annotations:

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
	var factorial = function (num)
	{
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

Run QuickUnit (specifying js-test-driver as target) and a file fact-test.js will be generated with the following contents:

	FactTest = TestCase("FactTest"); // created for one file

	FactTest.prototype.test_generalArgs = function() {
		assertEquals(factorial(10), 3628800);
		assertEquals(factorial(5), 120);
	};

	FactTest.prototype.test_cornerCases = function() {
		assertEquals(factorial(1), 1);
		assertEquals(factorial(0), 1);
		assertEquals(factorial(-10), -1);
	};


## Example: Consider the following code, defined in file observable.js

	var makeObservable = function(that) {
	
		if (!that) {
			that = {};
		}

		that.observers = [];
	
		/**
		 * @test addSingle
		 * @with observer=function() {};
		 * @with obj = makeObservable({});
		 * @run obj.addObserver(observer);
		 * @expect assertEquals(observer, obj.observers[0]);
		 * 
		 * @test addTwo
		 * @with observer1 = function() {};
		 * @with observer2 = function() {};
		 * @with obj = makeObservable({});
		 * @run obj.addObserver(observer1);
		 * @run obj.addObserver(observer2);
		 * @expect assertEquals(2,obj.observers.length);
		 * @expect assertEquals(observer1,obj.observers[0]);
		 * @expect assertEquals(observer2,obj.observers[1]);
		 * 
		 * @test errorNonFunction
		 * @with observer={}
		 * @with obj = makeObservable({});
		 * @with callback=function(){ obj.addObserver(observer); };
		 * @expect assertException(callback , "TypeError");
		 * 
		 */
		that.addObserver = function(observer) {
			if (typeof observer != "function") {
				throw new TypeError("observer is not function");
			}
			that.observers.push(observer);
		};
	
		return that;

	};

This is the result (using js-test-driver as a target):

	// created for the file. Any function in the global area is tested here.
	ObservableTest = TestCase("ObservableFileTest");

	ObservableTest.prototype.test_addSingle = function() {
	
		var observer=function() {};
		var obj = makeObservable({});
	
		obj.addObserver(observer);
	
		assertEquals(observer, obj.observers[0]);
	
	};


	ObservableTest.prototype.test_addTwo = function() {
	
		var observer1=function() {};
		var observer2=function() {};
		var obj = makeObservable({});
	
		obj.addObserver(observer1);
	
		obj.addObserver(observer2);
	
		assertEquals(2,obj.observers.length);
		assertEquals(observer1,obj.observers[0]);
		assertEquals(observer2,obj.observers[1]);
	
	};

	ObservableTest.prototype.test_errorNonFunction = function() {
	
		var observer={};
	
		var obj = makeObservable({});
	
		var callback=function(){ obj.addObserver(observer); };
	
		assertException(callback , "TypeError");
	
	};


