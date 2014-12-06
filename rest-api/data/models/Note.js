var mongoose = require('mongoose');

var noteSchema = mongoose.Schema({
	title: String,
	content: String,
	dueDate: Date,
	tags: [String]
});

module.exports = mongoose.model('Note', noteSchema);