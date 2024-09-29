const express = require("express");
const router = express.Router();
const cors = require("cors");
const { signUp, login } = require("../controllers/userController");

// CORS middleware
router.use(cors());

// Route to handle user login (POST request)
router.post('/login', login);

// Route to handle user signup (POST request)
router.post('/signup', signUp);

module.exports = router;
