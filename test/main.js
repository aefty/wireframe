var http = require('http');
var wireframe = require('../lib/wireframe'); //1. Load Module

var wf = require('./workflow.json'); //2.Load workflow
var pkgs = {
    'proc': require('./process'), //2.Load process
    'merg': require('./merg'), //2.Load process
    'e': require('./error') //2.Load process
};

var api = new wireframe(wf, pkgs); // 3. Instantiate Wireframe
var server = http.createServer(function(req, res) {
    api.run(req, res, function(err, data) { // 4. Starting doing stuff!
        // Do something
        console.log('-----------');
        console.log('error:' + err);
        console.log('data :' + JSON.stringify(data, undefined, 2));
    });
});
server.listen(8080, 'localhost');
