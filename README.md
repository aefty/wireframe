# Wireframe
Wireframe is a thin wrapper that routes your requests and processes them based on a JSON template. This framework minimizes code duplication and allows a flexable workflow that asynchronolsy processes a set of synchronouse and asyncrnouse tasks (Fork), upon completion the results of the requests is run asynchronosly through another set of tasks (Merg).
```
Response = Sync(request){ fork(request){ Sync(){Tn...} + Async(){Tn...} } , merg(request,data){ Async(){Tn...} }}

```

## Install

Get package via npm
```Shell
npm install wireframe
```

## Usage
1) Require the wireframe modules, 2) Load you workflow and process, 3) Instantiate wireframe and 4) Start doing stuff!

```JavaScript
// main.js

var http = require('http');
var wireframe = require('wireframe'); //1. Load Module

var wf = require('./workflow.json'); //2.Load workflow
var pkgs = {
	'proc': require('./process'), //2.Load process
	'merg': require('./merg'), //2.Load process
	'e': require('./error') //2.Load process
};

var api = new wireframe(wf, pkgs); // 3. Instantiate Wireframe

var server = http.createServer(function(req, res) {

	api.run(req, function(err, data) { // 4. Starting doing stuff!
		// Do something
		console.log('error:' + err);
		console.log('data :' + JSON.stringify(data, undefined, 2));
		res.end('done');
	});
});

server.listen(8080, 'localhost');

```

The process can be written in any number of modules and 'require()' in the main file. The request parameter being passed in will point to the http request object. Wireframe is based on the async library and uses "serial" and "parallel".

```JavaScript
// process.js

module.exports = function(request) {
	var d = 1;
	var start = new Date();

	this.one = function(callback) {
		// Do stuff...
		var now = new Date();
		var a = {
			num: d + 1,
			time: now.getTime() - start.getTime()
		};

		setTimeout(function() {
			callback(false, a);
		}, 1000);
	};

	this.two = function(callback) {
		// Do stuff...
		var now = new Date();
		var a = {
			num: d + 2,
			time: now.getTime() - start.getTime()
		};

		setTimeout(function() {
			callback(false, a);
		}, 100);
	};

	// ... more see test

};

```

```JavaScript
// merg.js

module.exports = function(request,data) {

	this.one = function(callback) {
		// Do stuff...
		var now = new Date();
		var a = {
			num: data.sync.proc_one.num + 1,
			time: now.getTime() - start.getTime()
		};

		setTimeout(function() {
			callback(false, a);
		}, 100);
	};

	this.two = function(callback) {
		// Do stuff...
		var now = new Date();
		var a = {
			num: data.sync.proc_two.num + 2,
			time: now.getTime() - start.getTime()
		};

		setTimeout(function() {
			callback(false, a);
		}, 200);
	};

	// ... more see test

};

```

```JavaScript
// error.js

module.exports = function(request) {
	this.wrongURL = function(callback) {
		// Do stuff...
		callback(true, request.url + " : Wrong URL is not supported!");
	};

	this.wrongMethod = function(callback) {
		// Do stuff...
		callback(true, request.method + " : is not supported!");
	};

	// ... more see test
};



```

The workflow template is defined as Http Methods -> URL -> (sync/async) -> Functions.

```JSON
// workflow.json
{
"GET": {
	"/api/stats": {
	"sync": [
		"proc.one",
		"proc.two"
	],
	"async": [
		"proc.three",
		"proc.four"
	],
	"merg": [
		"merg.one",
		"merg.two"
	]
	},
	"*": {
	"sync": [
		"error.wrongURL"
	]
	}
},
"*": {
	"*": {
	"async": [
		"error.wrongMethod"
	]
	}
}
}

```



## License
The MIT License (MIT)
Copyright (c) 2014 Aryan Eftekhari
