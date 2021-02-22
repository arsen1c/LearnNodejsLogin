const express = require('express');
const router = express.Router();
const app = express();
const mongoose = require('mongoose');
const expressEjsLayout = require('express-ejs-layouts');
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

// Routes
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));

app.listen(3000);