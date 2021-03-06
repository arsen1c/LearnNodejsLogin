// Importing passport-loca with Strategy instance
// For a use authentication mechanism witha simple username ans pass
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('../models/user');

module.exports = (passport) => {
	passport.use(
			new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
				// Match user
				User.findOne({ email: email })
					.then(user => {
						if (!user) {
							return done(null, false, {message: 'That email is not registered'});
						}
						if (!user.isVerified) {
							return done(null, false, {message: 'Please confirm your email to login'});
						}
						// Match pass
						bcrypt.compare(password, user.password, (err, isMatch) => {
							if (err) throw err;

							if (isMatch) {
								return done(null, user);
							} else {
								return done(null, false, { message: 'pass incorrect' });
							}
						})
					}) .catch(err => console.log(err));
			})
		)
	passport.serializeUser((user, done) => {
		done(null, user.id);
	});
	passport.deserializeUser((id, done) => {
		User.findById(id, (err, user) => {
			done(err, user);
		});
	});
}