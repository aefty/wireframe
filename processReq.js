/**
 * Processing Functions
 * @param  {Object} request Http request objects
 * @return {false}
 */
module.exports = function(request) {

    var data = {};
    var d = 1;

    //Sync Methods
    this.login = function(callback) {
        // Do stuff...
        data.login = "Done app.login";
        d++;
        callback(false, d);
    };

    this.getData = function(callback) {
        // Do stuff...
        data.getData = "Done app.login";
        callback(false, "getData");
    };

    this.getUser = function(callback) {
        // Do stuff...
        data.getUser = "Done app.getUser";
        callback(false, "getUser");
    };

    this.doStats = function(callback) {
        // Do stuff...
        var obj = {
            'part1': 'tick',
            'part2': 'tock',
            'part3': 'tick',
        };
        callback(false, obj);
    };


    //Async Methods
    this.writeDB = function(callback) {
        // Do stuff...
        var data = "Done app.writeDB";
        callback(false, "writeDB");
    };


};
