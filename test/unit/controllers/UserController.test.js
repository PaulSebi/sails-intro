var supertest = require('supertest');


var token;

describe("The User Controller", function(){
    it("should create a user", function(done  ){
        var agent = supertest.agent(sails.hooks.http.app);
        agent
          .post('/User/signup')
          .set('Accept', 'application/json')
          .send({
                "firstName" : "Paul",
                "email" : "paul@abc.com",
                "password" : "123QWERT",
                "details":
                {
                  "age" : 21,
                  "sex" : "male",
                  "lastName"  : "Sebi"
                },
                "rights" : "user"})
          .expect('Content-Type', /json/)
          .expect(200)
          .end(function(err, result){
              if(err) done(err);
              else {
                  console.log('result',result.body);
                  result.body.should.be.an('object');
                  result.body.should.have.property('user', 'Paul');
                  result.body.should.have.property('token');
                  done();
              }
          });
    }),

    it("should login with the user credentials", function(done){
        var agent = supertest.agent(sails.hooks.http.app);
        agent
          .get('/User/login?email=walter@abc.com&password=123QWERT')
          .set('Accept', 'application/json')
          .expect(200)
          .end(function(err, result){
              if(err) done(err);
              else{
                  result.body.should.be.an('object');
                  result.body.should.have.property('user');
                  result.body.should.have.property('token');
                  token = result.body.token;
                  done();
              }
          })
    }),

    it("should show details of user", function(done){
        var agent = supertest.agent(sails.hooks.http.app);
        agent
          .get('/User/show?email="walter@abc.com"&password="123QWERT"')
          .set('Accept', 'application/json')
          .set({'Authorization' : 'Bearer '+token})
          .expect(200)
          .expect('Content-Type', /json/)
          .end(function(err, result){
              if(err) done(err);
              else{
                  result.body.should.be.an('object');
                  result.body.should.have.property('firstName');
                  result.body.should.have.property('email');
                  result.body.should.have.property('details');
                  result.body.should.have.property('rights');
                  result.body.should.have.property('id');
                  done();
              }
          });
    });
});
