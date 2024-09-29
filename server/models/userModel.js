const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true, // Ensures email is unique
    },
    password_hash: {
        type: String,
        required: true,
    },
    userName: {
        type: String,
        required: true, // Make sure this field is required
        unique: true, // Ensure userName is also unique
    },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;
