const express = require("express");
const router = express.Router();
const cors = require("cors");
const uploadPhoto = require("../middlewares/upload");  // Assuming users may upload profile photos
const {
    getUsers,
    addUser,
    updateUser,
    deleteUser
} = require("../controllers/userController");

// Get all users (GET request)
router.get('/', cors(), getUsers);

/* The post request must have a body element with name images (for profile photos) */
router.post('/', uploadPhoto.array('images'), addUser);

// Update a user by ID (PUT request)
router.put('/:id', updateUser);

// Delete a user by ID (DELETE request)
router.delete('/:id', deleteUser);

module.exports = router;
