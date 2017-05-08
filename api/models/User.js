/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */
var bcrypt = require('bcrypt');

module.exports = {
  // schema : true,

  attributes: {

    firstName : { type: 'string' },

    email : {
      type: 'string',
      unique: true
    },
    details: {
        type : 'object',
        asl : true
    },
    rights: {
      type : 'string',
    },
    encrPassword : {
        type : 'string',
    },
    toJSON : function(){
      var obj = this.toObject();
      delete obj.encPassword;
      return obj;
      }
    },

    types: {
      asl : function(value){
        return _.isNumber(value.age) && _.isString(value.sex) && _.isString(value.lastName);
      }
    },

    beforeCreate : function(values, next){
      console.log("in before create", values)
      bcrypt.genSalt(10, function(err, salt){
          if(err) return next(err);
          bcrypt.hash(values.password, salt, function(err, hash){
              if(err) return next(err);
              values.encrPassword = hash;
              delete values.password;
              next();
          });
      });
    },

    comparePassword : function (password, user, cb){
        bcrypt.compare(password, user.encrPassword, function(err, match){
          if(err) cb(err);
          if(match){
            cb(null, true);
          }
          else {
            cb(err);
          }
        });
    },

    showUsers : function(req, res){
        User.find().exec(function(err, users){
            if(err)
              res.json({message:'Error In Fetching all Users'});
            return res(users);
        })
    }
};
