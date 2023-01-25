const router = require("express").Router();
const Survey = require("../models/survey.model");
const Question = require("../models/question.model");

router.get("/surveys", async (req, res) => {
    const surveys = await Survey.find({}, " -__v -timestamp");
    return res.json(surveys);
});

router.post("/surveys", async (req, res) => {
    const { rating, review, question_id } = req.body;
    if (!question_id) return res.status(400).send({ message: "question required" });
    const validate_question = await validateQuestionId(question_id);
    if (!validate_question) return res.status(400).send({ message: "invalid question" });
    Survey.create({ rating: rating, review: review, question_id: question_id }, function (err, docs) {
        if (err) return res.status(500).send({ message: "server error" });
        return res.status(201).json(docs);
    });
});

router.get("/surveys/:id", async (req, res) => {
    const { id } = req.params;
    const survey = await Survey.findById(id, " -__v -timestamp");
    return res.json(survey);
});

router.put("/surveys/:id", async (req, res) => {
    const { id } = req.params;
    const { rating, review } = req.body;
    const result = await Survey.findOneAndUpdate({ _id: id }, { rating: rating, review: review }, { new: true });
    return res.json(result);
});

router.delete("/surveys/:id", async (req, res) => {
    const { id } = req.params;
    const result = await Survey.deleteMany({ _id: id });
    return res.json(result);
});

async function validateQuestionId(question_id) {
    try {
        const question = await Question.findById(question_id, " -__v -timestamp -question");
        return question ? true : false;
    } catch (err) {
        return false;
    }
}

module.exports = router;