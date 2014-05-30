// Network Startup
var http = require("http");

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

   var u = req.url.split("/");

   var output = function(err, response) {
      console.log(req.url);
      console.log("error: " + err);
      console.log("response: " + JSON.stringify(response, undefined, 2));
      res.end("done");
   };

   switch (u[0]) {

      case "api1":
         api1.run(req, output);
         break;

      case "api2":
         api2.run(req, output);
         break;

      default:
         output(true, null);
   }
});

server.listen(8080, "localhost");