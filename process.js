module.exports = function (request) {

	this.a = function (callback) {

		console.log(request.url);

		callback(null, "a");

	};

	this.b = function (data, callback) {

		callback(null, data + "b");

	};

	this.c = function (data, callback) {

		callback(null, data + "c");

	};

	this.taskA = function (callback) {

		callback(null, "taskA-done");

	};
	this.taskB = function (callback) {

		callback(null, "taskABdone");

	};
};