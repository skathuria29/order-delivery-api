const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

let CustomerSchema = mongoose.Schema({
    id : {
        type : String
    },
    username : {
        type : String
    },
    email : {
        type : String
    },
    password : {
        type : String
    }
    
})

let User = module.exports = mongoose.model('User', CustomerSchema);

module.exports.registerUser = function(newUser, callback){
	bcrypt.genSalt(10, function(err, salt) {
	    bcrypt.hash(newUser.password, salt, function(err, hash) {
	        newUser.password = hash;
	        newUser.save(callback);
	    });
	});
}

module.exports.getUserByEmail = function(email, callback){
	var query = {email: email};
	User.findOne(query, callback);
}

module.exports.getUserByUsername = function(username, callback){
	var query = {username: username};
	User.findOne(query, callback);
}

module.exports.getUserById = function(id, callback){
	User.findById(id, callback);
}


