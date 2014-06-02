// Define a success handler.
var successHandler = function() {

	console.log("Success!");

};


// Define a fail handler.
var failHandler = function() {

	console.log("Fail :(");

};


// Now, let's create a mock function that makes use of the
// success and fail callback handlers.
var doSomething = function(successHandler, failHandler) {

	// Check to see if some value is true - for a mock
	// fail handler invocation.
	if (true === true) {

		failHandler();
		return;

	}

	// If we made it this far, then everything executed
	// well - invoke success handler.
	successHandler();
	return;

};


/// Invoke the callback-oriented method.
doSomething(successHandler, failHandler);
