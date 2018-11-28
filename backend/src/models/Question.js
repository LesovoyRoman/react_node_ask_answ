const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const QuestionSchema = new Schema({

    description: {
        type: String,
        required: true
    },
    user_id: {
        type: Schema.ObjectId,
        required: true
    }

});

const Question = mongoose.model('questions', QuestionSchema);

module.exports = Question;