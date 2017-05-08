var url = 'http://localhost:1337';
var request = require('supertest')(url);

describe("user create", function(){
    it("inserts record without error", function(done){
        var req = request.post("/User/signup");
        req.send({
            data: {
              "firstName" : "Paul",
              "email" : "paul@abc.com",
              "password" : "123QWERT",
              "details":
              {
                "age" : 21,
                "sex" : "male",
                "lastName"  : "Sebi"
              },
              "rights" : "user"
            }
        });
        req.end(function(err, res){
            if(err)
                throw err;
            console.log(res.text);
            done();
        });
    }),

    // it("shows details of user without error", function(done){
    //     var req = request.get('User/login')
    // });
});
