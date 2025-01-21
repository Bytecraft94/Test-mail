const mongoose = require('mongoose');

const connectDatabase = async () => {
    try {
        console.log('MongoDB URI:', process.env.MONGODB_URI);  // Add this line for debugging
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            connectTimeoutMS: 60000,
            socketTimeoutMS: 60000
        });
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
    }
};

module.exports = connectDatabase;
