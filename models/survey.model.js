const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SurveySchema = new Schema({
    question_id: {
        type: String,
        default: ""
    },
    rating: {
        type: Number,
        default: 0
    },
    review: {
        type: String,
        default: ""
    },
    timestamp: {
        type: String,
        default: Date.now()
    }
});

const Survey = mongoose.model("Survey", SurveySchema);
module.exports = Survey;