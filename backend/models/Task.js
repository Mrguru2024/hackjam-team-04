const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, enum: ['Learning', 'Career', 'Community'], required: true },
  description: { type: String },
  xpAwarded: { type: Number },
}, { timestamps: true });

module.exports = mongoose.model('Task', TaskSchema);
