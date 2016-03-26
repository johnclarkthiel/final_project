var mongoose = require('mongoose');

var daySchema = new mongoose.Schema({
	day: {type: Date, required: true},
	description: {type: String, required: true},
	severity: {type: Number, required: true},
	// book: [bookSchema],
	// movie: [movieSchema]
});

module.exports = mongoose.model("daySchema", daySchema);