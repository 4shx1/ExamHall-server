const express = require('express');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const User = require('../models/user');

const router = express.Router();

router.post('/', [
    check('email').isEmail(),
    check('password').isLength({ min: 6 }),
], async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        console.log('Email:', email);
        console.log('Password:', password);

        // Find the user by email
        const user = await User.findOne({ email });

        if (!user) {
            console.log('Invalid email or password');
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Compare the provided password with the hashed password
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            console.log('Invalid email or password');
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        // Password is valid, user is authenticated
        console.log('User signed in successfully!');
        res.status(200).json({ message: 'User signed in successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
