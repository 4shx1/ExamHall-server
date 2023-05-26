const express = require('express');
const { check, validationResult } = require('express-validator');
const User = require('../models/user');
const hashPassword = require('../helpers/bcrypt');

const router = express.Router();

router.post('/', [
    check('email').isEmail(),
    check('password').isLength({ min: 6 }),
    check('confirmPassword').custom((value, { req }) => {
        if (value !== req.body.password) {
            throw new Error('Passwords do not match');
        }
        return true;
    }),
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
            
        }

        const hashedPassword = await hashPassword(password);

        const newUser = new User({
            email,
            password: hashedPassword,
        });

        await newUser.save();

        res.status(200).json({ message: 'User signed up successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
