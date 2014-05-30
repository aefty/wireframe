/**
 * API 1 - Example Actions
 * @param  {Object} request Request from HTTP
 * @return {Null}
 */
module.exports = function(request) {

   //Sync Methods
   this.getData = function(Callback) {

      data = {
         a: 2,
         b: 3,
         c: 4
      };

      Callback(null, data);

   };


   this.doStats = function(data, Callback) {

      for (var key in data) {
         data[key]++;
      }

      Callback(null, data);

   };


   //Async Methods
   this.writeDB2 = function(Callback) {
      var d = new Date();
      var data = {
         "finish_time": d.getTime() - base
      };

      Callback(null, data);

   };

   this.writeOtherDB2 = function(Callback) {
      var d = new Date();
      var data = {
         "finish_time": d.getTime() - base
      };

      Callback(null, data);

   };
};