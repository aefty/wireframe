 module.exports = function (request) {
    var d = new Date();
    var base = d.getTime()


   //var request = Request;

  this.a = function (Callback) {
    var d = new Date();
    data = {"aTime":d.getTime()-base};

      setTimeout(function () {
        Callback(null,data );
    }, 1000);

  };
	this.b = function (data, Callback) {
    var d = new Date();
    data.bTime=d.getTime()-base;
    setTimeout(function () {
        Callback(null, data);
    }, 1000);

	};

	this.c = function (data, Callback) {
    var d = new Date();
    data.cTime=d.getTime()-base;
 setTimeout(function () {
        Callback(null, data);
    }, 1000);


	};

	this.taskA = function (Callback) {
    var d = new Date();
    var t = {
      "finish_time" : d.getTime()-base
    }

		Callback(null, t);

	};
	this.taskB = function (Callback) {
  var d = new Date();
  var t = {
      "finish_time" : d.getTime()-base
    }
		Callback(null, t);

	};
	this.url_er = function (Callback) {

		Callback(true, "URL not supported : " + request.url);

	};
};
