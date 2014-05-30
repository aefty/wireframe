/**
 * Error - Example Actions
 * @param  {Object} request Request from HTTP
 * @return {Null}
 */
module.exports = function(request) {

   //Sync Methods

   //Async Methods
   this.wrongURL = function(Callback) {

      var data = {};
      data.code = 401;
      data.message = "Resource/ULR not found ... Bro";

      Callback(null, data);
   };

   this.wrongMethod = function(Callback) {

      var data = {};
      data.code = 401;
      data.message = "Method not supported ... Bro";

      Callback(null, data);
   };


};
