const express = require('express');
const dotenv = require("dotenv");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const viewpath = __dirname + '/views/';
app.use(express.static(viewpath));

mongoose.set('strictQuery', true);
mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("Connected to Mongo DB"))
    .catch((err) => console.log(err));

const question_router = require("./controllers/question.controller");
app.use('/api', question_router);

const survey_router = require("./controllers/survey.controller");
app.use('/api', survey_router);

app.listen(process.env.PORT, function () {
    console.log("Server started on port " + process.env.PORT);
});