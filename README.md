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
1) Require the wireframe modules, 2) Define you workflow and process, 3) Instantiate wireframe and 4) Start doing stuff!

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
    "/api/login": {
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

The MIT License (MIT)

Copyright (c) 2014 Aryan Eftekhari

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
