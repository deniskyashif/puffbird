var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var noteSchema = Schema({
	title: {
		type: String,
		require: '{PATH} is required'
	},
	content: {
		type: String,
		require: '{PATH} is required'
	},
	cretedOn: {
		type: Date,
		default: Date.now
	},
	modyfiedOn:{
		type: Date,
		default: Date.now
	},
	dueDate: Date,
	priority: {
		type: String,
		enum: ['low', 'medium', 'high'],
		default: 'low'
	},
	accomplished: {
		type: Boolean,
		default: false
	},
	user: {
		type: Schema.Types.ObjectId,
		ref: 'User',
		required: true
	},
	tags: [String]
});

var Note = mongoose.model('Note', noteSchema);