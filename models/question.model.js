const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
    question: {
        type: String,
        default: ""
    },
    timestamp: {
        type: String,
        default: Date.now()
    }
});

const Question = mongoose.model("Question", QuestionSchema);
module.exports = Question;