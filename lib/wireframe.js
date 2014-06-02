var async = require('async');
var urlglob = require('urlglob');

/**
 * Wireframe
 * @param  {Object} struc JSON represenation of service structure
 * @param  {Object} procs Object holding all module process
 * @return {Null}       NO return
 */
module.exports = function(workFlow, procsObj) {
    var req, meth, url;

    /**
     * Waterfall Handler
     * @param  {Function} callback return
     * @return {Null}
     */
    var _waterfall = function(callback) {
        _assembleTask(workFlow[meth][url].sync, function(err, task) {
            if (err) return callback(true, 'Invalide Workflow : ' + task);
            var taskArr = [];
            for (var key in task) {
                taskArr.push(task[key]);
            }

            async.waterfall(taskArr, function(err, results) {
                return callback(err, results);
            });

        });
    };

    /**
     * Parallel Handler
     * @param  {Function} callback return
     * @return {Null}
     */
    var _parallel = function(callback) {
        _assembleTask(workFlow[meth][url].async, function(err, task) {
            if (err) return callback(true, 'Invalide Workflow : ' + task);
            async.parallel(task, function(err, results) {
                return callback(err, results);
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

    var _assembleTask = function(taskList, callback) {
        var task = {};
        var err = false;
        for (var key in taskList) {
            var module = taskList[key].split('.');
            if (!procsObj[module[0]]) return callback(true, module);
            var procsInst = new procsObj[module[0]](req);
            if (!procsInst[module[1]]) return callback(true, module);
            task[key] = procsInst[module[1]];
        }
        return callback(err, task);
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
                    var branch = {};
                    url = match;
                    typeof workFlow[meth][url].sync != 'undefined' && (branch.sync = _waterfall);
                    typeof workFlow[meth][url].async != 'undefined' && (branch.async = _parallel);
                    async.parallel(branch, callback);
                    return;
                }
            });
        }
    };
};
