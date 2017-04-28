module.exports = function(req, res, next){
  console.log('isAuth');
  User.findOne({id:req.token.payload.id}).exec(function(err, user){
      if(err)
        return res.json({message : 'Error Occurred'});
      if(user.rights == 'user')
        return res.json({message : 'Access Not Allowed'});
      else if(user.rights == "admin")
        next();
    });
}
