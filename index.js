import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoute from './routes/auth' // Import Routes

dotenv.config();

// Connecting to mongoDB
// Get the DB_CONNECT variable from the environment
mongoose.connect( process.env.DB_CONNECT,
    { useNewUrlParser: true },
    () => {
        console.log("Connected to DB");
    });

const app = express();

// Middlewares
app.use( express.json());

// Routes middlewares
app.use('/auth', authRoute);

// Assign a port from the environment variable
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Your server is running on port ${PORT}`)
});