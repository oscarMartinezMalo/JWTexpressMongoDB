import express from 'express';


const app = express();


// Assign a port from the environment variable
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Your server is running on port ${PORT}`)
});