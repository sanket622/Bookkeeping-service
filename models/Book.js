const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: String,
  imageUrl: String,
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  borrower: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
  library: { type: mongoose.Schema.Types.ObjectId, ref: 'Library' },
});

module.exports = mongoose.model('Book', bookSchema);
