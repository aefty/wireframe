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
1)Require the wireframe modules, 2)Define you workflow and process, 3)Instantiate wireframe and 4)Start doing stuff!

```JavaScript
// main.js

var http = requier("http");
var wireframe = require("wireframe"); //1. Load Module

var wf = require("./workflow.json"); //2.Load workflow
var procAPI = require("./processReq"); //2.Load process
var procErr = require("./processError"); //2.Load process

var pkgs = {           
	"app": procAPI,
	"error": procErr
};
var api = new wireframe(wf,pkgs); // 3. Instantiate Wireframe

var server = http.createServer(function(req, res) {
	
	api.run(req,function(err,data){ // 4. Starting doing stuff!
		// Do something
	});
});

server.listen(8080, "localhost");
```

The process can be written in any number of modules and Required in the main file. The request paramter being passed in will point to the http request object. Wireframe is based on the async libaray and uses "waterfall" for sync and "parallel" for async.

```JavaScript
// processReq.js
module.exports = function(request) {

   //Sync Methods
   this.getData = function(Callback) {
   	// Do stuff... 
   	Callback(null, data);
   };
      this.doStats = function(data,Callback) {
   	// Do stuff... 
   	Callback(null, data);
   };
   
   //Async Methods
   this.writeDB = function(Callback) {
   	// Do stuff... 
   	Callback(null, data);
   };
};
```

```JavaScript

// processError.js
module.exports = function(request) {
   //Async Methods
   this.wrongURL = function(Callback) {
   	// Do stuff... 
   	Callback(null, data);
   };
};



```

The workflow template is defined as Http Methods -> URL -> (sync/async) -> Functions.

```JSON
// workflow.json
{
  "GET": {
    "/api/stats": {
      "sync": [
        "procAPI.getData",
        "procAPI.doStats"
      ],
      "async": {
        "taskA": "procAPI.writeDB"
      }
    },
    "*": {
      "async": {
        "e": "procErr.wrongURL"
      }
    }
  },
  "POST": {
    "/api2/login": {
      "sync": [
        "procAPI.login",
        "procAPI.getData"
      ]
    },
    "*": {
      "async": {
        "e": "procErr.wrongURL"
      }
    }
  },
  "*": {
    "*": {
      "async": {
        "e": "procErr.wrongURL"
      }
    }
  }
}
```



## License
