var mongoose = require('mongoose');

var searchSchema = new mongoose.Schema({
	search_result: {type: Object}
});

module.exports = mongoose.model('searchSchema', searchSchema);