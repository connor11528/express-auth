var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

// user model schema
var userSchema = mongoose.Schema({

    local: {
        email: String,
        password: String,
    },
    facebook: {
        id: String,
        token: String,
        email: String,
        name: String
    },
    spotify: {
        id: String,
        username: String,
        displayName: String,
        email: String,
        token: String,
        name: String
    }
});

// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('User', userSchema);
