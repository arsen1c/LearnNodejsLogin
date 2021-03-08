const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
	name: {
		type: String,
	},
	email: {
		type: String,
	},
	password: {
		type: String,
	},
	date: {
		type: Date,
		default: Date.now 
	},
	googleId: {
		type: String,
	},
	// For Email Activation
	isVerified: {
		type: Boolean,
		default: false,
	},
	profilePic: {
		type: String
	}
});

const User = mongoose.model('User', UserSchema);

module.exports = User;