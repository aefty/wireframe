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
// main.js

var http = requier("http");
var wireframe = require("wireframe"); // Load Module

var wf = require("./workflow.json"); // Load workflow
var procAPI = require("./processReq"); // Load process
var procErr = require("./processError"); // Load process

var pkgs = {
	"app": procAPI,
	"error": procErr
};
var api = new wireframe(wf,pkgs);

var server = http.createServer(function(req, res) {
	api.run(req,function(err,data){
		// Do something
	});
});

server.listen(8080, "localhost");
```

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
   
     // more ...
   
   //Async Methods
   this.writeDB = function(Callback) {
   	// Do stuff... 
   	Callback(null, data);
   };
      this.writeDB2 = function(Callback) {
   	// Do stuff... 
   	Callback(null, data);
   };
   
   // more ...
};


// processError.js
module.exports = function(request) {

   //Sync Methods

   //Async Methods
   this.wrongMethod = function(Callback) {
   	// Do stuff... 
   	Callback(null, data);
   };
};



```


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
        "taskA": "procAPI.writeDB",
        "taskB": "procAPI.WriteDB2"
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
    "/api/logout": {
      "async": {
        "taskA": "procAPI.writeDB",
        "taskB": "procAPI.WriteDB2"
      }
    },
    "*": {
      "async": {
        "e": "procErr.wrongURL"
      }
    }
  }
}
```

## License
