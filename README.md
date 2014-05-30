# wireframe

Wireframe is a thin wrapper that routes your requests and processes them based on a JSON template. The workflow is generalized to a "asynchronously processing a synchronous and asynchronous set of processes/functions". This is an ideal for writing light weight API that

				/--(sync)---F[a]->F[b]->F[c]-\
Request>--<                                >——>Response
				\--(async)--F[A]-------------/
							\--F[B]--/
							 \-F[C]-/


## Install

'''
npm install wireframe
'''


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
