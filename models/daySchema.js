var mongoose = require('mongoose');
var searchSchema = require('./searchSchema.js').schema;

var daySchema = new mongoose.Schema({
	day: {type: Date, required: true, default: Date.now},
	description: {type: String, required: true},
	severity: {type: Number, required: true},
	// book: [bookSchema],
	// movie: [movieSchema]
	search: [searchSchema]
});

module.exports = mongoose.model("daySchema", daySchema);