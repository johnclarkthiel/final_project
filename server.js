//REQUIREMENTS
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var morgan = require('morgan');
var passport = require('passport');
var passportLocal = require('passport-local');
var session = require('express-session');
//cookie parser
var cookieParser = require('cookie-parser');
//setting up port/DB, requiring mongoose
var port = process.env.PORT || 3000;
var mongoose = require('mongoose');
var mongoURI = process.env.MONGOLAB_URI || 'mongodb://localhost/final_project';

//pass port config load
require('./config/passport')(passport);

//middleware
app.use(express.static('public'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
//use cookieparser
app.use(cookieParser());

//passport middleware
// var passport = require('passport');

// var session = require('express-session');

app.use(session({name: 'final_project_auth_app', secret: 'final'}));
app.use(passport.initialize());
app.use(passport.session());
//remember me
app.use(passport.authenticate('remember-me'));

//check to see if root page works
// app.get('/', function(req,res){
// 	res.send('WORKING ROOT PAGE');
// })

// app.get('/cookies', function(req, res) {
//   console.log("Cookies: ", req.cookies)
// })

//controllers
var userController = require('./controllers/userController.js');
app.use('/user', userController);

//mongoose
mongoose.connect(mongoURI);

mongoose.connection.on('error', function(){
	console.log('MONGO not connected');
});

//port
mongoose.connection.once('open', function(){
		console.log('MONGO connected');
		app.listen(port, function(){
		console.log("Listening on port:" + port);
	});
});