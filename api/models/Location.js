/**
 * Location.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
      latitude : {type : 'string'},
      longitude : {type : 'string'},
      user : {
        model : 'User',
        required : true
      }
  },

  insert: function(req, res){
      Location.create(req.body).exec(function(err, doc){
          if(err) res.json("Error Creating Location Log");
          res.json({message: 'Location Logged', documented: doc});
      });
  },

  whereabouts: function(req, callback){
      Location.find({
          createdAt: { '>' : req.fromtime, '<' : req.totime},
          user : req.id
      }).populate('user').exec(function(err, list){
          if(err)
            res.json({message: 'Could Not Find Log'});
          var result = [], i;
          for(i=0; i<list.length; i++)
              result.push({
                latitude : list[i].latitude,
                longitude : list[i].longitude,
                timestamp : list[i].createdAt
              });
          callback(null, result);
        });
      },

    userlocs: function(userid, callback){
      Location.find({
          user: userid
      }).exec(function(err, list){
          if(err)
            return {message:'Cant do'};
          var i;

          var formatted = [];
          _.each(list, function(loclog){
              formatted.push({
              latitude : loclog.latitude,
              longitude : loclog.longitude,
              timestamp : loclog.createdAt
            });
          });

          return callback(null, formatted);
      });

    }
};
