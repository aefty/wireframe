/**
 * Processing Functions
 * @param  {Object} request Http request objects
 * @return {Null}
 */
module.exports = function(request) {

    //Sync Methods
    this.login = function(callback) {
        // Do stuff...
        callback(null, "Done app.login");
    };

    this.getData = function(callback) {
        // Do stuff...
        callback(null, "Done app.getData");
    };

    this.getUser = function(data, callback) {
        // Do stuff...
        callback(null, "Done app.getUser");
    };

    this.doStats = function(data, callback) {
        // Do stuff...
        callback(null, "Done doStats");
    };

    //Async Methods
    this.writeDB = function(callback) {
        // Do stuff...
        var data = "Done writeDB";
        callback(null, data);
    };
};
