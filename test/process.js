/**
 * Processing Functions
 * @param  {Object} request Http request objects
 * @return {false}
 */
module.exports = function(request) {
    var d = 1;
    var start = new Date();

    this.one = function(callback) {
        // Do stuff...
        var now = new Date();
        var a = {
            num: d + 1,
            time: now.getTime() - start.getTime()
        };

        setTimeout(function() {
            callback(false, a);
        }, 1000);
    };

    this.two = function(callback) {
        // Do stuff...
        var now = new Date();
        var a = {
            num: d + 2,
            time: now.getTime() - start.getTime()
        };

        setTimeout(function() {
            callback(false, a);
        }, 100);
    };

    this.three = function(callback) {
        // Do stuff...
        var now = new Date();
        var a = {
            num: d + 3,
            time: now.getTime() - start.getTime()
        };

        setTimeout(function() {
            callback(false, a);
        }, 100);
    };

    this.four = function(callback) {
        // Do stuff...
        var now = new Date();
        var a = {
            num: d + 4,
            time: now.getTime() - start.getTime()
        };

        setTimeout(function() {
            callback(false, a);
        }, 300);
    };

    this.five = function(callback) {
        // Do stuff...
        var now = new Date();
        var a = {
            num: d + 5,
            time: now.getTime() - start.getTime()
        };

        setTimeout(function() {
            callback(false, a);
        }, 100);
    };
};
