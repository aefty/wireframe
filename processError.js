/**
 * Error function
 * @param  {Object} request Http Request Object
 * @return {Null}
 */
module.exports = function(request) {

    var data = {};

    //Sync Methods

    //Async Methods
    this.wrongURL = function(callback) {
        // Do stuff...
        data = request.url + " : Wrong URL is not supported!";
        callback(true, "wrongUrl");
    };

    this.wrongMethod = function(callback) {
        // Do stuff...
        var data = request.method + " : is not supported!";
        callback(true, "wrongMethod");
    };
};
