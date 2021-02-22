const express = require('express');
const router = express.Router();


// Login handler
router.get('/login', (req, res) => {
	res.render('login');
})
router.get('/register', (req, res) => {
	res.render('register');
})

// Register handler
router.post('/register', (req, res) => {

});

router.post('/login', (req, res, next) => {

});

// Logout
router.get('/logout', (req, res) => {

});

module.exports = router;