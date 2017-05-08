module.exports = {

		index: function(req,res){
				var email = req.param('email');
				var password = req.param('password');
				// console.log("in Auth", req.params);
				if(!email || !password)
						return res.json(401, {err:'Email Password Error'});

				User.findOne({email:email}, function(er, user){
					if(!user)
							return res.json(401, {err: 'No such user'});

					User.comparePassword(password, user, function(err, valid){
							if(err)
								return res.json(403, {err: 'Forbidden'});

							if(!valid)
									return res.json(401, {err: 'Invalid Email/Password'});
							else 	res.json({user:user.firstName, token : jwToken.issue({id:user.id})});
						});
				});
		}
};
