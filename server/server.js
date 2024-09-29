const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const app = express();
const PORT = process.env.PORT || 5000;

// Load environment variables from .env file
dotenv.config();

// Connect to the MongoDB database
connectDB();

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors()); // Enable CORS globally

// Define routes
app.use('/api/items', require("./routes/items"));
app.use('/api/payment', require("./routes/payment"));
app.use('/api/user', require("./routes/user")); // User routes

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
