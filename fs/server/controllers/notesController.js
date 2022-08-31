const Note = require('../models/notesModel');
const asycHandler = require('express-async-handler');
const User = require('../models/userModel');

const getNotes = asycHandler(async (req, res) => {
  try {
    const notes = await Note.find();
    res.status(200).json(notes);
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
});

const getNote = asycHandler(async (req, res) => {
  try {
    const id = req.user.id;
    const note = await Note.find({ user: id }).sort({ createdAt: -1 });
    if (note) {
      res.status(200).json(note);
    } else {
      res.status(404);
      throw new Error('User has no notes!');
    }
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
});

const createNote = asycHandler(async (req, res) => {
  if (!req.body.baslik || !req.body.aciklama) {
    res.status(400);
    throw new Error('Enter the information completely!');
  }

  const note = await Note.create({
    baslik: req.body.baslik,
    aciklama: req.body.aciklama,
    oncelik: req.body.oncelik,
    user: req.user.id,
  });
  res.status(200).json(note);
});

const updateNote = asycHandler(async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const note = await Note.findById(id);
    if (!user) {
      res.status(400);
      throw new Error('User not found');
    }
    if (!note) {
      res.status(400);
      throw new Error('Note not found');
    }
    if (note.user.toString() !== user.id) {
      res.status(401);
      throw new Error('Join or login!');
    }
    const newNote = await Note.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(newNote);
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
});

const deleteNote = asycHandler(async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    const user = await User.findById(req.user.id);

    if (!user) {
      res.status(400);
      throw new Error('User not found');
    }
    if (!note) {
      res.status(401);
      throw new Error('Note not found');
    }
    if (note.user.toString() !== user.id) {
      res.status(401);
      throw new Error('Join or login!');
    }
    await note.remove();

    res.status(200).json({ id: req.params.id });
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
});

module.exports = {
  createNote,
  deleteNote,
  updateNote,
  getNote,
  getNotes,
};
