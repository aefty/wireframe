var async = require("async");
var urlglob = require("urlglob");

module.exports = function (request, structure, callback) {

	var wtf = function (callback) {
		var func = [];
		func = structure[request.method][url].sync;

		async.waterfall(func, function (err, results) {
			callback(err, results);
		});
	};

	var prl = function (callback) {
		var func = {};
		func = structure[request.method][url].async;

		async.parallel(func, function (err, results) {
			callback(err, results);
		});
	};


	if (request.method in structure) {

		for (var url in structure[request.method]) {

			if (urlglob(url, request.url)) {

				async.parallel({
						"sync": wtf,
						"async": prl
					},
					callback
				);
			}
		}
	}
};