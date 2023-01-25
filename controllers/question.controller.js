const router = require("express").Router();
const Question = require("../models/question.model");

router.get("/questions", async (req, res) => {
    const questions = await Question.find({}, " -__v -timestamp");
    return res.json(questions);
});

router.post("/questions", async (req, res) => {
    const { question } = req.body;
    if (!question) return res.status(400).send({ message: "question body required" });
    Question.create({ question: question }, function (err, docs) {
        if (err) return res.status(500).send({ message: "server error" });
        return res.status(201).json(docs);
    });
});

router.get("/questions/:id", async (req, res) => {
    const { id } = req.params;
    const question = await Question.findById(id, " -__v -timestamp");
    return res.json(question);
});


router.put("/questions/:id", async (req, res) => {
    const { id } = req.params;
    const { question } = req.body;
    if (!question) return res.status(400).send({ message: "question body required" });
    const result = await Question.findOneAndUpdate({ _id: id }, { question: question }, { new: true });
    return res.json(result);
});

router.delete("/questions/:id", async (req, res) => {
    const { id } = req.params;
    const result = await Question.deleteMany({ _id: id });
    return res.json(result);
});

module.exports = router;