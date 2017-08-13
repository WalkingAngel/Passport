var mongoose = require('mongoose');

module.exports = mongoose.model('User', { 
    fullname: String,
    username: String,
    password: String
});
