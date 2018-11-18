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
//const questions = require('../routes/question');

mongoose.connect(config.DB, { useNewUrlParser: true }).then(
    () => {console.log('Database is connected') },
    err => {console.log('Can not connect to the database ' + err)}
);

// define the Express app
const app = express();
app.use(passport.initialize());
require('../passport')(passport);

// database
const questions = [];

// security helmet
app.use(helmet());

// parse application/json content-type
app.use(bodyParser());
app.use(bodyParser.json());

// enable cors
app.use(cors());

// log http requests
app.use(morgan('combined'));

// retrieve all questions
app.get('/', (req, res) => {

    const qs = questions.map(q => ({

        id:             q.id,
        title:          q.title,
        description:    q.description,
        answers:        q.answers,
        answers_count:  q.answers.length

    }));

    res.send(qs);

});

// get specific question
app.get('/:id', (req, res) => {

   const question = questions.filter(q => (q.id === parseInt(req.params.id)));

   if (question.length > 1) return res.status(500).send();

   if (question.length === 0) return res.status(404).send();

   res.send(question[0]);

});

// add new question
app.post('/', (req, res) => {

    const {title, description} = req.body;

    const newQuestion = {

        id: questions.length + 1,
        title,
        description,
        answers: []

    };

    questions.push(newQuestion);

    res.status(200).send();

});

// add new answer
app.post('/answer/:id', (req, res) => {

   const {answer} = req.body;

   const question = questions.filter(q => (q.id === parseInt(req.params.id)));

    if (question.length > 1) return res.status(500).send();

    if (question.length === 0) return res.status(404).send();

    question[0].answers.push({
        answer
    });

    res.status(200).send();

});

// run server
app.listen(7777, () => {

    console.log('keep calm and listen to port 7777')

});