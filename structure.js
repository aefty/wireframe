var Root = require("./root");
var Admin = require("./admin");
var Message = require("./message");

Var root =  new Root(request);
Var admin =  new Admin(request);
Var message =  new Message (request);



module.exports = {
  "api/url":{
    get:{
      "match/url":{
        sync:[admin.do,admin.that],
        async:{
          proc:admin.proc,
          write:admdin.write
        }
      }
    }
  };
