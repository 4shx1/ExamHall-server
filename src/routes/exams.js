const express = require('express');
const router = express.Router();
const Exam = require('../models/exam');
const { extractNumbers } = require('../helpers/numberExtractor');

router.post('/', async (req, res) => {
    try {
        const { name, hall, date, time, rollNumberRanges } = req.body;

        // Convert roll number ranges to individual values
        const convertedRanges = [];
        for (const range of rollNumberRanges) {
            const [start, end] = range.split('-');
            const values = extractNumbers(start, end);
            convertedRanges.push(values);
        }

        // Create a new exam
        const exam = new Exam({ name, hall, date, time, rollNumberRanges: convertedRanges.flat() });
        await exam.save();

        return res.status(201).json({ message: 'Exam created successfully' });
    } catch (error) {
        console.error('Error creating exam:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/', async (req, res) => {
    try {
        const { rollNumber, date, time } = req.query;

        // Find exams matching the given roll number, date, and time
        const exams = await Exam.find({
            rollNumberRanges: { $in: [rollNumber] },
            date,
            time,
        });

        return res.status(200).json({ exams });
    } catch (error) {
        console.error('Error searching exams:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
