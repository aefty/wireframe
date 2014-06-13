/**
 * Processing Functions
 * @param  {Object} request Http request objects
 * @return {false}
 */
module.exports = function(request, response, data) {


    this.final = function(callback) {
        // Do stuff...

        response.done(data);

        data.output = 'finished';

        callback(false, a);

    };

};
