// Network Startup
var http = require("http");
var api = require("./process");
var errors = require("./error");
var wireframe = require("./lib/wireframe");
var structure = require("./structure.json");

var pkg = {
  "api": api,
  "errors": errors
};

poinat = new wireframe(structure, pkg);
var server = http.createServer(function (req, res) {

	poinat.run(req, function (err, response) {
		console.log(req.url);
		console.log("error: " + err);
		console.log("response: " + JSON.stringify(response, undefined, 2));
		res.end("done");
	});

});

server.listen(80);
