const express = require('express');
const router = express.Router();
const { borrowBook, returnBook } = require('../controllers/borrowController');
const { authMiddleware } = require('../middleware/auth');

router.post('/borrow', authMiddleware, borrowBook);
router.put('/return/:id', authMiddleware, returnBook);

module.exports = router;
