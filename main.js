var http = require('http');
var wireframe = require('./lib/wireframe'); //1. Load Module

var wf = require('./workflow.json'); //2.Load workflow
var pkgs = {
    'app': require('./processReq'), //2.Load process
    'error': require('./processError')
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
