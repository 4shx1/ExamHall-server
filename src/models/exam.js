// models/exam.js
const mongoose = require("mongoose");

const examSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    hallName: {
        type: String,
        required: true,
    },
    Date: {
        type: Date,
        required: true,
    },
    Time: {
        type: String,
        required: true,
    },
    rnoRange: {
        type: String,
        required: true,
    },
});

const Exams = mongoose.model("Exams", examSchema);

module.exports = Exams;
