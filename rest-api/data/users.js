var User = require('mongoose').model('User');
	
module.exports = {
	getAll: function (callback) {
        User.find({}, callback);
    },
    getById: function (id, callback) {
        User.findById(id, callback);
    },
    create: function(user, callback) {
        User.create(user, callback);
    },
    update: function(id, updatedUserData, callback){
    	User.update({_id: id}, updatedUserData, callback);
    }
};