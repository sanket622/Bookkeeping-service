const Library = require('../models/Library');
const Book = require('../models/Book');

exports.getAllLibraries = async (req, res) => {
  try {
    const libraries = await Library.find();
    res.json(libraries);
  } catch (error) {
    res.status(500).json({ message: req.t('fetch_libraries_failed'), error });
  }
};

exports.getLibraryById = async (req, res) => {
  try {
    const library = await Library.findById(req.params.id).populate({
      path: 'books',
      populate: { path: 'borrower author', select: 'name email' },
    });
    if (!library) return res.status(404).json({ message: req.t('library_not_found') });
    res.json(library);
  } catch (error) {
    res.status(500).json({ message: req.t('fetch_library_failed'), error });
  }
};

exports.createLibrary = async (req, res) => {
  try {
    const { name, location } = req.body;
    const library = new Library({ name, location, books: [] });
    await library.save();
    res.status(201).json({ message: req.t('library_created'), library });
  } catch (error) {
    res.status(500).json({ message: req.t('create_library_failed'), error });
  }
};

exports.updateLibrary = async (req, res) => {
  try {
    const { name, location } = req.body;
    const library = await Library.findByIdAndUpdate(
      req.params.id,
      { name, location },
      { new: true }
    );
    if (!library) return res.status(404).json({ message: req.t('library_not_found') });
    res.json({ message: req.t('library_updated'), library });
  } catch (error) {
    res.status(500).json({ message: req.t('update_library_failed'), error });
  }
};

exports.deleteLibrary = async (req, res) => {
  try {
    const library = await Library.findByIdAndDelete(req.params.id);
    if (!library) return res.status(404).json({ message: req.t('library_not_found') });
    res.json({ message: req.t('library_deleted') });
  } catch (error) {
    res.status(500).json({ message: req.t('delete_library_failed'), error });
  }
};

exports.getInventory = async (req, res) => {
  try {
    const library = await Library.findById(req.params.id).populate({
      path: 'books',
      populate: { path: 'borrower author', select: 'name email' }
    });
    if (!library) return res.status(404).json({ message: req.t('library_not_found') });
    res.json(library.books);
  } catch (error) {
    res.status(500).json({ message: req.t('fetch_inventory_failed'), error });
  }
};

exports.addToInventory = async (req, res) => {
  try {
    const { bookId } = req.body;
    const library = await Library.findById(req.params.id);
    if (!library) return res.status(404).json({ message: req.t('library_not_found') });

    const book = await Book.findById(bookId);
    if (!book) return res.status(404).json({ message: req.t('book_not_found') });

    if (!library.books.includes(bookId)) {
      library.books.push(bookId);
      book.library = library._id;
      await book.save();
      await library.save();
    }

    res.json({ message: req.t('book_added_to_inventory'), library });
  } catch (error) {
    res.status(500).json({ message: req.t('add_inventory_failed'), error });
  }
};

exports.removeFromInventory = async (req, res) => {
  try {
    const { id, bookId } = req.params;
    const library = await Library.findById(id);
    if (!library) return res.status(404).json({ message: req.t('library_not_found') });

    library.books = library.books.filter(book => book.toString() !== bookId);
    await library.save();

    const book = await Book.findById(bookId);
    if (book) {
      book.library = null;
      await book.save();
    }

    res.json({ message: req.t('book_removed_from_inventory') });
  } catch (error) {
    res.status(500).json({ message: req.t('remove_inventory_failed'), error });
  }
};
