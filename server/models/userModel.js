const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: true,
        trim: true,  // Trims whitespace
        minlength: 3,  // Minimum length for the username
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,  // Converts email to lowercase
        trim: true,
        validate: {
            validator: function (v) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);  // Email validation regex
            },
            message: props => `${props.value} is not a valid email!`
        },
    },
    password_hash: {
        type: String,
        required: true,  // Password must be hashed before storing
    },
    first_name: {
        type: String,
        trim: true,
    },
    last_name: {
        type: String,
        trim: true,
    },
    phone_number: {
        type: String,
        trim: true,
    },
    role: {
        type: String,
        default: 'user',  // Default role is 'user'
    },
    status: {
        type: String,
        enum: ['active', 'inactive', 'banned'],  // User status can only be one of these values
        default: 'active',
    },
    created_at: {
        type: Date,
        default: Date.now,  // Set the current date as the default
    },
    updated_at: {
        type: Date,
        default: Date.now,  // Automatically update when user data changes
    },
    last_login: {
        type: Date,  // Track the last login time
    },
    profile_picture_url: {
        type: String,
        trim: true,  // URL to the profile picture
    },
    date_of_birth: {
        type: Date,
    },
    address: {
        type: String,
        trim: true,
    },
    city: {
        type: String,
        trim: true,
    },
    country: {
        type: String,
        trim: true,
    },
    zip_code: {
        type: String,
        trim: true,
    },
});

// Middleware to update the `updated_at` field automatically
userSchema.pre('save', function (next) {
    this.updated_at = Date.now();
    next();
});

// Model creation
const User = mongoose.model('User', userSchema);

module.exports = User;
