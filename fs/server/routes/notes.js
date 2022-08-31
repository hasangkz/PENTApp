const router = require('express').Router();
const {
  getNote,
  getNotes,
  updateNote,
  deleteNote,
  createNote,
} = require('../controllers/notesController');

const handleUser = require('../middlewares/auth');

// router.get('/', getNotes);
// router.post('/', createNote);
// router.get('/:id', getNote);
// router.put('/:id', updateNote);
// router.delete('/:id', deleteNote);
//!BU KARMŞIK YAPI YERİNE ALTTAKİ NESTİNG ROUTES KULLANABİLİRİZ:

//Nesting Routes:
router.route('/').get(handleUser, getNote).post(handleUser, createNote);
router.route('/:id').put(handleUser, updateNote).delete(handleUser, deleteNote);
router.route('/guest').get(getNotes);
module.exports = router;
