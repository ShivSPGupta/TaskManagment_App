const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  dueDate: { type: Date, required: true },
  status: { type: String, default: 'Pending' },
  priority: { type: String, default: 'Medium' },
  assignedTo: { type: String }, // Added for user assignment
  comments: [{ 
    user: String, 
    text: String, 
    date: { type: Date, default: Date.now } 
  }] // Added for comments
});

module.exports = mongoose.model('Task', taskSchema);
