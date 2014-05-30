# wireframe

Wireframe is a thin wrapper that routes your requests and processes them based on a JSON template. This framework minimizes code duplication and allows a flexable workflow that asynchronolsy processes a set of synchronouse and asyncrnouse tasks. 

```
Response =  Async(Request){ Sync(Request){[F(a),F(b)..]} + Async(Request){[F(a),F(b)...]} }
```

## Install

```Shell
npm install wireframe
```


## Usage


```JavaScript
// mainFile.js

var http = requier("http");
var wireframe = require("wireframe"); // Load Module

var appWorkFlow = require("./workflow.json"); // Load workflow
var processReq = require("./processReq"); // Load process
var processError = require("./processError"); // Load process

var pkgs = {
	"appReq": processReq,
	"appError": processError
};

var api = new wireframe(appWorkFlow,apkgs);

var server = http.createServer(function(req, res) {

	api.run(req,function(err,data){
		// Do something
	});
	
});

server.listen(8080, "localhost");


```

## License
