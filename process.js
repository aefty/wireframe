module.exports = function (request) {

	this.a = function (callback) {

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
	this.url_er = function (callback) {

		callback(true, "URL not supported");

	};
};
