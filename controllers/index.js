var usersController = require('../controllers/UsersController')
	, notesController = require('../controllers/NotesController')
  , feedbackController = require('../controllers/FeedbackController')
  , reportsController = require('../controllers/ReportsController');

module.exports = {
    users: usersController,
    notes: notesController,
    feedback: feedbackController,
    reports: reportsController
};