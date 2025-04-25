const express = require('express');
const router = express.Router();
const {
  getAllLibraries,
  getLibraryById,
  createLibrary,
  updateLibrary,
  deleteLibrary,
  getInventory,
  addToInventory,
  removeFromInventory
} = require('../controllers/libraryController');
const { authMiddleware, roleMiddleware } = require('../middleware/auth');

router.get('/', authMiddleware, getAllLibraries);
router.get('/:id', authMiddleware, getLibraryById);
router.post('/', authMiddleware, roleMiddleware(['Admin']), createLibrary);
router.put('/:id', authMiddleware, roleMiddleware(['Admin']), updateLibrary);
router.delete('/:id', authMiddleware, roleMiddleware(['Admin']), deleteLibrary);

// Inventory routes
router.get('/:id/inventory', authMiddleware, getInventory);
router.post('/:id/inventory', authMiddleware, roleMiddleware(['Admin']), addToInventory);
router.delete('/:id/inventory/:bookId', authMiddleware, roleMiddleware(['Admin','Author']), removeFromInventory);

module.exports = router;
