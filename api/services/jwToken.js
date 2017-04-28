var jwt = require('jsonwebtoken');
var secret = 'secretisjson';

//generate a token from supplied payload

module.exports  = {
    issue : function(payload){
      console.log('payload -- ', payload);
      return jwt.sign({payload: payload}, secret, {expiresIn:60*60});
    },

    verify : function(token, callback){
      return jwt.verify(token, secret, {}, callback);
    }
  };
