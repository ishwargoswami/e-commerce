const bcrypt = require('bcryptjs');
const User = require('../models/userModel');  // Ensure User model path is correct

/* POST Request handler for User Sign-Up */
const signUp = async (req, res) => {
    try {
        console.log('Received sign-up request body:', req.body); // Log the whole request body

        const { firstName, lastName, email, password, username } = req.body;

        // Validate all fields are provided
        if (!firstName || !lastName || !email || !password || !username) {
            return res.status(400).json({ message: 'All fields are required: first name, last name, email, password, and username' });
        }

        // Convert username to lowercase for uniqueness
        const usernameLower = username.toLowerCase();

        // Check for existing user by email and username
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        const existingUsername = await User.findOne({ username: usernameLower });
        if (existingUsername) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        // Hash the password and create a new user
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            firstName,
            lastName,
            email,
            password_hash: hashedPassword,
            username: usernameLower,
        });

        await newUser.save();

        res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
        console.error('Error creating user:', error);
        if (error.code === 11000) {
            return res.status(400).json({ message: 'Duplicate field value', error });
        }
        res.status(500).json({ message: 'Error creating user', error });
    }
};


/* POST Request handler for User Login */
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate that both email and password are provided
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        // Check if the user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Compare the provided password with the hashed password
        const isMatch = await bcrypt.compare(password, user.password_hash);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Optionally generate a JWT token or create a session
        // const token = jwt.sign({ userId: user._id }, 'your_jwt_secret_key', { expiresIn: '1h' });

        res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ message: 'Error logging in', error });
    }
};

module.exports = { signUp, login };
