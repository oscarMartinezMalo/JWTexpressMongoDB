import express from 'express';

// Import Routes
import authRoute from './routes/auth'

const app = express();

// Routes middlewares
app.use('/auth', authRoute);

// Assign a port from the environment variable
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Your server is running on port ${PORT}`)
});