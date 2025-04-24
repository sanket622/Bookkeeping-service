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
const { authMiddleware, roleMiddleware } = require('../middlewares/authMiddleware');

router.get('/', authMiddleware, getAllLibraries);
router.get('/:id', authMiddleware, getLibraryById);
router.post('/', authMiddleware, roleMiddleware(['admin']), createLibrary);
router.put('/:id', authMiddleware, roleMiddleware(['admin']), updateLibrary);
router.delete('/:id', authMiddleware, roleMiddleware(['admin']), deleteLibrary);

// Inventory routes
router.get('/:id/inventory', authMiddleware, getInventory);
router.post('/:id/inventory', authMiddleware, roleMiddleware(['admin']), addToInventory);
router.delete('/:id/inventory/:bookId', authMiddleware, roleMiddleware(['admin']), removeFromInventory);

module.exports = router;
