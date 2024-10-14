const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  developer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  budget: {
    type: Number,
    required: true
  },
  state: {
    type: String,
    enum: ['Completed', 'Uncompleted'],
    default: 'Uncompleted'
  },
}, { timestamps: true });

module.exports = mongoose.model('Project', projectSchema);
