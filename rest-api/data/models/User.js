var mongoose = require('mongoose'),
    encryption = require('../../utilities/encryption');

var userSchema = mongoose.Schema({
    username: {
        type: String,
        require: '{PATH} is required',
        unique: true
    },
    hashPass: String,
    firstName: String,
    lastName: String,
});

userSchema.method({
    authenticate: function(password) {
        return encryption.generateHashedPassword(this.salt, password) === this.hashPass;
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
                firstName: 'Pesho',
                lastName: 'Goshov',
                salt: salt,
                hashPass: hashedPwd
            });
            console.log('Users added to database...');
        }
    });
};