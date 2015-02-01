var async = require('async');
var urlglob = require('urlglob');

/**
 * Wireframe
 * @param  {Object} workFlow - json workflow
 * @param  {Object} procsObj - process function in a object
 */
module.exports = function(workFlow, procsObj) {
	var request, response;
	if (workFlow instanceof Object) {
		var w = {};
		for (var i in workFlow) {
			for (var method in workFlow[i]) {
				w[method] = w[method] ? w[method] : {};
				for (var u in workFlow[i][method]) {
					w[method][u] = w[method][u] ? w[method][u] : {};
					w[method][u] = workFlow[i][method][u];
				}
			}
		}
		workFlow = w;
	}

	/**
	 * Fork -> Synchronous process
	 * @param  {Function} callback
	 */
	var _sync = function(callback) {
		var set = _assembleTask(null, workFlow[meth][url].sync);
		if (set.err) throw new Error('Invalid workflow : ' + set.tasks);
		async.series(set.tasks, function(err, results) {
			return callback(err, results);
		});
	};

	/**
	 * Fork -> Parallel process
	 * @param  {Function} callback
	 */
	var _async = function(callback) {
		var set = _assembleTask(null, workFlow[meth][url].async);
		if (set.err) throw new Error('Invalid workflow: ' + set.tasks);
		async.parallel(set.tasks, function(err, results) {
			return callback(err, results);
		});
	};

	/**
	 * Merg - Parallel process
	 * @param  {Object}   data - return values of sync and async
	 * @param  {Function} callback
	 */
	var _merg = function(data, callback) {
		var set = _assembleTask(data, workFlow[meth][url].merg);
		if (set.err) throw new Error('Invalid workflow: ' + set.tasks);
		async.series(set.tasks, function(err, results) {
			return callback(err, {
				'sync': data.sync,
				'async': data.async,
				'merg': results
			});
		});
	};

	/**
	 * URL Match
	 * @param {Object} needle
	 * @param {Object} haystack
	 */
	var _urlMatch = function(needle, haystack) {
		var m = false;

		for (var i in haystack) {
			if (i === '*') m = '*';
			else if (urlglob(i, needle)) return i;
		}

		return m;
	};

	/**
	 * Assemble tasks
	 * @param {data}     data - data to be passed into instantiated object
	 * @param {taskList} taskList - list of tasks to instantiate
	 * @param {Function} callback
	 */
	var _assembleTask = function(data, taskList) {
		var tasks = {};

		for (var key in taskList) {
			var module = taskList[key].split('.');
			if (!procsObj[module[0]]) return {
				'err': true,
				'tasks': module
			};
			var procsInst = new procsObj[module[0]](request, response, data);
			if (!procsInst[module[1]]) return {
				'err': true,
				'tasks': module
			};
			tasks[module[0] + '_' + module[1]] = procsInst[module[1]];
		}
		return {
			'err': false,
			'tasks': tasks
		};
	};

	/**
	 * Main Method
	 * @param  {Object}   request - request object passed from HTTP
	 * @param  {Function} callback
	 */
	this.run = function(req, resp, callback) {
		request = req;
		response = resp;
		request.url = request.url[request.url.length - 1] === '/' ? request.url.slice(0, -1) : request.url;

		if (!(request.method in workFlow) && !('*' in workFlow)) throw new Error('No methods found, used wildcard(*)');
		meth = (request.method in workFlow) ? request.method : '*';
		var match = _urlMatch(request.url, workFlow[meth]);

		if (match === null) throw new Error('No URLs found, use wildcards(*)');

		var a = {};
		url = match;
		typeof workFlow[meth][url].sync != 'undefined' && (a.sync = _sync);
		typeof workFlow[meth][url].async != 'undefined' && (a.async = _async);

		async.parallel(a, function(err, results) {
			typeof workFlow[meth][url].merg != 'undefined' && _merg({
				results: results,
				quit: err
			}, callback);
			typeof workFlow[meth][url].merg == 'undefined' && callback(err, results);
		});
	};
};