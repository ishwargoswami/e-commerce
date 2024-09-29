const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const PORT = process.env.PORT || 5000;

// Load environment variables from .env file
dotenv.config();

// Connect to the MongoDB database

app.use(bodyParser.json());
// Connection string
const mongoURI = `mongodb+srv://amirasmandaliya99:AFDtYtlnhqPvWUJU@cluster0.ukwiqjd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`; // Ensure you have the correct URI

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));


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
