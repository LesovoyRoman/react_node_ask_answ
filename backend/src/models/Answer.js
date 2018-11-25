const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const AnswerSchema = new Schema({

    description: {
        type: String,
        required: true
    },
    question_id: {
        type: Schema.ObjectId,
        required: true
    }

})

const Answer = mongoose.model('answers', AnswerSchema);

module.exports = Answer;