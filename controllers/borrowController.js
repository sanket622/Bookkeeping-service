const Book = require('../models/Book');
const User = require('../models/User');

// Borrow a Book
exports.borrowBook = async (req, res) => {
  try {
    const { bookId } = req.body;
    const userId = req.user.id;

    const book = await Book.findById(bookId);
    if (!book) return res.status(404).json({ message: req.t('book_not_found') });

    if (book.borrower) {
      return res.status(400).json({ message: req.t('book_already_borrowed') });
    }

    // Optional: Handle charges here (e.g., payment gateway or static fee)
    // e.g., deduct tokens or update user's balance

    book.borrower = userId;
    await book.save();

    res.status(200).json({ message: req.t('book_borrowed'), book });
  } catch (error) {
    res.status(500).json({ message: req.t('borrow_failed'), error });
  }
};

// Return a Book
exports.returnBook = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) return res.status(404).json({ message: req.t('book_not_found') });

    if (!book.borrower) {
      return res.status(400).json({ message: req.t('book_not_borrowed') });
    }

    if (book.borrower.toString() !== req.user.id) {
      return res.status(403).json({ message: req.t('not_authorized_return') });
    }

    book.borrower = null;
    await book.save();

    res.status(200).json({ message: req.t('book_returned'), book });
  } catch (error) {
    res.status(500).json({ message: req.t('return_failed'), error });
  }
};
