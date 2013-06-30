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
