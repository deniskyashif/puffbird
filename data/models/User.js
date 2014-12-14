var mongoose = require('mongoose'),
    encryption = require('../../utilities/encryption'),
    Schema = mongoose.Schema;

var userSchema = Schema({
    username: {
        type: String,
        require: '{PATH} is required',
        unique: true
    },
    salt: {
        type: String,
        require: '{PATH} is required',
        unique: true
    },
    hashPass: {
        type: String,
        require: '{PATH} is required',
        unique: true
    },
    firstName: String,
    lastName: String,
    notes: [{
        type: Schema.Types.ObjectId,
        ref: 'Note'
    }]
});

userSchema.method({
    authenticate: function(password) {
        if (encryption.generateHashedPassword(this.salt, password) === this.hashPass) {
            return true;
        } else {
            return false;
        }
    }
});

var User = mongoose.model('User', userSchema);

module.exports.seedInitialUsers = function() {
    User.find({}).exec(function(err, collection) {
        if (err) {
            console.log('Cannot find users: ' + err);
            return;
        }

        if (collection.length === 0) {
            var salt,
                hashedPwd;

            salt = encryption.generateSalt();
            hashedPwd = encryption.generateHashedPassword(salt, '123456q');
            User.create({
                username: 'pesho',
                salt: salt,
                hashPass: hashedPwd,
                firstName: 'Pesho',
                lastName: 'Goshov',
                notes: []
            });
            console.log('Users added to database...');
        }
    });
};