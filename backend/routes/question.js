
const express = require('express');
const router = express.Router();

// Model
const Question = require('../src/models/Question');

// retrieve all questions
router.post('/all', (req, res) => {

    Question.find().then(questions => {
        return res.json({
            success: true,
            questions: questions,
            status: 200,
        });
    })

});

// get specific question
router.get('/:id', (req, res) => {

    const errors = {
        question_id: 'Question not found'
    };
    const id = req.body.id;

    Question.findOne({id})
        .then(question => {
            if (!question) {
                return res.status(404).json(errors.question_id);
            }
            return res.status(200).json(question);
        });

});

// add new question
router.post('/create_question', (req, res) => {

    const newQuestion = new Question({
        description: req.body.question,
    });

    newQuestion
        .save()

    res.json(newQuestion)

});

// add new answer
router.post('/answer/:id', (req, res) => {

    /*const {answer} = req.body;

    const question = questions.filter(q => (q.id === parseInt(req.params.id)));

    if (question.length > 1) return res.status(500).send();

    if (question.length === 0) return res.status(404).send();

    question[0].answers.push({
        answer
    });

    return res.status(200).send();*/

});

module.exports = router;