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
              // console.log(users);
              // console.log(users);
              console.log('---Arrays Obtained----');
              var finalvals = [];
              _.each(users, function(user){
                  finalvals.push(user.id);
              });
              async.map(finalvals, Location.userlocs, function(err, results){
                  if(err)
                    return err;
                  // console.log('------------------');
                  // console.log(results);
                  console.log("--------------------");
                  //convert to array of objects having array of objects

                  var formattedvals = {};
                  _.each(results, function(result){
                       console.log(_.groupBy(result, function(r){return r.username;}));
                  });


                  res.json(formattedvals);
              });
          });
      }
}
