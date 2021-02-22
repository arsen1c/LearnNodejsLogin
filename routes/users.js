const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

// User Model
const User = require('../models/user.js');

const salt = 13;

// Login handler
router.get('/login', (req, res) => {
	res.render('login');
})
router.get('/register', (req, res) => {
	res.render('register');
})

// Register handler
router.post('/register', (req, res) => {
	console.log(req.body);
	const { name, email, password, password2 } = req.body;
	let errors = [];
	console.log(`Name: ${name}\nEmail: ${email}\nPass: ${password}`);

	if (!name || !email || !password ||  !password2) {
		errors.push({ msg: 'Please fill in all the fields' });
	} 

	// Check if match
	if (password !== password2) {
		errors.push({ msg: 'Passwords does not match' });
	}

	// Check if password is more than 6 charcayers
	if (password.length < 6) {
		errors.push({ msg: 'Password must be of atleast 6 characters long' });
	}

	if (errors.length > 0) {
		res.render('register', { errors, name, email, password, password2 })
	} else {
		// validation passed
		User.findOne({email: email}).exec((err, user) => {
			console.log(user);
			if (user) {
				console.log("EMIL EXISTS")
				errors.push({ msg: 'Email already registered' });
				res.render('register', { errors })
			} else {
				const newUser = new User( {
					name,
					email,
					password 
				})
				// Hash the password
				bcrypt.hash(newUser.password, salt, (err, hash) => {
					if (err) throw err;
					// save pass to hash
					newUser.password = hash;
					newUser.save()
						.then(value => {
							console.log(value);
							res.redirect('/users/login');
						})
						.catch(err => console.log(err));
				})
			}
		})
	}

});

router.post('/login', (req, res, next) => {

});

// Logout
router.get('/logout', (req, res) => {

});

module.exports = router;