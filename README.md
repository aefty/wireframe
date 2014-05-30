# wireframe

Wireframe is a thin wrapper that routes your requests and processes them based on a JSON template. This framework minimizes code duplication and allows a flexable workflow that asynchronolsy processes a set of synchronouse and asyncrnouse tasks. 

```
Response =  Async(Request){ Return Sync([F(a),F(b),F(c)..]) + Async([F(a),F(b),F(c)...]) };
```

## Install

```Shell
npm install wireframe
```


## Usage


'''

var wireframe = require("wireframe"); // Load Module

var appWorkFlow = require("./workflow.json"); // Load workflow
var processReq = require("./processReq"); // Load process
var processError = require("./processError"); // Load process

var pkgs = {
	"appReq": processReq,
	"appError": processError
};

var api = new wireframe(appWorkFlow,apkgs);




## License
