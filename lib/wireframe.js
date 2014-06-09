var async = require('async');
var urlglob = require('urlglob');

/**
 * Wireframe
 * @param  {Object} workFlow - json workflow
 * @param  {Object} procsObj - process function in a object
 */
module.exports = function (workFlow, procsObj) {
	var req, meth, url;

	/**
	 * Fork -> Synchronous process
	 * @param  {Function} callback
	 */
	var _sync = function (callback) {
		_assembleTask(null, workFlow[meth][url].sync, function (err, tasks) {
			if (err) return callback(true, 'Invalide Workflow : ' + tasks);
			async.series(tasks, function (err, results) {
				return callback(err, results);
			});
		});
	};

	/**
	 * Fork -> Parallel process
	 * @param  {Function} callback
	 */
	var _async = function (callback) {
		_assembleTask(null, workFlow[meth][url].async, function (err, tasks) {
			if (err) return callback(true, 'Invalide Workflow : ' + tasks);
			async.parallel(tasks, function (err, results) {
				return callback(err, results);
			});

		});
	};


	/**
	 * Merg - Parallel process
	 * @param  {Object}   data - return values of sync and async
	 * @param  {Function} callback
	 */
	var _merg = function (data, callback) {
		_assembleTask(data, workFlow[meth][url].merg, function (err, tasks) {
			if (err) return callback(true, 'Invalide Workflow : ' + tasks);
			async.series(tasks, function (err, results) {

				return callback(err, {
					'sync': data.sync,
					'async': data.async,
					'merg': results
				});
			});
		});
	};

	/**
	 * URL Matcher
	 * @param {String}   needle - incoming url
	 * @param {Object}   haystack - JSON object for
	 * @param {Function} callback
	 */
	var _urlMatch = function (needle, haystack, callback) {
		var match = null;
		for (var i in haystack) {
			if (urlglob(i, req.url)) {
				match = i;
				break;
			}
		}
		return callback(match);
	};


	/**
	 * Assemble tasks
	 * @param {data}     data - data to be passed into instantiated object
	 * @param {taskList} taskList - list of tasks to instantiate
	 * @param {Function} callback
	 */
	var _assembleTask = function (data, taskList, callback) {
		var tasks = {};
		var err = false;
		for (var key in taskList) {
			var module = taskList[key].split('.');
			if (!procsObj[module[0]]) return callback(true, module);
			var procsInst = new procsObj[module[0]](req, data);
			if (!procsInst[module[1]]) return callback(true, module);
			tasks[module[0] + '_' + module[1]] = procsInst[module[1]];
		}
		return callback(err, tasks);
	};

	/**
	 * Main Method
	 * @param  {Object}   request - request object passed from HTTP
	 * @param  {Function} callback
	 */
	this.run = function (request, callback) {
		req = request;
		if (!(req.method in workFlow) && !('*' in workFlow)) {
			callback(405, 'Method Not Allowed');
		} else {
			meth = (req.method in workFlow) ? req.method : '*';
			_urlMatch(req.url, workFlow[meth], function (match) {
				if (match === null) {
					callback(404, 'Not Found');
				} else {
					var a = {};
					url = match;
					typeof workFlow[meth][url].sync != 'undefined' && (a.sync = _sync);
					typeof workFlow[meth][url].async != 'undefined' && (a.async = _async);
					async.parallel(a, function (err, results) {

						typeof workFlow[meth][url].merg != 'undefined' && _merg(results, callback);
						typeof workFlow[meth][url].merg == 'undefined' && callback(err, results);

					});
				}
			});
		}
	};
};