const express = require('express');
const router = express.Router();
const User = require('../models/user');
const { hashPassword, comparePassword } = require('../helpers/bcrypt');

router.post('/signup', async (req, res) => {
    try {
        const { email, password, confirmPassword } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ error: 'User already exists' });
        }

        // Check if password and confirmPassword match
        if (password !== confirmPassword) {
            return res.status(400).json({ error: 'Passwords do not match' });
        }

        // Hash the password
        const hashedPassword = await hashPassword(password);

        // Create a new user
        const user = new User({ email, password: hashedPassword });
        await user.save();

        return res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.error('Error during sign up:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

router.post('/signin', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Compare the password
        const isPasswordValid = await comparePassword(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        return res.status(200).json({ message: 'Sign in successful' });
    } catch (error) {
        console.error('Error during sign in:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
