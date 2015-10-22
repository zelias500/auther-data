'use strict'; 

var app = require('express')();
var path = require('path');
var session = require('express-session');
var passport = require('passport');
var User = require('../api/users/user.model');

app.use(session({
	secret: 'tongiscool'
}));

/* Passport * * * */

app.use(passport.initialize());
app.use(passport.session());

var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
passport.use(
    new GoogleStrategy({
        clientID: '677404900427-2i047lbfivfp5aorn338j0bncvefe1kc.apps.googleusercontent.com',
        clientSecret: 'oCWEVotYUQkWrZWjvDmUaTrG',
        callbackURL: 'http://127.0.0.1:8080/auth/google/callback'
    },
    // google will send back the token and profile
    function (token, refreshToken, profile, done) {
        return User.findOne({ google: { id: profile.id } }).exec()
        	.then(function (user) {
        		if (!user) {
        			return User.create({
        				email: profile.emails[0].value,
                        google: {
                            id: profile.id,
                            name: profile.displayName,
                            email: profile.emails[0].value,
                            token: token
                        }
        			})
        		}
        	})
            .then(function (user) {
                console.log('-=-= final user: ', user, ' -=-=-=');
                done(null, user);
            });
    })
);

passport.serializeUser(function (user, done){
    done(null, user._id)
})

passport.deserializeUser(function(id, done){
    User.findById(id).exec().then(function(user){
        done(user);
    })
})

/* * * * * */




app.use(require('./logging.middleware'));

app.use(require('./requestState.middleware'));

app.use(require('./statics.middleware'));

app.use('/api', require('../api/api.router'));

//google authentication and login 
app.get('/auth/google', passport.authenticate('google', { scope : 'email' }));

// handle the callback after google has authenticated the user
app.get('/auth/google/callback',
  passport.authenticate('google', {
    successRedirect : '/home',
    failureRedirect : '/stories'
  }));

var validFrontendRoutes = ['/', '/stories', '/users', '/stories/:id', '/users/:id', '/signup', '/login'];
var indexPath = path.join(__dirname, '..', '..', 'public', 'index.html');
validFrontendRoutes.forEach(function (stateRoute) {
	app.get(stateRoute, function (req, res) {
		res.sendFile(indexPath);
	});
});

app.use(require('./error.middleware'));

module.exports = app;