  module.exports = {

  index: function (req, res) {
      User.find({"details.sex":"Male"}).exec(function(err, users){
          if(err)
            res.json(err);
          res.json(users);
      });
  },

  create: function (req, res) {
		User.create(req.body).exec(function(err, user){
			if(err)
				return res.json({message:'Err Occurred', error: err});
      if(user){
          return res.json(200, {user: user.firstName, token: jwToken.issue({id:user.id})});
      }
		});
  },

  show : function(req, res){
      User.findOne({id:req.token.payload.id}).exec(function(err, result){
          if(err)
            return res.json({message: 'Error Occurred'});
          return res.json(result);
      });
  },

  showadmin: function (req, res) {
    console.log("oo")
		var value = req.body;
		if(req.method == 'GET'){
			//User.findOne({id:req.token.payload.id}).exec(function(err, result){
      User.find().exec(function(err, result){
				if(err)
					return res.json({message:'Error Occurred'});
				return res.json(result);
			});
		}
		else{
			if(value.firstName!=null){
					User.find({
              firstName:value.firstName
						}).exec(function(err, result){
					if(err)
						return res.json({message:'Error Occurred', error:err});
					return res.json(result);
				});
			}
			else if(value.details.gender!=null){
					sails.log.debug('In Gender Finder', value.details.gender);
					User.find({
						details: {gender: value.details.gender}
					}).exec(function(err, result){
						if(err)
							return res.json({message:'Error Occurred', error:err});
						else return res.json(result);
					});
			}
			else{
				User.find().exec(function(err, result){
						if(err)
							return res.json({message:'Error Occurred', error:err.summary});
						return res.json(result);
				});
			}
		}
  },

  edit: function (req, res) {
    return res.json({
      todo: 'edit() is not implemented yet!'
    });
  },


  /**
   * `UserController.delete()`
   */
  delete: function (req, res) {
    var i, str;
		User.destroy({
			name : null
		}).exec(function(err, result){
      for(i=0; i<result.length; i++){
          str = str + '\n' + result[i].name;
      }
			if(err)
				return res.json({message:'Error Occurred', error:err.summary});
			return res.json(str);
		})
  }
};
