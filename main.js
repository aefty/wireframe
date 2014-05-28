// Network Startup
var http = require("http");

var wireframe = require("./lib/wireframe");
var API = require("./process");



var server = http.createServer(function (req, res) {
	api = new API(req);
	var structure = {
		"GET": {
			"/test/test": {
				"sync": [
        api.a,
        api.b,
        api.c
      ],
				"async": {
					"taskA": api.taskA,
					"taskB": api.taskB
				}
			},
			"/test/other": {
				"sync": [
        api.a,
        api.b,
        api.c
      ],
				"async": {
					"taskA": api.taskA,
					"taskB": api.taskB
				}
			}
		}
	};

	wireframe(req, structure, function (err, response) {
		console.log("error: " + err);
		console.log("response: " + JSON.stringify(response, undefined, 2));
		res.end("done");
	});

});

server.listen(8080, "localhost");