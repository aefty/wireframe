/**
 * Processing Functions
 * @param  {Object} request Http request objects
 * @return {false}
 */

module.exports = function(request, data) {

    this.final = function(callback) {
        // Do stuff...

        data.output = 'finished';
        callback(false, data);

    };

};
