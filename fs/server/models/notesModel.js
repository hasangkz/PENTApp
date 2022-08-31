const mongoose = require('mongoose');

const noteSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Users',
    },

    baslik: {
      type: String,
      required: [true, 'Enter the title'],
    },
    aciklama: {
      type: String,
      required: [true, 'Enter the desc'],
    },
    oncelik: {
      type: String,
      required: [true, 'Enter the oncelik'],
    },
  },
  { timestamps: true }
);

const Note = mongoose.model('Note', noteSchema);

module.exports = Note;
