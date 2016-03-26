//ROUTER SETUP
var express = require("express");
var router = express.Router();
var mongoose = require('mongoose');
mongoose.set('debug', true);

// var passport = require("passport");

router.get('/', function(req,res){
	res.send('USER CONTROLLER WORKS')
});


module.exports = router;