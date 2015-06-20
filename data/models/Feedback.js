var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var feedbackSchema = Schema({
  author: {
    type: String,
    require: '{PATH} is required'
  },
  content: {
    type: String,
    require: '{PATH} is required'
  },
  email: {
    type: String,
    require: '{PATH} is required',
    unique: true
  },
  createdOn: {
    type: Date,
    default: Date.now
  },
  modifiedOn: {
    type: Date,
    default: Date.now
  },
  isDeleted: {
    type: Boolean,
    default: false
  }
});

var Feedback = mongoose.model('Feedback', feedbackSchema);