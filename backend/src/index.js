// import dependencies

const express = require('express');

const bodyParser = require('body-parser');

const cors = require('cors');

const helmet = require('helmet');

const morgan = require('morgan');


// define the Express app

const app = express();

// database

const questions = [];

// security helmet
app.use(helmet());

// parse application/json content-type
app.use(bodyParser());

// enable cors
app.use(cors());

// log http requests
app.use(morgan());

// retrieve all questions
app.get('/', (req, res) => {

    const qs = questions.map(q => ({

        id:             q.id,
        title:          q.title,
        description:    q.description,
        answers:        q.answers

    }));

    res.send(qs);

});