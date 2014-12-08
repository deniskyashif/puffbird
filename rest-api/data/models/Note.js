var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var noteSchema = Schema({
	title: {
		type: String,
		require: '{PATH} is required',
		unique: true
	},
	content: {
		type: String,
		require: '{PATH} is required',
		unique: true
	},
	cretedOn: {
		type: Date,
		default: Date.now
	},
	dueDate: Date,
	priority: {
		type: String,
		enum: ['low', 'medium', 'high'],
		default: 'low'
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User',
		required: true
	},
	tags: [String]
});

var Note = mongoose.model('Note', noteSchema);