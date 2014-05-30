// Network Startup
var http = require("http");
var urlglob = require("urlglob");


var api = require("./process-api");
var auth = require("./process-auth");
var e = require("./process-e");

var wireframe = require("./lib/wireframe");

var api1_structrue = require("./structure-api1.json");
var api2_structrue = require("./structure-api2.json");

var pkgs = {
   "api": api,
   "auth": auth,
   "e": e
};

api1 = new wireframe(api1_structrue, pkgs);
api2 = new wireframe(api2_structrue, pkgs);


var server = http.createServer(function(req, res) {

   var output = function(err, data) {
      console.log(req.url);
      console.log("error: " + err);
      console.log("response: " + JSON.stringify(data, undefined, 2));
      res.end("done");
   };

   switch (true) {

      case urlglob("/api1/*", req.url):
         api1.run(req, output);
         break;

      case urlglob("/api2/*", req.url):
         api2.run(req, output);
         break;

      default:
         output(true, null);
   }
});

server.listen(8080, "localhost");