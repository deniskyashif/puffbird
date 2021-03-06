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
  email: {
    type: String,
    require: '{PATH} is required',
    unique: true
  },
  notes: [{
    type: Schema.Types.ObjectId,
    ref: 'Note'
  }],
  createdOn: {
    type: Date,
    default: Date.now
  },
  modifiedOn: {
    type: Date,
    default: Date.now
  }
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
      hashedPwd = encryption.generateHashedPassword(salt, '123');
      User.create({
        username: 'user',
        salt: salt,
        hashPass: hashedPwd,
        email: 'random@user.com',
        firstName: 'User',
        lastName: 'Random',
        notes: []
      });
      console.log('Users added to database...');
    }
  });
};