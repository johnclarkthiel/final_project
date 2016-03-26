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

router.get('/', function(req,res){
	res.send('USER CONTROLLER WORKS')
});


module.exports = router;