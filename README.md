JsQuickUnit
===========

Most developers that don't write tests argue that *it takes too much time to write them*. Moreover, the *pause* required to write tests will almost surely break your *line-of-though* if you are developing a more complex algorithm. 

By separating tests and source code, whenever there is a *change* in the code *all the tests* must be updated. These changes are frequent in the initial stages of a project and because of this, most developers prefer to write tests at a later stage. *Big mistake!*

*JsQuickUnit* is the solution: you can *quickly define tests* diretly from the unit you are developing and all the boilerplate code will be generated for you, *in your favorite testing framework*.

### Example

Consider the following function, defined in file fact.js

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

Run `jsquickunit fact.js test-fact.js` and a file *fact-test.js* will be generated with the following contents:

    var factTestCase = TestCase("factTestCase");
    
    factTestCase.prototype.test_generalArgs = function() {
        assertEquals(factorial(10), 3628800);
        assertEquals(factorial(5), 120);
    };
    
    factTestCase.prototype.test_cornerCases = function() {
        assertEquals(factorial(1), 1);
        assertEquals(factorial(0), 1);
        assertEquals(factorial(-10), -1);
    };

By default *jsquickunit* generates code to js-test-driver but it is built to support any testing framework. More testing framework will be added soon.

Install
-------

First make sure you have installed the latest version of [node.js](http://nodejs.org/)
(You may need to restart your computer after this step).

From NPM for use as a command line app:

    npm install jsquickunit -g

From NPM for programmatic use:

    npm install jsquickunit

From Git:

    git clone git://github.com/clagms/JsQuickUnit.git
    cd JsQuickUnit
    npm link .

Usage
-----

	jsquickunit sourceFile generatedTargetFile
	
or

	jsquickunit sourceDir generatedTestDir

In the first use case, JsQuickUnit will read the annotations in the *sourceFile* and write the test code to the *generatedTargetFile*.

In the second use case, JsQuickUnit will generate *test-***.js* file in the *generatedTestDir* for each annotated source file in *sourceDir*. Note that *generatedTestDir* must exist. It will not be created.

API Reference
-------------

Assuming installation via NPM, you can load JsQuickUnit in your application
like this:

    var jsquickunit = require('jsquickunit');

It exports the following functions: 

Generate a test file from a single source file:

    jsquickunit.generateTestToFile('path/to/source/file.js','path/to/target/test/file.js')

Generate a test file for each source file in a specific directory:

    jsquickunit.generateTestsToDir('path/to/source/dir','path/to/target/test/dir')

Supported Annotations
----

Most of the code provided in the annotations will be pasted inside the generated tests, so be carefull with the order in which you specify the tests. Supported annotations (incomplete list):

### @test *TestName*

It marks a test annotation. The name of the test is mandatory and unique inside the current source file.


### @with *someElement = someExpression*

It is usually used to stub elements (see a More Complete Example in the end of this document).


### @run *arbitraryJSCode*

It is usually used to run arbitrary code (see a More Complete Example in the end of this document).

### @expect *assertionCode*

Used to make assertions and invoke framework specific functions (see a More Complete Example in the end of this document).




More Complete Example
--

Consider the following code, defined in file *observable.js*

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

Run:

    jsquickunit observable.js test-observable.js
    
or

    jsquickunit.generateTestToFile('observable.js','test-observable.js')

And this is the result (using *js-test-driver* by default as a target):

    var observableTestCase = TestCase("observableTestCase");
    
    observableTestCase.prototype.test_addSingle = function() {
        observer = function() {};
        obj = makeObservable({});
        obj.addObserver(observer);
        assertEquals(observer, obj.observers[0]);
    };
    
    observableTestCase.prototype.test_addTwo = function() {
        observer1 = function() {};
        observer2 = function() {};
        obj = makeObservable({});
        obj.addObserver(observer1);
        obj.addObserver(observer2);
        assertEquals(2, obj.observers.length);
        assertEquals(observer1, obj.observers[0]);
        assertEquals(observer2, obj.observers[1]);
    };
    
    observableTestCase.prototype.test_errorNonFunction = function() {
        observer = {};
        obj = makeObservable({});
        callback = function() {
            obj.addObserver(observer);
        };
        assertException(callback, "TypeError");
    };


