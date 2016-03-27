//ROUTER SETUP
var express = require("express");
var router = express.Router();
var mongoose = require('mongoose');
mongoose.set('debug', true);
//requiring passport for user auth
var passport = require("passport");
//requiring schemas
var User = require('../models/userSchema.js');
var Day = require('../models/daySchema.js');
//Test if working
router.get('/', function(req,res){
	res.send('USER CONTROLLER WORKS')
});
//LOGOUT
router.get('/:id/logout', function(req,res){
	console.log("LOGGED OUT");
	req.logout();
	res.send('USER LOGGED OUT ',req.user);
});
//SIGNUP
router.post('/signup', passport.authenticate('local-signup', {
	failureRedirect: '/google.com' //redirect if error
	}), function(req, res) {
		console.log("SIGNUP AND USER AUTH SUCCESS!");
		console.log("REQ USER @@@@@@@", req.user);
		res.send(req.user);
	}
);

//get user
router.get('/:id', function(req,res){
	User.findById(req.params.id, function(err,user){
		if (err) { console.log("ERROR: ", err) }
		res.send(user);
	});
});

//login
router.post('/login', passport.authenticate('local-login', {
	failureRedirect: '/google.com'
}), function(req, res) {
	console.log("LOGIN AND USER AUTH SUCCESS!");
	console.log("REQ USER @@@@@@@", req.user);
	res.send(req.user);
	}
);

//CREATE A DAY
router.post('/:id', function(req,res){
	console.log("NEW DAY POST ROUTE WORKING");
	console.log(req.body);
	// res.send(req.body)
	//add and save a day
	var newDay = new Day(req.body);
	newDay.save(function(err){
		//find the user by the reqparam id, push the new day into the user's day array, save the user
		User.findById(req.params.id, function(err,user){
			user.day.push(newDay);
			// user.bored_instances += 1; <<<< this does not work
			user.save(function(err){
				if (err) { console.log(err) }
				res.send(user);
			});
		});
	});
});








module.exports = router;