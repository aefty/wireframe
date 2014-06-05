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
        data.login = "Done fork.login";
        d++;
        callback(false, d);
    };

    this.getData = function(callback) {
        // Do stuff...
        data.getData = "Done fork.login";
        callback(false, "getData");
    };

    this.getUser = function(callback) {
        // Do stuff...
        data.getUser = "Done fork.getUser";
        callback(false, "getUser");
    };

    this.doStats = function(callback) {
        // Do stuff...
        var obj = {
            'part1': 'fork',
            'part2': 'fork',
            'part3': 'fork',
        };
        callback(false, obj);
    };


    //Async Methods
    this.writeDB = function(callback) {
        // Do stuff...
        var data = "Done fork.writeDB";
        callback(false, "fork writeDB");
    };


};
