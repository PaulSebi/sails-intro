var sails = require('sails');
var chai = require('chai');
var should = chai.should();

before(function(done){
	sails.lift({
	}, function(err, server){
		if(err) return done(err);
		done(err, server);
	});
});


after(function(done){
    sails.lower(done);
});
