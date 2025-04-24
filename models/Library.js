const mongoose = require('mongoose');

const librarySchema = new mongoose.Schema({
  name: String,
  location: String,
  books: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Book' }]
});

module.exports = mongoose.model('Library', librarySchema);
