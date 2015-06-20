var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var noteSchema = Schema({
  title: {
    type: String,
    require: '{PATH} is required'
  },
  details: {
    type: String,
    require: '{PATH} is required'
  },
  createdOn: {
    type: Date,
    default: Date.now
  },
  modifiedOn: {
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
  tags: [String],
  isDeleted: {
    type: Boolean,
    default: false
  }
});

var Note = mongoose.model('Note', noteSchema);