module.exports = {
      //remember to add uid to user.body in policies
      create : function(req, res){
          req.body.user = req.token.payload.id;
          console.log('Recieved', req.body);
          return Location.insert(req, res);
      },

      findlog : function(req, res){
          req.body.user = req.token.payload.id;
          console.log('Received', req.body);
          return Location.whereabouts(req, res);
      },

      findAllLog : function(req, res){
          User.showUsers(req, function(users){

              console.log('---Arrays Obtained----');
              var finalvals = [];
              _.each(users, function(user){
                  finalvals.push(user.id);
              });
              var formattedvals = {}, unformattedvals = [];

              async.series([function(callback){
                async.map(finalvals, function(user, callback){
                  Location.userlocs(user, function(err, results){
                    formattedvals[user] = results;
                    callback();
                  });
                }, function(err, results){
                  if(err)
                  return err;
                  console.log(formattedvals);
                  callback();
                })
              },
              function(callback){
                unformattedvals = _.toArray(formattedvals);
                  callback();
              }],
              function(err, results){
                  if(err)
                    res.json({message:'Error'});
                  res.json({formatted: formattedvals, unformatted : unformattedvals});
              });
          });
      }
}
