const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const QuestionSchema = new Schema({

    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }

});

const Question = mongoose.model('questions', QuestionSchema);

module.exports = Question;