const express = require('express');
const router = express.Router();
const {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
} = require('../controllers/bookController');
const { authMiddleware, roleMiddleware } = require('../middlewares/authMiddleware');

router.get('/', authMiddleware, getAllBooks);
router.get('/:id', authMiddleware, getBookById);
router.post('/', authMiddleware, roleMiddleware(['author']), createBook);
router.put('/:id', authMiddleware, roleMiddleware(['author']), updateBook);
router.delete('/:id', authMiddleware, roleMiddleware(['author']), deleteBook);

module.exports = router;
