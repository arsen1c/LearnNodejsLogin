const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const User = require("../models/user");
require("dotenv").config();

module.exports = (passport) => {
	passport.use(
		new GoogleStrategy(
			{
				// passport callback function
				//check if user already exists in our db with the given profile ID
				clientID: process.env.OAUTH_CLIENT_ID,
				clientSecret: process.env.OAUTH_CLIENT_SECRET,
				callbackURL: "/auth/google/redirect",
			},
			(accessToken, refreshToken, profile, done) => {
				console.log("access token: ", accessToken);
				console.log("Profile: ", profile);
				User.findOne({ googleId: profile.id }).then((currentUser) => {
					if (currentUser) {
						// if we already have a record with the given profile ID
						done(null, currentUser);
					} else {

						// if not, create a new user
						new User({
							name: profile.displayName,
							email: profile.emails[0].value,
							isVerified: profile.emails[0].verified,
							googleId: profile.id,
							profilePic: profile.photos[0].value
						}).save().then(newUser => {
							done(null, newUser, { message: 'User Created' });
						})
					}
				})
			}
		)
	);
	passport.serializeUser((user, done) => {
		done(null, user.id);
	});
	passport.deserializeUser((id, done) => {
		User.findById(id, (err, user) => {
			done(err, user);
		});
	});
};
