const express = require('express');
const connectDatabase = require('./src/config/database');
const signupRoute = require('./src/routes/signup');
const signinRoute = require('./src/routes/signin.js')
const examRoute = require('./src/routes/creatExams.js')

const app = express();
const port = 3000;

app.use(express.json());

// Connect to the database
connectDatabase();

// Routes
app.use('/signup', signupRoute);
app.use('/signin', signinRoute);
app.use('/exams', examRoute);

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
