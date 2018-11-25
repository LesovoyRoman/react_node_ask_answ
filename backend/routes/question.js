
const express = require('express');
const router = express.Router();

// Model
const Question = require('../src/models/Question');

// retrieve all questions
router.post('/all', (req, res) => {

    Question.aggregate([
        { $lookup:
            {
                from: 'answers',
                localField: '_id',
                foreignField: 'question_id',
                as: 'answers'
            }
        }
    ]).then(questions => {
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

    // @todo needs to find answers to question!

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

module.exports = router;