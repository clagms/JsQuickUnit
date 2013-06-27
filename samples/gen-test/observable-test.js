// created for the file. Any function in the global area is tested here.
ObservableTest = TestCase("ObservableFileTest");

ObservableTest = TestCase("ObservableConstructorTest"); // created for one
// constructor

// tesObservable property comes from the constructor annotation. In that way we
// know the to test, we need to create an object.
// Ideally, we can try to infer this kind of stuff but to keep it simple, like
// this is fine.
ObservableTest.prototype.testAddObserverTest1 = function() {

	var _objut = new Observable();

	var observer = function() {
	};

	_objut.addObserver(observer);
	assertEquals(_objut.observers[0], observer);

};

ObservableTest.prototype.testAddObserverTest2 = function() {
	var _objut = new Observable();

	var observer1 = function() {
	};
	var observer2 = function() {
	};
	_objut.addObserver(observer1);
	_objut.addObserver(observer2);

	assertEquals(2, _objut.observers.length);
	assertEquals(observer1, _objut.observers[0]);
	assertEquals(observer2, _objut.observers[1]);
};

ObservableTest.prototype.testAddObserverTest3 = function() {
	var _objut = new Observable();

	var observer = {};
	var callback = function() {
		_objut.addObserver(observer);
	};

	assertException(callback , "TypeError");
};
