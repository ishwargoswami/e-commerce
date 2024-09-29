const bcrypt = require('bcryptjs');
const User = require('../models/userModel');  // Make sure the User model is correct

/* POST Request handler for User Sign-Up */
const signUp = async (req, res) => {
    try {
        const { firstName,lastName, email, password } = req.body;

        // Validate that all fields are provided
        if (!firstName || !lastName || !email || !password) {
            return res.status(400).json({ message: 'Username, email, and password are required' });
        }

        // Check if the user already exists by email or username
        const existingUser = await User.findOne({ $or: [{ email }] });
        if (existingUser) {
            return res.status(400).json({ message: 'email already exists' });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user
        const newUser = new User({
            firstName,
            lastName,
            email,
            password_hash: hashedPassword,
        });

        // Save the user to the database
        await newUser.save();

        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
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

        // // Generate JWT token (uncomment if using JWT)
        // const token = jwt.sign({ userId: user._id }, 'your_jwt_secret_key', { expiresIn: '1h' });

        res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error });
    }
};

module.exports = { signUp, login };
