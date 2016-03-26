var mongoose = require("mongoose");
var locationSchema = require("./locationSchema.js").schema;
var bcrypt = require("bcrypt-nodejs");

var userSchema = new mongoose.Schema({
	username: String,
	password: String,
	day: [daySchema]
});

userSchema.methods.generateHash = function(password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}

userSchema.methods.validPassword = function(password) {
	return bcrypt.compareSync(password, this.password);
}



module.exports = mongoose.model("userSchema", userSchema);