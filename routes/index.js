const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require("../config/auth.js");
const passport = require('passport');

// Login page
router.get('/', (req, res) => {
	res.render('welcome');
})

// Register page 
router.get('/register', (req, res) => {
	res.render('register');
})


router.get('/dashboard', ensureAuthenticated, (req, res) => {
	console.log(req);
	res.render('dashboard', {
		user: req.user
	});
})

// Google Auth
router.get('/auth/google', passport.authenticate('google', {
	scope: ['profile', 'email']
}));

router.get('/auth/google/redirect', passport.authenticate('google'), (req, res) => {
	res.render('dashboard', {
		user: req.user
	});
	// res.send('You reached the redirect URI');
})

router.get('/auth/logout', (req, res) => {
	req.logout();
	// res.send(req.user)
})

module.exports = router;