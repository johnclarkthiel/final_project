var mongoose = require('mongoose');

var daySchema = new mongoose.Schema({
	day: {type: Date, required: true},
	description: String,
	severity: Number,
	book: [bookSchema],
	movie: [movieSchema]
});

module.exports = mongoose.model("daySchema", daySchema);