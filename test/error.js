/**
 * Error function
 * @param  {Object} request Http Request Object
 * @return {Null}
 */
module.exports = function(request) {

    this.wrongURL = function(callback) {

        callback(true, request.url + " : Wrong URL is not supported!");
    };

    this.wrongMethod = function(callback) {
        // Do stuff...

        callback(true, request.method + " : is not supported!");
    };
};
