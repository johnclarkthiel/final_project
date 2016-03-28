var mongoose = require('mongoose');

var searchSchema = new mongoose.Schema({
	search_result: {type: Object, required: true}
});

module.exports = mongoose.model('searchSchema', searchSchema);