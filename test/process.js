/**
 * Processing Functions
 * @param  {Object} request Http request objects
 * @return {false}
 */
module.exports = function(request, data) {
    var d = 1;
    var start = Date.now();

    this.one = function(callback) {
        // Do stuff...
        var a = {
            num: d + 1,
            time: Date.now() - start,
        };

        setTimeout(function() {
            callback(false, a);
        }, 100);
    };

    this.two = function(callback) {
        // Do stuff...
        var a = {
            num: d + 2,
            time: Date.now() - start
        };

        setTimeout(function() {
            callback(false, a);
        }, 200);
    };

    this.three = function(callback) {
        // Do stuff...
        var a = {
            num: d + 3,
            time: Date.now() - start
        };

        setTimeout(function() {
            callback(false, a);
        }, 100);
    };

    this.four = function(callback) {
        // Do stuff...
        var a = {
            num: d + 4,
            time: Date.now() - start
        };

        setTimeout(function() {
            callback(false, a);
        }, 200);
    };

    this.five = function(callback) {
        // Do stuff...
        var a = {
            num: d + 5,
            time: Date.now() - start
        };

        setTimeout(function() {
            callback(false, a);
        }, 100);
    };
};
