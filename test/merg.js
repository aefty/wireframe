/**
 * Processing Functions
 * @param  {Object} request Http request objects
 * @return {false}
 */
module.exports = function(request, data) {
    var start = new Date();

    this.one = function(callback) {
        // Do stuff...
        var now = new Date();
        var a = {
            num: data.sync.proc_one.num + 1,
            time: now.getTime() - start.getTime()
        };

        //console.log('merg.one');

        setTimeout(function() {
            callback(false, a);
        }, 100);
    };

    this.two = function(callback) {
        // Do stuff...
        var now = new Date();
        var a = {
            num: data.sync.proc_two.num + 2,
            time: now.getTime() - start.getTime()
        };

        //console.log('merg.two');

        setTimeout(function() {
            callback(false, a);
        }, 200);
    };

    this.three = function(callback) {
        // Do stuff...
        var now = new Date();
        var a = {
            num: data.sync.proc_one.num + 3,
            time: now.getTime() - start.getTime()
        };
        console.log('merg.three');

        setTimeout(function() {
            callback(false, a);
        }, 100);
    };

    this.four = function(callback) {
        // Do stuff...
        var now = new Date();
        var a = {
            num: data.sync.proc_one.num + 4,
            time: now.getTime() - start.getTime()
        };
        console.log('merg.four');

        setTimeout(function() {
            callback(false, a);
        }, 100);
    };


    this.five = function(callback) {
        // Do stuff...
        var now = new Date();
        var a = {
            num: data.sync.proc_one.num + 5,
            time: now.getTime() - start.getTime()
        };

        console.log('merg.five');

        setTimeout(function() {
            callback(false, a);
        }, 100);
    };
};
