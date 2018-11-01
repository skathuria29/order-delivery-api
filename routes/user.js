const express = require('express');
const router = express.Router();
const url = require('url');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const uuid = require('uniqid');
// 
// const ensureAuth = require('./auth');

const User = require('../models/user');



function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else {
        res.render('home' , {title : 'MovieDB', user : null})
	}
}


passport.use(new LocalStrategy(
	function (email, password, done) {
		User.getUserByEmail(email, function (err, user) {
			if (err) throw err;
			if (!user) {
				return done(null, false, { message: 'Unknown User' });
			}

			User.comparePassword(password, user.password, function (err, isMatch) {
				if (err) throw err;
				if (isMatch) {
					return done(null, user);
				} else {
					return done(null, false, { message: 'Invalid password' });
				}
			});
		});
	}));

passport.serializeUser(function (user, done) {
	done(null, user.uid);
});

passport.deserializeUser(function (id, done) {
	User.getUserById(id, function (err, user) {
		done(err, user);
	});
});



router.post('/login',
  passport.authenticate('local'),
  function(req, res) {
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.

    res.json(user).status(200);
    
  });



router.post('/register' , (req, res) =>{
    
    let email = req.body.email;
    let username = req.body.username;
    let password = req.body.password;

    req.checkBody('username', 'Username is required').notEmpty();
	req.checkBody('email', 'Email is required').notEmpty();
	req.checkBody('email', 'Email is not valid').isEmail();
	req.checkBody('password', 'Password is required').notEmpty();
	

	var errors = req.validationErrors();

	if (errors) {
		return res.json(errors).status(400);
    }
    else{
        //res.send

        User.findOne({ email: { 
                "$regex": "^" + email + "\\b", "$options": "i"
        }}, function (err, mail) {
           
            if (mail) {
               res.json({error : 'Email already exists'});
            }
            else{
                let new_user = new User({
                    uid : uuid(),
                    email: email,
                    username: username,
                    password: password
                });
                
                User.registerUser(new_user, function (err, user) {
                    if (err) 
                        return res.json(err).status(400);
                    res.json(user);
                    res.status(400);
                    
                });
                
            }

        })
    }
})

module.exports = router;
