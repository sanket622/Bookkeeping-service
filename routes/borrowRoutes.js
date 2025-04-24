const express = require('express');
const router = express.Router();
const { borrowBook, returnBook } = require('../controllers/borrowController');
const { authMiddleware } = require('../middlewares/authMiddleware');

router.post('/', authMiddleware, borrowBook);
router.put('/:id', authMiddleware, returnBook);

module.exports = router;
