
const mongoose = require('mongoose');

const connectdb = async () => {
    try {
        console.log(`Connecting to MongoDB at: ${process.env.MONGO_URI}`); ation
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection error:', error.message);
        process.exit(1); // Exit the application on error
    }
};

module.exports = connectdb;
