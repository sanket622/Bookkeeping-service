const express = require('express');
const router = express.Router();
const {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
} = require('../controllers/bookController');

const { authMiddleware, roleMiddleware } = require('../middleware/auth');
const { upload } = require('../config/cloudinary'); // Multer setup for image upload

// GET all books
router.get('/', authMiddleware, getAllBooks);

// GET specific book by ID
router.get('/:id', authMiddleware, getBookById);

// POST create a book (author only, with image)
router.post(
  '/',
  authMiddleware,
  roleMiddleware(['Author']),
  upload.single('image'), // image field from form-data
  createBook
);

// PUT update book
router.put('/:id', authMiddleware, roleMiddleware(['author']), updateBook);

// DELETE remove book
router.delete('/:id', authMiddleware, roleMiddleware(['author']), deleteBook);

module.exports = router;
