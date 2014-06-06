var async = require('async');
var urlglob = require('urlglob');

/**
 * Wireframe
 * @param  {Object} struc JSON represenation of service structure
 * @param  {Object} procs Object holding all module process
 */
module.exports = function(workFlow, procsObj) {
    var req, meth, url;

    /**
     * Waterfall Handler
     * @param  {Function} callback return
     */
    var _sync = function(callback) {
        _assembleTask(null, workFlow[meth][url].sync, function(err, tasks) {
            if (err) return callback(true, 'Invalide Workflow : ' + tasks);
            async.series(tasks, function(err, results) {
                return callback(err, results);
            });
        });
    };

    /**
     * Parallel Handler
     * @param  {Function} callback return
     */
    var _async = function(callback) {
        _assembleTask(null, workFlow[meth][url].async, function(err, tasks) {
            if (err) return callback(true, 'Invalide Workflow : ' + task);
            async.parallel(tasks, function(err, results) {
                return callback(err, results);
            });

        });
    };



    var _merg = function(data, callback) {
        _assembleTask(data, workFlow[meth][url].merg, function(err, tasks) {
            if (err) return callback(true, 'Invalide Workflow : ' + tasks);
            async.series(tasks, function(err, results) {

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
     * @param {String}   needle   incoming url
     * @param {Object}   haystack JSON object for
     * @param {Function} callback [description]
     */
    var _urlMatch = function(needle, haystack, callback) {
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
     * Assemble Tasks
     * @param {Array}   taskList - list of tasks
     * @param {Function} callback - callback funciton
     */
    var _assembleTask = function(data, taskList, callback) {
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
     * @param  {Object}   req      request object passed from HTTP
     * @param  {Function} callback return
     * @return {Null}
     */
    this.run = function(request, callback) {
        req = request;
        if (!(req.method in workFlow) && !('*' in workFlow)) {
            callback(405, 'Method Not Allowed');
        } else {
            meth = (req.method in workFlow) ? req.method : '*';
            _urlMatch(req.url, workFlow[meth], function(match) {
                if (match === null) {
                    callback(404, 'Not Found');
                } else {
                    var a = {};
                    url = match;
                    typeof workFlow[meth][url].sync != 'undefined' && (a.sync = _sync);
                    typeof workFlow[meth][url].async != 'undefined' && (a.async = _async);
                    async.parallel(a, function(err, results) {

                        typeof workFlow[meth][url].merg != 'undefined' && _merg(results, callback);
                        typeof workFlow[meth][url].merg == 'undefined' && callback(err, results);

                    });
                }
            });
        }
    };
};
