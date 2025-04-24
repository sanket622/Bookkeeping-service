const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/userController'); // Ensure correct imports

// Ensure these are valid controller methods
router.post('/register', register); 
router.post('/login', login); 

module.exports = router;
