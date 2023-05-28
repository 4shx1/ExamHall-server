const bcrypt = require('bcrypt');

// Function to hash the password
const hashPassword = async (password) => {
    try {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
    } catch (error) {
        throw new Error('Error hashing password');
    }
};

// Function to compare the password
const comparePassword = async (password, hashedPassword) => {
    try {
        const isPasswordValid = await bcrypt.compare(password, hashedPassword);
        return isPasswordValid;
    } catch (error) {
        throw new Error('Error comparing passwords');
    }
};

module.exports = { hashPassword, comparePassword };
