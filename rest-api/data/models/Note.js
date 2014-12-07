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
	dueDate: Date,
	user: {
		type: Schema.ObjectId,
		ref: 'User',
		required: true
	},
	tags: [String]
});

var Note = mongoose.model('Note', noteSchema);