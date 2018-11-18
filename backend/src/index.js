// import dependencies

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const config = require('./db');

const users = require('../routes/user');
const questions = require('../routes/question');

mongoose.connect(config.DB, { useNewUrlParser: true }).then(
    () => {console.log('Database is connected') },
    err => {console.log('Can not connect to the database ' + err)}
);

// define the Express app
const app = express();
app.use(passport.initialize());
require('../passport')(passport);

// database
//const questions = [];

// security helmet
app.use(helmet());

// enable cors
app.use(cors());

// parse application/json content-type
app.use(bodyParser());
app.use(bodyParser.json());

// API ROUTES
app.use('/api/users', users);
app.use('/api/questions', questions);

// log http requests
app.use(morgan('combined'));

// run server
app.listen(7777, () => {

    console.log('keep calm and listen to port 7777')

});