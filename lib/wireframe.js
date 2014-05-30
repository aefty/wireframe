 var async = require("async");
 var urlglob = require("urlglob");

 module.exports = function(struc, procs) {

     var Structure = struc;
     var Process = procs;
     var process_inst = {};
     var request;
     var url_match;

     /**
      * (private) waterfall wrapper
      * @param  {callback} rtn return value
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
      * (private) parallel
      * @param  {callback} rtn return value
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
      * main function
      * @param  {callback} callback main callback
      */
     this.run = function(req, callback) {

         request = req;

         for (var key in Process) {
             if (typeof Process[key] === "function")
                 process_inst[key] = new Process[key](request);
         }

         if (request.method in Structure) {
             for (var url in Structure[request.method]) {
                 if (urlglob(url, request.url)) {

                     url_match = url;

                     async.parallel({
                             "waterfall": waterfall,
                             "parallel": parallel
                         },
                         callback
                     );
                     break;
                 }
             }
         }
     };
 };
