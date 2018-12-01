
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

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

router.post('/question', (req, res) => {

    let question_id = mongoose.Types.ObjectId(req.body.question_id)

    Answer.aggregate([
            { $lookup:
                    {
                        from: 'users',
                        localField: 'user_id',
                        foreignField: '_id',
                        as: 'user'
                    }
            },
			{ $match:
				{
					question_id: question_id,
				}
			},
        ])
        .then(answers => {
            return res.json({
                success: true,
                answers: answers,
                status: 200,
            });
        })
        .catch(err => {
            return res.json({
                success: false,
                errors: err,
                status: 500,
            })
        });

})

router.post('/setAnswer', (req, res) => {

    const newAnswer = new Answer({
        description: req.body.description,
        question_id: req.body.question_id,
        user_id: req.body.user_id
    })

    newAnswer.save()

    res.json({answer: newAnswer});

})
module.exports = router;
