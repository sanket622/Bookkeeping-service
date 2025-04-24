const Book = require('../models/Book');
const { uploadToFirebase } = require('../utils/firebase');

exports.getAllBooks = async (req, res) => {
  try {
    const books = await Book.find()
      .populate('author', 'name')
      .populate('borrower', 'name')
      .populate('library', 'name');
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: req.t('fetch_books_failed'), error });
  }
};

exports.getBookById = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id)
      .populate('author', 'name')
      .populate('borrower', 'name')
      .populate('library', 'name');
    if (!book) return res.status(404).json({ message: req.t('book_not_found') });
    res.json(book);
  } catch (error) {
    res.status(500).json({ message: req.t('fetch_book_failed'), error });
  }
};

exports.createBook = async (req, res) => {
  try {
    const { title, author, library } = req.body;
    const imageUrl = await uploadToFirebase(req.file);
    const book = new Book({ title, author, library, imageUrl });
    await book.save();
    res.status(201).json({ message: req.t('book_created'), book });
  } catch (error) {
    res.status(500).json({ message: req.t('create_book_failed'), error });
  }
};

exports.updateBook = async (req, res) => {
  try {
    const { title, author, library } = req.body;
    const book = await Book.findByIdAndUpdate(
      req.params.id,
      { title, author, library },
      { new: true }
    );
    if (!book) return res.status(404).json({ message: req.t('book_not_found') });
    res.json({ message: req.t('book_updated'), book });
  } catch (error) {
    res.status(500).json({ message: req.t('update_book_failed'), error });
  }
};

exports.deleteBook = async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) return res.status(404).json({ message: req.t('book_not_found') });
    res.json({ message: req.t('book_deleted') });
  } catch (error) {
    res.status(500).json({ message: req.t('delete_book_failed'), error });
  }
};
