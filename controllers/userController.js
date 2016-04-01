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
var Search = require('../models/searchSchema.js');
//Test if working
router.get('/', function(req,res){
		res.send("WORKING");
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
		if (req.isAuthenticated()) {
			res.send(user);
		}
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
			if (user.bored_instances == null || user.bored_instances == undefined) {
				user.bored_instances = 1;
			} else {
				user.bored_instances = user.bored_instances += 1;
			}
			user.save(function(err){
				if (err) { console.log(err) }
				res.send(user);
			});
		});
	});
});

//create a saved search result
router.post('/:id/:day_id/', function(req,res){
	//create a new search from the saved search being sent
	var newSearch = new Search(req.body);
	console.log(newSearch);
	newSearch.save(function(err){
		if (err) { console.log(err); }

		User.findById(req.params.id, function(err, user){
			console.log("USER >>>>> ", user);
			console.log("USER >>>>> ", user.day);
			if (user.bored_instances == null || user.bored_instances == undefined) {
				user.bored_instances = 1;
			} else {
				user.bored_instances = user.bored_instances += 1;
				user.searches = user.searches += 1;
			}
			for (var i = 0; i < user.day.length; i ++ ) {
				if (user.day[i]._id == req.params.day_id) {
					console.log(user.day[i]);
					console.log(user.day[i].search);
					console.log(newSearch)
					user.day[i].search.push(newSearch);
					user.save(function(err){
						if (err) { console.log(err); }
						res.send(user);
					});
				};
			};
		});
	});
});

//PUT ROUTE FOR UPDATING SEARCHES
router.put('/:id/:day_id/:search_id', function(req,res){
	console.log("SEARCH QUERY ONE ",req.body.search_query_one);
	console.log("SEARCH QUERY TWO ",req.body.search_query_two);
	console.log("NOTES ",req.body.notes);
	User.findById(req.params.id, function(err, user){
		if (err) { console.log(err); }
		for (var i = 0; i < user.day.length; i ++) {
			if (user.day[i]._id == req.params.day_id) {
				console.log(user.day[i]);
				for (var j = 0; j < user.day[i].search.length; j++) {
					if (user.day[i].search[j]._id == req.params.search_id) {
						console.log("PUT ROUTE SEARCH >>>>>>", user.day[i].search[j]);
						user.ratings.push(req.body.search_query_two);
						user.day[i].search[j].search_query_two.push(parseInt(req.body.search_query_two));
						user.day[i].search[j].notes = req.body.notes;
						if (req.body.search_query_one == 'yes') {
							user.efficacy += 1;
							user.day[i].search[j].efficacy += 1;
						};
						user.save(function(err){
							if (err) { console.log(err); }
							res.send(user);
						});
					};
				};
			};
		};
	});
});

//DELETE ROUTE FOR DELETEING SEARCHES
router.delete('/:id/:day_id/:search_id', function(req,res){
	User.findById(req.params.id, function(err, user) {
		for (var i = 0; i < user.day.length; i ++) {
			if (user.day[i]._id == req.params.day_id) {
				console.log(user.day[i]);
				for (var j = 0; j < user.day[i].search.length; j++) {
					if (user.day[i].search[j]._id == req.params.search_id) {
						user.day[i].search.splice(j,1);
						user.save(function(err){
							if (err) { console.log(err); }
							res.send(user);
						});
					};
				};
			};
		};
	});
});

//DELETE ROUTE FOR DELETING DAYS
router.delete('/:id/:day_id', function(req,res){
	User.findById(req.params.id, function(err, user){
		for (var i = 0; i < user.day.length; i++) {
			if (user.day[i]._id == req.params.day_id) {
				user.day.splice(i,1);
				user.save(function(err){
					if (err) { console.log(err); }
					res.send(user);
				});
			};
		};
	});
});

//logged in check
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated()) {
    		console.log("AUTHORIZED");
        return next();
     }
    // if they aren't redirect them to the home page
   	console.log("NOT AUTHORIZED");
    res.redirect('/');
};



module.exports = router;