// routes/exams.js
const express = require("express");
const Exams = require("../models/exam");

const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const { examName, examHall, date, time, rnoRange } = req.body;

        // Create a new exam instance based on the form data
        const newExam = new Exams({
            name: examName,
            hallName: examHall,
            Date: date,
            Time: time,
            rnoRange: rnoRange,
        });

        // Save the new exam to the database
        const savedExam = await newExam.save();

        res.status(201).json(savedExam);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

module.exports = router;
