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
	res.redirect('/');
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



module.exports = router;