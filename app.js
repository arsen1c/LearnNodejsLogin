const express = require('express');
const app = express();
const mongoose = require('mongoose');
const expressEjsLayout = require('express-ejs-layouts');
const passport = require('passport');

// Assign the LocalStrategy configuration
require("./config/passport")(passport);
require("./config/passport-google.js")(passport);

const flash = require('connect-flash');
const session = require('express-session');
require('dotenv').config();

//mongoose
mongoose.connect(process.env.MONGO_URI, {
	useNewUrlParser: true, 
	useUnifiedTopology : true
}).then(() => console.log("Connected to DB"))
  .catch(err => console.log(err));

// ejs
app.set('view engine', 'ejs');
app.use(expressEjsLayout);
// bodyparser
app.use(express.urlencoded({ extended: false }));
// Express Session (used for connect-flash)
app.use(session({
	secret : 'arsen1c',
	resave: true,
	saveUninitialized: true
}));
// Use flash
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next) => {
	res.locals.success_msg = req.flash('success_msg');
	res.locals.error_msg = req.flash('error_msg');
	res.locals.error = req.flash('error');
	next();
});

// Routes
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));
app.use('/confirmation', require('./routes/confirmation'));

app.listen(3000);