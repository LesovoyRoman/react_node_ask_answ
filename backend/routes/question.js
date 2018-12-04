
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
        },
        { $lookup:
                {
                    from: 'users',
                    localField: 'user_id',
                    foreignField: '_id',
                    as: 'user'
                }
        },
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

// update specific question
router.post('/update_question', (req, res) => {

    Question.findById(req.body.id, function (err, question) {
        if (err) return res.status(404).json(question);

        question.set({ description: req.body.description });
        question.save(function (err, updatedQuestion) {
            if (err) res.status(404).json(question);
            res.status(200).send(updatedQuestion);
        });
    });

})

// add new question
router.post('/create_question', (req, res) => {

    const newQuestion = new Question({
        description: req.body.question,
        user_id: req.body.user_id
    });

    newQuestion.save()

    res.json(newQuestion)

});

module.exports = router;