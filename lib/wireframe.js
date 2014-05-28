var async = require("async");
var urlglob = require("urlglob");

module.exports = function (req, struc) {

  var start = function (callback) {

    var wtf = function (callback) {

      var func = [];
      func = struc.METHOD[req.method].URL[url].FUNCTION.SYNC;

      async.waterfall(func,
        function (err, results) {
          callback(err, results);
        }
      );
    };

    var prl = function (callback) {

      var func = {};
      func = struc.METHOD[req.method].URL[url].FUNCTION.ASYNC;

      async.parallel(func,
        function (err, results) {
          callback(err, results);
        }
      );
    };

    if (req.method in struc.METHOD) {

      var i = true;

      for (var url in struc.METHOD[req.method].URL) {

        if (urlglob(req.url, url)) {

          async.parallel({
              "sync": wtf,
              "async": prl
            },
            callback
          );

          i = false;
          break;
        }
      }

      if (i) {
        callback(true, "Request not supported");
      }


    } else {
      callback(true, "METHOD not supported");
    }
  }
};
