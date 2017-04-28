module.exports = {
  create: function(req, res){
    if(req.method == 'POST' && req.param('firstName', null)!=null)
    {
        Person.create(req.param('firstName').done(function(err, model){
          if(err)
            res.send('Error');
          else res.send('Success');
        }));
    }
    else res.render('Person/create');
  },
  index: function(req, res){
    Person.find().exec(function(err, persons){
      res.render('Person/index', {'firstName':persons});
      return;
    })
  }  
};
