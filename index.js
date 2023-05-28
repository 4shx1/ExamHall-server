const express = require('express');
const cors = require('cors');
const connectDatabase = require('./config/database');
const authRoutes = require('./routes/auth');
const examsRoutes = require('./routes/exams');

const app = express();

// Enable CORS
app.use(cors());

app.use(express.json());

// Connect to MongoDB
connectDatabase();

// Routes
app.use('/auth', authRoutes);
app.use('/exams', examsRoutes);

// Start the server
const port = 3005;
app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
