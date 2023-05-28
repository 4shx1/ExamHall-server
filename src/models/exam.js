const mongoose = require('mongoose');

const examSchema = new mongoose.Schema({
    name: { type: String, required: true },
    hall: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    rollNumberRanges: { type: [String], required: true },
});

const Exam = mongoose.model('Exam', examSchema);

module.exports = Exam;
