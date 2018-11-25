
const express = require('express');
const router = express.Router();

// model
const Answer = require('../src/models/Answer');

// retrieve all answers
router.post('/all', (req, res) => {

    Answer.find().then(answers => {
        return res.json({
            success: true,
            answers: answers,
            status: 200,
        });
    })

})

router.post('/setAnswer', (req, res) => {

    const newAnswer = new Answer({
        description: req.body.description,
        question_id: req.body.question_id
    })

    newAnswer.save()

    console.log(newAnswer)

    res.json({answer: newAnswer});

})
module.exports = router;