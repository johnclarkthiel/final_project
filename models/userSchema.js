var mongoose = require("mongoose");
//requiring day schema
var daySchema = require("./daySchema.js").schema;
//for bcrypt for hasing passwords
var bcrypt = require("bcrypt-nodejs");

var userSchema = new mongoose.Schema({
	name: String,
	email: {type: String, required: true},
	password: {type: String, required: true},
	bored_instances: Number,
	day: [daySchema]
});
//brcypt method for hashing pw
userSchema.methods.generateHash = function(password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
}
//bcrypt method for validating hashed passwords
userSchema.methods.validPassword = function(password) {
	return bcrypt.compareSync(password, this.password);
}



module.exports = mongoose.model("userSchema", userSchema);