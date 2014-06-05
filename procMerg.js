/**
 * Processing Functions
 * @param  {Object} request Http request objects
 * @return {false}
 */
module.exports = function(request, data) {

    var d = 1;

    //Sync Methods
    this.login = function(callback) {
        // Do stuff...
        d++;
        callback(false, d);
    };

    this.getData = function(callback) {
        // Do stuff...
        //data.getData = "Done app.login";
        callback(false, "mergin");
    };

    this.getUser = function(callback) {
        // Do stuff...

        callback(false, data);
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

        callback(false, "merging, writeDB");
    };


};
