/**
 * Error function
 * @param  {Object} request Http Request Object
 * @return {Null}
 */
module.exports = function(request) {
   //Async Methods
   this.wrongURL = function(callback) {
      // Do stuff...
      var data = request.url + " : is not supported!";
      callback(null, data);
   };

   this.wrongMethod = function(callback) {
      // Do stuff...
      var data = request.method + " : is not supported!";
      callback(null, data);
   };
};
