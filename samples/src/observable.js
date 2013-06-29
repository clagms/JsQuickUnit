var makeObservable = function(that) {
	
	if (!that) {
		that = {};
	}

	that.observers = [];
	
	/**
	 * @test test1
	 * @with observer=function() {};
	 * @with obj = makeObservable({});
	 * @run obj.addObserver(observer);
	 * @expect assertEquals(observer, obj.observers[0]);
	 * 
	 * @test test2
	 * @with observer1 = function() {};
	 * @with observer2 = function() {};
	 * @with obj = makeObservable({});
	 * @run obj.addObserver(observer1);
	 * @run obj.addObserver(observer2);
	 * @expect assertEquals(2,obj.observers.length);
	 * @expect assertEquals(observer1,obj.observers[0]);
	 * @expect assertEquals(observer2,obj.observers[1]);
	 * 
	 * @test test3
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