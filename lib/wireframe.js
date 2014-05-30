 var async = require("async");
 var urlglob = require("urlglob");

 /**
  * WIREFRAME
  * @param  {Object} struc JSON represenation of service structure
  * @param  {Object} procs Object holding all module process
  * @return {Null}       NO return
  */
 module.exports = function(struc, procs) {

    var Structure = struc;
    var Process = procs;
    var process_inst = {};
    var request;
    var url_match;

    /**
     * Waterfall
     * @param  {Function} callback return
     * @return {Null}
     */
    var waterfall = function(callback) {

       var stack = [];
       for (var key in Structure[request.method][url_match]["waterfall"]) {
          var module = Structure[request.method][url_match]["waterfall"][key]
             .split(".");

          stack.push(process_inst[module[0]][module[1]]);
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

       for (var key in Structure[request.method][url_match]["parallel"]) {
          var module = Structure[request.method][url_match]["parallel"][key]
             .split(".");

          stack[key] = process_inst[module[0]][module[1]];
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
    this.run = function(req, callback) {

       request = req;

       for (var key in Process) {
          if (typeof Process[key] === "function")
             process_inst[key] = new Process[key](request);
       }

       if (request.method in Structure || request.method.toLowerCase() in
          Structure) {
          for (var url in Structure[request.method]) {
             if (urlglob(url, request.url)) {

                url_match = url;

                async.parallel({
                      "sync": waterfall,
                      "async": parallel
                   },
                   callback
                );
                break;
             }
          }
       }
    };
};
