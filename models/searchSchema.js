var mongoose = require('mongoose');

var searchSchema = new mongoose.Schema({
	search_result: {type: Object},
	search_query_one: {type: String, default: "Query One"},
	search_query_two: {type: Array},
	efficacy: {type: Number, default: 0},
	notes: {type: String, default: ""}
});

module.exports = mongoose.model('searchSchema', searchSchema);