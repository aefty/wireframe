 var async = require("async");
 var urlglob = require("urlglob");

 /**
  * WIREFRAME
  * @param  {Object} struc JSON represenation of service structure
  * @param  {Object} procs Object holding all module process
  * @return {Null}       NO return
  */
 module.exports = function(workFlow, processObject) {

    var wf = workFlow;
    var po = processObject;
    var poInst = {};
    var req;
    var urlM;

    /**
     * Waterfall
     * @param  {Function} callback return
     * @return {Null}
     */
    var waterfall = function(callback) {

       var stack = [];
       for (var key in wf[req.method][urlM].sync) {
          var module = wf[req.method][urkN].sync[key]
             .split(".");

          stack.push(poInst[module[0]][module[1]]);
       }

       async.waterfall(stack, function(err, results) {
          callback(err, results);
       });
    };

    /**
     * Parallel Handler
     * @param  {Function} callback return
     * @return {Null}
     */
    var parallel = function(callback) {
       var stack = {};

       for (var key in wf[req.method][urlM].async) {
          var module = wf[req.method][urlM].async[key]
             .split(".");

          stack[key] = poInst[module[0]][module[1]];
       }
       async.parallel(stack, function(err, results) {
          callback(err, results);
       });
    };

    /**
     * Main method
     * @param  {Object}   req      request object passed from HTTP
     * @param  {Function} callback return
     * @return {Null}
     */
    this.run = function(request, callback) {

       req = request;

       for (var key in po) {
          if (typeof po[key] === "function")
             poInst[key] = new Process[key](req);
       }

       if (req.method in wf) {

          for (var urlM in wf[req.method]) {

             if (urlglob(url, req.url)) {
                urlM = urlM;
                var branch = {};
                if (typeof wf[req.method][urlM].sync != "undefined")
                   branch.sync = waterfall;
                if (typeof wf[req.method][urlM].async != "undefined")
                   branch.async = parallel;


                async.parallel(branch, callback);
                break;
             }
          }
       }
    };
 };
