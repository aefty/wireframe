/**
 * AUTH - Example Actions
 * @param  {Object} request Request from HTTP
 * @return {Null}
 */
module.exports = function(request) {

   //Sync Methods
   this.login = function(Callback) {

      var data = {};
      data.login = true;

      Callback(null, data);
   };

   this.getData = function(data, Callback) {

      data.getData = {
         "user_id": 1234
      };

      Callback(null, data);
   };

   //Async Methods
   this.logout = function(Callback) {

      var data = {};
      data.logout = true;

      Callback(null, data);
   };
};