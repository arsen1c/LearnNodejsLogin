const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
require('dotenv').config();
// import model
const User = require('../models/user');

router.get('/:token', async (req, res) => {
	try {
		const { user: email } = jwt.verify(req.params.token, process.env.EMAIL_SECRET);
		await User.updateOne({ email }, { isVerified: true }, (err, docs) => {
			if (err) throw err;
			else {
				console.log('Success!');
			}
		})
					
	} catch (e) {
		console.log(e);
		return res.send(e.message);
	}

	return res.render('login');
})

module.exports = router;