// created for the file. Any function in the global area is tested here.
ObservableTest = TestCase("ObservableFileTest");

ObservableTest.prototype.test1 = function() {
	
	var observer=function() {};
	var obj = makeObservable({});
	
	obj.addObserver(observer);
	
	assertEquals(observer, obj.observers[0]);
	
};


ObservableTest.prototype.test2 = function() {
	
	var observer1=function() {};
	var observer2=function() {};
	var obj = makeObservable({});
	
	obj.addObserver(observer1);
	
	obj.addObserver(observer2);
	
	assertEquals(2,obj.observers.length);
	assertEquals(observer1,obj.observers[0]);
	assertEquals(observer2,obj.observers[1]);
	
};

ObservableTest.prototype.test3 = function() {
	
	var observer={};
	
	var obj = makeObservable({});
	
	var callback=function(){ obj.addObserver(observer); };
	
	assertException(callback , "TypeError");
	
};

