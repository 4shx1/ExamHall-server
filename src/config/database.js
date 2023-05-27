const mongoose = require('mongoose');

const connectDatabase = async () => {
    try {
        await mongoose.connect('mogodbUrl', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB Atlas');
    } catch (error) {
        console.error('Error connecting to MongoDB Atlas:', error);
        process.exit(1); // Exit the process with a failure code
    }
};

module.exports = connectDatabase;
