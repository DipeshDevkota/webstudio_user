require('dotenv').config(); 
const mongoose = require('mongoose');
const express = require('express');
const cookieParser = require("cookie-parser");
const connectdb = require('./db/db');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
app.use(cookieParser());
const UserRoute = require('./route/user.route')
const FetchRoute = require('./route/fetch.route')
const connectDB = async () => {
    try {
        console.log(`Connecting to MongoDB at: ${process.env.MONGO_URI}`);
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection error:', error.message);
        process.exit(1); // Exit on error
    }
};

connectDB(); 

app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.use('/',FetchRoute)
app.use('/',UserRoute)


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
